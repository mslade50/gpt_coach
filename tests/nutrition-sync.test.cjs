const { test } = require('node:test');
const assert = require('node:assert/strict');
const { Engine, headers, serial } = require('../nutrition-sync-core.js');
class Storage {
  constructor() { this.data = new Map(); }
  get length() { return this.data.size; }
  key(i) { return [...this.data.keys()][i]; }
  getItem(key) { return this.data.get(key) ?? null; }
  setItem(key, value) { this.data.set(key, value); }
}
function fixture(options = {}) {
  const storage = options.storage || new Storage();
  const row = options.row || 7;
  const cells = [serial('2026-10-09'), ...Array(16).fill('')];
  const dateRows = Array.from({ length: row - 2 }, () => [0]).concat([[cells[0]]]);
  const writes = [];
  let fail = false;
  const request = async (url, init) => {
    if (fail) throw new Error('offline');
    if (url.includes('values:batchUpdate')) {
      const body = JSON.parse(init.body);
      assert.equal(body.valueInputOption, 'RAW');
      writes.push(body.data);
      for (const update of body.data) {
        const address = update.range.split('!')[1];
        assert.equal(Number(address.slice(1)), row);
        cells[address.charCodeAt(0) - 65] = update.values[0][0];
      }
      if (options.duringWrite) options.duringWrite();
      return {};
    }
    const parsed = new URL(url);
    if (parsed.searchParams.has('ranges')) return { sheets: [{ data: [{ rowData: [{ values: options.grid || [] }] }] }] };
    if (!url.includes('/values/')) return { sheets: [{ properties: { title: 'Daily Log', gridProperties: { rowCount: 120 } } }] };
    const range = decodeURIComponent(parsed.pathname.split('/values/')[1]).split('!')[1];
    if (range === 'A1:Q1') return { values: [options.headers || headers] };
    if (range === 'A2:A120') return { values: options.dateRows || dateRows };
    if (range === 'A' + row) return { values: [[options.moved ? 0 : cells[0]]] };
    if (range === 'A' + row + ':Q' + row) return { values: [options.unconfirmed && writes.length ? [cells[0]] : cells.slice()] };
    throw new Error('Unexpected range ' + range);
  };
  const engine = new Engine({ spreadsheetId: 'test-sheet', storage, request });
  return { engine, storage, request, cells, writes, setOffline: value => { fail = value; } };
}
test('morning, evening, and edit share the actual date row and preserve untouched fields and zero', async () => {
  const f = fixture();
  f.engine.queue('2026-10-09', { weight: '201.2', sleep: '7.5' });
  assert.equal(await f.engine.sync('2026-10-09'), 7);
  f.cells[1] = 202; // A newer change made in Sheets from another device.
  f.engine.queue('2026-10-09', { calories: '4000', protein: '170', carbs: '500', fat: '130', fiber: '35', steps: '8000', miles: '0', training: 'Rest', notes: '=literal notes' });
  await f.engine.sync('2026-10-09');
  f.engine.queue('2026-10-09', { calories: '4100', weight: '', notes: '' });
  await f.engine.sync('2026-10-09');
  assert.equal(f.cells[1], 202);
  assert.equal(f.cells[2], 4100);
  assert.equal(f.cells[4], 0);
  assert.equal(f.cells[5], 7.5);
  assert.equal(f.cells[16], '=literal notes');
  assert.equal(f.writes[2].length, 1);
  assert.deepEqual(f.engine.dates(), []);
});
test('failed changes survive reload and retry without duplicate rows', async () => {
  const f = fixture();
  f.engine.queue('2026-10-09', { calories: '3900' });
  f.setOffline(true);
  await assert.rejects(f.engine.sync('2026-10-09'));
  const reloaded = new Engine({ spreadsheetId: 'test-sheet', storage: f.storage, request: f.request });
  assert.deepEqual(reloaded.dates(), ['2026-10-09']);
  f.setOffline(false);
  await reloaded.sync('2026-10-09');
  assert.equal(f.cells[2], 3900);
  assert.equal(f.writes.length, 1);
});
test('an edit during an in-flight write is not acknowledged or lost', async () => {
  let engine;
  const f = fixture({ duringWrite: () => engine.queue('2026-10-09', { calories: '4200' }) });
  engine = f.engine;
  engine.queue('2026-10-09', { calories: '4000' });
  await engine.sync('2026-10-09');
  assert.equal(f.cells[2], 4000);
  assert.equal(engine.state.outbox['2026-10-09'].calories.value, 4200);
});
test('legacy entries fill only missing cloud cells and migrate once', async () => {
  const f = fixture();
  f.cells[1] = 205;
  f.storage.setItem('local:2026-10-09', JSON.stringify({ weight: '200', calories: '4000' }));
  f.engine.migrate(f.storage, 'local:');
  await f.engine.sync('2026-10-09');
  f.engine.migrate(f.storage, 'local:');
  assert.equal(f.cells[1], 205);
  assert.equal(f.cells[2], 4000);
  assert.deepEqual(f.engine.dates(), []);
});
for (const [name, options, message] of [
  ['changed headers', { headers: ['Wrong'] }, /columns changed/],
  ['duplicate dates', { dateRows: [[serial('2026-10-09')], [serial('2026-10-09')]] }, /Duplicate/],
  ['missing date', { dateRows: [[0]] }, /missing/],
  ['date moves before write', { moved: true }, /verification failed/],
  ['formula in editable column', { grid: [{}, { userEnteredValue: { formulaValue: '=200' } }] }, /formula/],
  ['disallowed dropdown value', { grid: [{}, {}, {}, {}, {}, {}, { dataValidation: { condition: { type: 'ONE_OF_LIST', values: [{ userEnteredValue: 'Rest' }] } } }] }, /not allowed/]
]) test(name + ' prevents writing and retains queue', async () => {
  const f = fixture(options);
  f.engine.queue('2026-10-09', { weight: '201', training: 'Other' });
  await assert.rejects(f.engine.sync('2026-10-09'), message);
  assert.equal(f.writes.length, 0);
  assert.equal(f.engine.dates().length, 1);
});
test('unconfirmed write stays pending for idempotent retry', async () => {
  const f = fixture({ unconfirmed: true });
  f.engine.queue('2026-10-09', { weight: '201' });
  await assert.rejects(f.engine.sync('2026-10-09'), /confirmed/);
  assert.equal(f.engine.dates().length, 1);
});
test('training labels map to the actual Sheet dropdown options', () => {
  const f = fixture();
  f.engine.queue('2026-10-09', { training: 'Threshold + strength' });
  assert.equal(f.engine.state.outbox['2026-10-09'].training.value, 'Run + strength');
});
test('invalid calendar dates and nonfinite numeric entries are rejected', () => {
  const f = fixture();
  assert.throws(() => f.engine.queue('2026-02-30', { calories: '100' }));
  assert.throws(() => f.engine.queue('2026-10-09', { calories: 'NaN' }));
});
test('an invalid field does not lose valid sibling edits', () => {
  const f = fixture();
  assert.throws(() => f.engine.queue('2026-10-09', { weight: '201', calories: '-1' }));
  const reloaded = new Engine({ spreadsheetId: 'test-sheet', storage: f.storage, request: f.request });
  assert.equal(reloaded.state.outbox['2026-10-09'].weight.value, 201);
  assert.equal(reloaded.state.outbox['2026-10-09'].calories, undefined);
});
