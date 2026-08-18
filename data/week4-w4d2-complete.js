(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days[1]) {
    Object.assign(week4.days[1], {
      status: "Completed",
      title: "Reduced easy aerobic support complete",
      detail: "Easy run completed with low cardiovascular cost and no tissue issue reported. Duration exceeded the benchmark-week 40-minute cap by about six minutes, so Wednesday remains deliberately reduced rather than adding any volume.",
      volume: "5.02 mi · ~45:51 · 9:08/mi · 122 avg HR"
    });
  }

  if (sessions.w4d2) {
    sessions.w4d2.note = `${sessions.w4d2.note} Completed Aug 18: 5.02 miles in approximately 45:51 at 9:08/mi and 122 average HR. No tissue issue was reported. The run exceeded the 40-minute cap by about six minutes; no compensatory reduction is required beyond keeping Wednesday's already-reduced tempo exactly as prescribed.`;
  }
})();
