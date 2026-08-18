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
      detail: "First formal Monday profile completed without pain. Acceleration was repeatable and improved on the final attempt. Flying-20 performance declined after the first rep, so 2.01 s is provisional and the later reps are treated as fatigue/timing-reliability data rather than averaged. CMJ was recorded in 120 fps iPhone slow motion; displayed flight intervals of 2.19 and 2.35 s correspond to approximately 0.548 and 0.588 s actual flight time under standard 4× playback, or approximately 14.5 and 16.7 inches estimated height.",
      volume: "CMJ: ~14.5 / 16.7 in · broad jump: 93 / 94 / 92 in · 30 m: 4.11 / 4.11 / 3.99 s · fly 20: 2.01 / 2.10 / 2.18 s"
    });
  }

  const session = sessions.w4d1;
  if (session) {
    session.note = `${session.note} Completed Aug 17. Results: CMJ approximately 14.5/16.7 in from 120 fps slow-motion flight timing; broad jump 93/94/92 in; 30 m 4.11/4.11/3.99 s; flying 20 m 2.01/2.10/2.18 s. No pain reported; expected generalized leg fatigue by the end. Reduced strength completion still needs confirmation.`;
  }
})();
