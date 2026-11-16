const {test} = require('node:test');
const assert = require('node:assert/strict');
const KEY = 'synthetic-helm-key';
const ENC = Buffer.alloc(32, 7).toString('base64url');
const HEAD = ['Date', 'AM weight (lb)', 'Calories', 'Walk-only steps', 'Run miles', 'Sleep (hrs)', 'Training type', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Fiber (g)', 'Intra carb (g)', 'Restaurant?', 'Lift (min)', 'Bike/row (min)', 'Readiness (1–5)', 'Notes'];
const serial = date => (Date.parse(date + 'T00:00:00Z') - Date.UTC(1899, 11, 30)) / 86400000;
const load = () => Promise.all([import('../sync-service/worker.mjs'), import('../sync-service/helm-log.mjs'), import('../sync-service/helm-history.mjs')]);
const NOW = Date.parse('2026-11-16T12:00:00Z');

function sheets(rows, head = HEAD) {
  const calls = [];
  const fetcher = async (url, init = {}) => {
    calls.push([init.method || 'GET', url]);
    if (url.startsWith('https://oauth2.googleapis.com/token')) return Response.json({access_token: 'new', expires_in: 3600});
    const u = new URL(url);
    if (u.searchParams.get('fields') === 'sheets.properties') return Response.json({sheets: [{properties: {title: 'Daily Log', gridProperties: {rowCount: rows.length + 1}}}]});
    const range = decodeURIComponent(u.pathname.split('/values/')[1]);
    if (range === "'Daily Log'!A1:Q1") return Response.json({values: [head]});
    if (/^'Daily Log'!A2:P\d+$/.test(range)) return Response.json({values: rows});
    return new Response('{}', {status: 404});
  };
  return {fetcher, calls};
}
async function envWith(worker, expires = Date.now() + 3600000) {
  const creds = await worker.box({refresh: 'r', access: 'a', expires}, {TOKEN_ENCRYPTION_KEY: ENC});
  const writes = [];
  const DB = {prepare: sql => ({bind: () => ({
    all: async () => { assert.match(sql, /^SELECT/); return {results: [{id: 'd'.repeat(43), credentials: creds}]}; },
    run: async () => { writes.push(sql); return {meta: {changes: 1}}; }
  })})};
  return {writes, env: {SPREADSHEET_ID: 'sheet', HELM_SYNC_KEY: KEY, GOOGLE_CLIENT_ID: 'c', GOOGLE_CLIENT_SECRET: 's', TOKEN_ENCRYPTION_KEY: ENC, SITE_ORIGIN: 'https://mslade50.github.io', SITE_PATH: '/gpt_coach/', DB}};
}
async function post(worker, helm, env, fetcher, payload, over = {}) {
  const body = JSON.stringify(payload);
  const time = over.time ?? String(Date.now());
  const signature = over.signature ?? await helm.sign(over.key ?? KEY, 'POST', over.path ?? '/helm/history', time, body);
  const res = await worker.handle(new Request('https://x.workers.dev/helm/history', {method: 'POST', body, headers: {'X-Time': time, 'X-Signature': signature}}), env, fetcher);
  return {status: res.status, body: await res.json()};
}

test('auth: unset key, bad key, stale time, wrong path signature and tampered body are refused before any Google call', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker); const s = sheets([]);
  const payload = {days: 30};
  assert.equal((await post(worker, helm, {...env, HELM_SYNC_KEY: undefined}, s.fetcher, payload)).status, 404);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {key: 'wrong'})).status, 401);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {time: String(Date.now() - 120000)})).status, 401);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {path: '/helm/log'})).status, 401);
  assert.equal((await post(worker, helm, env, s.fetcher, payload, {signature: ''})).status, 401);
  const time = String(Date.now()); const good = await helm.sign(KEY, 'POST', '/helm/history', time, JSON.stringify(payload));
  assert.equal((await post(worker, helm, env, s.fetcher, {days: 31}, {time, signature: good})).status, 401);
  assert.equal(s.calls.length, 0);
  const get = await worker.handle(new Request('https://x.workers.dev/helm/history'), env, s.fetcher);
  assert.equal(get.status, 404);
});

