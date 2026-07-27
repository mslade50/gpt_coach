(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];

  // Dashboard shorthand only. Exact exercise selection, sets, loading and readiness
  // modifications are published with each approved weekly prescription.
  const liftExpectations = {
    2: [
      "Full Body A",
      "None",
      "Optional upper accessories only",
      "Power / Upper B",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    3: [
      "Full Body A",
      "None",
      "Optional upper accessories only",
      "Power / Upper B",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    4: [
      "Reduced Full Body A",
      "None",
      "None planned",
      "Reduced Upper B; minimal lower-body work",
      "None",
      "Optional light Upper C",
      "None"
    ],
    5: [
      "Full Body A",
      "None",
      "Optional upper accessories only",
      "Power / Upper B",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    6: [
      "Full Body A",
      "None",
      "Optional upper accessories only",
      "Power / Upper B",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    7: [
      "Full Body A",
      "None",
      "Optional upper accessories only",
      "Upper B + minimal power",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    8: [
      "Reduced Full Body A",
      "None",
      "None planned",
      "Reduced Upper B; no hard lower-body work",
      "None",
      "Optional light Upper C",
      "None"
    ],
    9: [
      "Full Body A — lower maintenance",
      "None",
      "Optional upper accessories only",
      "Upper B; lower body minimal or absent",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    10: [
      "Reduced Full Body A",
      "None",
      "Optional upper accessories only",
      "Upper B or power only when appropriate",
      "None",
      "Optional Upper C / arms",
      "None"
    ],
    11: [
      "Reduced Full Body A",
      "None",
      "None planned",
      "Reduced Upper B; no lower-body work",
      "None",
      "Optional Upper C only if recovered",
      "None"
    ],
    12: [
      "Reduced Full Body A",
      "None",
      "None planned",
      "Reduced Upper B only if fresh; no lower-body work",
      "None",
      "None planned",
      "None"
    ],
    13: [
      "Low-volume neural Full Body A",
      "None",
      "None planned",
      "Reduced Upper B / optional second neural touch",
      "None",
      "None planned",
      "None"
    ],
    14: [
      "Very small neural strength touch",
      "None",
      "None",
      "None",
      "None",
      "None — race day",
      "None"
    ]
  };

  const titleSuffixByLift = (lift) => {
    if (!lift || lift === "None" || lift === "None planned") return "";
    return lift;
  };

  plans.forEach((plan) => {
    if (!plan || plan.week < 2 || !Array.isArray(plan.days)) return;
    const weekLifts = liftExpectations[plan.week];
    if (!weekLifts) return;

    plan.statusNote = `${plan.statusNote} Macro lift shorthand: Full Body A = primary lower-body maintenance plus primary upper body; Power / Upper B = small power or reduced lower-body work plus secondary upper body; Upper C = optional hypertrophy or arms. Exact details remain readiness-dependent.`;

    plan.days.forEach((day, index) => {
      if (!day) return;
      const lift = weekLifts[index] || "None";
      const originalRunningVolume = day.volume;
      const suffix = titleSuffixByLift(lift);

      if (suffix) day.title = `${day.title} + ${suffix}`;
      day.volume = `Running: ${originalRunningVolume} · Lifting: ${lift}`;
    });
  });
})();
