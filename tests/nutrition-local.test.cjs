const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function app(time = '2026-10-10T03:59:00Z') {
  let now = time;
  const intervals = [], timers = new Map(), records = new Map(), events = [];
  function element() { return { value: '', textContent: '', listeners: {}, addEventListener(type, fn) { this.listeners[type] = fn; }, append() {}, appendChild() {}, replaceChildren() {}, remove() {} }; }
  const ids = new Map();
  const get = id => { if (!ids.has(id)) ids.set(id, element()); return ids.get(id); };
  const fields = new Map();
  const field = name => { if (!fields.has(name)) fields.set(name, element()); return fields.get(name); };
  const form = get('nutritionForm');
  form.elements = { namedItem: field };
  form.reset = () => { for (const el of fields.values()) el.value = ''; };
  const document = { getElementById: get, createElement: element, hidden: false, listeners: {}, addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); } };
  const window = { listeners: {}, addEventListener(type, fn) { (this.listeners[type] ||= []).push(fn); }, dispatchEvent(event) { events.push(event); for (const fn of this.listeners[event.type] || []) fn(event); } };
  const storage = { getItem: key => records.get(key) || null, setItem: (key,value) => records.set(key,value), removeItem: key => records.delete(key) };
  class Clock extends Date { constructor(...args) { super(...(args.length ? args : [now])); } }
  vm.runInNewContext(fs.readFileSync(require.resolve('../nutrition.js'), 'utf8'), {
    document, window, localStorage: storage, Date: Clock, Intl, navigator: {}, confirm: () => true,
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init.detail; } },
    setTimeout: fn => { const id = Symbol(); timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id), setInterval: fn => intervals.push(fn)
  });
  const click = id => get(id).listeners.click();
  return { get, field, events, records, document, window, click, intervals, setNow: value => { now = value; }, input: name => form.listeners.input({ target: field(name) }) };
}
test('Eastern date rolls at Eastern midnight and saves pending fields to the original day', () => {
  const f = app();
  assert.equal(f.get('entryDate').value, '2026-10-09');
  f.field('weight').value = '201.2'; f.input('weight');
  f.setNow('2026-10-10T04:01:00Z'); f.intervals[0]();
  assert.equal(f.get('entryDate').value, '2026-10-10');
  assert.equal(JSON.parse(f.records.get('become-fast-nutrition-v1:2026-10-09')).weight, '201.2');
  assert.equal(f.field('weight').value, '');
});
test('an explicitly selected older date stays selected at midnight', () => {
  const f = app(); f.click('previousDay');
  f.setNow('2026-10-10T04:01:00Z'); f.intervals[0]();
  assert.equal(f.get('entryDate').value, '2026-10-08');
});
test('evening edits emit only changed filled fields; blank fields never request deletion', () => {
  const f = app();
  f.field('weight').value = '201'; f.click('saveEntry');
  f.field('calories').value = '4000'; f.click('saveEntry');
  assert.deepEqual(JSON.parse(JSON.stringify(f.events.filter(e => e.type === 'nutrition:local-saved').at(-1).detail.changes)), { calories: '4000' });
  f.field('weight').value = ''; f.click('saveEntry');
  assert.deepEqual(JSON.parse(JSON.stringify(f.events.filter(e => e.type === 'nutrition:local-saved').at(-1).detail.changes)), {});
});
test('cloud hydration preserves unflushed edits and queued fields', () => {
  const f = app();
  f.field('weight').value = '201'; f.click('saveEntry');
  f.field('calories').value = '4100'; f.input('calories');
  f.window.dispatchEvent({ type: 'nutrition:cloud-loaded', detail: { date: '2026-10-09', entry: { weight: '205', sleep: '8', calories: '3900' }, pending: ['weight'] } });
  assert.equal(f.field('weight').value, '201');
  assert.equal(f.field('calories').value, '4100');
  assert.equal(f.field('sleep').value, '8');
});
test('clear local copy emits cancellation without a cloud deletion', () => {
  const f = app(); f.field('weight').value = '201'; f.click('saveEntry'); f.click('clearEntry');
  assert.equal(f.records.has('become-fast-nutrition-v1:2026-10-09'), false);
  assert.equal(f.events.at(-2).type, 'nutrition:local-cleared');
});
test('Eastern date uses standard time after the DST transition', () => {
  const f = app('2026-11-02T04:30:00Z');
  assert.equal(f.get('entryDate').value, '2026-11-01');
  f.setNow('2026-11-02T05:01:00Z'); f.intervals[0]();
  assert.equal(f.get('entryDate').value, '2026-11-02');
});
