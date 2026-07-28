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

  const STORAGE_PREFIX = "hybrid400-session-log-";
  const statusLabels = {
    completed: "Completed as prescribed",
    modified: "Completed with modification",
    partial: "Partially completed",
    skipped: "Skipped"
  };

  let activeContext = null;
  let saveTimer = null;
  let pendingSave = null;

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
    const match = sessionTitle.textContent.match(/Week\s+(\d+)\s*[·•\-]\s*Day\s+(\d+)/i);
    if (!match) return null;

    const week = Number(match[1]);
    const day = Number(match[2]);
    if (!Number.isFinite(week) || !Number.isFinite(day)) return null;

    return {
      key: `w${week}d${day}`,
      week,
      day,
      purpose: sessionName.textContent.trim() || "Planned session",
      date: sessionDate.textContent.trim() || `Week ${week} Day ${day}`
    };
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
      copyStatus.textContent = "Saved on this browser only. Copy and paste it into the coach chat.";
    }
  }

  function persistPendingSave() {
    if (!pendingSave) return;
    const { context, log } = pendingSave;
    pendingSave = null;
    window.clearTimeout(saveTimer);
    saveTimer = null;

    const saved = storageSet(`${STORAGE_PREFIX}${context.key}`, JSON.stringify(log));
    if (activeContext && activeContext.key === context.key) {
      const time = new Intl.DateTimeFormat(undefined, { hour: "numeric", minute: "2-digit" }).format(new Date(log.updatedAt));
      saveState.textContent = saved ? `Saved locally ${time}` : "Could not save locally";
      renderReport();
    }
  }

  function queueSave() {
    if (!activeContext) return;
    window.clearTimeout(saveTimer);
    pendingSave = { context: { ...activeContext }, log: readFields() };
    saveState.textContent = "Saving…";
    saveTimer = window.setTimeout(persistPendingSave, 180);
  }

  function syncContext() {
    const nextContext = parseContext();
    if (!nextContext) return;

    const changed = !activeContext || activeContext.key !== nextContext.key;
    if (changed && pendingSave) persistPendingSave();
    activeContext = nextContext;
    sessionMeta.textContent = `W${activeContext.week}D${activeContext.day} · ${activeContext.date} · ${activeContext.purpose}`;

    if (changed) loadActiveLog();
    else renderReport();
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
    if (pendingSave && pendingSave.context.key === activeContext.key) {
      window.clearTimeout(saveTimer);
      saveTimer = null;
      pendingSave = null;
    }
    const confirmed = window.confirm(`Clear the saved log for W${activeContext.week}D${activeContext.day}?`);
    if (!confirmed) return;

    storageRemove(`${STORAGE_PREFIX}${activeContext.key}`);
    applyLog(blankLog());
    copyStatus.textContent = "This session log was cleared.";
  }

  form.addEventListener("input", queueSave);
  form.addEventListener("change", queueSave);
  copyButton.addEventListener("click", copyReport);
  clearButton.addEventListener("click", clearActiveLog);

  const observer = new MutationObserver(() => window.requestAnimationFrame(syncContext));
  observer.observe(sessionTitle, { childList: true, characterData: true, subtree: true });
  observer.observe(sessionName, { childList: true, characterData: true, subtree: true });
  observer.observe(sessionDate, { childList: true, characterData: true, subtree: true });

  window.addEventListener("storage", (event) => {
    if (!activeContext || event.key !== `${STORAGE_PREFIX}${activeContext.key}`) return;
    loadActiveLog();
  });

  syncContext();
})();