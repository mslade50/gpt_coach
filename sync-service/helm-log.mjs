// Server-side port of the Engine.sync checks for the owner-only Helm route (POST /helm/log).
// Pure logic: the caller supplies `request(payload)`, which already enforces the Sheet allow-list
// and carries the Google bearer token. Nothing here touches D1.
const encoder = new TextEncoder();
const b64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes))).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
const unb64 = value => Uint8Array.from(atob(value.replaceAll('-', '+').replaceAll('_', '/')), c => c.charCodeAt(0));
const sha256 = async value => b64(await crypto.subtle.digest('SHA-256', encoder.encode(value)));

export const WINDOW_MS = 90000;
export const STATUSES = ['Completed as prescribed', 'Completed with modification', 'Partially completed', 'Skipped'];
export const SHEETS = {
  daily: {
    name: 'Daily Log', last: 'Q',
    columns: {weight: 'B', calories: 'C', sleep: 'F', protein: 'H', readiness: 'P', notes: 'Q'},
    numeric: ['weight', 'calories', 'sleep', 'protein', 'readiness'],
    headers: ['Date', 'AM weight (lb)', 'Calories', 'Walk-only steps', 'Run miles', 'Sleep (hrs)', 'Training type', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Fiber (g)', 'Intra carb (g)', 'Restaurant?', 'Lift (min)', 'Bike/row (min)', 'Readiness (1–5)', 'Notes']
  },
  training: {
    name: 'Training Log', last: 'K',
    columns: {week: 'B', day: 'C', purpose: 'D', status: 'E', volume: 'F', notes: 'I'},
    numeric: ['week', 'day'],
    headers: ['Date', 'Program week', 'Day', 'Session', 'Status', 'Run / total volume', 'Timed reps / intervals', 'Main lift(s)', 'Notes', 'Checklist', 'Updated at (UTC)']
  }
};

export function serial(date) {
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date + 'T00:00:00Z').toISOString().slice(0, 10) !== date) throw new RangeError('Invalid date.');
  return (Date.parse(date + 'T00:00:00Z') - Date.UTC(1899, 11, 30)) / 86400000;
}

// HMAC-SHA256 over METHOD \n PATH \n X-Time \n sha256(body). Returns a base64url signature.
export async function sign(secret, method, path, time, body) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return b64(await crypto.subtle.sign('HMAC', key, encoder.encode([method, path, time, await sha256(body)].join('\n'))));
}
// crypto.subtle.verify compares in constant time.
export async function verifySignature(secret, method, path, time, body, signature, now = Date.now()) {
  if (!secret || !/^\d{13}$/.test(time || '') || Math.abs(now - Number(time)) > WINDOW_MS || !/^[\w-]{43}$/.test(signature || '')) return false;
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['verify']);
  try {
    return await crypto.subtle.verify('HMAC', key, unb64(signature), encoder.encode([method, path, time, await sha256(body)].join('\n')));
  } catch { return false; }
}

