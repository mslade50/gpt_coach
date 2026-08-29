(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (week5 && Array.isArray(week5.days) && week5.days[5]) {
    Object.assign(week5.days[4], {
      status: "Completed",
      detail: "Full rest completed as prescribed."
    });

    Object.assign(week5.days[5], {
      status: "Completed",
      title: "Longer easy aerobic support — completed",
      detail: "The required easy run was completed with low cardiovascular cost and no noteworthy tissue issue reported. Duration was 2:32 above the 60-minute cap, so no optional or make-up work is added.",
      volume: "62:32 · 7.35 mi · ~8:30/mi · 126 avg HR"
    });
  }

  if (sessions.w5d5) {
    sessions.w5d5.note = `${sessions.w5d5.note} Full rest completed Aug 28 as prescribed.`;
  }

  if (sessions.w5d6) {
    sessions.w5d6.note = `${sessions.w5d6.note} Completed Aug 29: 62:32, 7.35 miles, approximately 8:30/mi, 126 average HR. Duration exceeded the 60-minute cap by 2:32, but aerobic cost remained low and no noteworthy issue was reported. No additional work is added.`;
  }
})();
