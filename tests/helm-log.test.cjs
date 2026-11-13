const {test} = require('node:test');
const assert = require('node:assert/strict');
const SHEET_ID = 'synthetic-sheet';
const load = () => Promise.all([import('../sync-service/worker.mjs'), import('../sync-service/helm-log.mjs')]);
const KEY = 'synthetic-helm-key';
const ENC = Buffer.alloc(32, 7).toString('base64url');
const DAILY_HEAD = ['Date', 'AM weight (lb)', 'Calories', 'Walk-only steps', 'Run miles', 'Sleep (hrs)', 'Training type', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Fiber (g)', 'Intra carb (g)', 'Restaurant?', 'Lift (min)', 'Bike/row (min)', 'Readiness (1–5)', 'Notes'];
const TRAIN_HEAD = ['Date', 'Program week', 'Day', 'Session', 'Status', 'Run / total volume', 'Timed reps / intervals', 'Main lift(s)', 'Notes', 'Checklist', 'Updated at (UTC)'];
const serial = date => (Date.parse(date + 'T00:00:00Z') - Date.UTC(1899, 11, 30)) / 86400000;

// A tiny Sheets double. Rows live in memory; every URL the Worker may call is answered from them.
function sheets(opts = {}) {
  const tabs = {
    'Daily Log': {head: opts.dailyHead || DAILY_HEAD, rows: opts.daily || [[serial('2026-11-12')], [serial('2026-11-13')]], last: 'Q'},
    'Training Log': {head: TRAIN_HEAD, rows: opts.training || [[serial('2026-11-13')]], last: 'K'}
  };
  const calls = [], writes = [];
  const fetcher = async (url, init = {}) => {
    calls.push([init.method || 'GET', url]);
    if (url.startsWith('https://oauth2.googleapis.com/token')) return Response.json({access_token: 'new', expires_in: 3600});
    const u = new URL(url);
    const reply = value => Response.json(value);
    if (u.searchParams.get('fields') === 'sheets.properties') return reply({sheets: Object.entries(tabs).map(([title, t]) => ({properties: {title, gridProperties: {rowCount: t.rows.length + 1}}}))});
    if (u.searchParams.has('ranges')) {
      const [, name, row] = /^'(.+)'!A(\d+):/.exec(u.searchParams.get('ranges'));
      return reply({sheets: [{data: [{rowData: [{values: (opts.grid && opts.grid[name]) || []}]}]}]});
    }
    if (url.includes('values:batchUpdate')) {
      const body = JSON.parse(init.body);
      for (const d of body.data) {
        const [, name, col, row] = /^'(.+)'!([A-Z])(\d+)$/.exec(d.range);
        const r = tabs[name].rows[row - 2]; r[col.charCodeAt(0) - 65] = d.values[0][0];
        writes.push(d);
      }
      return reply({});
    }
    const range = decodeURIComponent(u.pathname.split('/values/')[1]);
    const [, name, a1] = /^'(.+)'!(.+)$/.exec(range); const t = tabs[name];
    if (a1 === 'A1:' + t.last + '1') return reply({values: [t.head]});
    if (a1.startsWith('A2:A')) return reply({values: t.rows.map(r => [r[0] ?? ''])});
    const m = /^A(\d+)(?::[A-Z]\d+)?$/.exec(a1); const r = t.rows[m[1] - 2];
    return reply({values: [a1.includes(':') ? r.slice() : [r[0]]]});
  };
  return {fetcher, calls, writes, tabs};
}

async function envWith(worker) {
  const creds = await worker.box({refresh: 'r', access: 'a', expires: Date.now() + 3600000}, {TOKEN_ENCRYPTION_KEY: ENC});
  const updates = [];
  const DB = {prepare: sql => ({bind: (...args) => ({
    all: async () => { assert.match(sql, /^SELECT/); return {results: [{id: 'd'.repeat(43), credentials: creds}]}; },
    run: async () => { updates.push(sql); return {meta: {changes: 1}}; }
  })})};
  return {updates, env: {SPREADSHEET_ID: SHEET_ID, HELM_SYNC_KEY: KEY, GOOGLE_CLIENT_ID: 'c', GOOGLE_CLIENT_SECRET: 's', TOKEN_ENCRYPTION_KEY: ENC, SITE_ORIGIN: 'https://mslade50.github.io', SITE_PATH: '/gpt_coach/', DB}};
}
async function post(worker, helm, env, fetcher, payload, over = {}) {
  const body = typeof payload === 'string' ? payload : JSON.stringify(payload);
  const time = over.time ?? String(Date.now());
  const signature = over.signature ?? await helm.sign(over.key ?? KEY, 'POST', '/helm/log', time, body);
  const res = await worker.handle(new Request('https://x.workers.dev/helm/log', {method: 'POST', body, headers: {'X-Time': time, 'X-Signature': signature}}), env, fetcher);
  return {status: res.status, body: await res.json()};
}

test('auth: unset key, bad signature, stale time, and tampered body are refused before any Google call', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker); const s = sheets();
  const payload = {date: '2026-11-13', daily: {weight: 180}};
  assert.equal((await post(worker, helm, {...env, HELM_SYNC_KEY: undefined}, s.fetcher, payload)).status, 404);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {key: 'wrong-key'})).status, 401);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {time: String(Date.now() - 120000)})).status, 401);
  const time = String(Date.now()); const good = await helm.sign(KEY, 'POST', '/helm/log', time, JSON.stringify(payload));
  assert.equal((await post(worker, helm, env, s.fetcher, {...payload, daily: {weight: 1}}, {time, signature: good})).status, 401);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {signature: ''})).status, 401);
  assert.equal(s.calls.length, 0);
});

