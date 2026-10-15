(() => {
  "use strict";
  const settings = window.TrainingSyncConfig;
  const { Engine, SyncError } = settings ? window.TrainingSyncCore : window.NutritionSyncCore;
  const eventPrefix = settings ? "training" : "nutrition";
  const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
  const CONFIG_KEY = "become-fast-google-oauth-config-v1";
  const DATA_PREFIX = settings?.dataPrefix || "become-fast-nutrition-v1:";
  const DEFAULT_SHEET = "1kcFtPe_-5ng3wdKaEA720P7e9vbjXhvJDBf8wMVwK8Y";
  const DEFAULT_CLIENT = "198647292636-ada505h67lnob9ldu5baf4jno9vdj9f0.apps.googleusercontent.com"; // Public identifier, not a secret.
  const $ = id => document.getElementById(settings?.ids[id] || id);
  let token = "", expires = 0, engine, busy = false, authorizing = false;
  let timer, expiryTimer, attempts = 0, generation = 0;
  let storageError = false;
  let pollTimer;
  function status(message, level = "idle") {
    $("cloudSyncStatus").textContent = message;
    $("cloudSyncStatus").dataset.state = level;
  }
  function hasToken() { return token && Date.now() < expires - 60000; }
  function updateUI() {
    const count = engine?.dates().length || 0;
    $("connectGoogle").disabled = authorizing || busy;
    const top = $("connectGoogleTop");
    if (top) { top.disabled = authorizing || busy; top.textContent = hasToken() ? "Refresh shared logs" : "Connect Google to load shared logs"; }
    $("googleClientId").disabled = authorizing || busy;
    $("googleSheetId").disabled = authorizing || busy;
    $("clearEntry").disabled = busy;
    $("syncGoogleNow").disabled = busy || authorizing || storageError;
    $("googleConnectionLabel").textContent = (hasToken() ? "Google connected" : "Google connection needed") + (count ? " · " + count + " day(s) waiting" : "");
    $("googleConnectionLabel").dataset.connected = String(Boolean(hasToken()));
    const date = Object.keys(engine?.state.conflicts || {}).find(day => Object.keys(engine.state.conflicts[day]).length);
    const panel = $("syncConflicts");
    if (panel) panel.hidden = !date;
    const label = $("syncConflictLabel");
    if (label && date) label.textContent = date + " · Different edits in: " + Object.keys(engine.state.conflicts[date]).join(", ") + ". Both versions are retained until you choose.";
  }
  function config() {
    const raw = $("googleSheetId").value.trim();
    return { clientId: $("googleClientId").value.trim(), spreadsheetId: raw.match(/\/spreadsheets\/d\/([\w-]+)/)?.[1] || raw };
  }
  function clearToken() { token = ""; expires = 0; clearTimeout(expiryTimer); clearTimeout(pollTimer); updateUI(); }
  async function request(url, init = {}) {
    if (!hasToken()) { clearToken(); throw new SyncError("Saved on device. Tap Connect Google to resume sync."); }
    let response;
    const abort = new AbortController();
    const timeout = setTimeout(() => abort.abort(), 20000);
    try {
      response = await fetch(url, { ...init, signal: abort.signal, cache: "no-store",
        headers: { Authorization: "Bearer " + token, ...(init.body ? { "Content-Type": "application/json" } : {}) } });
    } catch { throw new SyncError("Connection interrupted. Saved on device; automatic retry is queued.", true); }
    finally { clearTimeout(timeout); }
    if (response.status === 401) { clearToken(); throw new SyncError("Google session expired. Tap Connect Google; queued entries are safe."); }
    if (response.status === 403) throw new SyncError("Google denied access. Enable Sheets API, approve Sheets permission, and use the account that owns this Sheet.");
    if (response.status === 404) throw new SyncError("Sheet not found. Check the Sheet URL and signed-in account.");
    if (!response.ok) throw new SyncError("Google Sheets returned HTTP " + response.status + ". Saved on device; tap Retry sync.", response.status === 429 || response.status >= 500);
    return response.json();
  }
  function schedule(delay = 1000) {
    clearTimeout(timer);
    if (hasToken() && navigator.onLine && engine?.dates().length) timer = setTimeout(drain, delay);
  }
  async function pullHistory() {
    const source = engine;
    const rows = await source.history();
    if (engine !== source) return 0;
    let count = 0;
    for (const remote of rows) {
      if (Object.values(remote.entry).some(value => value !== "")) count++;
      window.dispatchEvent(new CustomEvent(eventPrefix + ":cloud-loaded", { detail: {
        date: remote.date, entry: remote.entry, previous: source.state.remote[remote.date] || {}, pending: Object.keys(source.state.outbox[remote.date] || {})
      } }));
      source.state.remote[remote.date] = remote.entry;
    }
    source.persist();
    window.dispatchEvent(new CustomEvent(eventPrefix + ":history-loaded", { detail: { count } }));
    return count;
  }
  async function drain() {
    clearTimeout(timer);
    clearTimeout(pollTimer);
    if (busy) return;
    if (!engine || storageError) return;
    if (!navigator.onLine) { status("Offline · saved on device. Queued entries retry when this page is online."); updateUI(); return; }
    if (!hasToken()) { status("Saved on device. Tap Connect Google to sync queued entries."); updateUI(); return; }
    busy = true; updateUI();
    const failed = [];
    let verified = "";
    try {
      for (const date of engine.dates()) {
        status("Syncing " + date + "…");
        try {
          const row = await engine.sync(date);
          attempts = 0;
          verified = "Verified in Google Sheets: " + date + " · " + (settings ? "Training Log" : "Daily Log") + " row " + row;
          status(verified, "success");
        } catch (error) {
          failed.push(error);
          status(error.message, "error");
          if (error.retryable || !hasToken()) break;
        }
      }
      if (hasToken() && navigator.onLine) {
        const count = await pullHistory();
        if (!failed.length) status((verified ? verified + ". " : "") + "History refreshed · " + count + " saved day(s). Updates check every 30 seconds while this page is visible.", "success");
      }
    } catch (error) { failed.push(error); }
    finally { busy = false; updateUI(); }
    if (failed.length) {
      status(failed[0].message + " " + engine.dates().length + " day(s) still waiting.", "error");
      if (failed.some(error => error.retryable)) schedule(Math.min(60000, 2000 * 2 ** Math.min(attempts++, 5)));
    } else {
      if (engine.dates().length) schedule(); // Edits that arrived during the request remain queued.
    }
    if (hasToken() && navigator.onLine && !document.hidden) pollTimer = setTimeout(drain, 30000);
  }
  function setup() {
    const cfg = config();
    if (!/^[\w-]{20,}$/.test(cfg.spreadsheetId)) throw new Error("Enter a valid private Google Sheet URL.");
    engine = new Engine({ spreadsheetId: cfg.spreadsheetId, storage: localStorage, request });
    engine.migrate(localStorage, DATA_PREFIX);
    storageError = false;
  }
  function connect() {
    if (busy || authorizing) return;
    if (!navigator.onLine) { status("Offline · your entries remain saved on this device."); return; }
    const cfg = config();
    if (!/^[\w-]+\.apps\.googleusercontent\.com$/.test(cfg.clientId)) { status("Google sign-in setup is incomplete: a web OAuth client ID is required.", "error"); return; }
    if (!window.google?.accounts?.oauth2) { status("Google sign-in is still loading or blocked. Reload when online and retry.", "error"); return; }
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); if (!engine) setup(); }
    catch { storageError = true; status("Browser storage is unavailable. Export your local backup before retrying.", "error"); updateUI(); return; }
    authorizing = true; updateUI();
    status("Choose your Google account and approve Sheets access…");
    const currentGeneration = generation;
    try {
      const client = google.accounts.oauth2.initTokenClient({
        client_id: cfg.clientId, scope: SCOPE, include_granted_scopes: false,
        callback: async response => {
          authorizing = false;
          if (generation !== currentGeneration) return;
          if (response.error || !response.access_token || !google.accounts.oauth2.hasGrantedAllScopes(response, SCOPE)) {
            clearToken(); status("Sheets permission was not approved. Your entries remain on this device.", "error"); return;
          }
          token = response.access_token;
          expires = Date.now() + Number(response.expires_in || 3600) * 1000;
          clearTimeout(expiryTimer);
          expiryTimer = setTimeout(() => { clearToken(); status("Google session expired. Tap Connect Google to resume automatic sync."); }, Math.max(0, expires - Date.now() - 60000));
          updateUI();
          status("Google connected. Edits sync automatically while this session is active.", "success");
          await drain();
        },
        error_callback: () => { authorizing = false; updateUI(); status("Google sign-in was closed or blocked. Tap Connect Google to retry.", "error"); }
      });
      client.requestAccessToken({ prompt: "" });
    } catch { authorizing = false; updateUI(); status("Could not open Google sign-in. Check popup blocking and retry.", "error"); }
  }
  $("connectGoogle").addEventListener("click", connect);
  $("connectGoogleTop")?.addEventListener("click", () => { if (hasToken()) drain(); else connect(); });
  $("saveEntry").addEventListener("click", () => { if (hasToken()) drain(); });
  $("syncGoogleNow").addEventListener("click", () => {
    $("saveEntry").click();
    if (!hasToken()) connect();
  });
  for (const el of [$("googleClientId"), $("googleSheetId")]) el.addEventListener("change", () => {
    generation++; clearToken(); clearTimeout(timer);
    try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config())); setup(); status("Settings saved. Tap Connect Google."); }
    catch (error) { storageError = true; status(error.message, "error"); }
    updateUI();
  });
  window.addEventListener(eventPrefix + ":local-saved", event => {
    if (!engine) return;
    try {
      engine.queue(event.detail.date, event.detail.changes || {}, false, event.detail.baseline || {});
      storageError = false;
      if (Object.keys(event.detail.changes || {}).length) {
        status(navigator.onLine ? "Saved on device · waiting to sync." : "Offline · saved on device. Will retry when online.");
      }
      updateUI(); schedule();
    } catch (error) {
      storageError = true;
      status(error.message.startsWith("Invalid") ? error.message : "Could not persist the sync queue. Keep this page open and export a backup.", "error");
      updateUI();
    }
  });
  window.addEventListener(eventPrefix + ":date-selected", () => { if (hasToken()) drain(); });
  for (const [id, choice] of [["useSheetConflict", "sheet"], ["keepDeviceConflict", "device"]]) {
    $(id)?.addEventListener("click", () => {
      const date = Object.keys(engine?.state.conflicts || {}).find(day => Object.keys(engine.state.conflicts[day]).length);
      if (!date || busy) return;
      try {
        // Preserve the losing version locally for recovery; never send this backup to Sheets.
        localStorage.setItem("become-fast-conflict-backup:" + eventPrefix + ":" + date + ":" + Date.now(), JSON.stringify(engine.state.conflicts[date]));
        engine.resolve(date, choice); updateUI(); drain();
      } catch { status("Could not save the conflict backup. Export your device backup before retrying.", "error"); }
    });
  }
  window.addEventListener(eventPrefix + ":local-cleared", event => {
    try { engine?.discard(event.detail.date); status("Local copy and queued edits cleared. Existing Sheet values are preserved."); updateUI(); }
    catch { storageError = true; status("Could not clear the sync queue. Export a backup before resetting storage.", "error"); updateUI(); }
  });
  window.addEventListener("online", () => { status("Back online · checking queued changes."); drain(); });
  window.addEventListener("offline", () => { clearTimeout(timer); status("Offline · entries save on device and retry when online."); });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { updateUI(); drain(); } });
  window.addEventListener("focus", () => { if (hasToken() && !document.hidden) drain(); });
  try {
    const cfg = JSON.parse(localStorage.getItem(CONFIG_KEY) || "{}");
    $("googleClientId").value = cfg.clientId || DEFAULT_CLIENT;
    $("googleSheetId").value = cfg.spreadsheetId || DEFAULT_SHEET;
    setup();
    status(engine.dates().length ? "Saved entries are queued. Tap Connect Google to sync." : "Tap Connect Google once per session. New edits will sync automatically.");
  } catch { storageError = true; status("Browser storage is unavailable or unreadable. Export a local backup before resetting it.", "error"); }
  updateUI();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("nutrition-sw.js", { scope: "./" }).catch(() => { /* Local saves still work without an offline shell. */ });
  }
})();