test('a signed request returns mapped rows, reads only, and never writes D1 or the Sheet', async () => {
  const [worker, helm] = await load(); const {env, writes} = await envWith(worker);
  const today = new Date().toISOString().slice(0, 10), old = new Date(Date.now() - 5 * 86400000).toISOString().slice(0, 10);
  const row = (d, w) => { const r = new Array(16).fill(''); r[0] = serial(d); r[1] = w; r[2] = 2400; r[4] = 3.1; r[5] = 7.5; r[7] = 160; r[15] = 4; return r; };
  const s = sheets([row(old, 181.2), row(today, 180.4)]);
  const res = await post(worker, helm, env, s.fetcher, {days: 30});
  assert.equal(res.status, 200);
  assert.deepEqual(res.body.rows.map(r => r.date), [old, today]);
  assert.deepEqual(res.body.rows[1], {date: today, weight: 180.4, calories: 2400, miles: 3.1, sleep: 7.5, protein: 160, readiness: 4});
  assert.match(res.body.at, /^\d{4}-\d\d-\d\dT/);
  assert.deepEqual(writes, []);
  assert.ok(s.calls.every(([method, url]) => method === 'GET' && !url.includes('batchUpdate')));
});

test('date conversion, column mapping, window and non-numeric cells', async () => {
  const {mapRows, cellDate, parseHistoryBody, MAX_DAYS} = await import('../sync-service/helm-history.mjs');
  assert.equal(cellDate(serial('2026-11-13')), '2026-11-13');
  assert.equal(cellDate(serial('2026-11-13') + 0.4), '2026-11-13');
  assert.equal(cellDate('2026-11-13'), '2026-11-13');
  assert.equal(cellDate('2026-02-31'), null); assert.equal(cellDate('x'), null); assert.equal(cellDate(''), null); assert.equal(cellDate(undefined), null);
  const mk = (d, cells) => { const r = new Array(16).fill(''); r[0] = serial(d); for (const [i, v] of Object.entries(cells)) r[i] = v; return r; };
  const rows = mapRows([
    mk('2026-11-16', {1: 180, 2: 2500, 4: 5, 5: 7, 7: 150, 15: 3, 8: 999}),
    mk('2026-11-15', {1: '180.5', 2: 'n/a', 5: 6}),
    mk('2026-11-14', {6: 'Run'}),
    mk('2026-10-01', {1: 190}),
    mk('2026-11-10', {1: 181}),
    ['not a date', 1, 2]
  ], 7, NOW);
  assert.deepEqual(rows, [{date: '2026-11-10', weight: 181}, {date: '2026-11-15', sleep: 6}, {date: '2026-11-16', weight: 180, calories: 2500, miles: 5, sleep: 7, protein: 150, readiness: 3}]);
  assert.equal(parseHistoryBody('{"days":99999}').days, MAX_DAYS);
  assert.equal(parseHistoryBody('{"days":10.9}').days, 10);
  assert.equal(parseHistoryBody('').days, 180);
  assert.throws(() => parseHistoryBody('{"days":"9"}'), RangeError);
  assert.throws(() => parseHistoryBody('{"days":0}'), RangeError);
  assert.throws(() => parseHistoryBody('[1]'), RangeError);
});

test('changed headers are refused with a plain 400', async () => {
  const [worker, helm] = await load(); const {env} = await envWith(worker);
  const res = await post(worker, helm, env, sheets([], ['Wrong']).fetcher, {days: 30});
  assert.equal(res.status, 400);
});

test('an expired access token is renewed in memory without a D1 write', async () => {
  const [worker, helm] = await load(); const {env, writes} = await envWith(worker, Date.now() - 1000);
  const s = sheets([[serial('2026-11-16'), 180]]);
  const res = await post(worker, helm, env, s.fetcher, {days: 30});
  assert.equal(res.status, 200);
  assert.ok(s.calls.some(([, url]) => url.startsWith('https://oauth2.googleapis.com/token')));
  assert.deepEqual(writes, []);
});
