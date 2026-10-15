const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const nutritionCore = require('../nutrition-sync-core.js');
function setup(training = false) {
  const core = training ? require('../training-sync-core.js') : nutritionCore;
  const sheet = training ? 'Training Log' : 'Daily Log';
  const lastColumn = training ? 'K' : 'Q';
  const data = new Map(), nodes = new Map(), timers = new Map(), windowListeners = {}, writes = [];
  let oauth, failStatus = 0;
  let settings;
  const node = requestedId => {
    const id = settings?.ids[requestedId] || requestedId;
    if (!nodes.has(id)) nodes.set(id, { value: '', disabled: false, textContent: '', dataset: {}, listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; }, click() { return this.listeners.click?.(); } });
    return nodes.get(id);
  };
  node('entryDate').value = '2026-10-09';
  const storage = { get length() { return data.size; }, key: i => [...data.keys()][i], getItem: key => data.get(key) || null, setItem: (key,value) => data.set(key,value) };
  const window = { NutritionSyncCore: core, addEventListener(type, fn) { windowListeners[type] = fn; }, dispatchEvent(event) { return windowListeners[event.type]?.(event); } };
  if (training) {
    vm.runInNewContext(fs.readFileSync(require.resolve('../training-sync.js'), 'utf8'), {window});
    settings = window.TrainingSyncConfig;
    window.TrainingSyncCore = core;
    window.TrainingLog = {context: {isoDate: '2026-10-09'}};
  }
  const google = { accounts: { oauth2: { initTokenClient(options) { oauth = options; return { requestAccessToken() {} }; }, hasGrantedAllScopes: response => response.scope === 'https://www.googleapis.com/auth/spreadsheets' } } };
  window.google = google;
  const navigator = { onLine: true };
  const cells = [core.serial('2026-10-09'), ...Array(training ? 10 : 16).fill('')];
  const fetch = async (url, init) => {
    if (failStatus) return { ok: false, status: failStatus };
    let result;
    if (url.includes('values:batchUpdate')) {
      const body = JSON.parse(init.body); writes.push(body);
      for (const update of body.data) cells[update.range.split('!')[1].charCodeAt(0) - 65] = update.values[0][0];
      result = {};
    } else if (url.includes('ranges=')) result = { sheets: [{ data: [{ rowData: [{ values: [] }] }] }] };
    else if (!url.includes('/values/')) result = { sheets: [{ properties: { title: sheet, gridProperties: { rowCount: 120 } } }] };
    else {
      const range = decodeURIComponent(new URL(url).pathname.split('/values/')[1]).split('!')[1];
      if (range === 'A1:' + lastColumn + '1') result = { values: [core.headers] };
      else if (range === 'A2:' + lastColumn + '120') result = {values: [[core.serial('2026-10-08')], cells.slice()]};
      else if (range === 'A2:A120') result = { values: [[core.serial('2026-10-08')], [cells[0]]] };
      else if (range === 'A3') result = { values: [[cells[0]]] };
      else if (range === 'A3:' + lastColumn + '3') result = { values: [cells.slice()] };
      else throw new Error(range);
    }
    return { ok: true, status: 200, json: async () => result };
  };
  vm.runInNewContext(fs.readFileSync(require.resolve('../nutrition-sync.js'), 'utf8'), {
    window, google, document: { getElementById: node, addEventListener() {}, hidden: false }, navigator, localStorage: storage,
    location: { protocol: 'http:' }, fetch, AbortController, Date, CustomEvent: class { constructor(type,init) { this.type = type; this.detail = init.detail; } },
    setTimeout: (fn,delay) => { const id = Symbol(); timers.set(id, {fn,delay}); return id; }, clearTimeout: id => timers.delete(id)
  });
  node('googleClientId').value = 'test-client.apps.googleusercontent.com'; node('googleClientId').listeners.change();
  const saved = changes => window.dispatchEvent({ type: (training ? 'training' : 'nutrition') + ':local-saved', detail: { date: '2026-10-09', changes } });
  const connect = async (scope = 'https://www.googleapis.com/auth/spreadsheets') => {
    node('connectGoogle').click();
    await oauth.callback({ access_token: 'synthetic-test-token', expires_in: 3600, scope });
  };
  return { node, storage, data, writes, cells, navigator, timers, saved, connect, window, oauth: () => oauth, fail: status => { failStatus = status; } };
}
test('authorization drains queued edits and never persists the token', async () => {
  const f = setup(); f.saved({ calories: '4000' });
  await f.connect();
  assert.equal(f.cells[2], 4000);
  assert.match(f.node('cloudSyncStatus').textContent, /Verified in Google Sheets/);
  assert.equal([...f.data.values()].some(value => value.includes('synthetic-test-token')), false);
});
test('permission rejection retains the queued entry and shows a clear error', async () => {
  const f = setup(); f.saved({ calories: '4000' }); await f.connect('');
  assert.equal(f.writes.length, 0);
  assert.match(f.node('cloudSyncStatus').textContent, /not approved/);
  assert.match(f.node('googleConnectionLabel').textContent, /1 day/);
});
test('offline entries retry when the page returns online', async () => {
  const f = setup(); await f.connect(); f.navigator.onLine = false; f.saved({ calories: '4000' });
  assert.match(f.node('cloudSyncStatus').textContent, /Offline/);
  assert.equal(f.writes.length, 0);
  f.navigator.onLine = true; f.window.dispatchEvent({ type: 'online' });
  await new Promise(setImmediate);
  assert.equal(f.cells[2], 4000);
});
test('HTTP 401 clears connection, preserves the queue, and requires a new consent tap', async () => {
  const f = setup(); await f.connect(); f.saved({ calories: '4000' }); f.fail(401); f.node('syncGoogleNow').click();
  await new Promise(setImmediate);
  assert.match(f.node('cloudSyncStatus').textContent, /expired/);
  assert.equal(f.node('googleConnectionLabel').dataset.connected, 'false');
  assert.equal(f.writes.length, 0);
});
test('HTTP 503 preserves the queue and schedules an automatic retry', async () => {
  const f = setup(); await f.connect(); f.saved({ calories: '4000' }); f.fail(503); f.node('syncGoogleNow').click();
  await new Promise(setImmediate);
  assert.match(f.node('cloudSyncStatus').textContent, /503/);
  assert.ok([...f.timers.values()].some(timer => timer.delay === 2000));
  f.fail(0);
  const retry = [...f.timers.values()].find(timer => timer.delay === 2000);
  await retry.fn();
  assert.equal(f.cells[2], 4000);
});
test('blocked popup allows another connection attempt without losing queued data', () => {
  const f = setup(); f.saved({ calories: '4000' }); f.node('connectGoogle').click(); f.oauth().error_callback();
  assert.equal(f.node('connectGoogle').disabled, false);
  assert.match(f.node('cloudSyncStatus').textContent, /blocked/);
  assert.match(f.node('googleConnectionLabel').textContent, /1 day/);
});

