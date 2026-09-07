(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  window.CURRENT_ATHLETE_STATE = {
    date: "2026-09-07",
    programPosition: "Week 6 complete; entering Week 7",
    readiness: "Week 6 was reported completed as planned. No new problem was mentioned in the closeout, but Monday's high-output dose remains readiness-gated until same-day sleep and lower-body tissue status are confirmed.",
    mostRecentHighOutput: "Week 6 Thursday: 3 × 150 m at approximately 90–93% was reported completed as planned. Exact rep times and immediate/next-morning tissue ratings are not currently logged on the site.",
    profile: {
      cmj: "Approximately 16.7 in best from internal 120 fps flight-time conversion.",
      broadJump: "94 in standardized best",
      acceleration30m: "3.99 s best; 4.11 / 4.11 / 3.99 s",
      flying20m: "2.01 s provisional best; repeatability lower-confidence after later benchmark drop-off.",
      flying30m: "Week 6 first exposure completed; hand timing was reported within the broad 3.05–3.20 s guide, but no official video/gate times were captured.",
      sprint120m: "16.1 s best; 16.3 / 16.1 / 16.3 s with approximately 1.2% spread.",
      sprint150m: "Approximately 18.8 s benchmark using combined hand timing and video corroboration."
    },
    technicalTheme: "Peak speed reserve without forcing: full recovery, tall/down upright mechanics, and stop before the session becomes conditioning.",
    strength: "Maintain lower-body intensity with reduced volume. Upper-body progression is allowed only when elbows remain quiet and Thursday sprint quality is protected.",
    aerobic: "Aerobic reserve remains strong. Week 7 deliberately uses the upper end of Tuesday and Saturday easy-duration ranges while keeping Wednesday tempo modest enough to preserve Thursday.",
    tissue: "No current lower-body restriction is documented. Same-day hamstring, calf/Achilles, foot/ankle and adductor/hip ratings are required before Monday and Thursday high-output work.",
    nutrition: "Keep high days well fueled and near maintenance. Any body-composition deficit belongs mainly on low/rest days and remains modest."
  };

  // Week 6 closeout based on the athlete's Sept 5 report that the week was completed as planned.
  const week6 = plans.find((plan) => plan && plan.week === 6);
  if (week6 && Array.isArray(week6.days) && week6.days.length >= 7) {
    week6.focus = "Week 6 complete: maximum-velocity distance progressed to flying 30s, 150 m speed endurance was completed as planned, lower-body strength maintenance remained in place, and the athlete reported completing the week as prescribed.";
    week6.statusNote = "Closed Sept 7 from athlete report. Monday's hill-to-flat acceleration contrast, flying-30 exposure and Full Body A were previously confirmed completed with hand timing in the intended zone and no noteworthy tissue issue. The athlete subsequently reported finishing the remainder of Week 6 as planned. Exact Thursday 150 m times and next-morning tissue ratings were not separately logged, so Week 7 target bands avoid false precision and retain strict readiness/drop-off rules.";
    week6.days.forEach((day, index) => {
      if (!day) return;
      day.status = index === 6 ? "Completed / review" : "Completed";
    });
    if (week6.days[6]) {
      week6.days[6].detail = "Week 6 complete. Transition to Week 7 peak speed-reserve loading after normal recovery.";
    }
  }

  const week7 = plans.find((plan) => plan && plan.week === 7);
  if (!week7 || !Array.isArray(week7.days) || week7.days.length < 7) return;

  week7.title = "Peak speed-reserve loading before the 200 m profile";
  week7.focus = "Use the highest-quality acceleration and flying-30 work of the block, add one conditional fast-relaxed 80, then extend speed endurance to two fully recovered 180s while maintaining strength and using the upper end of safe easy-aerobic volume.";
  week7.statusNote = "Detailed Week 7 sessions published Sept 7. Monday is readiness-pending until same-day tissue status is confirmed. Trainers are the default because spike tolerance is not documented clearly enough to add a new footwear stressor during the peak loading week. Time the 40s and flying 30s when the setup is consistent, but use day-best drop-off rather than forcing an extrapolated target. Thursday's 180 m guide is deliberately broad because no open 180 benchmark exists. Week 8 then unloads and tests one timed 200 m.";

  const week7Days = [
    {
      day: "Mon",
      type: "High",
      status: "Readiness pending",
      title: "40 m acceleration + flying 30s + conditional 80 + Full Body A",
      detail: "Peak neural speed day. Full recovery, trainers, objective stop rules and no forced fourth element. The 80 is earned only after green acceleration and flying work.",
      volume: "3 × 40 m + 3 × flying 30 m + conditional 1 × 80 m; low-volume unilateral/reactive work; 10–11 strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Upper-end easy aerobic support + tissue check",
      detail: "Use the upper end of the safe easy range without drifting moderate. The run should improve recovery, not prove aerobic fitness.",
      volume: "45–50 min easy + 5–7 min foot/ankle/adductor maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Protective extensive tempo",
      detail: "Keep tempo smooth and deliberately modest so Thursday's 180s start sharp. This is aerobic support, not threshold work.",
      volume: "2 × 5 × 100 m / 1,000 m total at ~65–70% velocity"
    },
    {
      day: "Thu",
      type: "High",
      status: "Readiness pending",
      title: "2 × 180 m speed endurance + Upper B",
      detail: "Two fast, controlled 180s with 12–15 minutes recovery. Repeatability and mechanics dominate; no survival running and no lower-body lifting afterward.",
      volume: "2 × 180 m / 360 m at ~92–95%; small primer; 8–10 upper-body sets if track quality remains high"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "Full rest preferred. Easy non-impact recovery is optional only when it makes the legs feel better.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Longer easy aerobic support + optional Upper C",
      detail: "Use the upper end of the Week 1–7 easy range while staying conversational. Optional upper hypertrophy only after a clean Thursday response.",
      volume: "55–60 min easy + optional 6–8 recoverable upper-body sets"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + Week 7 review",
      detail: "Non-negotiable complete rest. Review high-speed exposure and tissue response before Week 8 unload and 200 m benchmark.",
      volume: "No training"
    }
  ];
  week7Days.forEach((day, index) => Object.assign(week7.days[index], day));

  sessions.w7d1 = {
    purpose: "Peak acceleration + flying 30s + conditional 80 + Full Body A",
    duration: "125–155 min total; split track and strength by several hours when possible",
    volume: "3 × 40 m + 3 × flying 30 m + conditional 1 × 80 m; small elastic dose; 10–11 strength sets",
    footwear: "Trainers on a dry, firm, predictable track. No new spike exposure this week unless prior spike tolerance is already documented and the coach explicitly clears it after the readiness check.",
    note: "Monday is the final peak speed-reserve loading day before Week 8 unload. Because same-day readiness has not yet been reported, the published prescription is the GREEN plan, not automatic clearance. For 40 m acceleration there is no same-distance benchmark, so time reps when setup is consistent and govern by a 3–4% day-best drop-off rather than a fabricated hard target. For flying 30s, the existing broad 3.05–3.20 s guide remains contextual; the day's best plus the 3% stop rule is more important. The 80 m is conditional and never owed.",
    blocks: [
      {
        name: "Readiness classification",
        items: [
          { id: "readiness-report", name: "Same-day check-in before high output", dosage: "Report sleep/general readiness, hamstring 0–10, calf/Achilles 0–10, adductor/hip 0–10, any foot/ankle issue, available time/facilities and any meaningful change since the last report." },
          { id: "green", name: "GREEN", dosage: "Normal gait; local tissues approximately 0–1/10; warm-up becomes springy/coordinated; no increasing localized symptoms. Perform the full plan." },
          { id: "amber", name: "AMBER", dosage: "Stable 2–3/10 stiffness, poor sleep or mild residual fatigue without worsening symptoms: perform 2 × 40 m + 2 × flying 30 m in trainers; delete the 80; delete unilateral/bounding work; reduce lower-body lifting to 1–2 primary work sets." },
          { id: "red", name: "RED", dosage: "Sharp/worsening/gait-altering pain, increasing symptoms through warm-up or clear asymmetry: no maximal sprinting, no intensive plyometrics and no lower-body lifting. Rest or 25–40 min very easy non-impact aerobic work only if symptom-free." }
        ]
      },
      {
        name: "Raise temperature — 6–8 min",
        items: [
          { id: "jog", name: "Easy jog", dosage: "4 minutes, beginning very easy" },
          { id: "skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
          { id: "backpedal", name: "Backpedal / relaxed backward run", dosage: "1 × 20 m" },
          { id: "shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
          { id: "carioca", name: "Low-amplitude carioca", dosage: "1 × 15 m each direction" }
        ]
      },
      {
        name: "Dynamic mobility / activation",
        items: [
          { id: "ankle", name: "Ankle rocks", dosage: "1 × 8 each side" },
          { id: "adductor", name: "Adductor rock-backs", dosage: "1 × 8 each side" },
          { id: "hip", name: "90/90 hip switches", dosage: "1 × 6 each direction" },
          { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 6 each side" },
          { id: "legswings", name: "Leg swings", dosage: "8 front-to-back + 8 side-to-side each leg" },
          { id: "soleus", name: "Bent-knee soleus isometric", dosage: "2 × 20 sec each side" },
          { id: "hiplock", name: "Hip-lock march", dosage: "2 × 10 m" }
        ]
      },
      {
        name: "Sprint drills — position then rhythm",
        items: [
          { id: "falling", name: "Falling start", dosage: "2 × 10 m. Purpose: rehearse projection and backward force without overthinking the first step." },
          { id: "lowdribble", name: "Low dribble", dosage: "2 × 15 m. Purpose: reinforce quick contacts beneath the body while rising gradually." },
          { id: "fastrun", name: "Fast A-run", dosage: "2 × 15 m. Purpose: organize upright front-side rhythm before the flying work." }
        ]
      },
      {
        name: "Primer — sharpen, do not fatigue",
        items: [
          { id: "medball", name: "Medicine-ball overhead throw", dosage: "2 × 3 with full reset; 60–75 sec between sets" },
          { id: "hurdle", name: "Low hurdle hops", dosage: "2 × 3 contacts; quiet and quick; 75–90 sec between sets. Stop if contacts get loud or slow." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "build60", name: "Buildup 1", dosage: "1 × 40 m at ~60% velocity; walk back" },
          { id: "build75", name: "Buildup 2", dosage: "1 × 50 m at ~75%; 90 sec" },
          { id: "build85", name: "Buildup 3", dosage: "1 × 60 m at ~85%; 2 min" },
          { id: "build92", name: "Buildup 4", dosage: "1 × 60 m at ~90–92%; 3 min before first acceleration" }
        ]
      },
      {
        name: "Acceleration — 3 × 40 m",
        items: [
          { id: "forties", name: "3 × 40 m from consistent two-point start", dosage: "95–100% current velocity; 5–6 min recovery. Time all reps when the same video/gate setup is available. No rigid 40 m target is imposed because there is no same-distance benchmark." },
          { id: "accelcue", name: "Primary cue", dosage: "Push the track behind you and rise gradually." },
          { id: "accelstop", name: "Stop rule", dosage: "End or modify for ~3–4% deterioration from the day's best, declining projection/first-step quality, repeated early pop-up, hesitation or increasing localized discomfort." }
        ]
      },
      {
        name: "Maximum velocity — 3 × flying 30 m",
        items: [
          { id: "fly30", name: "3 × flying 30 m", dosage: "35–40 m progressive buildup + 30 m timed zone + at least 50 m gradual deceleration; 7–8 min recovery. Existing broad comparable guide: ~3.05–3.20 s, but the day's best and mechanics govern." },
          { id: "flycue", name: "Primary cue", dosage: "Tall and down. Relax the face and hands; do not reach for stride length." },
          { id: "flystop", name: "Stop rule", dosage: "End after two if a rep is >~3% slower than the day's best, posture degrades, contacts get longer/louder, relaxation disappears or localized discomfort increases." }
        ]
      },
      {
        name: "Conditional speed-endurance touch",
        items: [
          { id: "eighty", name: "1 × 80 m fast and relaxed", dosage: "~95% velocity, full commitment to relaxation rather than strain; 8–10 min after the final fly. Run only if all preceding work stayed GREEN. No hard time target because no standardized 80 m benchmark exists." },
          { id: "eightycue", name: "Cue", dosage: "Carry the speed—do not attack the ground harder." }
        ]
      },
      {
        name: "Developmental plyometrics — GREEN only",
        items: [
          { id: "slhop", name: "Single-leg hop and stick", dosage: "2 × 2 each side; full reset, 60–90 sec. Stable landing before distance." },
          { id: "bounds", name: "Speed bounds", dosage: "1 × 15 m only; quick projection and quiet contacts. Stop immediately for asymmetry, loud contacts or >~5% output loss." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "6–10 minutes, then normal mobility only if it feels useful" }
        ]
      },
      {
        name: "Full Body A — later",
        items: [
          { id: "deadlift", name: "Straight-bar deadlift", dosage: "455 lb × 2 × 2 at RPE 7.5–8; 3 min rest; use straps. If the first work set is unexpectedly slow or sprint legs feel flat, stop after one set." },
          { id: "bench", name: "Barbell bench press", dosage: "250 lb × 3 × 5 at RPE 7–8. If the prior week's 250 work was clearly ≤RPE 7.5 and elbows are quiet, 255 lb × 3 × 5 is acceptable; do not force progression." },
          { id: "rfess", name: "Rear-foot-elevated split squat", dosage: "2 × 4 each leg at RPE 7; 90–120 sec rest" },
          { id: "row", name: "Chest-supported neutral-grip row with straps", dosage: "2 × 8–10 at RPE 7; light grip; stop if medial-elbow symptoms rise above 2/10 or change character." },
          { id: "calf", name: "Standing calf raise", dosage: "2 × 6 at RPE 7 only if calf/Achilles/foot are fully quiet after sprinting" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre", name: "Pre-session", dosage: "2–3 hr before: ~90–140 g carbohydrate + 25–35 g lean protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate 15–30 min before." },
          { id: "during", name: "During", dosage: "Water/electrolytes. Use ~30–60 g carbohydrate per hour when track and strength are combined, the total day is prolonged or conditions are hot." },
          { id: "post", name: "Post-session", dosage: "30–40 g protein + substantial carbohydrate, fluid/sodium replacement and a normal complete meal. Keep the high day near maintenance rather than creating a large deficit." }
        ]
      }
    ]
  };

  sessions.w7d2 = {
    purpose: "Upper-end easy aerobic support + next-morning tissue check",
    duration: "50–65 min",
    volume: "45–50 min easy + 5–7 min maintenance",
    footwear: "Comfortable trainers on flat or gently rolling terrain",
    note: "This is intentionally near the upper end of the Week 1–7 easy range because aerobic sharpness feels underdeveloped, but the intensity stays genuinely easy. Do not turn duration into pace. Tuesday's tissue response is more important than aerobic freshness after Monday's peak speed day.",
    blocks: [
      { name: "Readiness", items: [
        { id: "tissue", name: "Next-morning tissue report", dosage: "Check hamstring, calf/Achilles, foot/ankle and adductor/hip. Normal diffuse stiffness is acceptable if gait is normal and symptoms ease; worsening localized symptoms shift the day to bike/rest." }
      ]},
      { name: "Warm-up", items: [
        { id: "walk", name: "Brisk walk", dosage: "2–3 minutes" },
        { id: "easy-start", name: "Very easy running", dosage: "First 5 minutes deliberately slower than normal easy pace" }
      ]},
      { name: "Aerobic work", items: [
        { id: "easy", name: "Easy run", dosage: "45–50 min total at conversational RPE 2–3. Flat/gently rolling, no fast finish, no pace target." }
      ]},
      { name: "Maintenance", items: [
        { id: "ankle", name: "Ankle rocks", dosage: "1 × 10 each side" },
        { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 25 sec each side" },
        { id: "shortfoot", name: "Short-foot hold", dosage: "4 × 5 sec each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 8 each side" }
      ]},
      { name: "Fueling / recovery", items: [
        { id: "fuel", name: "Fuel normally", dosage: "Normal mixed meal beforehand if needed. Afterward: 25–35 g protein plus carbohydrate. A modest deficit is acceptable today only if sleep, hunger and tissue recovery remain good." }
      ]},
      { name: "Amber / red", items: [
        { id: "amber", name: "AMBER", dosage: "30–40 min easy or bike instead of 45–50 min; keep maintenance gentle." },
        { id: "red", name: "RED", dosage: "Rest or symptom-free non-impact movement only. No running through sharp, worsening or gait-altering pain." }
      ]}
    ]
  };

  sessions.w7d3 = {
    purpose: "Protective extensive tempo before Thursday 180s",
    duration: "40–55 min",
    volume: "2 × 5 × 100 m / 1,000 m total",
    footwear: "Trainers on grass or a forgiving track surface",
    note: "Wednesday deliberately stays at 1,000 m despite the athlete's aerobic reserve. The goal is rhythm and aerobic support while preserving Thursday's speed-endurance quality. This is not threshold work.",
    blocks: [
      { name: "Readiness", items: [
        { id: "gate", name: "Proceed only if Monday response is quiet", dosage: "Normal gait; no increasing hamstring/calf/Achilles/foot/adductor symptom; general readiness adequate. Any localized 2–3/10 stiffness that persists through warm-up converts the day to 25–40 min easy running or cycling." }
      ]},
      { name: "Warm-up", items: [
        { id: "jog", name: "Easy jog", dosage: "6 minutes" },
        { id: "ankle", name: "Ankle rocks", dosage: "1 × 8 each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side" },
        { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
        { id: "amarch", name: "A-march", dosage: "1 × 20 m. Purpose: tall posture and contacts beneath the body." },
        { id: "askip", name: "A-skip", dosage: "1 × 20 m. Purpose: relaxed elastic rhythm." },
        { id: "build60", name: "Buildup", dosage: "1 × 60 m at ~60%; walk back" },
        { id: "build70", name: "Buildup", dosage: "1 × 60 m at ~70%; 60–90 sec before first rep" }
      ]},
      { name: "Extensive tempo", items: [
        { id: "set1", name: "Set 1", dosage: "5 × 100 m at ~65–70% of maximum velocity; 60–75 sec between reps" },
        { id: "setrest", name: "Set recovery", dosage: "3 minutes easy walk/stand" },
        { id: "set2", name: "Set 2", dosage: "5 × 100 m at ~65–70%; 60–75 sec between reps. Smooth and quiet; never race the clock." }
      ]},
      { name: "Technical cue / stop rule", items: [
        { id: "cue", name: "Cue", dosage: "Tall, quiet and rhythmic." },
        { id: "stop", name: "Stop rule", dosage: "Cut the second set when rhythm gets labored, contacts get loud, soreness increases or the session starts feeling like conditioning." }
      ]},
      { name: "Cooldown / fueling", items: [
        { id: "cool", name: "Cooldown", dosage: "5–8 min easy jog-to-walk" },
        { id: "fuel", name: "Fuel for Thursday", dosage: "Normal carbohydrate intake today; do not create a large deficit. Dinner should include a substantial carbohydrate serving and adequate fluid/sodium." }
      ]},
      { name: "Amber / red", items: [
        { id: "amber", name: "AMBER", dosage: "1 × 5 × 100 m only, or 25–35 min easy if tissue stiffness persists. No extra reps." },
        { id: "red", name: "RED", dosage: "Rest or easy non-impact aerobic only if symptom-free." }
      ]}
    ]
  };

  sessions.w7d4 = {
    purpose: "2 × 180 m speed endurance + Upper B",
    duration: "90–120 min total; split upper-body work later when possible",
    volume: "2 × 180 m / 360 m at ~92–95% velocity + small primer + 8–10 upper-body sets",
    footwear: "Trainers on a dry track. Use a marked lane and a curve-to-straight 180 m setup when available. No new spike exposure during this peak loading week.",
    note: "Thursday is the main Week 7 metabolic/mechanical stressor. There is no open 180 m benchmark, so the provisional internal guide of roughly 24.2–25.2 s is intentionally broad and must not be treated as a pass/fail target. Rep 2 should remain technically controlled and generally within ~3–4% of Rep 1. If the first rep becomes a time trial, the session purpose has been missed.",
    blocks: [
      { name: "Readiness classification", items: [
        { id: "readiness", name: "Same-day check-in", dosage: "Sleep/general readiness plus hamstring, calf/Achilles, foot/ankle and adductor/hip status. Normal gait and no worsening localized symptom are required." },
        { id: "green", name: "GREEN", dosage: "Local tissues ~0–1/10 and warm-up normal: perform 2 × 180 m." },
        { id: "amber", name: "AMBER", dosage: "Stable 2–3/10 stiffness or meaningful systemic fatigue without worsening symptoms: 1 × 180 m at ~90–92% only; trainers; medicine-ball primer only; reduce Upper B to ~50–70% volume." },
        { id: "red", name: "RED", dosage: "No intensive sprinting or plyometrics. Rest or easy non-impact aerobic if symptom-free; upper work only when the issue is clearly localized to the lower body and general readiness is otherwise normal." }
      ]},
      { name: "Raise temperature", items: [
        { id: "jog", name: "Easy jog", dosage: "5 minutes" },
        { id: "skip", name: "Forward skip", dosage: "1 × 20 m" },
        { id: "backward", name: "Relaxed backward run", dosage: "1 × 20 m" },
        { id: "shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" }
      ]},
      { name: "Mobility / activation", items: [
        { id: "ankle", name: "Ankle rocks", dosage: "1 × 8 each side" },
        { id: "adductor", name: "Adductor rock-backs", dosage: "1 × 8 each side" },
        { id: "hip", name: "90/90 hip switches", dosage: "1 × 6 each direction" },
        { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 6 each side" },
        { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
        { id: "hiplock", name: "Hip-lock march", dosage: "1 × 10 m each side emphasis" }
      ]},
      { name: "Sprint drills", items: [
        { id: "arun", name: "A-march to A-run", dosage: "2 × 20 m. Purpose: connect posture to faster rhythm." },
        { id: "insouts", name: "Relaxed ins-and-out", dosage: "2 × 60 m: build 20 / hold 20 / relax 20 at submaximal speed. Purpose: rehearse relaxation while carrying speed." }
      ]},
      { name: "Primer", items: [
        { id: "medball", name: "Medicine-ball overhead throw", dosage: "2 × 3; full reset" },
        { id: "pogos", name: "Low pogos", dosage: "2 × 8 contacts; quick and quiet. No separate developmental plyometric block after the 180s." }
      ]},
      { name: "Progressive buildups", items: [
        { id: "build60", name: "Buildup 1", dosage: "1 × 50 m at ~60%" },
        { id: "build75", name: "Buildup 2", dosage: "1 × 60 m at ~75%; 90 sec" },
        { id: "build85", name: "Buildup 3", dosage: "1 × 80 m at ~85%; 2 min" },
        { id: "build90", name: "Buildup 4", dosage: "1 × 80 m at ~90%; 4 min before Rep 1" }
      ]},
      { name: "Main set — 2 × 180 m", items: [
        { id: "rep1", name: "180 m Rep 1", dosage: "~92–95% velocity. Provisional internal guide: ~24.2–25.2 s in comparable trainer/track conditions. Run the curve-to-straight smoothly; do not attack the first 60 m." },
        { id: "rest", name: "Recovery", dosage: "12–15 minutes full walking/standing recovery. Breathing should be settled before Rep 2." },
        { id: "rep2", name: "180 m Rep 2", dosage: "Match the intended rhythm and mechanics. Do not chase Rep 1 if it was too aggressive. A technically solid rep within ~3–4% is acceptable." },
        { id: "cue", name: "Primary cue", dosage: "Tall and relaxed—carry speed through the curve and strike down beneath you." },
        { id: "stop", name: "Stop rule", dosage: "Do not start Rep 2 if Rep 1 produced localized worsening pain, obvious mechanical collapse, abnormal gait or a time/effort pattern that clearly became survival running. During Rep 2 stop the session if posture/strike position disintegrates or symptoms increase." }
      ]},
      { name: "Cooldown", items: [
        { id: "cool", name: "Easy cooldown", dosage: "8–12 min easy walk/jog. No extra strides." }
      ]},
      { name: "Upper B — later only if track quality was high", items: [
        { id: "incline", name: "Incline dumbbell press", dosage: "3 × 6–8 at RPE 7–8; 2 min rest" },
        { id: "row", name: "Cable or chest-supported row", dosage: "3 × 8–10 at RPE 7; use straps/neutral grip if elbows prefer it" },
        { id: "reardelt", name: "Rear-delt fly", dosage: "2 × 15–20 at RPE 8" },
        { id: "triceps", name: "Optional cable triceps pressdown", dosage: "2 × 10–15 at RPE 8 only if elbows are quiet and systemic fatigue is low" },
        { id: "nolower", name: "No lower-body lifting", dosage: "The 180s are the lower-body stressor today. Do not add split squats, Nordics, jumps or heavy pulls afterward." }
      ]},
      { name: "Fueling", items: [
        { id: "pre", name: "Pre-session", dosage: "2–3 hr before: ~90–140 g carbohydrate + 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Add 20–40 g easy carbohydrate shortly before if useful." },
        { id: "during", name: "During", dosage: "Water/electrolytes; 30–60 g carbohydrate per hour if the combined session is prolonged or hot." },
        { id: "post", name: "After", dosage: "30–40 g protein + substantial carbohydrate and fluid/sodium replacement. Eat a complete meal within several hours." }
      ]}
    ]
  };

  sessions.w7d5 = {
    purpose: "Recovery and absorption after 180 m speed endurance",
    duration: "0–35 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday is not an opportunity to add the threshold work you feel you are missing. The adaptation target is absorbing Thursday's high-output stress before Saturday easy aerobic support.",
    blocks: [
      { name: "Recovery choice", items: [
        { id: "rest", name: "Preferred: full rest", dosage: "Normal daily movement only" },
        { id: "bike", name: "Optional easy bike / walk", dosage: "20–35 min at RPE 2 only if it makes the legs feel better" },
        { id: "mobility", name: "Optional mobility", dosage: "5–10 min gentle ankle/hip/adductor mobility; no loaded stretching or hard tissue work" }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Recover, do not compensate", dosage: "Protein ~30–40 g per meal and normal carbohydrate intake. A modest deficit is acceptable only if hunger, sleep and tissue response remain good; do not slash intake after Thursday." }
      ]},
      { name: "Red flags", items: [
        { id: "red", name: "Escalate if needed", dosage: "Sharp or worsening pain, swelling, gait alteration or meaningful one-sided weakness is not normal post-180 fatigue and warrants training modification / appropriate medical review." }
      ]}
    ]
  };

  sessions.w7d6 = {
    purpose: "Longer easy aerobic support + optional Upper C",
    duration: "60–95 min total",
    volume: "55–60 min easy + optional 6–8 upper-body sets",
    footwear: "Comfortable trainers on flat or gently rolling terrain",
    note: "Saturday uses the upper end of the planned aerobic range to maintain the endurance base without compromising Monday speed. Keep it conversational all the way. No fast finish, threshold block or strides.",
    blocks: [
      { name: "Readiness", items: [
        { id: "gate", name: "Thursday response", dosage: "Run only with normal gait and no worsening localized hamstring/calf/Achilles/foot/adductor issue. Stable mild stiffness may shorten the run; meaningful soreness shifts to cycling." }
      ]},
      { name: "Warm-up", items: [
        { id: "walk", name: "Brisk walk", dosage: "2–3 minutes" },
        { id: "easy", name: "Easy first 5 minutes", dosage: "Begin deliberately relaxed and let pace emerge naturally" }
      ]},
      { name: "Aerobic work", items: [
        { id: "run", name: "Easy run", dosage: "55–60 min conversational / RPE 2–3. No fast finish and no pace target." }
      ]},
      { name: "Optional Upper C — only if Thursday and elbows were quiet", items: [
        { id: "press", name: "Incline dumbbell or machine press", dosage: "2 × 8–12 at RPE 7–8" },
        { id: "row", name: "Chest-supported row", dosage: "2 × 8–12 at RPE 7–8; straps/neutral grip if preferred" },
        { id: "lateral", name: "Lateral raise", dosage: "2 × 12–20 at RPE 8" },
        { id: "arms", name: "Optional biceps or triceps", dosage: "1–2 × 10–15 only if elbows are completely quiet. Skip before adding load or volume elsewhere." }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Low-day fueling", dosage: "Normal protein; enough carbohydrate to support the 55–60 min run and replenish for Monday. A modest low-day deficit is acceptable, but do not arrive at Monday glycogen-depleted." }
      ]},
      { name: "Amber / red", items: [
        { id: "amber", name: "AMBER", dosage: "40–45 min easy, no Upper C, or replace running with 45–60 min easy cycling if lower-leg tissues need reduced impact." },
        { id: "red", name: "RED", dosage: "Rest or symptom-free non-impact movement only." }
      ]}
    ]
  };

  sessions.w7d7 = {
    purpose: "Full rest + Week 7 review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Week 8 is an unload/benchmark week. Sunday remains full rest so Monday can retain a small speed touch and Thursday can deliver one high-quality 200 m benchmark.",
    blocks: [
      { name: "Rest", items: [
        { id: "rest", name: "No training", dosage: "Normal daily movement only; no make-up work, strides, lifting or conditioning" }
      ]},
      { name: "Weekly review items", items: [
        { id: "review", name: "Review Week 7", dosage: "Log high-speed reps/times, Monday and Thursday tissue response, plyometric quality, strength maintenance, Tuesday/Wednesday/Saturday aerobic work, body-weight/fueling trend and the technical theme to carry into Week 8." }
      ]}
    ]
  };
})();
