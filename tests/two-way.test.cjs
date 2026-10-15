const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {createDevice} = require('./device-harness.cjs');
const base = require('../nutrition-sync-core.js');
const trainingCore = require('../training-sync-core.js');
const sources = Object.fromEntries(['nutrition-sync-core.js','training-sync-core.js','app.js','session-log.js','training-sync.js','nutrition.js','nutrition-sync.js'].map(name => [name, fs.readFileSync(path.join(__dirname, '..', name), 'utf8')]));
function cloud(training) {
  const core = training ? trainingCore : base, last = training ? 'K' : 'Q', name = training ? 'Training Log' : 'Daily Log';
  const rows = Array.from({length: 7}, (_, i) => [base.serial('2026-10-'+(25+i)), ...Array(training ? 10 : 16).fill('')]);
  const writes = [];
  const transport = async (url, init) => {
    if (url.includes('values:batchUpdate')) {
      const body = JSON.parse(init.body); writes.push(body.data);
      for (const item of body.data) {const address = item.range.split('!')[1]; rows[Number(address.slice(1))-2][address.charCodeAt(0)-65] = item.values[0][0];}
      return {};
    }
    if (url.includes('?ranges=')) return {sheets: [{data: [{rowData: [{values: []}]}]}]};
    if (!url.includes('/values/')) return {sheets: [{properties: {title: name, gridProperties: {rowCount: 8}}}]};
    const range = decodeURIComponent(new URL(url).pathname.split('/values/')[1]).split('!')[1];
    if (range === 'A1:'+last+'1') return {values: [core.headers]};
    if (range === 'A2:A8') return {values: rows.map(row => [row[0]])};
    if (range === 'A2:'+last+'8') return {values: rows.map(row => row.slice())};
    const found = range.match(/^A(\d+)(?::[KQ]\d+)?$/);
    if (found) return {values: [range.includes(':') ? rows[Number(found[1])-2].slice() : [rows[Number(found[1])-2][0]]]};
    throw new Error(range);
  };
  return {transport, rows, writes};
}
for (const training of [false, true]) {
  test((training ? 'training' : 'nutrition') + ': remembered sessions restore after reload and upload offline edits without another consent', async () => {
    const c = cloud(training); let restores = 0, connectCalls = 0, active = true;
    const connection = {restore: async () => {restores++; return active;}, request: c.transport, connect: async () => {connectCalls++;}, disconnect: async () => {active = false;}};
    const phone = createDevice(sources, {training, transport: c.transport, connection}); await phone.settled();
    assert.match(phone.status(), /History refreshed/);
    phone.input('notes', 'Phone record before reload'); await phone.save();
    const desktop = createDevice(sources, {training, transport: c.transport, connection}); await desktop.settled();
    assert.equal(desktop.value('notes'), 'Phone record before reload');
    phone.navigator.onLine = false; phone.input(training ? 'volume' : 'calories', training ? '5 mi easy' : '3900'); await phone.save();
    const reloaded = createDevice(sources, {training, transport: c.transport, connection, records: phone.records}); await reloaded.settled();
    await desktop.focus(); assert.equal(desktop.value(training ? 'volume' : 'calories'), training ? '5 mi easy' : '3900');
    assert.equal(restores, 3); assert.equal(connectCalls, 0);
    const disconnectId = training ? 'disconnectTrainingGoogle' : 'disconnectGoogle';
    reloaded.node(disconnectId).click(); await reloaded.settled();
    assert.match(reloaded.status(), /disconnected/);
    assert.equal(reloaded.value('notes'), 'Phone record before reload');
    assert.equal(c.rows[6][training ? 8 : 16], 'Phone record before reload');
  });
}
for (const training of [false, true]) {
  const kind = training ? 'training' : 'nutrition';
  test(kind + ': phone → Sheet → fresh desktop history → edit → phone → reload', async () => {
    const c = cloud(training), phone = createDevice(sources, {training, transport: c.transport});
    await phone.connect(); await phone.select('2026-10-30');
    phone.input(training ? 'volume' : 'calories', training ? '4 mi easy' : '4000'); await phone.save();
    await phone.select('2026-10-31'); phone.input('notes', 'Day two from phone'); await phone.save();
    if (training) await phone.check('warm-up', true);
    const desktop = createDevice(sources, {training, transport: c.transport}); await desktop.connect();
    assert.equal(desktop.value('notes'), 'Day two from phone');
    if (training) {
      assert.match(desktop.node('sessionTimeline').innerHTML, /data-complete="warm-up" checked/);
      assert.equal(desktop.node('trainingHistory').children.length, 2);
    } else assert.equal(desktop.node('calorieDays').textContent, '1 / 7');
    await desktop.select('2026-10-30'); assert.equal(desktop.value(training ? 'volume' : 'calories'), training ? '4 mi easy' : '4000');
    desktop.input('notes', 'Desktop addition'); await desktop.save(); await phone.focus(); await phone.select('2026-10-30');
    assert.equal(phone.value('notes'), 'Desktop addition');
    assert.equal(phone.value(training ? 'volume' : 'calories'), training ? '4 mi easy' : '4000');
    const reloaded = createDevice(sources, {training, transport: c.transport, records: desktop.records}); await reloaded.select('2026-10-30');
    assert.equal(reloaded.value('notes'), 'Desktop addition');
    assert.equal([...reloaded.records.values()].some(value => value.includes('synthetic-memory-only')), false);
  });
  test(kind + ': offline changes merge with edits to other fields without erasing phone records', async () => {
    const c = cloud(training), a = createDevice(sources, {training, transport: c.transport}), b = createDevice(sources, {training, transport: c.transport});
    await a.connect(); await b.connect(); a.navigator.onLine = false; a.input('notes', 'Offline note'); await a.save();
    b.input(training ? 'volume' : 'calories', training ? '5 mi' : '4100'); await b.save();
    a.navigator.onLine = true; await a.refresh(); await b.refresh();
    assert.equal(a.value(training ? 'volume' : 'calories'), training ? '5 mi' : '4100'); assert.equal(b.value('notes'), 'Offline note');
  });
  test(kind + ': same-field conflicts retain both versions until an explicit choice', async () => {
    const c = cloud(training), a = createDevice(sources, {training, transport: c.transport}), b = createDevice(sources, {training, transport: c.transport});
    await a.connect(); await b.connect(); a.navigator.onLine = false; a.input('notes', 'Desktop offline edit'); await a.save();
    b.input('notes', 'New phone entry'); await b.save(); a.navigator.onLine = true; await a.refresh();
    assert.match(a.status(), /Nothing overwritten/); assert.equal(c.rows[6][training ? 8 : 16], 'New phone entry');
    assert.equal(a.value('notes'), 'Desktop offline edit'); await a.resolve('sheet');
    assert.equal(a.value('notes'), 'New phone entry'); assert.equal(c.rows[6][training ? 8 : 16], 'New phone entry');
    assert.ok([...a.records.keys()].some(key => key.startsWith('become-fast-conflict-backup:')));
  });
  test(kind + ': unflushed input survives a history refresh and is still sent on save', async () => {
    const c = cloud(training), a = createDevice(sources, {training, transport: c.transport}), b = createDevice(sources, {training, transport: c.transport});
    await a.connect(); await b.connect(); a.input('notes', 'Still typing');
    b.input(training ? 'volume' : 'calories', training ? '3 mi' : '3900'); await b.save(); await a.refresh();
    assert.equal(a.value('notes'), 'Still typing'); await a.save(); await b.refresh(); assert.equal(b.value('notes'), 'Still typing');
  });
}
test('training unchecking and resetting sync exact checkbox state without marking completion', async () => {
  const c = cloud(true), a = createDevice(sources, {training: true, transport: c.transport}), b = createDevice(sources, {training: true, transport: c.transport});
  await a.connect(); await a.check('warm-up', true); await a.check('main-work', true); await b.connect();
  assert.match(b.node('sessionTimeline').innerHTML, /data-complete="main-work" checked/);
  await b.check('warm-up', false); await a.refresh(); assert.doesNotMatch(a.node('sessionTimeline').innerHTML, /data-complete="warm-up" checked/);
  b.node('resetProgress').click(); await b.save(); await a.refresh(); assert.doesNotMatch(a.node('sessionTimeline').innerHTML, / checked/);
  assert.equal(c.rows[6][4], ''); assert.equal(JSON.parse(c.rows[6][9]).checked.length, 0);
});

