(function (root) {
  "use strict";
  const fields = {
    weight: "B", calories: "C", steps: "D", miles: "E", sleep: "F", training: "G",
    protein: "H", carbs: "I", fat: "J", fiber: "K", intra: "L", restaurant: "M",
    lift: "N", bike: "O", readiness: "P", notes: "Q"
  };
  const headers = ["Date", "AM weight (lb)", "Calories", "Walk-only steps", "Run miles",
    "Sleep (hrs)", "Training type", "Protein (g)", "Carbs (g)", "Fat (g)", "Fiber (g)",
    "Intra carb (g)", "Restaurant?", "Lift (min)", "Bike/row (min)", "Readiness (1–5)", "Notes"];
  const numeric = new Set(Object.keys(fields).filter(key => !["training", "restaurant", "notes"].includes(key)));
  const trainingAliases = {
    "Long run": "Long / hard run", "Threshold + strength": "Run + strength",
    "Sprint / speed": "Sprint + lifting", "Run + upper body": "Run + strength",
    "Bike / row / cross-train": "Other"
  };
  function serial(date) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || new Date(date + "T00:00:00Z").toISOString().slice(0, 10) !== date) {
      throw new Error("Choose a valid calendar date.");
    }
    return (Date.parse(date + "T00:00:00Z") - Date.UTC(1899, 11, 30)) / 86400000;
  }
  class SyncError extends Error {
    constructor(message, retryable = false) { super(message); this.retryable = retryable; }
  }
  class Engine {
    constructor({ spreadsheetId, storage, request }) {
      this.spreadsheetId = spreadsheetId;
      this.storage = storage;
      this.request = request;
      this.key = "become-fast-sync-v2:" + spreadsheetId;
      const raw = storage.getItem(this.key);
      this.state = raw ? JSON.parse(raw) : { outbox: {}, receipts: {}, migrated: false };
      if (!this.state.outbox || !this.state.receipts) throw new Error("Sync queue is unreadable. Export a local backup before resetting browser storage.");
      this.base = "https://sheets.googleapis.com/v4/spreadsheets/" + encodeURIComponent(spreadsheetId);
    }
    persist() { this.storage.setItem(this.key, JSON.stringify(this.state)); }
    queue(date, changes, onlyIfBlank = false) {
      serial(date);
      const updates = {};
      let invalid;
      for (const [key, raw] of Object.entries(changes)) {
        if (!fields[key] || raw == null || String(raw).trim() === "") continue;
        const value = numeric.has(key) ? Number(raw) : (key === "training" ? trainingAliases[raw] || String(raw) : String(raw));
        if (numeric.has(key) && (!Number.isFinite(value) || value < 0)) {
          invalid = "Invalid " + key + ". Correct it before syncing.";
          continue;
        }
        updates[key] = { value, id: crypto.randomUUID(), onlyIfBlank };
      }
      if (Object.keys(updates).length) this.state.outbox[date] = { ...this.state.outbox[date], ...updates };
      this.persist();
      if (invalid) throw new Error(invalid);
    }
    migrate(storage, prefix) {
      if (this.state.migrated) return;
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (!key?.startsWith(prefix)) continue;
        const date = key.slice(prefix.length);
        const entry = JSON.parse(storage.getItem(key) || "{}");
        this.queue(date, entry, true);
      }
      this.state.migrated = true;
      this.persist();
    }
    dates() { return Object.keys(this.state.outbox).sort(); }
    discard(date) { delete this.state.outbox[date]; this.persist(); }
    async values(range, render = "UNFORMATTED_VALUE") {
      return this.request(this.base + "/values/" + encodeURIComponent("'Daily Log'!" + range) + "?valueRenderOption=" + render);
    }
    async locate(date) {
      const target = serial(date);
      const meta = await this.request(this.base + "?fields=sheets.properties");
      const sheet = meta.sheets?.find(s => s.properties.title === "Daily Log")?.properties;
      if (!sheet || sheet.gridProperties.rowCount > 10000) throw new SyncError("Daily Log is missing or too large. No data written.");
      const head = (await this.values("A1:Q1")).values?.[0] || [];
      if (headers.some((value, index) => head[index] !== value)) throw new SyncError("Daily Log columns changed. No data written; restore the original headers before retrying.");
      const rows = (await this.values("A2:A" + sheet.gridProperties.rowCount)).values || [];
      const matches = rows.flatMap((row, i) => (row[0] === target || row[0] === date) ? [i + 2] : []);
      if (matches.length !== 1) throw new SyncError(matches.length ? "Duplicate date rows. Fix Daily Log before retrying." : "Date is missing from Daily Log. Extend the Sheet dates before retrying.");
      return matches[0];
    }
    async read(date) {
      const row = await this.locate(date);
      const cells = (await this.values("A" + row + ":Q" + row)).values?.[0] || [];
      if (cells[0] !== serial(date) && cells[0] !== date) throw new SyncError("The Sheet date moved. Retry to verify the row again.");
      return { row, cells, entry: Object.fromEntries(Object.entries(fields).flatMap(([key, col]) => {
        const value = cells[col.charCodeAt(0) - 65];
        return value == null || value === "" ? [] : [[key, String(value)]];
      })) };
    }
    async sync(date) {
      const snapshot = structuredClone(this.state.outbox[date] || {});
      const remote = await this.read(date);
      const grid = await this.request(this.base + "?ranges=" + encodeURIComponent("'Daily Log'!A" + remote.row + ":Q" + remote.row) + "&fields=sheets.data.rowData.values(userEnteredValue,dataValidation)");
      const cells = grid.sheets?.[0]?.data?.[0]?.rowData?.[0]?.values || [];
      const data = [];
      for (const [key, change] of Object.entries(snapshot)) {
        const col = fields[key];
        const index = col.charCodeAt(0) - 65;
        if (change.onlyIfBlank && remote.cells[index] != null && remote.cells[index] !== "") continue;
        if (cells[index]?.userEnteredValue?.formulaValue) throw new SyncError("A logged field contains a Sheet formula. No data written; check column " + col + ".");
        const rule = cells[index]?.dataValidation?.condition;
        if (rule?.type === "ONE_OF_LIST" && !rule.values.some(item => item.userEnteredValue === String(change.value))) {
          throw new SyncError("The value for " + key + " is not allowed by this Sheet. Choose an existing Sheet option and retry.");
        }
        data.push({ range: "'Daily Log'!" + col + remote.row, values: [[change.value]] });
      }
      // Recheck the date immediately before writing. RAW keeps notes literal, even if they start with '='.
      if (data.length) {
        const dateCell = (await this.values("A" + remote.row)).values?.[0]?.[0];
        if (dateCell !== serial(date) && dateCell !== date) throw new SyncError("Date-row verification failed. No data written.");
        await this.request(this.base + "/values:batchUpdate", {
          method: "POST", body: JSON.stringify({ valueInputOption: "RAW", data })
        });
        const check = (await this.values("A" + remote.row + ":Q" + remote.row)).values?.[0] || [];
        if (check[0] !== serial(date) && check[0] !== date) throw new SyncError("Sheet date changed during sync. Check the Sheet before retrying.");
        for (const update of data) {
          const col = update.range.split("!")[1].charCodeAt(0) - 65;
          if (check[col] !== update.values[0][0]) throw new SyncError("Google write could not be confirmed. Your changes remain queued.", true);
        }
      }
      for (const [key, change] of Object.entries(snapshot)) {
        if (this.state.outbox[date]?.[key]?.id === change.id) delete this.state.outbox[date][key];
      }
      if (!Object.keys(this.state.outbox[date] || {}).length) delete this.state.outbox[date];
      this.state.receipts[date] = new Date().toISOString();
      this.persist();
      return remote.row;
    }
  }
  const api = { Engine, SyncError, fields, headers, serial };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.NutritionSyncCore = api;
})(globalThis);
