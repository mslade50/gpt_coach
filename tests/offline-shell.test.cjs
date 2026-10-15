const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
function worker() {
  const listeners = {}, assets = [], matches = [], scope = 'https://example.com/gpt_coach/';
  const self = {location: {origin: 'https://example.com'}, registration: {scope}, addEventListener: (type, fn) => {listeners[type] = fn;}};
  vm.runInNewContext(fs.readFileSync(require.resolve('../nutrition-sw.js'), 'utf8'), {self, URL, Request: class {constructor(url) {this.url = url;}}, Response,
    fetch: async () => {throw new Error('offline');}, caches: {open: async name => ({addAll: async requests => assets.push(...requests.map(r => r.url)), match: async (url, options) => {matches.push({name, url: String(url), options}); return 'cached shell';}})}});
  const run = async (url, method = 'GET') => {let result; listeners.fetch({request: {url, method}, respondWith: value => {result = value;}, waitUntil() {}}); return result;};
  return {listeners, assets, matches, run, scope};
}
test('offline shell installs every existing public dashboard, dynamic workout, and logger asset', async () => {
  const f = worker(); let pending; f.listeners.install({waitUntil: value => {pending = value;}}); await pending;
  assert.ok(f.assets.includes('training-sync-core.js?v=20261015a'));
  for (const file of f.assets) assert.ok(fs.existsSync(path.join(__dirname, '..', file.split('?')[0])), file);
  const page = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  for (const [, src] of page.matchAll(/(?:src|href)="([^"?#]+\.(?:js|css))/g)) if (!src.startsWith('https:')) assert.ok(f.assets.some(file => file.split('?')[0] === src), src);
});
test('offline root URL uses the current dashboard cache and ignores old versions', async () => {
  const f = worker(); assert.equal(await f.run(f.scope), 'cached shell');
  assert.equal(f.matches[0].name, 'nutrition-shell-v6'); assert.equal(f.matches[0].url, f.scope + 'index.html');
  assert.equal(f.matches[0].options.ignoreSearch, true);
});
test('Google APIs, OAuth, private records, and POST requests are never handled by the offline cache', async () => {
  const f = worker();
  for (const url of ['https://sheets.googleapis.com/v4/spreadsheets/private', 'https://accounts.google.com/oauth', f.scope + 'private-records.json']) assert.equal(await f.run(url), undefined);
  assert.equal(await f.run(f.scope + 'index.html', 'POST'), undefined); assert.equal(f.matches.length, 0);
});
