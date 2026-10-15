(() => {
  "use strict";

  const form = document.getElementById("sessionLogForm");
  const statusField = document.getElementById("logStatus");
  const volumeField = document.getElementById("logVolume");
  const timesField = document.getElementById("logTimes");
  const liftField = document.getElementById("logLift");
  const notesField = document.getElementById("logNotes");
  const sessionMeta = document.getElementById("logSessionMeta");
  const saveState = document.getElementById("logSaveState");
  const reportPreview = document.getElementById("coachReportPreview");
  const copyButton = document.getElementById("copyCoachReport");
  const copyStatus = document.getElementById("copyReportStatus");
  const clearButton = document.getElementById("clearSessionLog");
  const sessionTitle = document.getElementById("session-title");
  const sessionName = document.getElementById("session-name");
  const sessionDate = document.getElementById("session-date");

  if (!form || !statusField || !volumeField || !timesField || !liftField || !notesField ||
      !sessionMeta || !saveState || !reportPreview || !copyButton || !copyStatus ||
      !clearButton || !sessionTitle || !sessionName || !sessionDate) return;

  const STORAGE_PREFIX = "hybrid400-session-log-v2:";
  const fields = { status: statusField, volume: volumeField, times: timesField, lift: liftField, notes: notesField };
  const statusLabels = {
    completed: "Completed as prescribed",
    modified: "Completed with modification",
    partial: "Partially completed",
    skipped: "Skipped"
  };

  let activeContext = null;
  let saveTimer = null;
  let pendingSave = null;
  let loadedFields = {};
  let checklist = "";
  window.TrainingLog = { get context() { return activeContext; } };

  function storageGet(key) {
    try { return window.localStorage.getItem(key); }
    catch { return null; }
  }

  function storageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  }

  function storageRemove(key) {
    try { window.localStorage.removeItem(key); }
    catch { /* The form still works without persistent storage. */ }
  }

  function cleanInline(value) {
    return String(value || "")
      .replace(/\s*\n+\s*/g, "; ")
      .replace(/\s{2,}/g, " ")
      .trim()
      .replace(/[.;]+$/, "");
  }

  function parseContext() {
    const context = window.TrainingSession;
    return context?.isoDate ? { ...context } : null;
  }

  function blankLog() {
    return {
      status: "",
      volume: "",
      times: "",
      lift: "",
      notes: "",
      updatedAt: ""
    };
  }

  function readFields() {
    return {
      status: statusField.value,
      volume: volumeField.value.trim(),
      times: timesField.value.trim(),
      lift: liftField.value.trim(),
      notes: notesField.value.trim(),
      checklist,
      updatedAt: new Date().toISOString()
    };
  }

  function applyLog(log) {
    const safeLog = { ...blankLog(), ...(log || {}) };
    statusField.value = statusLabels[safeLog.status] ? safeLog.status : "";
    volumeField.value = safeLog.volume || "";
    timesField.value = safeLog.times || "";
    liftField.value = safeLog.lift || "";
    notesField.value = safeLog.notes || "";
    checklist = safeLog.checklist || "";
    loadedFields = readFields();
    if (checklist) window.dispatchEvent(new CustomEvent("training:checklist-loaded", { detail: { date: activeContext.isoDate, checklist } }));

    if (safeLog.updatedAt) {
      const saved = new Date(safeLog.updatedAt);
      saveState.textContent = Number.isNaN(saved.getTime())
        ? "Saved locally"
        : `Saved locally ${new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(saved)}`;
    } else {
      saveState.textContent = "Not logged yet";
    }

    renderReport();
  }

  function loadActiveLog() {
    if (!activeContext) return;
    const raw = storageGet(`${STORAGE_PREFIX}${activeContext.key}`);
    if (!raw) {
      applyLog(blankLog());
      return;
    }

    try { applyLog(JSON.parse(raw)); }
    catch { applyLog(blankLog()); }
  }

  function reportText(log) {
    if (!activeContext) return "Select a session to build a coach report.";

    const header = `W${activeContext.week}D${activeContext.day} (${activeContext.date}) — ${activeContext.purpose}.`;
    const parts = [];
    const status = statusLabels[log.status];
    const volume = cleanInline(log.volume);
    const times = cleanInline(log.times);
    const lift = cleanInline(log.lift);
    const notes = cleanInline(log.notes);
    const hasEntry = Boolean(status || volume || times || lift || notes);

    parts.push(status || "Status not entered");
    if (volume) parts.push(`Volume: ${volume}`);
    if (times) parts.push(`Timed work: ${times}`);
    if (lift) parts.push(`Main lift(s): ${lift}`);
    if (notes) parts.push(`Noteworthy: ${notes}`);
    else if (hasEntry) parts.push("No noteworthy issues");
    else parts.push("Log fields are empty");

    return `${header} ${parts.join(". ")}.`;
  }

  function renderReport() {
    const log = readFields();
    reportPreview.value = reportText(log);
    copyButton.disabled = !statusLabels[log.status];

    if (copyButton.disabled) {
      copyStatus.textContent = "Choose a session status to enable copying.";
    } else {
      copyStatus.textContent = "Copying is optional. Check the Google sync status below for cloud confirmation.";
    }
  }

  function persistPendingSave() {
    if (!pendingSave) return;
    const { context, log, baseline } = pendingSave;
    pendingSave = null;
    window.clearTimeout(saveTimer);
    saveTimer = null;

    const saved = storageSet(`${STORAGE_PREFIX}${context.key}`, JSON.stringify({ ...log, week: context.week, day: context.day, purpose: context.purpose }));
    const changes = Object.fromEntries([...Object.keys(fields), "checklist"].filter(key => log[key] && log[key] !== baseline[key]).map(key => [key, key === "status" ? statusLabels[log[key]] : log[key]]));
    if (Object.keys(changes).length) {
      Object.assign(changes, { week: context.week, day: context.day, purpose: context.purpose, updatedAt: log.updatedAt });
      window.dispatchEvent(new CustomEvent("training:local-saved", { detail: { date: context.isoDate, changes, baseline: Object.fromEntries(Object.keys(changes).map(key => [key, baseline[key] ?? ""])) } }));
    }
    if (activeContext && activeContext.key === context.key) {
      const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(log.updatedAt));
      saveState.textContent = saved ? `Saved locally ${time}` : "Could not save locally";
      loadedFields = { ...log };
      renderReport();
      renderHistory();
    }
  }

  function queueSave() {
    if (!activeContext) return;
    window.clearTimeout(saveTimer);
    pendingSave = { context: { ...activeContext }, log: readFields(), baseline: { ...loadedFields } };
    saveState.textContent = "Saving…";
    saveTimer = window.setTimeout(persistPendingSave, 180);
  }

  function syncContext() {
    const nextContext = parseContext();
    if (!nextContext) return;

    const changed = !activeContext || activeContext.key !== nextContext.key;
    if (changed && pendingSave) persistPendingSave();
    activeContext = nextContext;
    sessionMeta.textContent = `${activeContext.isoDate} · Program W${activeContext.week}D${activeContext.day} · ${activeContext.purpose}`;

    if (changed) {
      loadActiveLog();
      window.dispatchEvent(new CustomEvent("training:date-selected", { detail: { date: activeContext.isoDate } }));
    }
    else renderReport();
  }

  function renderHistory() {
    const list = document.getElementById("trainingHistory");
    if (!list?.replaceChildren) return;
    list.replaceChildren();
    const dates = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key?.startsWith(STORAGE_PREFIX)) dates.push(key.slice(STORAGE_PREFIX.length));
    }
    for (const date of dates.sort().reverse()) {
      let entry;
      try { entry = JSON.parse(storageGet(STORAGE_PREFIX + date) || "{}"); } catch { continue; }
      if (![...Object.keys(fields), "checklist"].some(key => entry[key])) continue;
      const button = document.createElement("button");
      button.type = "button"; button.className = "ghost-button training-history-day";
      button.textContent = date + " · " + (statusLabels[entry.status] || "Status not entered") + (entry.volume ? " · " + entry.volume : "");
      button.addEventListener("click", () => window.dispatchEvent(new CustomEvent("training:open-date", { detail: { date } })));
      list.appendChild(button);
    }
    if (!list.childElementCount) list.textContent = "Connect Google to load shared history. Device entries also appear here.";
  }

  async function copyReport() {
    const text = reportPreview.value;
    if (!text || copyButton.disabled) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      reportPreview.focus();
      reportPreview.select();
      const copied = typeof document.execCommand === "function" && document.execCommand("copy");
      reportPreview.setSelectionRange(0, 0);
      if (!copied) {
        copyStatus.textContent = "Copy was blocked. Select the report text and copy it manually.";
        return;
      }
    }

    copyButton.textContent = "Copied — paste in chat";
    copyStatus.textContent = "Coach report copied. Paste it into the project chat.";
    window.setTimeout(() => { copyButton.textContent = "Copy coach report"; }, 1800);
  }

  function clearActiveLog() {
    if (!activeContext) return;
    const confirmed = window.confirm(`Clear the device copy and queued edits for ${activeContext.isoDate}? Existing Google Sheet values will stay unchanged.`);
    if (!confirmed) return;
    if (pendingSave && pendingSave.context.key === activeContext.key) {
      window.clearTimeout(saveTimer);
      saveTimer = null;
      pendingSave = null;
    }
    storageRemove(`${STORAGE_PREFIX}${activeContext.key}`);
    applyLog(blankLog());
    window.dispatchEvent(new CustomEvent("training:local-cleared", { detail: { date: activeContext.isoDate } }));
    copyStatus.textContent = "Device copy cleared. Existing Google Sheet values are preserved.";
  }

  form.addEventListener("input", queueSave);
  form.addEventListener("change", queueSave);
  copyButton.addEventListener("click", copyReport);
  clearButton.addEventListener("click", clearActiveLog);
  document.getElementById("saveTrainingLog").addEventListener("click", persistPendingSave);
  window.addEventListener("training:context", syncContext);
  window.addEventListener("training:checklist-changed", event => {
    if (event.detail.date !== activeContext?.isoDate) return;
    checklist = event.detail.checklist;
    queueSave();
  });
  window.addEventListener("training:cloud-loaded", event => {
    const selected = event.detail.date === activeContext?.isoDate;
    let saved = {};
    try { saved = JSON.parse(storageGet(STORAGE_PREFIX + event.detail.date) || "{}"); } catch { /* Preserve queued edits below. */ }
    const current = selected ? readFields() : saved;
    const merged = { ...saved, ...current };
    const entry = event.detail.entry;
    const previous = event.detail.previous || {};
    for (const key of [...Object.keys(fields), "checklist", "week", "day", "purpose", "updatedAt"]) {
      if (selected && pendingSave && key === "updatedAt") continue;
      if (event.detail.pending.includes(key) || (selected && [...Object.keys(fields), "checklist"].includes(key) && current[key] !== loadedFields[key])) continue;
      const raw = entry[key];
      if (raw == null) continue;
      const oldCloud = key === "status" ? Object.keys(statusLabels).find(code => statusLabels[code] === previous.status) || "" : previous[key];
      if (raw === "" && !(Object.hasOwn(previous, key) && String(current[key] ?? "") === String(oldCloud))) continue;
      const value = key === "status" ? Object.keys(statusLabels).find(code => statusLabels[code] === raw) || "" : raw;
      merged[key] = value;
      if (selected) {
        if (fields[key]) fields[key].value = value;
        if (key === "checklist") {
          checklist = value;
          window.dispatchEvent(new CustomEvent("training:checklist-loaded", { detail: { date: event.detail.date, checklist: value } }));
        }
        loadedFields[key] = value;
        if (pendingSave) { pendingSave.log[key] = value; pendingSave.baseline[key] = value; }
      }
    }
    if (Object.values(merged).some(value => value !== "" && value != null)) storageSet(STORAGE_PREFIX + event.detail.date, JSON.stringify(merged));
    if (selected) {
      if (!pendingSave && Object.values(entry).some(value => value !== "")) saveState.textContent = "Loaded from Google Sheets";
      renderReport();
    }
  });
  window.addEventListener("training:history-loaded", renderHistory);
  window.addEventListener("pagehide", persistPendingSave);
  document.addEventListener("visibilitychange", () => { if (document.hidden) persistPendingSave(); });
  document.getElementById("exportTrainingBackup").addEventListener("click", () => {
    persistPendingSave();
    const logs = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("hybrid400-session-log-") || key.startsWith("become-fast-training-sync-v1:") || key.startsWith("become-fast-conflict-backup:training:")) {
        const raw = localStorage.getItem(key);
        try { logs[key] = JSON.parse(raw); } catch { logs[key] = raw; }
      }
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(logs, null, 2)], { type: "application/json" }));
    const link = document.createElement("a"); link.href = url; link.download = "training-device-backup.json"; link.click(); URL.revokeObjectURL(url);
  });

  const observer = new MutationObserver(() => window.requestAnimationFrame(syncContext));
  observer.observe(sessionTitle, { childList: true, characterData: true, subtree: true });
  observer.observe(sessionName, { childList: true, characterData: true, subtree: true });
  observer.observe(sessionDate, { childList: true, characterData: true, subtree: true });

  window.addEventListener("storage", (event) => {
    if (!activeContext || event.key !== `${STORAGE_PREFIX}${activeContext.key}`) return;
    if (!pendingSave) loadActiveLog();
  });

  syncContext();
  renderHistory();
})();
