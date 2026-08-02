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

  // Week 1 closeout — review completed August 2, 2026.
  const week1 = plans.find((plan) => plan.week === 1);
  if (week1 && Array.isArray(week1.days) && week1.days.length >= 7) {
    week1.focus = "Week 1 complete: two well-spaced high days, three aerobic-support exposures, lower-body maintenance and two upper-body exposures were absorbed without a localized sprint-tissue problem.";
    week1.statusNote = "Review completed Aug 2. All planned training was completed after the Friday/Saturday schedule swap. No timed sprint trend was established by design. Progress to Week 2's first controlled flying-10 exposure. Technical theme: less deliberate force, more posture, rhythm and quick under-hip contacts. No new body-weight or calorie-trend data were reported, so nutrition remains unchanged through Week 2.";

    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (week1.days[index]) week1.days[index].status = "Completed";
    });
    if (week1.days[6]) {
      week1.days[6].status = "Locked";
      week1.days[6].detail = "Full rest remains non-negotiable. Week 1 review is complete and Week 2 is published.";
    }
  }

  // Week 2 approved prescription — published after the Week 1 review.
  const week2 = plans.find((plan) => plan.week === 2);
  if (!week2 || !Array.isArray(week2.days) || week2.days.length < 7) return;

  week2.title = "Flat acceleration and first flying exposure";
  week2.focus = "Progress from introductory acceleration into the first controlled upright high-speed exposure while retaining relaxed rhythm, lower-body force and aerobic support.";
  week2.statusNote = "Detailed Week 2 sessions published Aug 2 after a green Week 1 tissue response. Monday and Thursday remain same-day readiness-gated. Trainers only; the flying 10s are a teaching exposure, not a benchmark or time trial.";

  const week2Days = [
    {
      day: "Mon",
      type: "High",
      status: "Planned",
      title: "Flat acceleration + flying 10s + Full Body A",
      detail: "First controlled upright high-speed exposure. Full recovery, no timing chase, and strength later when possible.",
      volume: "4 × 20 m acceleration + 4 × flying 10 m; 16 low-pogo contacts + 4 broad jumps; 15 strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Easy aerobic support + tissue maintenance",
      detail: "Conversational running and a small foot/ankle/hip maintenance dose. No upper or lower lifting.",
      volume: "40–45 min easy + 5–7 min maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Extensive tempo / relaxed rhythm",
      detail: "Increase only volume from Week 1 while keeping pace, relaxation and Thursday protection unchanged.",
      volume: "2 × 5 × 100 m / 1,000 m tempo total"
    },
    {
      day: "Thu",
      type: "High",
      status: "Planned",
      title: "Controlled 120 m rhythm + Power / Upper B",
      detail: "Smooth 120 m rhythm with full recovery, a six-contact jump primer and secondary upper-body work.",
      volume: "5 × 120 m / 600 m; 3 × 2 low box jumps; 10 upper-body sets"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "Full rest is acceptable. Optional walking or very easy cycling only when it improves recovery.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Longer easy aerobic support + optional arms",
      detail: "Low-cost aerobic maintenance with optional direct arm/shoulder work that cannot create Monday soreness.",
      volume: "50–55 min easy, 60-min cap + optional 8 arm/shoulder sets"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + weekly review",
      detail: "Non-negotiable complete rest and Week 2 review anchor.",
      volume: "No training"
    }
  ];

  week2Days.forEach((day, index) => Object.assign(week2.days[index], day));

  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  sessions.w2d1 = {
    purpose: "Flat acceleration + first flying 10s + Full Body A",
    duration: "115–135 min total; split track and strength when possible",
    volume: "4 × 20 m acceleration + 4 × flying 10 m; 16 low-pogo contacts + 4 broad jumps; 15 strength sets",
    footwear: "Trainers on a dry, firm, predictable track",
    note: "This is the first upright high-speed exposure, not a benchmark. Final green / amber / red execution requires Monday morning readiness. Do not time the flying 10s. One side-view video is useful only when it does not change how you run.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; sleep/general readiness acceptable; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no meaningful change" },
          { id: "warmup-gate", name: "Warm-up response", dosage: "Proceed only if movement becomes more coordinated and no localized discomfort increases" }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "5 minutes, beginning very easy" },
          { id: "forward-skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
          { id: "lateral-shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
          { id: "backward-run", name: "Relaxed backward run", dosage: "1 × 20 m" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side; controlled range" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side; tall trunk" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side; firm but comfortable" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and foot placement without reaching." },
          { id: "ankle-cycle", name: "Supported ankle cycle → walking dribble", dosage: "1 × 5 each leg supported, then 1 × 10 m walking only if organized. Cue: Over the ankle, down under the hip. Purpose: rehearse a short recovery path for upright sprinting. If scrambled, omit travel and repeat the supported version." }
        ]
      },
      {
        name: "Elastic primer",
        items: [
          { id: "low-pogo", name: "Low ankle pogo", dosage: "2 × 8 contacts; 45–60 sec rest. Cue: Quiet and quick, not high." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 40 m at approximately 60% velocity; walk back" },
          { id: "buildup-75", name: "Buildup 2", dosage: "1 × 40 m at approximately 75% velocity; 90 sec rest" },
          { id: "buildup-85", name: "Buildup 3", dosage: "1 × 50 m at approximately 85% velocity; 2 min rest" }
        ]
      },
      {
        name: "Flat acceleration",
        items: [
          { id: "accelerations", name: "4 × 20 m from two-point start", dosage: "Approximately 90–95% velocity; 3½ min recovery. Smooth projection and gradual rise; do not strain." },
          { id: "accel-stop", name: "Acceleration stop rule", dosage: "End or reduce when projection or first-step quality clearly declines, you repeatedly pop upright, or two consecutive reps are mechanically worse" }
        ]
      },
      {
        name: "First flying exposure",
        items: [
          { id: "flying-tens", name: "4 × flying 10 m", dosage: "20–25 m progressive buildup + 10 m fly zone + 30–40 m gradual deceleration; approximately 90–95% velocity; 4½–5 min recovery; do not time" },
          { id: "fly-cue", name: "Primary cue", dosage: "Tall and down. Let speed come from posture and rhythm rather than forcing stride length or frequency." },
          { id: "fly-stop", name: "Maximum-velocity stop rule", dosage: "Stop at 2–3 reps if relaxation disappears, contacts become louder/longer, you reach or strain, mechanics worsen, or localized discomfort increases" }
        ]
      },
      {
        name: "Developmental jump",
        items: [
          { id: "broad-jump", name: "Standing broad jump with stick", dosage: "2 × 2 at approximately 85–90%; 60–90 sec rest; full reset. Stop for loud/unstable landings, asymmetry or approximately 5% visible output loss." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; finish relaxed" }
        ]
      },
      {
        name: "Full Body A — later when possible",
        items: [
          { id: "deadlift", name: "Straight-bar deadlift", dosage: "Warm-ups, then 455 lb × 3 × 3; 3 min rest. Stop at two work sets if bar speed slows materially or RPE exceeds 8." },
          { id: "bench", name: "Barbell bench press", dosage: "245 lb × 5 × 3 at RPE 7–8; 2½–3 min rest. Reduce to 235–240 if the first set exceeds RPE 8." },
          { id: "vertical-pull", name: "Pull-up or lat pulldown", dosage: "3 × 6–8 at RPE 7–8; 90–120 sec rest" },
          { id: "rfess", name: "Rear-foot-elevated split squat", dosage: "2 × 4 each leg at RPE 7; 90–120 sec rest" },
          { id: "row", name: "Chest-supported row", dosage: "2 × 8–10 at RPE 7–8; 90 sec rest" },
          { id: "calf", name: "Standing calf raise", dosage: "2 × 6 at RPE 7–8; 90 sec rest" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate 15–30 min before." },
          { id: "intra-fuel", name: "During", dosage: "Water/electrolytes. Add 30–60 g carbohydrate per hour when track and strength are combined, the session is prolonged, or conditions are hot." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein plus a substantial carbohydrate feeding, fluid/sodium replacement and a normal complete meal within several hours." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "3 × 20 m at about 90%; then 2 × flying 10 m at about 90% only when the warm-up becomes fully normal. Otherwise omit flys. Use 1 × 8 pogos, omit broad jumps, deadlift 2 × 3 at 435–455, bench 2 × 5 and omit RFESS." },
          { id: "red", name: "Red alternative", dosage: "No sprinting, plyometrics or lower-body lifting. Full rest or 25–35 min very easy cycling when symptom-free. Upper work only when the red flag is isolated to the lower body and systemic readiness is otherwise normal." }
        ]
      }
    ]
  };

  sessions.w2d2 = {
    purpose: "Easy aerobic support + tissue maintenance",
    duration: "48–58 min",
    volume: "40–45 min easy + 5–7 min maintenance",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The first 8–10 minutes are the warm-up. Keep the full run conversational with no fast finish. No lifting is scheduled.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "First-steps check", dosage: "Normal gait; no sharp, localized, worsening or one-sided hamstring, calf/Achilles, foot/ankle or adductor/hip issue" }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "warmup", name: "Gradual opening", dosage: "2 min brisk walk or shuffle, then 8 min very easy running" },
          { id: "easy-run", name: "Easy run", dosage: "Continue to 40–45 min total at conversational effort / RPE 2–3; no hills, strides or fast finish" }
        ]
      },
      {
        name: "Tissue maintenance",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "calf-iso", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "fuel", name: "Around the session", dosage: "Normal pre-run carbohydrate as useful, water/electrolytes according to heat, then 25–40 g protein and a normal carbohydrate-containing meal afterward." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "25–35 min easy, or 25–35 min very easy cycling if impact feels unnecessarily costly; omit maintenance that aggravates a region." },
          { id: "red", name: "Red alternative", dosage: "Full rest for sharp, localized, worsening or gait-altering symptoms." }
        ]
      }
    ]
  };

  sessions.w2d3 = {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "45–60 min",
    volume: "2 × 5 × 100 m / 1,000 m tempo total",
    footwear: "Trainers on a forgiving track surface or predictable flat grass",
    note: "This progresses Week 1 by adding one 100 m repetition per set while keeping intensity unchanged. The session should leave Thursday protected, not taxed.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "Walk and easy-jog check", dosage: "Normal gait and no localized/worsening sprint-tissue issue. Generalized soreness may proceed only when stable or improving." }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "6 minutes, beginning very easy" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
          { id: "leg-swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg; pelvis quiet" }
        ]
      },
      {
        name: "Technical preparation",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: posture and under-body foot placement." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: light elastic rhythm without sprint effort." },
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60% velocity; walk back" },
          { id: "buildup-70", name: "Buildup 2", dosage: "1 × 60 m at approximately 70% velocity; 60–90 sec rest" }
        ]
      },
      {
        name: "Extensive tempo",
        items: [
          { id: "set-1", name: "Set 1", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "set-rest", name: "Set recovery", dosage: "3 min walking/standing; begin Set 2 only if rhythm, relaxation and tissue response remain stable" },
          { id: "set-2", name: "Set 2", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "cue", name: "Primary cue", dosage: "Float and stay quiet. Athletic contacts without deliberately forcing the ground." },
          { id: "stop", name: "Stop rule", dosage: "Stop or reduce when contacts get louder, you begin pressing/reaching, stride becomes asymmetric, or soreness increases/localizes." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; no added aerobic volume" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "fuel", name: "Around the session", dosage: "Use a carbohydrate-containing pre-session meal/snack, water/electrolytes as needed, then 25–40 g protein and a normal carbohydrate serving afterward." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Repeat Week 1's 2 × 4 × 100 m / 800 m total with the same recoveries." },
          { id: "red", name: "Red alternative", dosage: "No tempo. Full rest or 25–35 min very easy cycling only when symptom-free." }
        ]
      }
    ]
  };

  sessions.w2d4 = {
    purpose: "Controlled 120 m rhythm + Power / Upper B",
    duration: "100–125 min total; split preferred",
    volume: "5 × 120 m / 600 m + 3 × 2 low box jumps + 10 upper-body sets",
    footwear: "Trainers on a dry, predictable track surface",
    note: "The 120s extend Thursday's rhythm without becoming speed-endurance testing. Do not time this session. Final execution is governed by Thursday morning readiness and the response to Monday's flying exposure.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; no localized/worsening issue; Monday's hamstring, calf/Achilles, foot/ankle and adductor response fully settled" },
          { id: "warmup-gate", name: "Warm-up response", dosage: "Proceed only when stiffness stays stable or improves and movement remains symmetrical" }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "5 minutes, beginning very easy" },
          { id: "forward-skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
          { id: "lateral-shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
          { id: "backward-run", name: "Relaxed backward run", dosage: "1 × 20 m" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: connect upright posture to relaxed elastic rhythm." }
        ]
      },
      {
        name: "Power primer — green only",
        items: [
          { id: "box-jump", name: "Low box jump with stick", dosage: "3 × 2; full reset; 60–90 sec between sets. Quiet, stable landing. Stop for asymmetry, loud contacts or degraded position." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60% velocity; walk back" },
          { id: "buildup-72", name: "Buildup 2", dosage: "1 × 60 m at approximately 70–75% velocity; 90 sec rest" },
          { id: "buildup-82", name: "Buildup 3", dosage: "1 × 80 m at approximately 80–85% velocity; 2–3 min rest" }
        ]
      },
      {
        name: "Controlled 120 m rhythm",
        items: [
          { id: "one-twenties", name: "5 × 120 m", dosage: "Approximately 80–85% velocity; 4½–5 min recovery. Build 30 m, float 70 m, hold 20 m. No timing." },
          { id: "cue", name: "Primary cue", dosage: "Float fast — do not press. Maintain tall posture and quick contacts beneath the hips." },
          { id: "stop", name: "Stop rule", dosage: "End at 3–4 reps if two consecutive reps become louder, reachier, tighter or mechanically worse despite full recovery; stop immediately for localized worsening discomfort or gait change." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; finish relaxed" }
        ]
      },
      {
        name: "Upper B — later when possible",
        items: [
          { id: "incline-db", name: "Paused incline dumbbell press", dosage: "80 lb dumbbells × 6 × 3; 2 min rest. Keep 1–3 reps in reserve and do not chase a first-set rep record." },
          { id: "row", name: "Cable or chest-supported row", dosage: "3 × 8–10 at RPE 7–8; 90–120 sec rest" },
          { id: "shoulder-press", name: "Landmine or machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
          { id: "rear-delt", name: "Rear-delt fly", dosage: "2 × 15–20 at RPE 8; 60 sec rest" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate shortly before." },
          { id: "intra-fuel", name: "During", dosage: "Water/electrolytes; add carbohydrate when track and lift are combined, conditions are hot or total duration is prolonged." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein, substantial carbohydrate, fluid/sodium replacement and a normal meal within several hours." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Omit box jumps. Perform 3 × 120 m at approximately 80% with 5 min recovery. Reduce Upper B to 2 sets each of incline press and row, 2 sets shoulder press, and omit rear delts." },
          { id: "red", name: "Red alternative", dosage: "No sprinting or jumping. Full rest or 25–35 min very easy cycling only when symptom-free. Upper B only when the red flag is isolated to the lower body and systemic readiness is normal." }
        ]
      }
    ]
  };

  sessions.w2d5 = {
    purpose: "Recovery and absorption",
    duration: "0–35 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday is not an opportunity to add mileage. Choose the lowest-cost option that improves recovery from Thursday.",
    blocks: [
      {
        name: "Recovery options",
        items: [
          { id: "rest", name: "Full rest", dosage: "Preferred when you feel normal and do not need active recovery" },
          { id: "walk", name: "Easy walk", dosage: "Optional 15–30 min at normal relaxed pace" },
          { id: "cycle", name: "Very easy cycle", dosage: "Optional 20–35 min at RPE 1–2, light resistance, only when it leaves the legs looser" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "fuel", name: "Recovery-day intake", dosage: "Keep protein near the normal daily target, include enough carbohydrate to restore Thursday, and avoid an aggressive deficit." }
        ]
      }
    ]
  };

  sessions.w2d6 = {
    purpose: "Longer easy aerobic support + optional arms",
    duration: "50–90 min",
    volume: "50–55 min easy, 60-min cap + optional 8 arm/shoulder sets",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The run is the required work. Direct arm/shoulder volume is optional and must not create chest, shoulder or lat soreness that changes Monday sprint posture or arm action.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "First-steps check", dosage: "Normal gait and no localized/worsening lower-body issue" }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "opening", name: "Gradual opening", dosage: "First 10 min extremely easy" },
          { id: "easy-run", name: "Easy run", dosage: "50–55 min target, 60-min hard cap; conversational / RPE 2–3; no fast finish" }
        ]
      },
      {
        name: "Optional Upper C / arms",
        items: [
          { id: "curl", name: "Cable or dumbbell curl", dosage: "3 × 10–15 at RPE 8; 60–75 sec rest" },
          { id: "triceps", name: "Rope pressdown or overhead cable extension", dosage: "3 × 10–15 at RPE 8; 60–75 sec rest" },
          { id: "lateral", name: "Lateral raise", dosage: "2 × 15–20 at RPE 8; 60 sec rest" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "fuel", name: "Around the session", dosage: "Normal pre-run carbohydrate as useful, water/electrolytes according to conditions, then 25–40 g protein and a carbohydrate-containing meal afterward." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "35–45 min easy and omit optional arms." },
          { id: "red", name: "Red alternative", dosage: "Full rest or 25–35 min very easy cycling only when symptom-free." }
        ]
      }
    ]
  };

  sessions.w2d7 = {
    purpose: "Full rest + weekly review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Sunday remains the non-negotiable rest day. Normal daily movement only; no make-up work.",
    blocks: [
      {
        name: "Rest",
        items: [
          { id: "full-rest", name: "No training", dosage: "Normal daily movement only" }
        ]
      }
    ]
  };
})();