test('training configuration connects, writes only Training Log, and keeps tokens in memory', async () => {
  const f = setup(true); f.saved({volume: '4 mi easy', status: 'modified'}); await f.connect();
  assert.equal(f.cells[5], '4 mi easy');
  assert.equal(f.cells[4], 'Completed with modification');
  assert.ok(f.writes[0].data.every(item => item.range.startsWith("'Training Log'!")));
  assert.match(f.node('cloudSyncStatus').textContent, /Training Log row 3/);
  assert.equal([...f.data.values()].some(value => value.includes('synthetic-test-token')), false);
});

test('offline training queues and retries without marking completion', async () => {
  const f = setup(true); await f.connect(); f.navigator.onLine = false;
  f.saved({checklist: '1 of 3 checked: Warm-up'});
  assert.match(f.node('cloudSyncStatus').textContent, /Offline/);
  assert.equal(f.writes.length, 0);
  f.navigator.onLine = true; f.window.dispatchEvent({type: 'online'}); await new Promise(setImmediate);
  assert.equal(f.cells[9], '1 of 3 checked: Warm-up');
  assert.equal(f.cells[4], '');
});

test('training Retry reconnects and drains queued edits', async () => {
  const f = setup(true); f.saved({notes: 'Synthetic retry'});
  f.node('syncGoogleNow').click();
  await f.oauth().callback({access_token: 'synthetic-test-token', expires_in: 3600, scope: 'https://www.googleapis.com/auth/spreadsheets'});
  assert.equal(f.cells[8], 'Synthetic retry');
  assert.match(f.node('cloudSyncStatus').textContent, /Verified/);
});

test('training cloud reads use the selected session date', async () => {
  const f = setup(true); f.cells[5] = 'Cloud volume';
  let loaded;
  f.window.addEventListener('training:cloud-loaded', event => {loaded = event.detail;});
  await f.connect();
  assert.equal(loaded.date, '2026-10-09');
  assert.equal(loaded.entry.volume, 'Cloud volume');
});
