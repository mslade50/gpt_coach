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

  // Load the approved Week 3 threshold-replacement schedule after the core app,
  // then trigger the app's existing Today handler so the mutated session plan renders.
  const script = document.createElement("script");
  script.src = "data/week3-threshold-swap.js";
  script.onload = rerenderCurrentSession;
  script.onerror = applySundayPreview;
  document.head.appendChild(script);
})();