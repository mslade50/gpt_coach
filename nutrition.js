(() => {
  "use strict";
  const PREFIX = "become-fast-nutrition-v1:";
  const TZ = "America/New_York";
  const GOAL = 4000;
  const FIELDS = ["weight","sleep","calories","steps","miles","training","protein","carbs","fat","fiber","intra","lift","bike","readiness","restaurant","notes"];
  const LABELS = {
    weight:"AM weight (lb)",sleep:"Sleep (hours)",calories:"Calories",steps:"Walk-only steps (excluding running)",
    miles:"Running miles",training:"Training type",protein:"Protein (g)",carbs:"Carbs (g)",fat:"Fat (g)",
    fiber:"Fiber (g)",intra:"Intra workout carbs (g)",lift:"Lift (minutes)",bike:"Bike/row (minutes)",
    readiness:"Readiness (1–5)",restaurant:"Restaurant meal",notes:"Notes"
  };
  const form = document.getElementById("nutritionForm");
  const dateInput = document.getElementById("entryDate");
  if (!form || !dateInput) return;
  let canStore = true;
  let saveHandle = null;
  function todayEastern() {
    const parts = new Intl.DateTimeFormat("en-US", { timeZone:TZ,year:"numeric",month:"2-digit",day:"2-digit" }).formatToParts(new Date());
    const get = t => parts.find(x => x.type === t).value;
    return get("year") + "-" + get("month") + "-" + get("day");
  }
  function dateOffset(iso, offset) {
    const date = new Date(iso + "T12:00:00Z");
    date.setUTCDate(date.getUTCDate() + offset);
    return date.toISOString().slice(0,10);
  }
  function validateDate(value) { return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(value + "T12:00:00Z").getTime()); }
  function load(date) {
    try { return JSON.parse(localStorage.getItem(PREFIX + date) || "{}") || {}; }
    catch { return {}; }
  }
  function stored(date, obj) {
    try {
      if (Object.keys(obj).length) localStorage.setItem(PREFIX + date, JSON.stringify(obj));
      else localStorage.removeItem(PREFIX + date);
      return true;
    } catch {
      canStore = false;
      return false;
    }
  }
  function currentFields() {
    const data = {};
    for (const name of FIELDS) {
      const field = form.elements.namedItem(name);
      if (field && field.value.trim() !== "") data[name] = field.value.trim();
    }
    return data;
  }
  function save() {
    clearTimeout(saveHandle);
    if (!validateDate(dateInput.value)) return;
    const values = currentFields();
    const ok = stored(dateInput.value, values);
    document.getElementById("saveState").textContent = ok ? "Saved on device" : "Storage unavailable";
    render();
  }
  function scheduleSave() {
    document.getElementById("saveState").textContent = "Saving…";
    clearTimeout(saveHandle);
    saveHandle = setTimeout(save, 180);
  }
  function selectDate(date) {
    if (!validateDate(date)) return;
    clearTimeout(saveHandle);
    dateInput.value = date;
    form.reset();
    dateInput.value = date;
    const data = load(date);
    for (const name of FIELDS) {
      const field = form.elements.namedItem(name);
      if (field) field.value = data[name] === undefined ? "" : data[name];
    }
    document.getElementById("saveState").textContent = Object.keys(data).length ? "Saved on device" : "No entry yet";
    render();
  }
  function numeric(data, key) {
    const val = data[key];
    if (val === undefined || val === "") return null;
    const n = Number(val);
    return Number.isFinite(n) ? n : null;
  }
  function sevenDays() {
    const days = [];
    const anchor = dateInput.value || todayEastern();
    for (let back=6;back>=0;back--) {
      const date = dateOffset(anchor,-back);
      days.push({date, data:load(date)});
    }
    return days;
  }
  function average(numbers) { return numbers.length ? numbers.reduce((a,b)=>a+b,0)/numbers.length : null; }
  function fmt(n,decimals=0) { return n === null ? "—" : n.toLocaleString("en-US",{maximumFractionDigits:decimals,minimumFractionDigits:decimals}); }
  function prettyDate(iso) {
    return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",weekday:"short",timeZone:"UTC"}).format(new Date(iso+"T12:00:00Z"));
  }
  function render() {
    const d = load(dateInput.value);
    const cal = numeric(d,"calories");
    document.getElementById("calorieStat").textContent = cal===null ? "—" : fmt(cal);
    document.getElementById("calorieDetail").textContent = cal===null ? "Enter total calories below" : (cal-GOAL===0 ? "On target" : (cal>GOAL ? "+" : "−") + fmt(Math.abs(cal-GOAL)) + " vs goal");
    const days = sevenDays();
    const weights = days.map(x=>numeric(x.data,"weight")).filter(x=>x!==null);
    const calories = days.map(x=>numeric(x.data,"calories")).filter(x=>x!==null);
    const steps = days.map(x=>numeric(x.data,"steps")).filter(x=>x!==null);
    const miles = days.map(x=>numeric(x.data,"miles")).filter(x=>x!==null);
    document.getElementById("weightStat").textContent = weights.length ? fmt(average(weights),1)+" lb" : "—";
    document.getElementById("weightDetail").textContent = weights.length ? "Average from "+weights.length+" weigh-ins" : "No weight entries yet";
    document.getElementById("avgCalories").textContent = fmt(average(calories));
    document.getElementById("calorieDays").textContent = calories.length+" / 7";
    document.getElementById("totalMiles").textContent = miles.length ? fmt(miles.reduce((a,b)=>a+b,0),1)+" mi" : "—";
    document.getElementById("avgSteps").textContent = fmt(average(steps));
    const list=document.getElementById("recentDays");
    list.replaceChildren();
    for(const day of [...days].reverse()) {
      const btn = document.createElement("button");btn.type="button";btn.className="recent-day"+(day.date===dateInput.value?" selected":"");
      const title = document.createElement("span");title.textContent=prettyDate(day.date);
      const subtitle=document.createElement("small");const w=numeric(day.data,"weight");subtitle.textContent=w===null?"Weight not logged":fmt(w,1)+" lb";
      title.appendChild(subtitle);
      const total=document.createElement("strong");const c=numeric(day.data,"calories");total.textContent=c===null?"—":fmt(c)+" kcal";
      btn.append(title,total);
      btn.addEventListener("click",()=>selectDate(day.date));
      list.appendChild(btn);
    }
  }
  function report(days) {
    const lines = ["Save these nutrition/training entries to the existing Become Fast Google Sheet. Update existing dates without clearing fields omitted below. Dates are America/New_York."];
    for (const day of days) {
      if (!Object.keys(day.data).length) continue;
      lines.push("", day.date + " ("+prettyDate(day.date)+"):");
      for (const field of FIELDS) if (day.data[field] !== undefined && day.data[field] !== "") {
        lines.push(LABELS[field] + ": " + day.data[field]);
      }
    }
    return lines.join("\n");
  }
  async function copy(text, status) {
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(text);
      document.getElementById("copyStatus").textContent = status + " Paste it into your ChatGPT coaching conversation to update Google Sheets.";
    } catch {
      const ta=document.createElement("textarea");ta.value=text;ta.readOnly=true;ta.style.position="fixed";ta.style.top="-1000px";document.body.appendChild(ta);ta.select();
      let ok=false;try {ok=document.execCommand("copy");}catch {}
      ta.remove();
      document.getElementById("copyStatus").textContent=ok ? "Copied. Paste into ChatGPT." : "Clipboard unavailable. Open ChatGPT and enter the data manually.";
    }
  }
  function copySelected() {
    save();
    const data=load(dateInput.value);
    if (!Object.keys(data).length){document.getElementById("copyStatus").textContent="Enter at least one field before copying.";return;}
    copy(report([{date:dateInput.value,data}]),"Entry copied.");
  }
  function copyWeek() {
    save();
    const days=sevenDays().filter(day=>Object.keys(day.data).length);
    if (!days.length){document.getElementById("copyStatus").textContent="No entries to copy.";return;}
    copy(report(days),"Seven-day report copied.");
  }
  function exportCSV() {
    save();
    const dates = [];
    try { for(let i=0;i<localStorage.length;i++){const key=localStorage.key(i);if(key&&key.startsWith(PREFIX))dates.push(key.slice(PREFIX.length));} } catch {}
    dates.sort();
    const quote=value=>'"'+String(value===undefined?"":value).replace(/"/g,'""')+'"';
    const csv=[["Date",...FIELDS].map(quote).join(",")].concat(dates.map(date=>{
      const data=load(date);
      return [date,...FIELDS.map(f=>data[f]===undefined?"":data[f])].map(quote).join(",");
    })).join("\r\n");
    const url=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8;"}));
    const a=document.createElement("a");a.href=url;a.download="become-fast-nutrition-"+todayEastern()+".csv";document.body.appendChild(a);a.click();a.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  form.addEventListener("input", e=> {if(e.target!==dateInput)scheduleSave();});
  form.addEventListener("change",e=> {if(e.target!==dateInput)scheduleSave();});
  dateInput.addEventListener("change",()=>selectDate(dateInput.value));
  document.getElementById("previousDay").addEventListener("click",()=>selectDate(dateOffset(dateInput.value,-1)));
  document.getElementById("nextDay").addEventListener("click",()=>selectDate(dateOffset(dateInput.value,1)));
  document.getElementById("jumpToday").addEventListener("click",()=>selectDate(todayEastern()));
  document.getElementById("saveEntry").addEventListener("click",save);
  document.getElementById("copyEntry").addEventListener("click",copySelected);
  document.getElementById("copyAll").addEventListener("click",copyWeek);
  document.getElementById("exportCsv").addEventListener("click",exportCSV);
  document.getElementById("clearEntry").addEventListener("click",()=>{
    if(!confirm("Clear the locally saved entry for "+dateInput.value+"? This cannot be undone."))return;
    stored(dateInput.value,{});selectDate(dateInput.value);
  });
  window.addEventListener("pagehide",()=>{if(saveHandle!==null)save();});
  selectDate(todayEastern());
})();
