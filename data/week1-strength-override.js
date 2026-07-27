(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const week1 = plans.find((plan) => plan.week === 1);
  if (!week1 || !Array.isArray(week1.days) || week1.days.length < 7) return;

  week1.focus = "Controlled acceleration exposure, submaximal sprint rhythm, one primary lower-body maintenance exposure, two primary upper-body exposures, and aerobic support.";
  week1.statusNote = "Monday's official session included the primary lower-body work but omitted Upper A. For Week 1 only, Upper A moves to Tuesday. Thursday retains the second upper exposure and remains readiness-gated; Saturday arms are optional.";

  Object.assign(week1.days[0], {
    title: "Acceleration foundation + lower strength",
    detail: "Official completed high-output session with straight-bar deadlift 455 × 3 × 3. Upper A was omitted; no additional Monday work.",
    volume: "160 m acceleration + 80 m buildups; 11 lower/core working sets"
  });

  Object.assign(week1.days[1], {
    title: "Easy aerobic + Upper A",
    detail: "Conversational easy run plus the first primary upper-body exposure. This Tuesday placement is a Week 1 correction, not extra lower-body volume.",
    volume: "35–45 min easy + 10 upper-body working sets"
  });

  Object.assign(week1.days[3], {
    title: "Controlled sprint rhythm + Upper B",
    detail: "Readiness-gated sprint rhythm, a small green-day power primer, and the second primary upper-body exposure.",
    volume: "Provisional 5 × 100 m + 3 × 3 low box jumps + 10 upper-body sets"
  });

  Object.assign(week1.days[4], {
    detail: "Rest, walking, or very easy cycling only. No lifting is required."
  });

  Object.assign(week1.days[5], {
    title: "Longer easy + optional arms",
    detail: "Low-stress aerobic maintenance with optional direct arm and shoulder volume if it will not create Monday soreness.",
    volume: "45–55 min easy + optional 8 arm/shoulder sets"
  });
})();