// Returns {date, groups:{daily?,training?}} or throws RangeError with a plain message.
export function parseBody(text) {
  let body;
  try { body = JSON.parse(text); } catch { throw new RangeError('Invalid JSON.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RangeError('Invalid body.');
  serial(body.date);
  const groups = {};
  for (const [group, spec] of Object.entries(SHEETS)) {
    const input = body[group];
    if (input == null) continue;
    if (typeof input !== 'object' || Array.isArray(input)) throw new RangeError('Invalid ' + group + '.');
    const fields = {};
    for (const [key, raw] of Object.entries(input)) {
      if (!spec.columns[key]) throw new RangeError('Unknown field ' + group + '.' + key + '.');
      if (raw == null || String(raw).trim() === '') continue;
      fields[key] = {raw};
    }
    groups[group] = fields;
  }
  return {date: body.date, groups};
}

function normalise(group, key, raw) {
  const spec = SHEETS[group];
  if (spec.numeric.includes(key)) {
    const value = typeof raw === 'number' ? raw : (typeof raw === 'string' && raw.trim() !== '' ? Number(raw) : NaN);
    if (!Number.isFinite(value) || value < 0) return {error: 'invalid'};
    return {value};
  }
  const value = String(raw).trim();
  if (value.length > 12000) return {error: 'invalid'};
  if (group === 'training' && key === 'status' && !STATUSES.includes(value)) return {error: 'invalid'};
  return {value};
}

function same(value, cell) {
  if (typeof value === 'number') return Number(cell) === value && String(cell).trim() !== '';
  return String(cell) === value;
}

function validationProblem(rule, value) {
  if (!rule) return null;
  if (rule.type === 'ONE_OF_LIST') return rule.values?.some(item => item.userEnteredValue === String(value)) ? null : 'dropdown';
  if (rule.type === 'ONE_OF_RANGE') return 'dropdown';
  if (rule.type === 'NUMBER_BETWEEN') {
    const [low, high] = (rule.values || []).map(item => Number(item.userEnteredValue));
    return typeof value === 'number' && value >= low && value <= high ? null : 'dropdown';
  }
  return null;
}

const skipAll = (fields, reason) => Object.fromEntries(Object.keys(fields).map(key => [key, {status: 'skipped', reason}]));

async function applyOne(group, date, fields, request, spreadsheetId) {
  const spec = SHEETS[group];
  const base = 'https://sheets.googleapis.com/v4/spreadsheets/' + encodeURIComponent(spreadsheetId);
  const values = async range => (await request({url: base + '/values/' + encodeURIComponent("'" + spec.name + "'!" + range) + '?valueRenderOption=UNFORMATTED_VALUE', method: 'GET'})).values;
  const meta = await request({url: base + '?fields=sheets.properties', method: 'GET'});
  const sheet = meta.sheets?.find(s => s.properties?.title === spec.name)?.properties;
  if (!sheet || !(sheet.gridProperties?.rowCount <= 10000)) return skipAll(fields, 'sheet_missing');
  const head = (await values('A1:' + spec.last + '1'))?.[0] || [];
  if (spec.headers.some((value, index) => head[index] !== value)) return skipAll(fields, 'header_changed');
  const target = serial(date);
  const dates = (await values('A2:A' + sheet.gridProperties.rowCount)) || [];
  const matches = dates.flatMap((row, i) => (row[0] === target || row[0] === date) ? [i + 2] : []);
  if (matches.length === 0) return skipAll(fields, 'no_date_row');
  if (matches.length > 1) return skipAll(fields, 'duplicate_date_rows');
  const row = matches[0];
  const cells = (await values('A' + row + ':' + spec.last + row))?.[0] || [];
  if (cells[0] !== target && cells[0] !== date) return skipAll(fields, 'date_moved');
  const grid = await request({url: base + '?ranges=' + encodeURIComponent("'" + spec.name + "'!A" + row + ':' + spec.last + row) + '&fields=' + encodeURIComponent('sheets.data.rowData.values(userEnteredValue,dataValidation)'), method: 'GET'});
  const meta2 = grid.sheets?.[0]?.data?.[0]?.rowData?.[0]?.values || [];
  const result = {}, updates = [];
  for (const [key, {raw}] of Object.entries(fields)) {
    const col = spec.columns[key], index = col.charCodeAt(0) - 65;
    const {value, error} = normalise(group, key, raw);
    if (error) { result[key] = {status: 'skipped', reason: error}; continue; }
    if (meta2[index]?.userEnteredValue?.formulaValue != null) { result[key] = {status: 'skipped', reason: 'formula'}; continue; }
    const cell = cells[index];
    if (cell != null && cell !== '') {
      result[key] = same(value, cell) ? {status: 'unchanged'} : {status: 'conflict', sheet: cell};
      continue;
    }
    const problem = validationProblem(meta2[index]?.dataValidation?.condition, value);
    if (problem) { result[key] = {status: 'skipped', reason: problem}; continue; }
    updates.push({key, index, value, range: "'" + spec.name + "'!" + col + row});
  }
  if (updates.length) {
    // Recheck the date immediately before writing; RAW keeps text literal.
    const again = (await values('A' + row))?.[0]?.[0];
    if (again !== target && again !== date) {
      for (const u of updates) result[u.key] = {status: 'skipped', reason: 'date_moved'};
      return result;
    }
    await request({url: base + '/values:batchUpdate', method: 'POST', body: JSON.stringify({valueInputOption: 'RAW', data: updates.map(u => ({range: u.range, values: [[u.value]]}))})});
    const check = (await values('A' + row + ':' + spec.last + row))?.[0] || [];
    const stillHere = check[0] === target || check[0] === date;
    for (const u of updates) result[u.key] = stillHere && same(u.value, check[u.index]) ? {status: 'written'} : {status: 'skipped', reason: 'unconfirmed'};
  }
  return result;
}

// request(payload) -> parsed JSON; throws on transport or Google failure (caller maps to 5xx so Helm retries).
export async function applyHelmLog(text, request, spreadsheetId) {
  const {date, groups} = parseBody(text);
  const out = {date, results: {}};
  for (const [group, fields] of Object.entries(groups)) {
    if (!Object.keys(fields).length) continue;
    out.results[group] = await applyOne(group, date, fields, request, spreadsheetId);
  }
  return out;
}
