(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (week5 && Array.isArray(week5.days) && week5.days[0]) {
    Object.assign(week5.days[0], {
      status: "Completed",
      title: "Profile-guided speed + Full Body A — completed",
      detail: "All prescribed sprint, jump and lifting work was completed. Accelerations and flying 20s felt smooth, but no timing was collected because of a time constraint, so velocity repeatability and the benchmark-derived bands could not be evaluated objectively.",
      volume: "Full prescribed sprint/jump dose + 11 strength sets; no sprint times"
    });
  }

  if (sessions.w5d1) {
    sessions.w5d1.note = `${sessions.w5d1.note} Completed Aug 24 as prescribed. All sprint and lifting efforts felt smooth. No timing was collected because of a time constraint, so the session is logged as a successful qualitative exposure rather than a timed repeatability result.`;
  }
})();
