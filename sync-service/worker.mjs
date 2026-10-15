const SCOPE = 'openid email https://www.googleapis.com/auth/spreadsheets';
const GOOGLE_TOKEN = 'https://oauth2.googleapis.com/token';
const encoder = new TextEncoder();
const DAY = 86400000;
const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const unb64 = value => Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
const digest = async value => b64(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
const canonicalKey = key => JSON.stringify({crv: key.crv, kty: key.kty, x: key.x, y: key.y});
class Failure extends Error { constructor(status, message) { super(message); this.status = status; } }
function fail(status, message) { throw new Failure(status, message); }
function json(value, status = 200) { return Response.json(value, {status}); }
function allowedReturn(value, env) {
  const url = new URL(value);
  if (url.origin !== env.SITE_ORIGIN || ![env.SITE_PATH, env.SITE_PATH + 'index.html', env.SITE_PATH + 'nutrition.html'].includes(url.pathname) || url.search) fail(400, 'Invalid return address.');
  return url.href;
}
async function box(value, env, decrypt = false) {
  const key = await crypto.subtle.importKey('raw', unb64(env.TOKEN_ENCRYPTION_KEY), 'AES-GCM', false, ['encrypt', 'decrypt']);
  if (decrypt) {
    const [iv, data] = value.split('.');
    return JSON.parse(new TextDecoder().decode(await crypto.subtle.decrypt({name: 'AES-GCM', iv: unb64(iv)}, key, unb64(data))));
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  return b64(iv) + '.' + b64(await crypto.subtle.encrypt({name: 'AES-GCM', iv}, key, encoder.encode(JSON.stringify(value))));
}
async function limitedText(response, limit = 1048576) {
  const reader = response.body?.getReader();
  if (!reader) return '';
  const chunks = []; let size = 0;
  try {
    while (true) {
      const {done, value} = await reader.read(); if (done) break;
      size += value.length;
      if (size > limit) fail(502, 'Response exceeded the permitted size.');
      chunks.push(value);
    }
  } finally { await reader.cancel().catch(() => {}); }
  const bytes = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
  return new TextDecoder().decode(bytes);
}
async function googleJson(url, init, fetcher) {
  const response = await fetcher(url, {...init, signal: AbortSignal.timeout(15000), redirect: 'error'});
  let value;
  try { value = JSON.parse(await limitedText(response)); } catch { fail(502, 'Google returned an unreadable response.'); }
  return {response, value};
}
async function tokenRequest(params, env, fetcher) {
  return googleJson(GOOGLE_TOKEN, {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({...params, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET})}, fetcher);
}
async function renewCredentials(device, credentials, env, fetcher) {
  const {response, value} = await tokenRequest({grant_type: 'refresh_token', refresh_token: credentials.refresh}, env, fetcher);
  if (!response.ok) {
    if (value.error === 'invalid_grant') {
      await env.DB.prepare('UPDATE devices SET credentials = ?, expires = 0 WHERE id = ?').bind('', device.id).run();
      fail(401, 'Google access was revoked or expired. Reconnect once; your entries are safe.');
    }
    fail(503, 'Google renewal is temporarily unavailable. Your queued entries are safe.');
  }
  if (!value.access_token) fail(503, 'Google renewal is temporarily unavailable.');
  credentials.access = value.access_token;
  credentials.refresh = value.refresh_token || credentials.refresh;
  credentials.expires = Date.now() + Number(value.expires_in || 3600) * 1000;
  const encrypted = await box(credentials, env);
  await env.DB.prepare('UPDATE devices SET credentials = ?, expires = ? WHERE id = ? AND credentials = ?').bind(encrypted, Date.now() + 180 * DAY, device.id, device.credentials).run();
  device.credentials = encrypted;
}
async function authenticate(request, body, env) {
  const id = request.headers.get('X-Device');
  const timestamp = request.headers.get('X-Time');
  const nonce = request.headers.get('X-Nonce');
  const signature = request.headers.get('X-Signature');
  if (!/^[\w-]{43}$/.test(id || '') || !/^\d{13}$/.test(timestamp || '') || Math.abs(Date.now() - Number(timestamp)) > 90000 || !/^[\w-]{22,64}$/.test(nonce || '') || !signature) fail(401, 'Connect Google on this device.');
  const device = await env.DB.prepare('SELECT * FROM devices WHERE id = ?').bind(id).first();
  if (!device || device.expires < Date.now()) fail(401, 'Connect Google on this device.');
  const key = await crypto.subtle.importKey('jwk', JSON.parse(device.public_key), {name: 'ECDSA', namedCurve: 'P-256'}, false, ['verify']);
  const url = new URL(request.url);
  const message = [request.method, url.origin + url.pathname + url.search, timestamp, nonce, await digest(body)].join('\n');
  let verified = false;
  try { verified = await crypto.subtle.verify({name: 'ECDSA', hash: 'SHA-256'}, key, unb64(signature), encoder.encode(message)); } catch { /* Invalid proof. */ }
  if (!verified) fail(401, 'Device verification failed. Reconnect Google.');
  const result = await env.DB.prepare('INSERT OR IGNORE INTO request_nonces (device, nonce, expires) VALUES (?, ?, ?)').bind(id, nonce, Date.now() + 180000).run();
  if (result.meta.changes !== 1) fail(401, 'Request already used. Retry sync.');
  return device;
}
function validateSheetRequest(payload, env) {
  const url = new URL(payload.url);
  const base = '/v4/spreadsheets/' + env.SPREADSHEET_ID;
  const method = payload.method || 'GET';
  if (url.origin !== 'https://sheets.googleapis.com' || url.username || url.password || url.hash || !['GET', 'POST'].includes(method)) fail(403, 'This connection is limited to your log Sheet.');
  if (method === 'GET') {
    if (url.pathname === base) {
      const fields = url.searchParams.get('fields');
      if (fields === 'sheets.properties' && [...url.searchParams.keys()].every(key => key === 'fields')) return {url: url.href, method};
      const ranges = url.searchParams.getAll('ranges');
      if (fields !== 'sheets.data.rowData.values(userEnteredValue,dataValidation)' || ranges.length !== 1 || !/^'(Daily Log|Training Log)'!A[1-9]\d{0,3}:(Q|K)[1-9]\d{0,3}$/.test(ranges[0]) || [...url.searchParams.keys()].some(key => !['ranges', 'fields'].includes(key))) fail(403, 'Invalid log range.');
      return {url: url.href, method};
    }
    if (!url.pathname.startsWith(base + '/values/')) fail(403, 'Invalid log endpoint.');
    const range = decodeURIComponent(url.pathname.slice((base + '/values/').length));
    if (!/^'(Daily Log|Training Log)'!A[1-9]\d{0,3}(?::[A-Q][1-9]\d{0,3})?$/.test(range) || [...url.searchParams.keys()].some(key => key !== 'valueRenderOption') || !['UNFORMATTED_VALUE', 'FORMULA', null].includes(url.searchParams.get('valueRenderOption'))) fail(403, 'Invalid log range.');
    return {url: url.href, method};
  }
  if (url.pathname !== base + '/values:batchUpdate' || url.search) fail(403, 'Invalid write endpoint.');
  let body;
  try { body = JSON.parse(payload.body); } catch { fail(400, 'Invalid write.'); }
  if (body.valueInputOption !== 'RAW' || !Array.isArray(body.data) || body.data.length < 1 || body.data.length > 20 || Object.keys(body).some(key => !['valueInputOption', 'data'].includes(key))) fail(400, 'Invalid write.');
  for (const update of body.data) {
    const match = /^'(Daily Log|Training Log)'!([B-Q])([1-9]\d{0,3})$/.exec(update.range || '');
    if (!match || Number(match[3]) < 2 || (match[1] === 'Training Log' && match[2] > 'K') || Object.keys(update).some(key => !['range', 'values'].includes(key)) || update.values?.length !== 1 || update.values[0]?.length !== 1 || !['string', 'number'].includes(typeof update.values[0][0]) || String(update.values[0][0]).length > 12000 || update.values[0][0] === '') fail(403, 'Only individual log fields can be updated.');
  }
  return {url: url.href, method, body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}};
}
export async function handle(request, env, fetcher = fetch) {
  const url = new URL(request.url);
  const origin = request.headers.get('Origin');
  const api = ['/connection', '/sheets', '/disconnect'].includes(url.pathname);
  let response;
  try {
    if (request.method === 'OPTIONS' && api) {
      if (origin !== env.SITE_ORIGIN) fail(403, 'Origin not permitted.');
      response = new Response(null, {status: 204, headers: {'Access-Control-Allow-Methods': 'POST', 'Access-Control-Allow-Headers': 'Content-Type,X-Device,X-Time,X-Nonce,X-Signature', 'Access-Control-Max-Age': '600'}});
    } else if (url.pathname === '/health' && request.method === 'GET') {
      response = json({service: 'Become Fast private sync', ready: Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.TOKEN_ENCRYPTION_KEY && env.OWNER_EMAIL && env.DB)});
    } else if (url.pathname === '/auth/start' && request.method === 'POST') {
      // A top-level POST from the logger prevents links from pairing an attacker's key.
      if (origin !== env.SITE_ORIGIN) fail(403, 'Start sign-in from your logger.');
      if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.TOKEN_ENCRYPTION_KEY) fail(503, 'Remembered connection setup is not finished. Your local entries are safe.');
      const form = new URLSearchParams(await limitedText(request, 3000));
      let key;
      try { key = JSON.parse(new TextDecoder().decode(unb64(form.get('key') || ''))); } catch { fail(400, 'Invalid device key.'); }
      if (key.kty !== 'EC' || key.crv !== 'P-256' || key.d || !/^[\w-]{43}$/.test(key.x || '') || !/^[\w-]{43}$/.test(key.y || '')) fail(400, 'Invalid device key.');
      await crypto.subtle.importKey('jwk', key, {name: 'ECDSA', namedCurve: 'P-256'}, false, ['verify']);
      const returnUrl = allowedReturn(form.get('return'), env);
      const state = b64(crypto.getRandomValues(new Uint8Array(32)));
      const verifier = b64(crypto.getRandomValues(new Uint8Array(32)));
      const cookie = await box({state, verifier, key: JSON.parse(canonicalKey(key)), returnUrl, expires: Date.now() + 600000}, env);
      const target = new URL('https://accounts.google.com/o/oauth2/v2/auth');
      target.search = new URLSearchParams({client_id: env.GOOGLE_CLIENT_ID, redirect_uri: url.origin + '/auth/callback', response_type: 'code', scope: SCOPE, access_type: 'offline', prompt: 'consent', state, code_challenge: await digest(verifier), code_challenge_method: 'S256', login_hint: env.OWNER_EMAIL}).toString();
      response = new Response(null, {status: 302, headers: {Location: target.href, 'Set-Cookie': '__Host-bf-auth=' + cookie + '; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=600'}});
    } else if (url.pathname === '/auth/callback' && request.method === 'GET') {
      let pending;
      try { pending = await box(request.headers.get('Cookie')?.match(/(?:^|; )__Host-bf-auth=([^;]+)/)?.[1] || '', env, true); } catch { fail(400, 'Sign-in expired. Return to the logger and reconnect.'); }
      if (pending.expires < Date.now() || !url.searchParams.get('state') || await digest(pending.state) !== await digest(url.searchParams.get('state'))) fail(400, 'Sign-in expired. Return to the logger and reconnect.');
      if (url.searchParams.has('error')) fail(403, 'Google permission was not approved. Your entries remain on your device.');
      const {response: tokenResponse, value: tokens} = await tokenRequest({grant_type: 'authorization_code', code: url.searchParams.get('code') || '', code_verifier: pending.verifier, redirect_uri: url.origin + '/auth/callback'}, env, fetcher);
      if (!tokenResponse.ok || !tokens.access_token || !tokens.refresh_token || !String(tokens.scope).split(' ').includes('https://www.googleapis.com/auth/spreadsheets')) fail(401, 'Google did not grant a renewable Sheets connection. Return to the logger and reconnect.');
      const {response: identityResponse, value: identity} = await googleJson('https://openidconnect.googleapis.com/v1/userinfo', {headers: {Authorization: 'Bearer ' + tokens.access_token}}, fetcher);
      if (!identityResponse.ok || !identity.email_verified || identity.email?.toLowerCase() !== env.OWNER_EMAIL.toLowerCase()) fail(403, 'Only the owner of this logger can connect. Return and choose the Sheet owner account.');
      const publicKey = canonicalKey(pending.key);
      const id = await digest(publicKey);
      const credentials = await box({refresh: tokens.refresh_token, access: tokens.access_token, expires: Date.now() + Number(tokens.expires_in || 3600) * 1000}, env);
      await env.DB.prepare('INSERT INTO devices (id, public_key, credentials, expires) VALUES (?, ?, ?, ?) ON CONFLICT(id) DO UPDATE SET credentials=excluded.credentials, expires=excluded.expires').bind(id, publicKey, credentials, Date.now() + 180 * DAY).run();
      response = new Response(null, {status: 303, headers: {Location: allowedReturn(pending.returnUrl, env), 'Set-Cookie': '__Host-bf-auth=; Secure; HttpOnly; SameSite=Lax; Path=/; Max-Age=0'}});
    } else if (api && request.method === 'POST') {
      if (origin !== env.SITE_ORIGIN) fail(403, 'Origin not permitted.');
      const body = await limitedText(request, 40000);
      const device = await authenticate(request, body, env);
      if (url.pathname === '/disconnect') {
        await env.DB.prepare('UPDATE devices SET credentials = ?, expires = 0 WHERE id = ?').bind('', device.id).run();
        response = json({connected: false});
      } else {
        const credentials = await box(device.credentials, env, true);
        if (credentials.expires < Date.now() + 60000) {
          await renewCredentials(device, credentials, env, fetcher);
        }
        if (url.pathname === '/connection') response = json({connected: true, spreadsheetId: env.SPREADSHEET_ID});
        else {
          let payload; try { payload = JSON.parse(body); } catch { fail(400, 'Invalid request.'); }
          const target = validateSheetRequest(payload, env);
          const send = () => fetcher(target.url, {method: target.method, ...(target.body ? {body: target.body} : {}), headers: {...target.headers, Authorization: 'Bearer ' + credentials.access}, redirect: 'error', signal: AbortSignal.timeout(15000)});
          let upstream = await send();
          if (upstream.status === 401) {
            await upstream.body?.cancel();
            await renewCredentials(device, credentials, env, fetcher);
            upstream = await send();
          }
          // Never return Google error bodies or credentials to the browser.
          if (!upstream.ok) fail(upstream.status === 401 ? 503 : upstream.status, 'Google Sheets could not complete the request. Your queued entries are safe.');
          response = new Response(await limitedText(upstream, 4000000), {headers: {'Content-Type': 'application/json'}});
        }
      }
    } else fail(404, 'Not found.');
  } catch (error) {
    response = json({error: error instanceof Failure ? error.message : 'Connection interrupted. Your saved entries are safe.'}, error instanceof Failure ? error.status : 503);
  }
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'no-store'); headers.set('Referrer-Policy', 'no-referrer'); headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'");
  if (api) { headers.set('Vary', 'Origin'); if (origin === env.SITE_ORIGIN) headers.set('Access-Control-Allow-Origin', origin); }
  return new Response(response.body, {status: response.status, headers});
}
export default {fetch: (request, env) => handle(request, env), async scheduled(_event, env) {
  // Only short-lived proof nonces; log records never enter this database.
  await env.DB.prepare('DELETE FROM request_nonces WHERE expires < ?').bind(Date.now()).run();
  await env.DB.prepare("UPDATE devices SET credentials = '' WHERE expires < ? AND credentials != ''").bind(Date.now()).run();
}};
export {box, digest, canonicalKey, validateSheetRequest};