test('existing browser routes still need Origin (no weakening)', async () => {
  const [worker] = await load(); const {env} = await envWith(worker);
  const res = await worker.handle(new Request('https://x.workers.dev/sheets', {method: 'POST', body: '{}'}), env, sheets().fetcher);
  assert.equal(res.status, 403);
  const get = await worker.handle(new Request('https://x.workers.dev/helm/log'), env, sheets().fetcher);
  assert.equal(get.status, 404);
});

test('blank cells are written, read back, and reported; repeat is unchanged (idempotent)', async () => {
  const [worker, helm] = await load(); const {env, updates} = await envWith(worker); const s = sheets();
  const payload = {date: '2026-11-13', daily: {weight: 181.4, sleep: '7.5', notes: '=literal'}, training: {week: 2, day: 5, purpose: 'Easy run', status: 'Completed as prescribed', volume: '45 min'}};
  const first = await post(worker, helm, env, s.fetcher, payload);
  assert.equal(first.status, 200);
  assert.deepEqual(first.body.results.daily, {weight: {status: 'written'}, sleep: {status: 'written'}, notes: {status: 'written'}});
  assert.equal(first.body.results.training.status.status, 'written');
  assert.equal(s.tabs['Daily Log'].rows[1][1], 181.4); assert.equal(s.tabs['Daily Log'].rows[1][16], '=literal');
  assert.equal(s.tabs['Training Log'].rows[0][4], 'Completed as prescribed');
  const writeCount = s.writes.length;
  const second = await post(worker, helm, env, s.fetcher, payload);
  assert.ok(Object.values(second.body.results.daily).every(r => r.status === 'unchanged'));
  assert.equal(s.writes.length, writeCount);
  assert.deepEqual(updates, []); // grant was fresh: the route itself never writes D1
});

test('a different existing value is a conflict and is left alone', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker);
  const row = [serial('2026-11-13'), 179]; const s = sheets({daily: [[serial('2026-11-12')], row]});
  const res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', daily: {weight: 181, sleep: 7}});
  assert.deepEqual(res.body.results.daily.weight, {status: 'conflict', sheet: 179});
  assert.equal(res.body.results.daily.sleep.status, 'written');
  assert.equal(s.tabs['Daily Log'].rows[1][1], 179);
});

