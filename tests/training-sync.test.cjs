const {test} = require('node:test');
const assert = require('node:assert/strict');
const {Engine, headers, serial} = require('../training-sync-core.js');
function fixture(options = {}) {
  const data = new Map(), writes = [], cells = [serial('2026-11-01'), ...Array(10).fill('')];
  const storage = {get length() {return data.size;}, key: i => [...data.keys()][i], getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value)};
  let offline = false;
  const request = async (url, init) => {
    if (offline) throw new Error('offline');
    if (url.includes('values:batchUpdate')) {
      const body = JSON.parse(init.body);
      assert.equal(body.valueInputOption, 'RAW');
      for (const item of body.data) {
        assert.match(item.range, /^'Training Log'![B-K]99$/);
        cells[item.range.split('!')[1].charCodeAt(0) - 65] = item.values[0][0];
      }
      writes.push(body.data); options.duringWrite?.(); return {};
    }
    const parsed = new URL(url);
    if (parsed.searchParams.has('ranges')) return {sheets: [{data: [{rowData: [{values: options.grid || []}]}]}]};
    if (!url.includes('/values/')) return {sheets: [{properties: {title: 'Training Log', gridProperties: {rowCount: 524}}}]};
    assert.match(decodeURIComponent(parsed.pathname), /'Training Log'!/);
    const range = decodeURIComponent(parsed.pathname.split('/values/')[1]).split('!')[1];
    if (range === 'A1:K1') return {values: [options.headers || headers]};
    if (range === 'A2:A524') return {values: options.dates || Array.from({length: 98}, (_, i) => [i === 97 ? cells[0] : 0])};
    if (range === 'A99') return {values: [[options.moved ? 0 : cells[0]]]};
    if (range === 'A99:K99') return {values: [cells.slice()]};
    throw new Error(range);
  };
  const create = () => new Engine({spreadsheetId: 'synthetic-sheet', storage, request});
  return {engine: create(), create, storage, writes, cells, offline: value => {offline = value;}};
}
test('training writes, additions, and subsequent edits preserve untouched results', async () => {
  const f = fixture();
  f.engine.queue('2026-11-01', {week: 14, day: 7, purpose: 'Synthetic session', status: 'modified', volume: '4 mi', times: '6 × 20 s', lift: 'Bench 3 × 5', notes: '=literal test', checklist: '1 of 2 checked', updatedAt: '2026-10-12T20:00:00Z'});
  assert.equal(await f.engine.sync('2026-11-01'), 99);
  f.cells[7] = 'Lift edited in Sheets';
  f.engine.queue('2026-11-01', {volume: '4.5 mi', lift: '', notes: ''});
  await f.engine.sync('2026-11-01');
  assert.equal(f.cells[1], 14); assert.equal(f.cells[4], 'Completed with modification');
  assert.equal(f.cells[5], '4.5 mi'); assert.equal(f.cells[6], '6 × 20 s');
  assert.equal(f.cells[7], 'Lift edited in Sheets'); assert.equal(f.cells[8], '=literal test');
  assert.equal(f.writes[1].length, 1); assert.deepEqual(f.engine.dates(), []);
});
test('training offline queue survives reload and retry', async () => {
  const f = fixture(); f.engine.queue('2026-11-01', {volume: 'Synthetic offline'}); f.offline(true);
  await assert.rejects(f.engine.sync('2026-11-01')); const reloaded = f.create(); f.offline(false);
  await reloaded.sync('2026-11-01'); assert.equal(f.cells[5], 'Synthetic offline');
  assert.equal(f.writes.length, 1); assert.deepEqual(reloaded.dates(), []);
});
test('training edits arriving during a write remain pending', async () => {
  let engine; const f = fixture({duringWrite: () => engine.queue('2026-11-01', {notes: 'Newer edit'})}); engine = f.engine;
  engine.queue('2026-11-01', {notes: 'Original'}); await engine.sync('2026-11-01');
  assert.equal(f.cells[8], 'Original'); assert.equal(engine.state.outbox['2026-11-01'].notes.value, 'Newer edit');
});
for (const [name, options, pattern] of [
  ['duplicate dates', {dates: [[serial('2026-11-01')], [serial('2026-11-01')]]}, /Duplicate/],
  ['changed headers', {headers: ['Wrong']}, /columns changed/],
  ['date moved', {moved: true}, /verification failed/],
  ['formula target', {grid: [{}, {}, {}, {}, {}, {userEnteredValue: {formulaValue: '=1'}}]}, /formula/],
  ['invalid status dropdown', {grid: [{}, {}, {}, {}, {dataValidation: {condition: {type: 'ONE_OF_LIST', values: [{userEnteredValue: 'Skipped'}]}}}]}, /not allowed/]
]) test('training prevents writing for ' + name, async () => {
  const f = fixture(options); f.engine.queue('2026-11-01', {volume: 'Test', status: 'completed'});
  await assert.rejects(f.engine.sync('2026-11-01'), pattern); assert.equal(f.writes.length, 0); assert.equal(f.engine.dates().length, 1);
});
test('training migration skips legacy week keys and preserves existing cloud values', async () => {
  const f = fixture(); f.storage.setItem('hybrid400-session-log-w1d1', JSON.stringify({notes: 'Ambiguous'}));
  f.storage.setItem('hybrid400-session-log-v2:2026-11-01', JSON.stringify({volume: 'Device', notes: 'Dated'}));
  f.cells[5] = 'Cloud'; f.engine.migrate(f.storage, 'hybrid400-session-log-v2:'); await f.engine.sync('2026-11-01');
  assert.equal(f.cells[5], 'Cloud'); assert.equal(f.cells[8], 'Dated'); assert.ok(f.storage.getItem('hybrid400-session-log-w1d1'));
});
