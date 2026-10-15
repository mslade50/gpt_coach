/* The browser stores a non-exportable device key, never a Google token or client secret. */
(() => {
  'use strict';
  const ENDPOINT = ''; // Enable only after the private service and owner authorization are verified.
  const encoder = new TextEncoder();
  const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
  const digest = async value => b64(await crypto.subtle.digest('SHA-256', encoder.encode(value)));
  const canonicalKey = key => JSON.stringify({crv: key.crv, kty: key.kty, x: key.x, y: key.y});
  function openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('become-fast-google-device-v1', 1);
      request.onupgradeneeded = () => request.result.createObjectStore('keys');
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(new Error('Device storage is unavailable. Use a normal browser window to remember Google.'));
      request.onblocked = () => reject(new Error('Close other logger tabs and retry the connection.'));
    });
  }
  async function deviceIdentity() {
    const db = await openDatabase();
    try {
      const existing = await new Promise((resolve, reject) => {
        const request = db.transaction('keys').objectStore('keys').get('google');
        request.onsuccess = () => resolve(request.result); request.onerror = () => reject(request.error);
      });
      if (existing) return existing;
      const pair = await crypto.subtle.generateKey({name: 'ECDSA', namedCurve: 'P-256'}, false, ['sign', 'verify']);
      const publicKey = JSON.parse(canonicalKey(await crypto.subtle.exportKey('jwk', pair.publicKey)));
      const created = {id: await digest(canonicalKey(publicKey)), publicKey, privateKey: pair.privateKey};
      // Read again inside a write transaction: two newly opened tabs must use the same key.
      return await new Promise((resolve, reject) => {
        const tx = db.transaction('keys', 'readwrite'), store = tx.objectStore('keys');
        const request = store.get('google'); let result;
        request.onsuccess = () => { result = request.result || created; if (!request.result) store.put(created, 'google'); };
        tx.oncomplete = () => resolve(result); tx.onerror = () => reject(tx.error); tx.onabort = () => reject(tx.error);
      });
    } finally { db.close(); }
  }
  function create({endpoint = ENDPOINT, spreadsheetId, error = Error} = {}) {
    if (!endpoint) return null;
    let identity;
    const getIdentity = () => identity ||= deviceIdentity().catch(cause => { identity = null; throw cause; });
    async function call(path, payload = {}) {
      if (!navigator.onLine) throw new error('Offline · saved on device. Will retry when online.', true);
      const device = await getIdentity();
      const url = endpoint + path, body = JSON.stringify(payload);
      const time = String(Date.now()), nonce = b64(crypto.getRandomValues(new Uint8Array(18)));
      const proof = ['POST', url, time, nonce, await digest(body)].join('\n');
      const signature = b64(await crypto.subtle.sign({name: 'ECDSA', hash: 'SHA-256'}, device.privateKey, encoder.encode(proof)));
      let response;
      try {
        response = await fetch(url, {method: 'POST', cache: 'no-store', credentials: 'omit', signal: AbortSignal.timeout(20000),
          headers: {'Content-Type': 'application/json', 'X-Device': device.id, 'X-Time': time, 'X-Nonce': nonce, 'X-Signature': signature}, body});
      } catch { throw new error('Connection interrupted. Saved on device; automatic retry is queued.', true); }
      let value;
      try { value = await response.json(); } catch { throw new error('Sync service is temporarily unavailable. Your entries are safe.', true); }
      if (!response.ok) {
        const cause = new error(value.error || 'Sync returned HTTP ' + response.status + '. Your entries are safe.', response.status === 429 || response.status >= 500);
        cause.status = response.status; throw cause;
      }
      return value;
    }
    return {
      async restore() {
        try { const result = await call('/connection'); return result.connected && result.spreadsheetId === spreadsheetId; }
        catch (cause) { if (cause.status === 401) return false; throw cause; }
      },
      async connect() {
        const device = await getIdentity();
        // Top-level navigation works on iPhone without third-party cookies or popup permissions.
        const form = document.createElement('form'); form.method = 'POST'; form.action = endpoint + '/auth/start';
        const returnUrl = new URL(location.href); returnUrl.search = '';
        for (const [name, value] of Object.entries({key: b64(encoder.encode(JSON.stringify(device.publicKey))), return: returnUrl.href})) {
          const input = document.createElement('input'); input.type = 'hidden'; input.name = name; input.value = value; form.append(input);
        }
        document.body.append(form); form.submit();
      },
      request: (url, init = {}) => call('/sheets', {url, method: init.method || 'GET', ...(init.body ? {body: init.body} : {})}),
      disconnect: () => call('/disconnect')
    };
  }
  window.GoogleConnection = {create};
})();