test('a formula cell is never written', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker);
  const s = sheets({grid: {'Daily Log': [{}, {}, {}, {}, {}, {userEnteredValue: {formulaValue: '=1'}}]}});
  const res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', daily: {sleep: 7, weight: 180}});
  assert.deepEqual(res.body.results.daily.sleep, {status: 'skipped', reason: 'formula'});
  assert.equal(res.body.results.daily.weight.status, 'written');
  assert.equal(s.tabs['Daily Log'].rows[1][5], undefined);
});

test('missing date row, changed headers, and duplicate rows write nothing', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker);
  let s = sheets();
  let res = await post(worker, helm, env, s.fetcher, {date: '2026-12-01', daily: {weight: 180}});
  assert.deepEqual(res.body.results.daily.weight, {status: 'skipped', reason: 'no_date_row'});
  s = sheets({dailyHead: ['Wrong']});
  res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', daily: {weight: 180}});
  assert.equal(res.body.results.daily.weight.reason, 'header_changed');
  s = sheets({daily: [[serial('2026-11-13')], [serial('2026-11-13')]]});
  res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', daily: {weight: 180}});
  assert.equal(res.body.results.daily.weight.reason, 'duplicate_date_rows');
  assert.equal(s.writes.length, 0);
});

test('dropdown violations are skipped; allowed options are written', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker);
  const rule = {dataValidation: {condition: {type: 'ONE_OF_LIST', values: [{userEnteredValue: 'Skipped'}, {userEnteredValue: 'Partially completed'}]}}};
  const grid = {'Training Log': [{}, {}, {}, {}, rule]};
  let s = sheets({grid});
  let res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', training: {status: 'Completed as prescribed'}});
  assert.deepEqual(res.body.results.training.status, {status: 'skipped', reason: 'dropdown'});
  s = sheets({grid});
  res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', training: {status: 'Skipped'}});
  assert.equal(res.body.results.training.status.status, 'written');
  res = await post(worker, helm, env, s.fetcher, {date: '2026-11-13', training: {status: 'Nonsense'}});
  assert.equal(res.body.results.training.status.reason, 'invalid');
});

test('malformed bodies and unknown fields are 400; unconfirmed read-back is not reported written', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker); const s = sheets();
  assert.equal((await post(worker, helm, env, s.fetcher, {date: '2026-02-30'})).status, 400);
  assert.equal((await post(worker, helm, env, s.fetcher, {date: '2026-11-13', daily: {steps: 5}})).status, 400);
  assert.equal((await post(worker, helm, env, s.fetcher, 'not json')).status, 400);
  const bad = sheets(); const orig = bad.fetcher;
  const dropping = async (url, init) => url.includes('values:batchUpdate') ? Response.json({}) : orig(url, init);
  const res = await post(worker, helm, env, dropping, {date: '2026-11-13', daily: {weight: 180}});
  assert.deepEqual(res.body.results.daily.weight, {status: 'skipped', reason: 'unconfirmed'});
});

test('an expired access token is renewed through the existing renewal path', async () => {
  const [worker, helm] = await load(); const {env, updates} = await envWith(worker);
  const creds = await worker.box({refresh: 'r', access: 'a', expires: Date.now() - 1000}, env);
  const DB = {prepare: sql => ({bind: () => ({all: async () => ({results: [{id: 'd'.repeat(43), credentials: creds}]}), run: async () => { updates.push(sql); return {meta: {changes: 1}}; }})})};
  const s = sheets();
  const res = await post(worker, helm, {...env, DB}, s.fetcher, {date: '2026-11-13', daily: {weight: 180}});
  assert.equal(res.status, 200);
  assert.equal(updates.length, 1); assert.match(updates[0], /^UPDATE devices SET credentials/);
});