for (const training of [false, true]) {
  test((training ? 'training' : 'nutrition') + ': periodic refresh imports another device without uploading downloaded data', async () => {
    const c = cloud(training), a = createDevice(sources, {training, transport: c.transport}), b = createDevice(sources, {training, transport: c.transport});
    await a.connect(); b.input('notes', 'Phone before connecting'); await b.save(); await b.connect();
    const writes = c.writes.length;
    const poll = [...a.timers.values()].find(timer => timer.delay === 30000); assert.ok(poll); await poll.fn();
    assert.equal(a.value('notes'), 'Phone before connecting'); assert.equal(c.writes.length, writes);
  });
  test((training ? 'training' : 'nutrition') + ': explicit keep-device choice resolves only the conflicting field', async () => {
    const c = cloud(training), a = createDevice(sources, {training, transport: c.transport}), b = createDevice(sources, {training, transport: c.transport});
    await a.connect(); await b.connect(); a.navigator.onLine = false; a.input('notes', 'Device version'); await a.save();
    b.input('notes', 'Phone version'); b.input(training ? 'volume' : 'calories', training ? '5 mi' : '4200'); await b.save();
    a.navigator.onLine = true; await a.refresh(); await a.resolve('device'); await b.refresh();
    assert.equal(b.value('notes'), 'Device version'); assert.equal(b.value(training ? 'volume' : 'calories'), training ? '5 mi' : '4200');
  });
}
test('existing readable training checklists restore without changing the Sheet', async () => {
  const c = cloud(true); c.rows[6][9] = '1 of 2 checked: Warm-up';
  const a = createDevice(sources, {training: true, transport: c.transport}); await a.connect();
  assert.match(a.node('sessionTimeline').innerHTML, /data-complete="warm-up" checked/); assert.equal(c.writes.length, 0);
});
