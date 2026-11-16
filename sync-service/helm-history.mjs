// Read-only history export for Helm (POST /helm/history). Pure logic: the caller supplies `request(url)`, which
// returns parsed JSON for a Google Sheets GET. Nothing here writes to the Sheet or to D1.
import {SHEETS} from './helm-log.mjs';

export const MAX_DAYS = 400, DEFAULT_DAYS = 180;
const FIELDS = {weight: 1, calories: 2, miles: 4, sleep: 5, protein: 7, readiness: 15};
const EPOCH = Date.UTC(1899, 11, 30);

export function parseHistoryBody(text) {
  let body;
  try { body = text === '' ? {} : JSON.parse(text); } catch { throw new RangeError('Invalid JSON.'); }
  if (!body || typeof body !== 'object' || Array.isArray(body)) throw new RangeError('Invalid body.');
  if (body.days == null) return {days: DEFAULT_DAYS};
  if (typeof body.days !== 'number' || !Number.isFinite(body.days) || body.days < 1) throw new RangeError('Invalid days.');
  return {days: Math.min(MAX_DAYS, Math.floor(body.days))};
}

// A Daily Log date cell is a Sheets serial number (UNFORMATTED_VALUE) or an ISO text date; anything else is skipped.
export function cellDate(cell) {
  if (typeof cell === 'number' && Number.isFinite(cell) && cell >= 1 && cell < 80000) return new Date(EPOCH + Math.floor(cell) * 86400000).toISOString().slice(0, 10);
  if (typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(cell) && new Date(cell + 'T00:00:00Z').toISOString().slice(0, 10) === cell) return cell;
  return null;
}

export function mapRows(values, days, now = Date.now()) {
  const cutoff = new Date(now - (days - 1) * 86400000).toISOString().slice(0, 10);
  const last = new Date(now + 86400000).toISOString().slice(0, 10);
  const byDate = new Map();
  for (const row of values || []) {
    const date = cellDate(row?.[0]);
    if (!date || date < cutoff || date > last) continue;
    const out = byDate.get(date) || {date};
    for (const [key, index] of Object.entries(FIELDS)) {
      const cell = row[index];
      if (typeof cell === 'number' && Number.isFinite(cell) && cell >= 0 && out[key] == null) out[key] = cell;
    }
    byDate.set(date, out);
  }
  return [...byDate.values()].filter(r => Object.keys(r).length > 1).sort((a, b) => a.date < b.date ? -1 : 1);
}

export async function readHistory(text, request, spreadsheetId, now = Date.now()) {
  const {days} = parseHistoryBody(text);
  const spec = SHEETS.daily;
  const base = 'https://sheets.googleapis.com/v4/spreadsheets/' + encodeURIComponent(spreadsheetId);
  const meta = await request(base + '?fields=sheets.properties');
  const sheet = meta.sheets?.find(s => s.properties?.title === spec.name)?.properties;
  const rowCount = sheet?.gridProperties?.rowCount;
  if (!sheet || !(rowCount >= 2 && rowCount <= 10000)) throw new RangeError('Daily Log tab not found.');
  const read = async range => (await request(base + '/values/' + encodeURIComponent("'" + spec.name + "'!" + range) + '?valueRenderOption=UNFORMATTED_VALUE')).values;
  const head = (await read('A1:' + spec.last + '1'))?.[0] || [];
  if (spec.headers.some((value, index) => head[index] !== value)) throw new RangeError('Daily Log headers changed.');
  const values = await read('A2:P' + rowCount);
  return {rows: mapRows(values, days, now), at: new Date(now).toISOString()};
}
