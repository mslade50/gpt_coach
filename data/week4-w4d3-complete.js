(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days[2]) {
    Object.assign(week4.days[2], {
      status: "Completed",
      title: "Reduced relaxed tempo — completed",
      detail: "Full prescribed 2 × 3 × 100 m / 600 m relaxed-tempo session completed without a noteworthy tissue or technical issue. Thursday's single timed 150 m benchmark remains readiness-gated.",
      volume: "2 × 3 × 100 m / 600 m total; completed as prescribed"
    });
  }

  if (sessions.w4d3) {
    sessions.w4d3.note = `${sessions.w4d3.note} Completed Aug 19 as prescribed with no noteworthy issue.`;
  }
})();
