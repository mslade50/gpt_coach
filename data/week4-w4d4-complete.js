(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days[3]) {
    Object.assign(week4.days[3], {
      status: "Completed",
      title: "150 m benchmark complete + reduced Upper B",
      detail: "Single timed 150 m completed in 18.8 s as prescribed. No second attempt. No pain or noteworthy tissue issue was reported. Reduced Upper B was completed as prescribed.",
      volume: "150 m: 18.8 s · reduced elbow-tolerant Upper B completed"
    });

    week4.statusNote = `${week4.statusNote} Thursday benchmark result: 18.8 s for 150 m. Timing method and conditions remain to be recorded before treating the result as fully comparable across sessions.`;
  }

  if (sessions.w4d4) {
    sessions.w4d4.note = `${sessions.w4d4.note} Completed Aug 20 as prescribed: one timed 150 m in 18.8 s, no second attempt, no noteworthy pain or tissue issue reported, and reduced Upper B completed.`;
  }
})();
