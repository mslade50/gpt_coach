(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days[0]) {
    Object.assign(week4.days[0], {
      status: "Completed",
      title: "Benchmark complete: jumps, 30 m and flying 20",
      detail: "First formal Monday profile completed without pain. Acceleration was repeatable and improved on the final attempt. Flying-20 performance declined after the first rep, so 2.01 s is provisional and the later reps are treated as fatigue/timing-reliability data rather than averaged into the benchmark. CMJ unit/method remains to be confirmed.",
      volume: "Broad jump: 93 / 94 / 92 in · 30 m: 4.11 / 4.11 / 3.99 s · fly 20: 2.01 / 2.10 / 2.18 s · CMJ: 2.19 / 2.35 (unit pending)"
    });
  }

  const session = sessions.w4d1;
  if (session) {
    session.note = `${session.note} Completed Aug 17. Results: broad jump 93/94/92 in; 30 m 4.11/4.11/3.99 s; flying 20 m 2.01/2.10/2.18 s; CMJ 2.19/2.35 with unit/method pending. No pain reported; expected generalized leg fatigue by the end. Reduced strength completion still needs confirmation.`;
  }
})();
