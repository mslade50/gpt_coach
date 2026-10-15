const {test} = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
function app(time) {
  let now = time; const nodes = new Map(), intervals = [], listeners = {};
  const get = id => {
    if (!nodes.has(id)) nodes.set(id, {textContent: '', value: '', innerHTML: '', style: {}, listeners: {}, addEventListener(type, fn) {this.listeners[type] = fn;}, setAttribute() {}, scrollIntoView() {}, querySelectorAll: () => []});
    return nodes.get(id);
  };
  const window = {WEEK_PLANS: Array.from({length: 14}, (_, i) => ({week: i+1, blockWeekLabel: i === 11 ? 'A WEEK 1' : undefined, days: Array.from({length: 7}, (_, day) => ({day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day], title: 'Synthetic workout', type: 'Low', status: 'Planned', volume: 'Test', detail: 'Test'}))})), localStorage: {getItem: () => null, setItem() {}}, dispatchEvent() {}};
  class Clock extends Date {constructor(...args) {super(...(args.length ? args : [now]));}}
  window.addEventListener = (type, fn) => {listeners[type] = fn;};
  vm.runInNewContext(fs.readFileSync(require.resolve('../app.js'), 'utf8'), {window, document: {getElementById: get, addEventListener: (type, fn) => {listeners[type] = fn;}}, Date: Clock, Intl, setInterval: fn => intervals.push(fn), CustomEvent: class {constructor(type, init) {this.type = type; this.detail = init.detail;}}});
  return {window, get, tick: value => {now = value; intervals[0]();}};
}
test('training Today follows Eastern midnight even when the device calendar is on the next day', () => {
  const f = app('2026-10-13T03:59:00Z');
  assert.equal(f.window.TrainingSession.isoDate, '2026-10-12'); assert.equal(f.window.TrainingSession.week, 12);
  f.tick('2026-10-13T04:01:00Z'); assert.equal(f.window.TrainingSession.isoDate, '2026-10-13');
});
test('training manually selected dates stay selected through rollover', () => {
  const f = app('2026-10-13T03:59:00Z'); f.get('previousSession').listeners.click();
  assert.equal(f.window.TrainingSession.isoDate, '2026-10-11'); f.tick('2026-10-13T04:01:00Z');
  assert.equal(f.window.TrainingSession.isoDate, '2026-10-11'); f.get('todaySession').listeners.click();
  assert.equal(f.window.TrainingSession.isoDate, '2026-10-13');
});
test('training date uses Eastern standard time on the final program day', () => {
  const f = app('2026-11-02T04:30:00Z'); assert.equal(f.window.TrainingSession.isoDate, '2026-11-01');
});
