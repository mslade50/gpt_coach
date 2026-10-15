(function (root) {
  "use strict";
  const base = typeof module !== "undefined" && module.exports ? require("./nutrition-sync-core.js") : root.NutritionSyncCore;
  const fields = { week: "B", day: "C", purpose: "D", status: "E", volume: "F", times: "G", lift: "H", notes: "I", checklist: "J", updatedAt: "K" };
  const headers = ["Date", "Program week", "Day", "Session", "Status", "Run / total volume", "Timed reps / intervals", "Main lift(s)", "Notes", "Checklist", "Updated at (UTC)"];
  class Engine extends base.Engine {
    constructor(options) {
      super({ ...options, schema: { fields, headers, numeric: new Set(["week", "day"]), conflictFields: new Set(["status", "volume", "times", "lift", "notes", "checklist"]), aliases: {}, sheetName: "Training Log", lastColumn: "K", storagePrefix: "become-fast-training-sync-v1:" } });
    }
    queue(date, changes, onlyIfBlank = false, baseline = {}) {
      const labels = { completed: "Completed as prescribed", modified: "Completed with modification", partial: "Partially completed", skipped: "Skipped" };
      super.queue(date, { ...changes, status: labels[changes.status] || changes.status }, onlyIfBlank, { ...baseline, ...(Object.hasOwn(baseline, "status") ? { status: labels[baseline.status] || baseline.status } : {}) });
    }
    // Date-keyed v2 logs are safe to migrate. Old block-week keys remain available as backups.
  }
  const api = { Engine, SyncError: base.SyncError, fields, headers, serial: base.serial };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.TrainingSyncCore = api;
})(globalThis);
