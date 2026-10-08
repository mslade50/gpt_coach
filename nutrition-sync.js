(() => {
  "use strict";
  const BASE = "https://sheets.googleapis.com/v4/spreadsheets/";
  const SCOPE = "https://www.googleapis.com/auth/spreadsheets";
  const CONFIG_KEY = "become-fast-google-oauth-config-v1";
  const DATA_PREFIX = "become-fast-nutrition-v1:";
  const START_DAY = "2026-10-08";
  const LAST_DAY = "2026-12-30";
  const fields = {
    weight:"B", calories:"C", steps:"D", miles:"E", sleep:"F", training:"G",
    protein:"H", carbs:"I", fat:"J", fiber:"K", intra:"L", restaurant:"M",
    lift:"N", bike:"O", readiness:"P", notes:"Q"
  };
  const numeric = new Set(["weight","calories","steps","miles","sleep","protein","carbs","fat","fiber","intra","lift","bike","readiness"]);
  const appStatus = document.getElementById("cloudSyncStatus");
  const idInput = document.getElementById("googleClientId");
  const sheetInput = document.getElementById("googleSheetId");
  const connectButton = document.getElementById("connectGoogle");
  const syncButton = document.getElementById("syncGoogleNow");
  const modeLabel = document.getElementById("googleConnectionLabel");
  if (!appStatus || !idInput || !sheetInput || !connectButton || !syncButton) return;
  let accessToken = "";
  let expiry = 0;
  let tokenClient = null;
  let authorizing = false;
  let connecting = false;
  let busy = false;
  let timer = null;
  const pending = new Set();

  function status(text, level="idle") {
    appStatus.textContent = text;
    appStatus.dataset.state = level;
  }
  function config() {
    const clientId=idInput.value.trim();
    const raw=sheetInput.value.trim();
    const hit=raw.match(/\/spreadsheets\/d\/([\w-]+)/);
    return {clientId, spreadsheetId: hit ? hit[1] : raw};
  }
  function loadConfig() {
    try {
      const cfg=JSON.parse(localStorage.getItem(CONFIG_KEY)||"{}");
      idInput.value=cfg.clientId||"";
      sheetInput.value=cfg.spreadsheetId||"";
    } catch {}
  }
  function persistConfig() {
    try { localStorage.setItem(CONFIG_KEY,JSON.stringify(config())); } catch {}
  }
  function hasToken() {
    return Boolean(accessToken) && Date.now()<expiry-60000;
  }
  function updateAuthUI() {
    const ok=hasToken();
    syncButton.disabled=!ok;
    modeLabel.textContent=ok?"Google connected for this session":"Local-only until Google connected";
    modeLabel.dataset.connected=String(ok);
  }
  function dayDiff(date, origin) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NaN;
    return Math.round((Date.parse(date+"T00:00:00Z")-Date.parse(origin+"T00:00:00Z"))/86400000);
  }
  function getRow(date) {
    const days=dayDiff(date,START_DAY);
    if (!Number.isInteger(days) || days<0 || date>LAST_DAY) {
      throw new Error("This Google Sheet has dates prefilled only from Oct 8 to Dec 30, 2026. Enter later dates in Sheets or extend the sheet before syncing.");
    }
    return days+2;
  }
  function serial(date) {
    return Math.round((Date.parse(date+"T00:00:00Z")-Date.UTC(1899,11,30))/86400000);
  }
  async function googleRequest(url, init={}) {
    if (!hasToken()) {updateAuthUI();throw new Error("Google session expired. Tap Connect Google to authorize again.");}
    let response;
    try {
      response=await fetch(url,{...init,headers:{"Authorization":"Bearer "+accessToken,...(init.headers||{})},cache:"no-store"});
    } catch {
      throw new Error("Could not reach Google Sheets. Check your internet connection.");
    }
    if(!response.ok) {
      if(response.status===401){accessToken="";expiry=0;updateAuthUI();throw new Error("Google authorization expired. Tap Connect Google again.");}
      if(response.status===403) throw new Error("Google refused access. Check that Sheets API is enabled and your signed-in Google account can edit the sheet.");
      if(response.status===404) throw new Error("The spreadsheet was not found by this Google account. Check its URL and sharing permissions.");
      throw new Error("Google Sheets returned HTTP "+response.status+". Local data remain saved.");
    }
    return response.json();
  }
  async function verifySheet(date) {
    const {spreadsheetId}=config();
    const row=getRow(date);
    const range=encodeURIComponent("'Daily Log'!A"+row);
    const url=BASE+encodeURIComponent(spreadsheetId)+"/values/"+range+"?valueRenderOption=UNFORMATTED_VALUE";
    const result=await googleRequest(url);
    const actual=result?.values?.[0]?.[0];
    if (Number(actual)!==serial(date)) {
      throw new Error("Date-row verification failed. No data were written; confirm this is the original Become Fast spreadsheet.");
    }
    return row;
  }
  async function syncEntry(date) {
    const cfg=config();
    const row=await verifySheet(date);
    let local={};
    try { local=JSON.parse(localStorage.getItem(DATA_PREFIX+date)||"{}")||{}; }catch {}
    const data=[];
    for (const [key,col] of Object.entries(fields)) {
      const raw=local[key];
      if(raw===undefined||raw===null||String(raw).trim()==="")continue;
      const value=numeric.has(key)?Number(raw):String(raw);
      if(numeric.has(key)&&!Number.isFinite(value))continue;
      data.push({range:"'Daily Log'!"+col+row,values:[[value]]});
    }
    if(!data.length) return false;
    const url=BASE+encodeURIComponent(cfg.spreadsheetId)+"/values:batchUpdate";
    await googleRequest(url,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({valueInputOption:"USER_ENTERED",data})
    });
    return true;
  }
  function queue(date) {
    if(!/^\d{4}-\d{2}-\d{2}$/.test(date))return;
    pending.add(date);
    if(!hasToken())return;
    clearTimeout(timer);
    timer=setTimeout(drain,1800);
  }
  async function drain() {
    clearTimeout(timer);
    if(busy||!hasToken())return;
    busy=true;
    try {
      while(pending.size&&hasToken()){
        const date=pending.values().next().value;
        pending.delete(date);
        status("Syncing "+date+" to Google Sheets…","idle");
        try{
          const saved=await syncEntry(date);
          status(saved?"Saved to Google Sheets: "+date:"No filled fields to sync.","success");
        }catch(e){
          pending.add(date);
          status(e.message||"Sync failed. Entry remains on this device.","error");
          break;
        }
      }
    }finally{busy=false;updateAuthUI();}
  }
  async function connect(){
    if(authorizing||connecting)return;
    const cfg=config();
    if(!/^[\w-]+\.apps\.googleusercontent\.com$/.test(cfg.clientId)){
      status("Paste the Google OAuth web client ID ending in .apps.googleusercontent.com.","error");return;
    }
    if(!/^[\w-]{20,}$/.test(cfg.spreadsheetId)){
      status("Paste the private Google Sheet URL or its spreadsheet ID.","error");return;
    }
    if(!window.google?.accounts?.oauth2?.initTokenClient){
      status("Google sign-in library is not available. Reload this page and check browser privacy blockers.","error");return;
    }
    persistConfig();
    authorizing=true;
    connectButton.disabled=true;
    status("Opening Google's authorization window…","idle");
    try{
      tokenClient=google.accounts.oauth2.initTokenClient({
        client_id:cfg.clientId,scope:SCOPE,
        callback:async resp=>{
          authorizing=false;
          connectButton.disabled=false;
          if(resp.error||!resp.access_token){
            status("Google authorization was not completed. Nothing was sent.","error");return;
          }
          accessToken=resp.access_token;
          expiry=Date.now()+(Number(resp.expires_in||3600)*1000);
          updateAuthUI();
          status("Google authorized. Checking spreadsheet access…","idle");
          try{
            const date=document.getElementById("entryDate").value;
            await verifySheet(date);
            status("Connected. Entries will automatically sync after edits.","success");
            queue(date);
            await drain();
          }catch(e){status(e.message,"error");}
        },
        error_callback:()=>{
          authorizing=false;connectButton.disabled=false;
          status("Google authorization window was closed or blocked.","error");
        }
      });
      tokenClient.requestAccessToken({prompt:""});
    }catch(e){
      authorizing=false;connectButton.disabled=false;
      status("Could not start Google authorization: "+(e.message||"unknown error"),"error");
    }
  }
  connectButton.addEventListener("click",connect);
  syncButton.addEventListener("click",async()=>{
    const d=document.getElementById("entryDate").value;
    document.getElementById("saveEntry").click();
    queue(d);
    await drain();
  });
  for(const el of [idInput,sheetInput])el.addEventListener("change",()=>{
    persistConfig();
    accessToken="";expiry=0;pending.clear();updateAuthUI();
    status("Settings saved on this device. Connect Google to authorize.","idle");
  });
  window.addEventListener("nutrition:local-saved",event=>{
    if(event.detail?.date)queue(event.detail.date);
  });
  loadConfig();
  updateAuthUI();
  status("Saved entries stay local until you connect Google. Access expires periodically; reconnect when prompted.","idle");
})();
