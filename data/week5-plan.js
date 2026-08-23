(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  window.CURRENT_ATHLETE_STATE = {
    date: "2026-08-23",
    programPosition: "Week 4 complete; entering Week 5",
    readiness: "Lower body green. Medial elbows improving but remain an exercise-specific delayed-response monitor.",
    profile: {
      cmj: "Approximately 16.7 in best from 120 fps slow-motion flight-time conversion; method remains internal rather than lab-grade.",
      broadJump: "94 in standardized best",
      acceleration30m: "3.99 s best; 4.11 / 4.11 / 3.99 s",
      flying20m: "2.01 s provisional best; 2.10 and 2.18 showed >3% deterioration, so repeatability is the main maximum-velocity limitation.",
      sprint150m: "Approximately 18.8 s using combined hand timing and video corroboration; nearest-tenth internal baseline."
    },
    technicalTheme: "Make available speed repeatable: relaxation, stable buildup, and stopping when velocity falls rather than forcing extra repetitions.",
    strength: "Lower-body force remains an asset. Resume low-volume maintenance. Reintroduce one grip-reduced pulling pattern before restoring normal pulling or direct arm work.",
    aerobic: "Strong reserve maintained; Saturday Week 4 was 49.5 min, 6.06 mi, 8:12/mi, 135 avg HR.",
    nutrition: "No new seven-day body-weight or calorie trend reported; calorie cycling remains unchanged."
  };

  // Week 4 closeout — review completed August 23, 2026.
  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days.length >= 7) {
    week4.focus = "Week 4 complete: the first jump, acceleration, maximum-velocity and 150 m profiles were established, all benchmark work was completed without a lower-body tissue problem, and reduced aerobic support was retained.";
    week4.statusNote = "Review completed Aug 23. Benchmarks: CMJ approximately 16.7 in best using internal 120 fps slow-motion conversion; broad jump 94 in; 30 m 3.99 s; flying 20 m 2.01 s provisional with clear later-repetition deterioration; 150 m approximately 18.8 s using combined hand timing and video corroboration. Tuesday and Saturday easy runs exceeded the reduced benchmark-week caps slightly but remained controlled. Lower-body tissues are green. Medial elbows improved under grip-intensive unloading, so Week 5 begins a cautious pulling re-entry. No body-weight trend was reported, so nutrition is unchanged.";
    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (week4.days[index]) week4.days[index].status = "Completed";
    });
    if (week4.days[5]) {
      week4.days[5].detail = "Completed: 49.5 min, 6.06 mi, 8:12/mi, 135 avg HR. The run was approximately 4.5 minutes above the benchmark-week cap but remained aerobic and caused no reported tissue issue.";
      week4.days[5].volume = "49.5 min · 6.06 mi · 8:12/mi · 135 avg HR";
    }
    if (week4.days[6]) {
      week4.days[6].status = "Locked";
      week4.days[6].detail = "Full rest. Week 4 profile review is complete and the detailed Week 5 plan is published.";
    }
  }

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (!week5 || !Array.isArray(week5.days) || week5.days.length < 7) return;

  week5.title = "High-quality speed re-entry from the Week 4 profile";
  week5.focus = "Use the first benchmark profile to make acceleration and flying speed repeatable, introduce timed 120 m speed endurance, resume lower-body maintenance and cautiously restore elbow-tolerant pulling.";
  week5.statusNote = "Detailed Week 5 sessions published Aug 23. Benchmark-derived bands apply only with comparable start, surface, footwear and timing. Monday plans three 30 m accelerations and four flying-20 exposures, but velocity drop-off may end the fly series after two or three. A single optional final spike exposure is permitted only when spikes are already available, the track is dry and all lower-leg tissues remain completely green. Thursday's 120 m band is inferred from the 18.8 s 150 m and is deliberately broad. No threshold session this week; Wednesday returns to extensive tempo to protect Thursday.";

  const week5Days = [
    {
      day: "Mon",
      type: "High",
      status: "Planned",
      title: "Profile-guided acceleration + flying 20s + Full Body A",
      detail: "Re-enter high-quality speed with benchmark-derived bands, full recovery and one possible low-dose spike exposure only after green trainer work.",
      volume: "3 × 30 m + 3 trainer flying 20s + 1 conditional fourth fly; 20 low-level jump contacts; 11 strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Easy aerobic support + tissue and elbow check",
      detail: "Conversational running and maintenance work. The next-morning elbow response determines whether Thursday includes pulling.",
      volume: "40–45 min easy, 50-min cap + 5–7 min maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Extensive tempo / relaxed rhythm",
      detail: "Return to low-cost tempo after Week 4 testing. Keep the session quiet and leave Thursday sharp.",
      volume: "2 × 5 × 100 m / 1,000 m total"
    },
    {
      day: "Thu",
      type: "High",
      status: "Planned",
      title: "Timed 120 m speed endurance + Power / Upper B",
      detail: "Three fully recovered 120s using a broad profile-derived band. Trainers only; repeatability matters more than a heroic first rep.",
      volume: "3 × 120 m / 360 m; 2 × 2 low box jumps; 7–9 upper-body sets"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "Full rest preferred. No social upper lift this week while pulling tolerance and Thursday speed-endurance response are being re-established.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Longer easy aerobic support + conditional low-grip Upper C",
      detail: "Easy running is required. A small delt and grip-free curl block is optional only after a quiet elbow week.",
      volume: "50–55 min easy, 60-min cap + optional 4–6 low-grip upper sets"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + weekly review",
      detail: "Non-negotiable complete rest and Week 5 review.",
      volume: "No training"
    }
  ];
  week5Days.forEach((day, index) => Object.assign(week5.days[index], day));

  sessions.w5d1 = {
    purpose: "Profile-guided acceleration + flying 20s + Full Body A",
    duration: "120–145 min total; split track and strength by several hours when possible",
    volume: "3 × 30 m acceleration + 3 trainer flying 20s + 1 conditional fourth fly; 16 pogo contacts + 4 broad jumps; 11 strength sets",
    footwear: "Trainers on a dry, firm, predictable track. Optional final spike exposure only when sprint spikes are already available and readiness remains fully green.",
    note: "Week 4 showed available speed but limited fly repeatability. Use identical measured marks and high-frame-rate video when possible. The 30 m trainer band is approximately 4.00–4.16 s. The flying-20 trainer band is approximately 2.03–2.11 s, with the session still governed by a 3% drop from the day's best. Do not average deteriorated repetitions. The fourth fly is conditional, not owed.",
    blocks: [
      {
        name: "Readiness and conditions gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; sleep/general readiness acceptable; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal calf/shin issue; medial elbows stable at 0–1/10 without numbness, tingling or weakness." },
          { id: "conditions", name: "Track and timing", dosage: "Dry predictable track, measured marks and the same video-timing rules used in Week 4. Wind or a changed setup makes the band contextual rather than exact." },
          { id: "warmup-gate", name: "Warm-up response", dosage: "Proceed only when movement becomes springier and more coordinated without increasing localized symptoms." }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "jog", name: "Easy jog", dosage: "5 minutes, beginning very easy" },
          { id: "skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
          { id: "shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
          { id: "backward", name: "Relaxed backward run", dosage: "1 × 20 m" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side; controlled range" },
          { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side; tall trunk" },
          { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side; firm but comfortable" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position without reaching." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: connect posture to relaxed elastic rhythm." }
        ]
      },
      {
        name: "Elastic primer",
        items: [
          { id: "pogo", name: "Low ankle pogo", dosage: "2 × 8 contacts; 45–60 sec rest. Quiet and quick, not high." },
          { id: "broad", name: "Standing broad jump with stick", dosage: "2 × 2 at approximately 90%; 75–90 sec rest. Full reset; no benchmark-distance chase." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "build60", name: "Buildup 1", dosage: "1 × 40 m at approximately 60%; walk back" },
          { id: "build75", name: "Buildup 2", dosage: "1 × 50 m at approximately 75%; 90 sec rest" },
          { id: "build85", name: "Buildup 3", dosage: "1 × 60 m at approximately 85%; 2 min rest" },
          { id: "build92", name: "Buildup 4", dosage: "1 × 60 m at approximately 90–92%; 3 min before acceleration" }
        ]
      },
      {
        name: "30 m acceleration",
        items: [
          { id: "thirties", name: "3 × 30 m from two-point start", dosage: "Approximately 95–100% current velocity; 4½–5 min recovery. Same lead leg and timing method. Profile band: approximately 4.00–4.16 s in comparable conditions." },
          { id: "accelcue", name: "Primary acceleration cue", dosage: "Push back and rise gradually." },
          { id: "accelstop", name: "Acceleration stop rule", dosage: "End for approximately 3–4% deterioration from the day's best, repeated popping upright, declining first-step projection, hesitation or increasing localized discomfort. A time above roughly 4.18 s plus worse mechanics is outside the intended quality." }
        ]
      },
      {
        name: "Flying 20 m",
        items: [
          { id: "flytrainers", name: "3 × flying 20 m in trainers", dosage: "30 m progressive buildup + 20 m timed zone + at least 40 m gradual deceleration; 6 min recovery. Comparable trainer band: approximately 2.03–2.11 s." },
          { id: "flyfour", name: "Conditional fourth flying 20", dosage: "Perform only if the first three remain within approximately 3%, relaxation is intact and all tissues remain green. Use trainers by default. If sprint spikes are already available, one final controlled spike rep at approximately 92–95% may replace the trainer rep; label it separately and do not compare the time directly with trainer reps." },
          { id: "flycue", name: "Primary maximum-velocity cue", dosage: "Tall and down. Let speed happen; do not manufacture stride length." },
          { id: "flystop", name: "Maximum-velocity stop rule", dosage: "Stop after two or three when a rep is more than approximately 3% slower than the day's best, contacts lengthen or get louder, relaxation disappears, posture worsens, or localized discomfort increases." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "6–10 minutes; no extra strides or conditioning" }
        ]
      },
      {
        name: "Full Body A — later",
        items: [
          { id: "deadlift", name: "Straight-bar deadlift", dosage: "455 lb × 3 × 2 at RPE 7.5–8; 3 min rest. Use straps to reduce forearm/medial-elbow loading. Stop after one set if bar speed is materially slow." },
          { id: "bench", name: "Barbell bench press", dosage: "250 lb × 5 × 3 at RPE 7–8; 2½–3 min rest. Neutral wrists and no grinders." },
          { id: "rfess", name: "Rear-foot-elevated split squat", dosage: "2 × 4 each leg at RPE 7; 90–120 sec rest" },
          { id: "row", name: "Chest-supported neutral-grip row with straps", dosage: "2 × 8–10 at RPE 6–7; 90 sec rest. This is the only pulling re-entry. Light grip; stop if medial-elbow soreness exceeds 2/10 or changes during the set." },
          { id: "calf", name: "Standing calf raise", dosage: "2 × 6 at RPE 7; 90 sec rest. Omit for any calf/Achilles/shin awareness." }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with approximately 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easily digested carbohydrate shortly before." },
          { id: "during", name: "During", dosage: "Water/electrolytes. Add 30–60 g carbohydrate per hour when track and strength are combined, total duration is prolonged or conditions are hot." },
          { id: "post", name: "After", dosage: "30–40 g protein plus substantial carbohydrate, fluid/sodium replacement and a normal complete meal." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "2 × 30 m at approximately 95% with full recovery, then at most 2 trainer flying 20s around 95% only if the warm-up fully normalizes. No spikes. Use 1 × 8 pogos, omit broad jumps, deadlift 1–2 × 3, bench 2 × 5 and omit RFESS, row and calf work." },
          { id: "red", name: "Red alternative", dosage: "No sprinting, jumping or lower-body lifting. Full rest or 25–35 min very easy cycling when symptom-free. Pain-free upper pressing is optional only when the red flag is isolated to the lower body and systemic readiness is normal." }
        ]
      }
    ]
  };

  sessions.w5d2 = {
    purpose: "Easy aerobic support + lower-body and medial-elbow response check",
    duration: "48–60 min",
    volume: "40–45 min easy, 50-min cap + 5–7 min maintenance",
    footwear: "Trainers on flat or gently rolling predictable terrain",
    note: "The first 8–10 minutes are the warm-up. Keep the run conversational. The delayed response to Monday's reintroduced row determines whether Thursday includes pulling. No lifting today.",
    blocks: [
      { name: "Readiness gate", items: [
        { id: "gait", name: "First-steps check", dosage: "Normal gait; no sharp, localized, worsening or one-sided lower-body response after Monday." },
        { id: "elbow", name: "Medial-elbow check", dosage: "Record whether the elbow is unchanged, improved or worse after Monday's row. No numbness, tingling or weakness." }
      ]},
      { name: "Easy aerobic work", items: [
        { id: "opening", name: "Gradual opening", dosage: "2 min brisk walk or shuffle, then 8 min extremely easy running" },
        { id: "run", name: "Easy run", dosage: "Continue to 40–45 min total; 50-min hard cap; conversational / RPE 2–3; no hills, strides, cadence target or fast finish." },
        { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
      ]},
      { name: "Tissue maintenance", items: [
        { id: "ankle", name: "Ankle rocker", dosage: "1 × 8 each side" },
        { id: "calfiso", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side" },
        { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side" }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "30–40 min easy, or 25–35 min very easy cycling if generalized soreness is greater than expected but gait is normal." },
        { id: "red", name: "Red alternative", dosage: "Full rest for sharp, localized, worsening or gait-altering symptoms." }
      ]}
    ]
  };

  sessions.w5d3 = {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "45–58 min",
    volume: "2 × 5 × 100 m / 1,000 m total",
    footwear: "Trainers on a forgiving track surface or predictable flat grass",
    note: "This is low-cost aerobic and contact work, not threshold. Keep the pace and contacts quiet enough that Thursday's 120 m work begins sharp. No lifting.",
    blocks: [
      { name: "Readiness gate", items: [
        { id: "check", name: "Walk and jog check", dosage: "Normal gait; Monday soreness stable or improving; no localized hamstring, calf/Achilles, foot/ankle, shin or adductor issue." }
      ]},
      { name: "Raise temperature", items: [
        { id: "jog", name: "Easy jog", dosage: "6 minutes, beginning very easy" }
      ]},
      { name: "Mobility / activation", items: [
        { id: "ankle", name: "Ankle rocker", dosage: "1 × 8 each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side" },
        { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
        { id: "swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg" }
      ]},
      { name: "Technical preparation", items: [
        { id: "march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip." },
        { id: "skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward." },
        { id: "build60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
        { id: "build70", name: "Buildup 2", dosage: "1 × 60 m at approximately 70%; 60–90 sec rest" }
      ]},
      { name: "Extensive tempo", items: [
        { id: "set1", name: "Set 1", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
        { id: "rest", name: "Set recovery", dosage: "3 min walking/standing" },
        { id: "set2", name: "Set 2", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
        { id: "cue", name: "Primary cue", dosage: "Float and stay quiet. No pace chase." },
        { id: "stop", name: "Stop rule", dosage: "Stop or reduce if contacts get louder, you press/reach, stride becomes asymmetric, or soreness increases/localizes." }
      ]},
      { name: "Cooldown", items: [
        { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; no added mileage" }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "Repeat 2 × 4 × 100 m / 800 m total at approximately 65–70%." },
        { id: "red", name: "Red alternative", dosage: "No tempo. Full rest or symptom-free easy non-impact work." }
      ]}
    ]
  };

  sessions.w5d4 = {
    purpose: "Timed 120 m speed endurance + Power / Upper B",
    duration: "95–120 min total; split preferred",
    volume: "3 × 120 m / 360 m + 2 × 2 low box jumps + 7–9 upper-body sets",
    footwear: "Trainers on a dry, predictable track surface",
    note: "The approximate 15.8–16.4 s band is inferred from the 18.8 s hybrid-timed 150 m and is not a direct 120 m benchmark. Use the same two-point start and combined hand/video method when possible. Repeatability and mechanics matter more than beating the band on rep one. No spikes because repetition distance and intensity are already progressing.",
    blocks: [
      { name: "Readiness and conditions gate", items: [
        { id: "readiness", name: "Morning readiness", dosage: "Normal gait; Monday's sprint response fully settled; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal calf/shin issue." },
        { id: "conditions", name: "Track and timing", dosage: "Dry predictable track, measured 120 m, same start type and timing method. Meaningful wind or setup change makes the time band contextual." },
        { id: "elbow", name: "Medial-elbow gate", dosage: "Upper pulling is allowed only if Monday's row caused no worse next-morning soreness and a light warm-up set remains at 0–1/10."
        }
      ]},
      { name: "Raise temperature", items: [
        { id: "jog", name: "Easy jog", dosage: "5 minutes, beginning very easy" },
        { id: "skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
        { id: "shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
        { id: "backward", name: "Relaxed backward run", dosage: "1 × 20 m" }
      ]},
      { name: "Mobility / activation", items: [
        { id: "ankle", name: "Ankle rocker", dosage: "1 × 8 each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side" },
        { id: "lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
        { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" }
      ]},
      { name: "Sprint drills", items: [
        { id: "march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip." },
        { id: "skip2", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward." }
      ]},
      { name: "Power primer — green only", items: [
        { id: "box", name: "Low box jump with stick", dosage: "2 × 2; full reset; 60–90 sec rest. Quiet, stable landing. Stop for asymmetry, loud contacts or degraded position." }
      ]},
      { name: "Progressive buildups", items: [
        { id: "build60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
        { id: "build75", name: "Buildup 2", dosage: "1 × 60 m at approximately 75%; 90 sec rest" },
        { id: "build85", name: "Buildup 3", dosage: "1 × 80 m at approximately 85%; 2 min rest" },
        { id: "build92", name: "Buildup 4", dosage: "1 × 80 m at approximately 90–92%; 4 min before rep one" }
      ]},
      { name: "Timed 120 m speed endurance", items: [
        { id: "reps", name: "3 × 120 m", dosage: "Approximately 92–95% current velocity; 9–10 min recovery. Broad inferred target: approximately 15.8–16.4 s with comparable setup. Run from the same two-point start." },
        { id: "cue", name: "Primary cue", dosage: "Carry—do not press. Build, stay tall and finish organized." },
        { id: "stop", name: "Stop rule", dosage: "End after one or two if a rep is more than approximately 3% slower than the day's best, the inferred band is missed with worsening mechanics, posture/strike position collapses, the session changes to survival, or localized discomfort increases." }
      ]},
      { name: "Cooldown", items: [
        { id: "cooldown", name: "Easy jog-to-walk", dosage: "8–10 minutes; finish composed" }
      ]},
      { name: "Upper B — pain-free only", items: [
        { id: "incline", name: "Paused incline dumbbell press", dosage: "80 lb dumbbells × 6 × 3 at RPE 7–8; 2 min rest. Stop/change variation if medial-elbow soreness increases." },
        { id: "shoulder", name: "Neutral-grip machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
        { id: "rear", name: "Supported rear-delt fly", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest. Light grip, no swinging." },
        { id: "row", name: "Conditional neutral-grip machine or cable row with straps", dosage: "2 × 8–10 at RPE 6–7 only if Monday's row caused no delayed increase and a light warm-up set is symptom-free. Otherwise omit without replacement." }
      ]},
      { name: "Fueling", items: [
        { id: "pre", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with approximately 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate shortly before." },
        { id: "during", name: "During", dosage: "Water/electrolytes; add carbohydrate when track and lift are combined, conditions are hot or total duration is prolonged." },
        { id: "post", name: "After", dosage: "30–40 g protein, substantial carbohydrate and normal fluid/sodium replacement." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "Omit box jumps. Perform 2 × 120 m at approximately 90–92% with 10 min recovery and a broad target around 16.2–16.8 only when the warm-up normalizes. Reduce Upper B to 2 sets incline press, 2 sets shoulder press and omit row/rear delts when systemic fatigue or elbow status is amber." },
        { id: "red", name: "Red alternative", dosage: "No sprinting or jumping for a lower-body red flag. No upper lifting for worsening medial-elbow pain, weakness, numbness/tingling, swelling or altered arm use. Full rest or symptom-free very easy cycling as appropriate." }
      ]}
    ]
  };

  sessions.w5d5 = {
    purpose: "Recovery and absorption",
    duration: "0–35 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday is a recovery day. The occasional social upper-body option is suspended this week while Thursday's timed 120 response and pulling re-entry are assessed.",
    blocks: [
      { name: "Recovery options", items: [
        { id: "rest", name: "Full rest", dosage: "Preferred when you feel normal and do not need active recovery" },
        { id: "walk", name: "Easy walk", dosage: "Optional 15–30 min at a normal relaxed pace" },
        { id: "cycle", name: "Very easy cycle", dosage: "Optional 20–35 min at RPE 1–2, light resistance, only when it leaves the legs looser" }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Recovery-day intake", dosage: "Keep protein near the normal target, include enough carbohydrate to restore Thursday and avoid an aggressive deficit." }
      ]}
    ]
  };

  sessions.w5d6 = {
    purpose: "Longer easy aerobic support + conditional low-grip Upper C",
    duration: "50–80 min",
    volume: "50–55 min easy, 60-min cap + optional 4–6 low-grip upper sets",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The run is required and must remain conversational. Optional upper work requires medial elbows at 0–1/10 throughout the week, no delayed increase after Thursday and no Monday sprint-posture concern. No BFR is programmed. If a grip-free cable cuff is unavailable, omit direct biceps work.",
    blocks: [
      { name: "Readiness gate", items: [
        { id: "gait", name: "First-steps check", dosage: "Normal gait and no localized or worsening lower-body response after Thursday." },
        { id: "elbow", name: "Elbow gate for optional upper work", dosage: "Medial elbows 0–1/10, no next-morning increase after Thursday, and ordinary gripping is comfortable." }
      ]},
      { name: "Easy aerobic work", items: [
        { id: "opening", name: "Gradual opening", dosage: "First 10 minutes extremely easy" },
        { id: "run", name: "Easy run", dosage: "50–55 min target, 60-min hard cap; conversational / RPE 2–3; full sentences effortless; no hills, cadence target or fast finish." },
        { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
      ]},
      { name: "Optional Upper C — green elbows only", items: [
        { id: "cuffcurl", name: "Grip-free cuffed cable curl", dosage: "2 × 12–15 at RPE 6–7; 60–75 sec rest. Cable cuff around the distal forearm; no hard grip. Omit if equipment is unavailable or next-day soreness has not fully settled." },
        { id: "lateral", name: "Lateral raise", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest" },
        { id: "reardelt", name: "Supported rear-delt fly", dosage: "Optional 2 × 15–20 at RPE 7–8; 60 sec rest" }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "35–45 min easy and omit all optional upper work." },
        { id: "red", name: "Red alternative", dosage: "Full rest or 25–35 min very easy cycling only when symptom-free." }
      ]}
    ]
  };

  sessions.w5d7 = {
    purpose: "Full rest + weekly review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Sunday remains the non-negotiable rest day. Review trainer and any spike fly times, 120 m repeatability, elbow response, lifting completion, aerobic work and tissue status before publishing Week 6.",
    blocks: [
      { name: "Rest", items: [
        { id: "rest", name: "No training", dosage: "Normal daily movement only; no make-up work" }
      ]}
    ]
  };
})();