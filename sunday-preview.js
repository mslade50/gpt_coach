(() => {
  "use strict";
  const applySundayPreview = () => {
    const now = new Date();
    if (now.getDay() !== 0) return;
    const nextWeek = document.getElementById("nextWeek");
    const meta = document.getElementById("weekPlanMeta");
    if (!nextWeek || nextWeek.disabled || !meta) return;
    nextWeek.click();
    meta.textContent = meta.textContent.replace("manual view", "Sunday preview");
  };
  const rerenderCurrentSession = () => {
    const today = document.getElementById("todaySession");
    if (today) today.click();
    applySundayPreview();
  };
  const overrideSources = [
    "data/week3-threshold-swap.js",
    "data/week3-w3d3-complete.js",
    "data/week3-w3d4-complete.js",
    "data/week4-w4d1-results.js",
    "data/week4-w4d2-complete.js",
    "data/week4-w4d3-complete.js",
    "data/week4-w4d4-complete.js",
    "data/week5-w5d1-complete.js",
    "data/week5-w5d2-complete.js",
    "data/week5-w5d4-sprints-complete.js",
    "data/week5-w5d6-complete.js",
    "data/week6-plan.js",
    "data/week6-w6d1-complete.js",
    "data/aerobic-rebuild-a-week1.js",
    "data/aerobic-rebuild-a-week1-days.js",
    "data/a12-session-mon.js",
    "data/a12-session-tue.js"
  ];
  const loadSequentially = (index = 0) => {
    if (index >= overrideSources.length) {
      rerenderCurrentSession();
      return;
    }
    const src = overrideSources[index];
    const existing = [...document.scripts].find((script) => script.getAttribute("src") === src);
    if (existing) {
      loadSequentially(index + 1);
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => loadSequentially(index + 1);
    script.onerror = () => loadSequentially(index + 1);
    document.head.appendChild(script);
  };
  loadSequentially();
})();
