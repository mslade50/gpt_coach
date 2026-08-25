(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (week5 && Array.isArray(week5.days) && week5.days[1]) {
    Object.assign(week5.days[1], {
      status: "Completed",
      title: "Easy aerobic support + tissue/elbow check — completed",
      detail: "Completed with appropriately controlled aerobic cost and no noteworthy lower-body or medial-elbow response after Monday's speed, lifting and strapped-row re-entry. Thursday's conditional pulling remains available pending the normal Wednesday/Thursday readiness checks.",
      volume: "46 min · 8:17/mi · 132 avg HR"
    });
  }

  if (sessions.w5d2) {
    sessions.w5d2.note = `${sessions.w5d2.note} Completed Aug 25: 46 minutes at 8:17/mi with 132 average HR. No noteworthy tissue or elbow issue was reported. Duration was one minute above the target range but within the 50-minute cap.`;
  }
})();
