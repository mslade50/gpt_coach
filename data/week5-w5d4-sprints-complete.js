(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (week5 && Array.isArray(week5.days) && week5.days[3]) {
    Object.assign(week5.days[3], {
      status: "Completed",
      title: "Timed 120 m speed endurance — completed",
      detail: "Three timed 120 m repetitions were completed in 16.3 / 16.1 / 16.3 s. All were inside the broad 15.8–16.4 profile-derived band, and the slowest repetition was only about 1.2% behind the day's best. The athlete felt good throughout with no reported mechanical or tissue issue. Upper B completion was not separately reported.",
      volume: "3 × 120 m / 360 m · 16.3 / 16.1 / 16.3 s"
    });
  }

  if (sessions.w5d4) {
    sessions.w5d4.note = `${sessions.w5d4.note} Track completed: 120 m repetitions in 16.3/16.1/16.3 s. All were within the prescribed broad band and within approximately 1.2% of the day's best. Athlete reported the session felt good throughout and noted that 95% versus 100% effort was difficult to distinguish. Upper B completion was not separately reported.`;
  }
})();
