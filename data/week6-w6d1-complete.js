(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week6 = plans.find((plan) => plan && plan.week === 6);
  if (week6 && Array.isArray(week6.days) && week6.days[0]) {
    Object.assign(week6.days[0], {
      status: "Completed",
      title: "Hill-to-flat contrast + flying 30s + Full Body A — completed",
      detail: "All prescribed hill accelerations, flat accelerations, flying 30s, jump primer and strength work were completed. No official sprint times were captured, but hand timing was within the prescribed zones. Lifts felt strong across the board and no noteworthy tissue issue was reported.",
      volume: "Full prescribed sprint/jump dose + 11 strength sets; hand timing in target zones"
    });
  }

  if (window.CURRENT_ATHLETE_STATE) {
    window.CURRENT_ATHLETE_STATE.mostRecentHighOutput = "Week 6 Monday: full hill-to-flat acceleration contrast, first flying-30 exposure and Full Body A completed. Hand timing was within prescribed zones; lifts felt strong; no noteworthy tissue issue reported.";
  }

  if (sessions.w6d1) {
    sessions.w6d1.note = `${sessions.w6d1.note} Completed Aug 31 as prescribed. All hill, flat acceleration, flying-30, jump and lifting work was completed. No official times were captured; hand timing was within the prescribed zones. Lifts felt strong and no noteworthy tissue issue was reported.`;
  }
})();
