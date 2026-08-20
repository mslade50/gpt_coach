(() => {
  "use strict";

  const applySundayPreview = () => {
    const now = new Date();
    if (now.getDay() !== 0) return;

    const nextWeek = document.getElementById("nextWeek");
    const meta = document.getElementById("weekPlanMeta");
    if (!nextWeek || nextWeek.disabled || !meta) return;

    // Saturday evening starts the preview; keep that next-week view active through Sunday.
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
    "data/week4-w4d4-complete.js"
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

  // Load the approved current-week overrides after the core app, then trigger
  // the app's existing Today handler so the mutated plans render immediately.
  loadSequentially();
})();
