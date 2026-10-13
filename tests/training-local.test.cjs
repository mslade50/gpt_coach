const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
function setup() {
  const nodes = new Map(), records = new Map(), events = [], timers = new Map();
  const get = id => {
    if (!nodes.has(id)) nodes.set(id, {value: '', textContent: '', listeners: {}, addEventListener(type, fn) {this.listeners[type] = fn;}});
    return nodes.get(id);
  };
  const window = {localStorage: {get length() {return records.size;}, key: i => [...records.keys()][i], getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value), removeItem: key => records.delete(key)},
    listeners: {}, addEventListener(type, fn) {this.listeners[type] = fn;}, dispatchEvent(event) {events.push(event); return this.listeners[event.type]?.(event);},
    setTimeout: fn => {const id = Symbol(); timers.set(id, fn); return id;}, clearTimeout: id => timers.delete(id), confirm: () => true,
    TrainingSession: {key: '2026-10-12', isoDate: '2026-10-12', week: 12, day: 1, purpose: 'Actual program session', date: 'Mon, Oct 12'}};
  get('session-title').textContent = 'A WEEK 1 · Day 1';
  const document = {getElementById: get, addEventListener() {}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../session-log.js'), 'utf8'), {window, document, navigator: {}, Date, Intl,
    MutationObserver: class {observe() {}}, CustomEvent: class {constructor(type, init) {this.type = type; this.detail = init.detail;}}});
  const input = (id, value) => {get(id).value = value; get('sessionLogForm').listeners.input();};
  const save = () => get('saveTrainingLog').listeners.click();
  const changes = () => events.filter(e => e.type === 'training:local-saved').at(-1)?.detail;
  const cloud = (entry, pending = []) => window.dispatchEvent({type: 'training:cloud-loaded', detail: {date: window.TrainingSession.isoDate, entry, pending}});
  return {get, window, records, events, input, save, changes, cloud};
}
test('training uses actual date and program week rather than repeating block week', () => {
  const f = setup(); f.input('logVolume', '4 mi'); f.save();
  assert.equal(f.changes().date, '2026-10-12'); assert.equal(f.changes().changes.week, 12);
  assert.equal(JSON.parse(f.records.get('hybrid400-session-log-v2:2026-10-12')).volume, '4 mi');
});
test('session navigation flushes pending edits to the original date', () => {
  const f = setup(); f.input('logNotes', 'Original day');
  f.window.TrainingSession = {key: '2026-10-13', isoDate: '2026-10-13', week: 12, day: 2};
  f.window.dispatchEvent({type: 'training:context'});
  assert.equal(f.changes().date, '2026-10-12'); assert.equal(f.get('logNotes').value, '');
});
test('later training edits only send changed, filled fields', () => {
  const f = setup(); f.input('logVolume', '4 mi'); f.save(); f.input('logNotes', 'Later note'); f.save();
  assert.equal(f.changes().changes.volume, undefined); assert.equal(f.changes().changes.notes, 'Later note');
  const before = f.events.filter(e => e.type === 'training:local-saved').length;
  f.input('logVolume', ''); f.save(); assert.equal(f.events.filter(e => e.type === 'training:local-saved').length, before);
});
test('cloud hydration preserves pending edits and merges clean siblings into the save', () => {
  const f = setup(); f.input('logNotes', 'Unflushed');
  f.cloud({notes: 'Cloud note', volume: 'Cloud volume', checklist: '1 of 2 checked'});
  assert.equal(f.get('logNotes').value, 'Unflushed'); assert.equal(f.get('logVolume').value, 'Cloud volume'); f.save();
  assert.equal(f.changes().changes.notes, 'Unflushed'); assert.equal(f.changes().changes.volume, undefined); assert.equal(f.changes().changes.checklist, undefined);
  assert.equal(JSON.parse(f.records.get('hybrid400-session-log-v2:2026-10-12')).checklist, '1 of 2 checked');
});
test('checklist sync does not claim a completed workout', () => {
  const f = setup(); f.window.dispatchEvent({type: 'training:checklist-changed', detail: {date: '2026-10-12', checklist: '1 of 3 checked: Warm-up'}}); f.save();
  assert.equal(f.changes().changes.checklist, '1 of 3 checked: Warm-up'); assert.equal(f.changes().changes.status, undefined);
});
test('pagehide flushes pending saves; clear cancels queue without cloud deletion', () => {
  const f = setup(); f.input('logNotes', 'Pending'); f.window.dispatchEvent({type: 'pagehide'});
  assert.equal(f.changes().changes.notes, 'Pending'); f.get('clearSessionLog').listeners.click();
  assert.equal(f.records.size, 0); assert.equal(f.events.at(-1).type, 'training:local-cleared');
});
