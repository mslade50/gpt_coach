// Two independent browser-like contexts running the actual production scripts.
// transport is injectable so the same round trip can run against a real private Sheet.
function createDevice(sources, {training = false, transport, records = new Map(), date = '2026-10-31T12:00:00Z', connection} = {}) {
  class Events {
    constructor() {this.listeners = {};}
    addEventListener(type, fn) {(this.listeners[type] ||= []).push(fn);}
    dispatchEvent(event) {for (const fn of this.listeners[event.type] || []) fn(event);}
  }
  const waiters = [];
  const notify = () => {for (const resolve of waiters.splice(0)) resolve();};
  class Element extends Events {
    constructor() {super(); this.value = ''; this.textContent = ''; this.innerHTML = ''; this.dataset = {}; this.style = {}; this.children = []; this.hidden = false;}
    set disabled(value) {this._disabled = value; notify();}
    get disabled() {return this._disabled;}
    click() {this.dispatchEvent({type: 'click'});}
    setAttribute() {}
    scrollIntoView() {}
    replaceChildren(...items) {this.children = items;}
    append(...items) {this.children.push(...items);}
    appendChild(item) {this.children.push(item);}
    get childElementCount() {return this.children.length;}
    querySelectorAll() {return [];}
  }
  const nodes = new Map(), fields = new Map(), timers = new Map();
  const node = id => {if (!nodes.has(id)) nodes.set(id, new Element()); return nodes.get(id);};
  const field = name => {if (!fields.has(name)) fields.set(name, new Element()); return fields.get(name);};
  const storage = {get length() {return records.size;}, key: i => [...records.keys()][i], getItem: key => records.get(key) ?? null, setItem: (key, value) => records.set(key, value), removeItem: key => records.delete(key)};
  const window = new Events(), document = new Events();
  Object.assign(document, {getElementById: node, createElement: () => new Element(), hidden: false});
  const form = node('nutritionForm'); form.elements = {namedItem: field}; form.reset = () => {for (const element of fields.values()) element.value = '';};
  const navigator = {onLine: true};
  class Clock extends Date {constructor(...args) {super(...(args.length ? args : [date]));} static now() {return new Date(date).getTime();}}
  const setTimeout = (fn, delay) => {const key = Symbol(); timers.set(key, {fn, delay}); return key;};
  const clearTimeout = key => timers.delete(key);
  Object.assign(window, {localStorage: storage, setTimeout, clearTimeout, confirm: () => true, requestAnimationFrame: fn => fn()});
  let sequence = 0, oauth, inflight = 0;
  const globals = {window, document, localStorage: storage, navigator, Date: Clock, Intl,
    setTimeout, clearTimeout, setInterval() {}, location: {protocol: 'https:'},
    MutationObserver: class {observe() {}}, CustomEvent: class {constructor(type, init) {this.type = type; this.detail = init?.detail;}},
    AbortController: class {constructor() {this.signal = {};} abort() {}}, confirm: () => true,
    crypto: {randomUUID: () => 'synthetic-device-' + (++sequence) + '-' + Math.random()}, structuredClone: value => JSON.parse(JSON.stringify(value)),
    fetch: async (url, init) => {inflight++; try {const result = await transport(url, init); return {ok: true, status: 200, json: async () => result};} finally {inflight--; notify();}}
  };
  const run = (name, extra = {}) => {const scope = {...globals, ...extra}; new Function(...Object.keys(scope), sources[name])(...Object.values(scope));};
  const base = {exports: {}}; run('nutrition-sync-core.js', {module: base}); window.NutritionSyncCore = base.exports;
  if (training) {
    const module = {exports: {}}; run('training-sync-core.js', {module, require: () => base.exports}); window.TrainingSyncCore = module.exports;
    window.WEEK_PLANS = Array.from({length: 14}, (_, i) => ({week: i+1, days: Array.from({length: 7}, (_, day) => ({day: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][day], title: 'Synthetic test session', type: 'Low', status: 'Planned', volume: 'Test', detail: 'Test'}))}));
    window.SESSION_PLANS = Object.fromEntries(Array.from({length: 98}, (_, i) => ['w'+(Math.floor(i/7)+1)+'d'+(i%7+1), {purpose: 'Synthetic test session', blocks: [{name: 'Test block', items: [{id: 'warm-up', name: 'Warm-up', dosage: 'Test'}, {id: 'main-work', name: 'Main work', dosage: 'Test'}]}]}]));
    run('app.js'); run('session-log.js'); run('training-sync.js');
  } else run('nutrition.js');
  globals.google = window.google = {accounts: {oauth2: {initTokenClient(options) {oauth = options; return {requestAccessToken() {}};}, hasGrantedAllScopes: () => true}}};
  if (connection) window.GoogleConnection = {create: () => connection};
  run('nutrition-sync.js');
  const id = name => training ? window.TrainingSyncConfig.ids[name] || name : name;
  async function settled() {
    for (let i = 0; i < 1000; i++) {
      if (!node(id('connectGoogle')).disabled && !inflight) {await Promise.resolve(); return;}
      await new Promise(resolve => waiters.push(resolve));
    }
    throw new Error('Device did not settle');
  }
  const select = async iso => {
    if (training) window.dispatchEvent({type: 'training:open-date', detail: {date: iso}});
    else {node('entryDate').value = iso; node('entryDate').dispatchEvent({type: 'change'});}
    await settled();
  };
  const input = (name, value) => {
    const element = training ? node({status: 'logStatus', volume: 'logVolume', times: 'logTimes', lift: 'logLift', notes: 'logNotes'}[name]) : field(name);
    element.value = value;
    node(training ? 'sessionLogForm' : 'nutritionForm').dispatchEvent({type: 'input', target: element});
  };
  return {window, document, node, field, records, timers, navigator, storage, select, input, settled,
    value: name => training ? node({status: 'logStatus', volume: 'logVolume', times: 'logTimes', lift: 'logLift', notes: 'logNotes'}[name]).value : field(name).value,
    connect: async () => {node(id('connectGoogle')).click(); await oauth.callback({access_token: 'synthetic-memory-only', expires_in: 3600});},
    save: async () => {node(id('saveEntry')).click(); await settled();},
    refresh: async () => {node(id('connectGoogleTop')).click(); await settled();},
    focus: async () => {window.dispatchEvent({type: 'focus'}); await settled();},
    check: async (item, checked) => {node('sessionTimeline').dispatchEvent({type: 'change', target: {closest: () => ({dataset: {complete: item}, checked})}}); node('saveTrainingLog').click(); await settled();},
    resolve: async choice => {node(id(choice === 'sheet' ? 'useSheetConflict' : 'keepDeviceConflict')).click(); await settled();},
    status: () => node(id('cloudSyncStatus')).textContent
  };
}
if (typeof module !== 'undefined') module.exports = {createDevice};
