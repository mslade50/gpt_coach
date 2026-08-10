(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  // Week 2 closeout — review completed August 9, 2026.
  const week2 = plans.find((plan) => plan && plan.week === 2);
  if (week2 && Array.isArray(week2.days) && week2.days.length >= 7) {
    week2.focus = "Week 2 complete: the first flying-10 exposure, 120 m rhythm progression, two primary lifting exposures and all three aerobic-support sessions were completed without a persistent sprint-tissue problem.";
    week2.statusNote = "Review completed Aug 9. Monday's flying work felt good and no delayed tissue issue followed. Thursday's final two 120s produced transient left calf/shin fatigue without pain or gait change; Friday rest and Saturday running produced no reported recurrence. Saturday's easy run drifted toward moderate when cadence became the focus. Progress to Week 3 while keeping trainers, omitting spikes, reducing Thursday to three 150s, and cueing easy days by effort rather than mechanics. No new seven-day body-weight trend was reported, so nutrition remains unchanged.";

    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (week2.days[index]) week2.days[index].status = "Completed";
    });
    if (week2.days[6]) {
      week2.days[6].status = "Locked";
      week2.days[6].detail = "Full rest remains non-negotiable. Week 2 review is complete and the detailed Week 3 plan is published.";
    }
  }

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (!week3 || !Array.isArray(week3.days) || week3.days.length < 7) return;

  week3.title = "Extend acceleration and upright speed";
  week3.focus = "Complete the teaching phase by extending acceleration to 30 m, the fly zone to 20 m and controlled rhythm to 150 m while preserving tissue health, lower-body force and recoverable upper-body volume.";
  week3.statusNote = "Detailed Week 3 sessions published Aug 9 after the Week 2 review. Trainers remain the required footwear. The architecture permits a tiny spike exposure only when green, but it is intentionally deferred so sprint distance and footwear load do not rise together. Thursday is three 150s rather than four because Week 2 ended with transient unilateral calf/shin fatigue; this preserves the speed-endurance purpose while lowering total intensive volume.";

  const week3Days = [
    {
      day: "Mon",
      type: "High",
      status: "Planned",
      title: "30 m acceleration + flying 20s + Full Body A",
      detail: "Extend sprint distance while holding intensity near Week 2 levels. Full recovery, trainers, no timing chase and no spike exposure.",
      volume: "4 × 30 m acceleration + 4 × flying 20 m; 16 low-pogo contacts + 4 broad jumps; 16 strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Easy aerobic support + tissue maintenance",
      detail: "Conversational running only. Organize effort rather than cadence or sprint mechanics.",
      volume: "45 min target, 50-min cap + 5–7 min maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Extensive tempo / relaxed rhythm",
      detail: "Increase tempo volume to 1,200 m without increasing pace or compromising Thursday.",
      volume: "2 × 6 × 100 m / 1,200 m tempo total"
    },
    {
      day: "Thu",
      type: "High",
      status: "Planned",
      title: "Intro 150 m speed endurance + Power / Upper B",
      detail: "Three controlled 150s introduce speed endurance. The fourth architecture rep is withheld after Week 2 lower-leg fatigue.",
      volume: "3 × 150 m / 450 m; 2 × 2 low box jumps; 12 upper-body sets"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "Full rest is preferred. Optional walk or easy cycle only when it improves recovery; a social upper lift is allowed only under the standing redistribution rule.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Longer easy aerobic support + optional arms",
      detail: "Stay conversational and let stride happen naturally. Optional direct arm/shoulder work is omitted if Friday included social upper-body lifting.",
      volume: "50 min target, 55-min cap + optional 8 arm/shoulder sets"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + weekly review",
      detail: "Non-negotiable complete rest and Week 3 review before the Week 4 benchmark.",
      volume: "No training"
    }
  ];
  week3Days.forEach((day, index) => Object.assign(week3.days[index], day));

  sessions.w3d1 = {
    purpose: "30 m acceleration + first flying 20s + Full Body A",
    duration: "120–145 min total; split track and strength when possible",
    volume: "4 × 30 m acceleration + 4 × flying 20 m; 16 low-pogo contacts + 4 broad jumps; 16 strength sets",
    footwear: "Trainers on a dry, firm, predictable track",
    note: "This is the final teaching-week progression before Week 4 testing. Sprint distance increases, but intensity stays near Week 2 at approximately 92–95%; do not chase 97–100%. No spikes this week. One side-view video is useful only when it does not change execution.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; sleep/general readiness acceptable; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no return of focal left calf/shin symptoms" },
          { id: "warmup-gate", name: "Warm-up response", dosage: "Proceed only if movement becomes more coordinated and any generalized stiffness stays stable or improves" }
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
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position without reaching." },
          { id: "ankle-cycle", name: "Supported ankle cycle → walking dribble", dosage: "1 × 5 each leg supported, then 1 × 10 m walking only if organized. Cue: Over the ankle, down under the hip. Purpose: rehearse a short recovery path. If scrambled, stay supported and do not add travel." }
        ]
      },
      {
        name: "Elastic / power primer",
        items: [
          { id: "low-pogo", name: "Low ankle pogo", dosage: "2 × 8 contacts; 45–60 sec rest. Cue: Quiet and quick, not high." },
          { id: "broad-jump", name: "Standing broad jump with stick", dosage: "2 × 2 at approximately 85–90%; 75–90 sec rest; reset fully. Stop for loud/unstable landings, asymmetry or clear output loss." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 40 m at approximately 60% velocity; walk back" },
          { id: "buildup-75", name: "Buildup 2", dosage: "1 × 50 m at approximately 75% velocity; 90 sec rest" },
          { id: "buildup-85", name: "Buildup 3", dosage: "1 × 60 m at approximately 85% velocity; 2 min rest" }
        ]
      },
      {
        name: "Flat acceleration",
        items: [
          { id: "accelerations", name: "4 × 30 m from two-point start", dosage: "Approximately 92–95% velocity; 4½ min recovery. Smooth projection, strong first steps and gradual rise; do not strain." },
          { id: "accel-cue", name: "Primary acceleration cue", dosage: "Push back and rise gradually." },
          { id: "accel-stop", name: "Acceleration stop rule", dosage: "End when projection/first-step quality meaningfully declines, two consecutive reps are mechanically worse, or localized discomfort increases. If video timing is available, use approximately 3–4% drop-off." }
        ]
      },
      {
        name: "Flying 20 m exposure",
        items: [
          { id: "flying-twenties", name: "4 × flying 20 m", dosage: "25–35 m progressive buildup + 20 m fly zone + 40 m gradual deceleration; approximately 92–95% velocity; 6 min recovery; do not time as a benchmark" },
          { id: "fly-cue", name: "Primary maximum-velocity cue", dosage: "Tall and down. Let speed come from posture and rhythm rather than forcing stride length or frequency." },
          { id: "fly-stop", name: "Maximum-velocity stop rule", dosage: "Stop at 2–3 reps if relaxation disappears, contacts become louder/longer, you reach or strain, mechanics worsen or localized discomfort increases. Use approximately 3% drop-off if comparable video timing is available." }
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
          { id: "deadlift", name: "Straight-bar deadlift", dosage: "Warm-ups, then 455 lb × 3 × 2; 3 min rest. Two work sets are intentional because sprint distance increased. Stop if RPE exceeds 8 or bar speed slows materially." },
          { id: "bench", name: "Barbell bench press", dosage: "250 lb × 5 × 3; 2½–3 min rest; keep every set at RPE 8–8.5 or below. Reduce to 245 if Set 1 exceeds RPE 8." },
          { id: "vertical-pull", name: "Weighted pull-up or lat pulldown", dosage: "+75 lb × 6 × 3 when that stays at RPE 7–8; otherwise reduce load. 2 min rest." },
          { id: "rfess", name: "Rear-foot-elevated split squat", dosage: "2 × 4 each leg at RPE 7; 90–120 sec rest" },
          { id: "row", name: "Chest-supported row", dosage: "2 × 8–10 at RPE 7–8; 90 sec rest. This remains required horizontal pulling rather than being replaced by curls." },
          { id: "calf", name: "Standing calf raise", dosage: "2 × 6 at RPE 7–8; 90 sec rest. Omit if left calf/shin awareness appeared during sprinting." },
          { id: "triceps", name: "Cable triceps pressdown", dosage: "2 × 10–15 at RPE 8; 60–75 sec rest; leave 1–2 clean reps in reserve" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate shortly before." },
          { id: "intra-fuel", name: "During", dosage: "Water/electrolytes. Add 30–60 g carbohydrate per hour when track and strength are combined, total duration is prolonged or conditions are hot." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein, substantial carbohydrate, fluid/sodium replacement and a normal complete meal within several hours." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "3 × 30 m at approximately 90–92%; then 2 × flying 20 m at approximately 90–92% only if the warm-up becomes fully normal. Use 1 × 8 pogos, omit broad jumps, deadlift 2 × 3 at 435–455, bench 2 × 5 and omit RFESS/calf work." },
          { id: "red", name: "Red alternative", dosage: "No sprinting, plyometrics or lower-body lifting. Full rest or 25–35 min very easy cycling when symptom-free. Upper work only when the red flag is isolated to the lower body and systemic readiness is otherwise normal." }
        ]
      }
    ]
  };

  sessions.w3d2 = {
    purpose: "Easy aerobic support + tissue maintenance",
    duration: "50–60 min",
    volume: "45 min easy target, 50-min cap + 5–7 min maintenance",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The first 8–10 minutes are the warm-up. Easy-day success is low cost, not a target cadence or polished sprint-shaped stride. Use effort first and no fast finish.",
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
          { id: "opening", name: "Gradual opening", dosage: "2 min brisk walk or shuffle, then 8 min extremely easy running" },
          { id: "easy-run", name: "Easy run", dosage: "Continue to 45 min total; 50-min hard cap; conversational / RPE 2–3. Full sentences must remain effortless. No hills, strides, cadence target or fast finish." },
          { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
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
          { id: "fuel", name: "Around the session", dosage: "Use normal pre-run carbohydrate as useful, water/electrolytes according to conditions, then 25–40 g protein and a carbohydrate-containing meal afterward." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "30–40 min easy, or 25–35 min very easy cycling if generalized soreness is greater than expected but gait is normal." },
          { id: "red", name: "Red alternative", dosage: "Full rest for sharp, localized, worsening or gait-altering symptoms." }
        ]
      }
    ]
  };

  sessions.w3d3 = {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "48–62 min",
    volume: "2 × 6 × 100 m / 1,200 m tempo total",
    footwear: "Trainers on a track or predictable flat grass",
    note: "Only tempo volume progresses. Pace, relaxation and recovery remain unchanged so Thursday's 150 m work begins fresh.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "walk-jog-check", name: "Walk and easy-jog check", dosage: "Normal gait; no sharp, localized, worsening or one-sided issue. Generalized soreness may proceed only if stable or improving." }
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
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side; controlled range" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side; tall trunk" },
          { id: "leg-swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg; pelvis stays quiet" }
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
          { id: "set-1", name: "Set 1", dosage: "6 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "set-rest", name: "Set recovery", dosage: "3 min walking/standing; begin Set 2 only if rhythm, relaxation and tissue response remain stable" },
          { id: "set-2", name: "Set 2", dosage: "6 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "cue", name: "Primary cue", dosage: "Float and stay quiet. Athletic contacts without deliberately forcing the ground." },
          { id: "stop", name: "Stop rule", dosage: "Stop or reduce when contacts get louder, you begin pressing/reaching, stride becomes asymmetric or soreness increases/localizes." }
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
          { id: "amber", name: "Amber modification", dosage: "Repeat Week 2's 2 × 5 × 100 m / 1,000 m total with the same recoveries." },
          { id: "red", name: "Red alternative", dosage: "No tempo. Full rest or 25–35 min very easy cycling only when symptom-free." }
        ]
      }
    ]
  };

  sessions.w3d4 = {
    purpose: "Intro 150 m speed endurance + Power / Upper B",
    duration: "100–125 min total; split preferred",
    volume: "3 × 150 m / 450 m + 2 × 2 low box jumps + 12 upper-body sets",
    footwear: "Trainers on a dry, predictable track surface",
    note: "This introduces speed endurance without turning Week 3 into a test. The master architecture lists four 150s; three are prescribed because Week 2's last two 120s produced unilateral left calf/shin fatigue. Intensity rises while total intensive volume falls. Do not add a fourth rep even when aerobically fresh.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; no localized/worsening issue; Monday's hamstring, calf/Achilles, foot/ankle and adductor response fully settled; no focal left calf/shin awareness" },
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
          { id: "box-jump", name: "Low box jump with stick", dosage: "2 × 2; full reset; 60–90 sec between sets. Quiet, stable landing. Stop for asymmetry, loud contacts or degraded position." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60% velocity; walk back" },
          { id: "buildup-75", name: "Buildup 2", dosage: "1 × 60 m at approximately 75% velocity; 90 sec rest" },
          { id: "buildup-85", name: "Buildup 3", dosage: "1 × 80 m at approximately 85% velocity; 2–3 min rest" }
        ]
      },
      {
        name: "Introductory 150 m speed endurance",
        items: [
          { id: "one-fifties", name: "3 × 150 m", dosage: "Approximately 85–88% velocity; 7–8 min recovery. Build 30 m, float 90 m, hold 30 m. Do not time this as a benchmark." },
          { id: "cue", name: "Primary cue", dosage: "Float fast—do not press. Carry the rhythm through the final 30 m rather than chasing the line." },
          { id: "stop", name: "Stop rule", dosage: "End after two reps if left calf/shin awareness appears and increases, or if two consecutive reps become louder, reachier, tighter or mechanically worse. Stop immediately for pain, focal tenderness or gait change." }
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
          { id: "incline-db", name: "Paused incline dumbbell press", dosage: "80 lb dumbbells × 6 × 3; 2 min rest. Keep 1–3 reps in reserve." },
          { id: "row", name: "Cable or chest-supported row", dosage: "3 × 8–10 at RPE 7–8; 90–120 sec rest" },
          { id: "shoulder-press", name: "Landmine or machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
          { id: "rear-delt", name: "Rear-delt fly", dosage: "2 × 15–20 at RPE 8; 60 sec rest" },
          { id: "curl", name: "Cable or incline dumbbell curl", dosage: "2 × 10–15 at RPE 8; 60–75 sec rest; no torso swing" }
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
          { id: "amber", name: "Amber modification", dosage: "Omit box jumps. Perform 2 × 150 m at approximately 83–85% with 8 min recovery. Reduce Upper B to 2 sets each of incline press and row, 2 sets shoulder press, and omit rear delts/curls." },
          { id: "red", name: "Red alternative", dosage: "No sprinting or jumping. Full rest or 25–35 min very easy cycling only when symptom-free. Upper B only when the red flag is isolated to the lower body and systemic readiness is normal." }
        ]
      }
    ]
  };

  sessions.w3d5 = {
    purpose: "Recovery and absorption",
    duration: "0–45 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday remains a recovery day by default. A social upper-body lift is an occasional redistribution, not additional weekly volume: upper only, 30–50 min, approximately 6–10 sets at RPE 6–8, no failure or lower-body work, and Saturday arms are then omitted.",
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
        name: "Occasional social-lift rule",
        items: [
          { id: "social-upper", name: "Upper body only", dosage: "Allowed only after a normal Thursday response: 6–10 working sets, 30–50 min, RPE 6–8, at least 2 reps in reserve; no deadlifts, squats, lunges, carries, push press, heavy unsupported rows or conditioning circuits" },
          { id: "volume-redistribution", name: "Count it against Saturday", dosage: "Omit Saturday arm work and reduce any overlapping Thursday/Saturday volume rather than stacking all three exposures" }
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

  sessions.w3d6 = {
    purpose: "Longer easy aerobic support + optional arms",
    duration: "50–90 min",
    volume: "50 min easy target, 55-min cap + optional 8 arm/shoulder sets",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The run is required and must remain conversational. Do not use cadence or stride quality as a project. Optional arms are omitted if Friday included social upper-body lifting or if they would create Monday soreness.",
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
          { id: "easy-run", name: "Easy run", dosage: "50 min target, 55-min hard cap; conversational / RPE 2–3; full sentences effortless; no cadence target, hills or fast finish" },
          { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
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

  sessions.w3d7 = {
    purpose: "Full rest + weekly review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Sunday remains the non-negotiable rest day. Week 3 review determines the exact Week 4 benchmark setup and reduced strength dose.",
    blocks: [
      {
        name: "Rest",
        items: [
          { id: "full-rest", name: "No training", dosage: "Normal daily movement only; no make-up work" }
        ]
      }
    ]
  };
})();