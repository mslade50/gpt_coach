const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {DatabaseSync} = require('node:sqlite');
const worker = import('../sync-service/worker.mjs');
const origin = 'https://logger.example';
const endpoint = 'https://sync.example';
const b64 = value => Buffer.from(value).toString('base64url');
async function fixture() {
  const api = await worker;
  const sql = new DatabaseSync(':memory:');
  sql.exec(fs.readFileSync(require.resolve('../sync-service/schema.sql'), 'utf8'));
  const env = {
    DB: {prepare(query) { return {bind(...args) {return {first: async () => sql.prepare(query).get(...args), run: async () => ({meta: {changes: Number(sql.prepare(query).run(...args).changes)}})};}};}},
    SITE_ORIGIN: origin, SITE_PATH: '/gpt_coach/', SPREADSHEET_ID: 'synthetic-sheet',
    OWNER_EMAIL: 'owner@example.com', GOOGLE_CLIENT_ID: 'synthetic.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: 'synthetic-client-secret', TOKEN_ENCRYPTION_KEY: b64(crypto.getRandomValues(new Uint8Array(32)))
  };
  let wrongOwner = false, revoked = false, unavailable = false, renewals = 0, rejectAccess = false;
  const sheets = [];
  const upstream = async (url, init) => {
    if (url === 'https://oauth2.googleapis.com/token') {
      const params = new URLSearchParams(init.body);
      assert.equal(params.get('client_secret'), env.GOOGLE_CLIENT_SECRET);
      if (params.get('grant_type') === 'refresh_token') {
        renewals++;
        if (unavailable) return Response.json({error: 'temporarily_unavailable'}, {status: 503});
        if (revoked) return Response.json({error: 'invalid_grant'}, {status: 400});
        assert.equal(params.get('refresh_token'), 'synthetic-refresh');
      }
      return Response.json({access_token: 'synthetic-google-access', refresh_token: 'synthetic-refresh', expires_in: 3600, scope: 'openid email https://www.googleapis.com/auth/spreadsheets'});
    }
    if (url === 'https://openidconnect.googleapis.com/v1/userinfo') return Response.json({email: wrongOwner ? 'stranger@example.com' : env.OWNER_EMAIL, email_verified: true});
    assert.ok(url.startsWith('https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet'));
    assert.equal(init.headers.Authorization, 'Bearer synthetic-google-access');
    if (rejectAccess) {rejectAccess = false; return Response.json({error:'synthetic upstream detail'}, {status:401});}
    sheets.push({url, init}); return Response.json({values: [['synthetic record']]});
  };
  const run = request => api.handle(request, env, upstream);
  async function newDevice() {
    const pair = await crypto.subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, false, ['sign', 'verify']);
    const key = JSON.parse(api.canonicalKey(await crypto.subtle.exportKey('jwk', pair.publicKey)));
    return {pair, key, id: await api.digest(api.canonicalKey(key))};
  }
  async function start(device, requestOrigin = origin, returnUrl = origin + '/gpt_coach/nutrition.html') {
    return run(new Request(endpoint + '/auth/start', {method: 'POST', headers: {Origin: requestOrigin}, body: new URLSearchParams({key: b64(JSON.stringify(device.key)), return: returnUrl})}));
  }
  async function pair(device) {
    const started = await start(device); assert.equal(started.status, 302);
    const google = new URL(started.headers.get('Location'));
    const cookie = started.headers.get('Set-Cookie').split(';')[0];
    const callback = await run(new Request(endpoint + '/auth/callback?code=synthetic-code&state=' + google.searchParams.get('state'), {headers: {Cookie: cookie}}));
    return {started, callback, google, cookie};
  }
  async function signed(device, path, payload = {}, options = {}) {
    const body = JSON.stringify(payload), time = String(options.time || Date.now());
    const nonce = options.nonce || b64(crypto.getRandomValues(new Uint8Array(18)));
    const proof = ['POST', endpoint + path, time, nonce, await api.digest(body)].join('\n');
    const signature = b64(await crypto.subtle.sign({name: 'ECDSA', hash: 'SHA-256'}, device.pair.privateKey, new TextEncoder().encode(proof)));
    return new Request(endpoint + path, {method: 'POST', headers: {Origin: options.origin || origin, 'Content-Type': 'application/json', 'X-Device': device.id, 'X-Time': time, 'X-Nonce': nonce, 'X-Signature': signature}, body});
  }
  async function expire(device) {
    const row = sql.prepare('SELECT credentials FROM devices WHERE id = ?').get(device.id);
    const credentials = await api.box(row.credentials, env, true); credentials.expires = Date.now() - 1000;
    sql.prepare('UPDATE devices SET credentials = ? WHERE id = ?').run(await api.box(credentials, env), device.id);
  }
  return {api, sql, env, run, newDevice, start, pair, signed, expire, sheets, renewals: () => renewals, wrongOwner: () => {wrongOwner = true;}, revoke: () => {revoked = true;}, unavailable: value => {unavailable = value;}, rejectAccessOnce: () => {rejectAccess = true;}};
}
test('renewable authorization uses owner-only consent, state, PKCE and an HttpOnly callback cookie', async () => {
  const f = await fixture(), device = await f.newDevice();
  const {started, callback, google} = await f.pair(device);
  assert.equal(google.searchParams.get('access_type'), 'offline');
  assert.equal(google.searchParams.get('code_challenge_method'), 'S256');
  assert.match(started.headers.get('Set-Cookie'), /Secure; HttpOnly; SameSite=Lax/);
  assert.equal(callback.status, 303); assert.equal(callback.headers.get('Location'), origin + '/gpt_coach/nutrition.html');
  const stored = f.sql.prepare('SELECT * FROM devices').get();
  assert.equal(stored.id, device.id);
  assert.ok(!stored.credentials.includes('synthetic-refresh'));
  assert.ok(!stored.credentials.includes('synthetic-google-access'));
  assert.ok(!JSON.stringify([...started.headers, ...callback.headers]).includes('synthetic-refresh'));
  await assert.rejects(crypto.subtle.exportKey('jwk', device.pair.privateKey));
});
test('reload, navigation and a second device restore independently without another Google consent', async () => {
  const f = await fixture(), phone = await f.newDevice(), desktop = await f.newDevice();
  await f.pair(phone); await f.pair(desktop);
  for (const device of [phone, desktop, phone, desktop]) {
    const response = await f.run(await f.signed(device, '/connection'));
    assert.equal(response.status, 200); assert.equal((await response.json()).connected, true);
  }
  assert.equal(f.renewals(), 0);
  await f.expire(phone);
  assert.equal((await f.run(await f.signed(phone, '/connection'))).status, 200);
  assert.equal(f.renewals(), 1);
  assert.equal((await f.run(await f.signed(phone, '/connection'))).status, 200);
  assert.equal(f.renewals(), 1);
});
test('the remembered connection reads and edits only the configured log Sheet', async () => {
  const f = await fixture(), device = await f.newDevice(); await f.pair(device);
  const base = 'https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet';
  const read = await f.run(await f.signed(device, '/sheets', {url: base + '/values/' + encodeURIComponent("'Training Log'!A2:K100") + '?valueRenderOption=UNFORMATTED_VALUE'}));
  assert.equal(read.status, 200);
  assert.deepEqual(await read.json(), {values: [['synthetic record']]});
  const write = await f.run(await f.signed(device, '/sheets', {url: base + '/values:batchUpdate', method: 'POST', body: JSON.stringify({valueInputOption: 'RAW', data: [{range: "'Daily Log'!C6", values: [[3900]]}]})}));
  assert.equal(write.status, 200); assert.equal(f.sheets.length, 2);
  assert.equal(write.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal(write.headers.get('Cache-Control'), 'no-store');
  assert.ok(!JSON.stringify(await write.json()).includes('synthetic-google-access'));
});
test('wrong owner, missing state, replayed proof, bad origin and old proof cannot connect', async () => {
  const f = await fixture(), device = await f.newDevice();
  f.wrongOwner(); assert.equal((await f.pair(device)).callback.status, 403);
  assert.equal(f.sql.prepare('SELECT COUNT(*) AS n FROM devices').get().n, 0);
  assert.equal((await f.run(new Request(endpoint + '/auth/callback?code=x&state=x'))).status, 400);
  assert.equal((await f.start(device, 'https://attacker.example')).status, 403);
  assert.equal((await f.start(device, origin, 'https://attacker.example')).status, 400);
  assert.equal((await f.run(new Request(endpoint + '/auth/start?key=x'))).status, 404);
  const good = await fixture(); await good.pair(device);
  const request = await good.signed(device, '/connection');
  assert.equal((await good.run(request.clone())).status, 200);
  assert.equal((await good.run(request.clone())).status, 401);
  assert.equal((await good.run(await good.signed(device, '/connection', {}, {origin: 'https://attacker.example'}))).status, 403);
  assert.equal((await good.run(await good.signed(device, '/connection', {}, {time: Date.now() - 120000}))).status, 401);
});
test('proofs bind the method, URL, body and device identity', async () => {
  const f = await fixture(), owner = await f.newDevice(), stranger = await f.newDevice(); await f.pair(owner);
  assert.equal((await f.run(await f.signed(stranger, '/connection'))).status, 401);
  const signed = await f.signed(owner, '/connection');
  assert.equal((await f.run(new Request(endpoint + '/disconnect', {method: 'POST', headers: signed.headers, body: '{}'}))).status, 401);
  assert.equal((await f.run(new Request(endpoint + '/connection', {method: 'POST', headers: signed.headers, body: '{"changed":true}'}))).status, 401);
});
test('proxy refuses other Sheets, other tabs, date/formula columns, blank clears and arbitrary URLs', async () => {
  const f = await fixture(), device = await f.newDevice(); await f.pair(device);
  const base = 'https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet';
  const payloads = [
    {url: 'https://attacker.example/'}, {url: base.replace('synthetic-sheet', 'another-sheet')},
    {url: base + '/values/' + encodeURIComponent("'Other tab'!A1:Q3")},
    ...["'Daily Log'!A6", "'Daily Log'!R6", "'Training Log'!L6", "'Daily Log'!C1", "'Daily Log'!C6:D6"].map(range => ({url: base + '/values:batchUpdate', method: 'POST', body: JSON.stringify({valueInputOption: 'RAW', data: [{range, values: [[1]]}]})})),
    {url: base + '/values:batchUpdate', method: 'POST', body: JSON.stringify({valueInputOption: 'USER_ENTERED', data: [{range: "'Daily Log'!C6", values: [['=1+1']]}]})},
    {url: base + '/values:batchUpdate', method: 'POST', body: JSON.stringify({valueInputOption: 'RAW', data: [{range: "'Daily Log'!C6", values: [['']]}]})}
  ];
  for (const payload of payloads) assert.ok((await f.run(await f.signed(device, '/sheets', payload))).status >= 400);
  assert.equal(f.sheets.length, 0);
});
test('temporary renewal failures preserve credentials; revoked Google access fails safely', async () => {
  const f = await fixture(), device = await f.newDevice(); await f.pair(device); await f.expire(device);
  const original = f.sql.prepare('SELECT credentials FROM devices').get().credentials;
  f.unavailable(true);
  assert.equal((await f.run(await f.signed(device, '/connection'))).status, 503);
  assert.equal(f.sql.prepare('SELECT credentials FROM devices').get().credentials, original);
  f.unavailable(false); f.revoke();
  const response = await f.run(await f.signed(device, '/connection'));
  assert.equal(response.status, 401); assert.match((await response.json()).error, /revoked/);
});
test('disconnecting one device leaves the other connection and all Sheet records intact', async () => {
  const f = await fixture(), phone = await f.newDevice(), desktop = await f.newDevice(); await f.pair(phone); await f.pair(desktop);
  assert.equal((await f.run(await f.signed(desktop, '/disconnect'))).status, 200);
  assert.equal((await f.run(await f.signed(desktop, '/connection'))).status, 401);
  assert.equal((await f.run(await f.signed(phone, '/connection'))).status, 200);
  assert.equal(f.sheets.length, 0);
});
test('an unexpectedly rejected access token renews and retries once without another consent', async () => {
  const f = await fixture(), device = await f.newDevice(); await f.pair(device); f.rejectAccessOnce();
  const response = await f.run(await f.signed(device, '/sheets', {url:'https://sheets.googleapis.com/v4/spreadsheets/synthetic-sheet?fields=sheets.properties'}));
  assert.equal(response.status, 200); assert.equal(f.renewals(), 1); assert.equal(f.sheets.length, 1);
});
test('hourly maintenance clears expired connection credentials without touching active devices or Sheets', async () => {
  const f = await fixture(), expired = await f.newDevice(), active = await f.newDevice(); await f.pair(expired); await f.pair(active);
  f.sql.prepare('UPDATE devices SET expires=? WHERE id=?').run(Date.now()-1,expired.id);
  const module = await worker; await module.default.scheduled({},f.env);
  assert.equal(f.sql.prepare('SELECT credentials FROM devices WHERE id=?').get(expired.id).credentials,'');
  assert.notEqual(f.sql.prepare('SELECT credentials FROM devices WHERE id=?').get(active.id).credentials,'');
  assert.equal(f.sheets.length,0);
});
