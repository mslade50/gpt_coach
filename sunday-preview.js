(() => {
  "use strict";

  const now = new Date();
  if (now.getDay() !== 0) return;

  const nextWeek = document.getElementById("nextWeek");
  const meta = document.getElementById("weekPlanMeta");
  if (!nextWeek || nextWeek.disabled || !meta) return;

  // Saturday evening starts the preview; keep that next-week view active through Sunday.
  nextWeek.click();
  meta.textContent = meta.textContent.replace("manual view", "Sunday preview");
})();