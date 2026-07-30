(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const week1 = plans.find((plan) => plan.week === 1);
  if (!week1 || !Array.isArray(week1.days) || week1.days.length < 7) return;

  Object.assign(week1.days[4], {
    type: "Low",
    status: "Planned",
    title: "Moved longer easy aerobic support",
    detail: "Schedule swap: Saturday's longer easy run moves to Friday morning. Proceed only with normal gait and no localized or worsening sprint-tissue issue. No lifting and no fast finish.",
    volume: "50–55 min easy; trainers; flat or gently rolling route"
  });

  Object.assign(week1.days[5], {
    type: "Recovery",
    status: "Planned",
    title: "Off / normal daily movement",
    detail: "Weekend conflict. Saturday's aerobic work was moved to Friday. No make-up training and optional arms are omitted this week.",
    volume: "No training required"
  });

  window.SESSION_PLANS = window.SESSION_PLANS || {};

  window.SESSION_PLANS.w1d5 = {
    purpose: "Moved longer easy aerobic support",
    duration: "50–55 min",
    volume: "50–55 min easy running",
    footwear: "Trainers on a flat or gently rolling, predictable route",
    note: "This replaces Saturday's longer easy run; it is not additional volume. Because it occurs the morning after Thursday's high-output session, cap the run at 55 minutes and keep it strictly conversational. No strides, hills, fast finish or lifting.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "morning-gait", name: "Walk / first-steps check", dosage: "Normal gait; no sharp, localized, worsening or one-sided hamstring, calf/Achilles, foot/ankle or adductor/hip issue" },
          { id: "first-ten", name: "First 10-minute check", dosage: "Begin extremely easy. Continue only if stiffness stays stable or improves and your stride remains symmetrical" }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "easy-run", name: "Easy run", dosage: "50 minutes target, 55-minute hard cap; conversational effort / RPE 2–3; no fast finish" },
          { id: "surface", name: "Route", dosage: "Flat or gently rolling and predictable; avoid steep hills and technical terrain" }
        ]
      },
      {
        name: "No added work",
        items: [
          { id: "no-strides", name: "No strides or drills", dosage: "The purpose is low-cost aerobic support and circulation, not another speed exposure" },
          { id: "no-lifting", name: "No lifting", dosage: "Upper B was completed Thursday; optional Saturday arm volume is omitted this week" }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "30–40 min easy, or 25–35 min very easy cycling if generalized soreness is more than expected but gait is normal" },
          { id: "red", name: "Red alternative", dosage: "Full rest for localized, worsening, sharp or gait-altering symptoms" }
        ]
      }
    ]
  };

  window.SESSION_PLANS.w1d6 = {
    purpose: "Off / normal daily movement",
    duration: "All day",
    volume: "No training required",
    footwear: "Not applicable",
    note: "Saturday's planned longer easy run was completed Friday because of weekend conflicts. Do not compensate with extra work. Optional arms are omitted this week.",
    blocks: [
      {
        name: "Recovery",
        items: [
          { id: "normal-movement", name: "Normal daily movement only", dosage: "Walking is fine; no planned run, conditioning or lifting" }
        ]
      }
    ]
  };
})();
