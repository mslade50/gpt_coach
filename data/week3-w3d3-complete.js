(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days[2]) {
    Object.assign(week3.days[2], {
      status: "Completed",
      title: "Controlled 3-2 float threshold replacement",
      detail: "Completed Aug 12 as the replacement for extensive tempo. The full four-round dose felt controlled rather than maximal; the main limitation was mental rust with sustained threshold pressure, not physical breakdown.",
      volume: "51:08 · 6.35 mi · 8:03/mi avg · 146 avg HR · 308 ft gain · effort 6"
    });
  }

  if (sessions.w3d3) {
    sessions.w3d3.note = `${sessions.w3d3.note} Completed Aug 12: 51:08, 6.35 miles, 8:03/mi average, 146 average HR, 308 ft gain, Apple effort 6. Athlete reported the session felt solid and not excessively difficult, with some mental threshold rust.`;
  }
})();
