(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  window.CURRENT_ATHLETE_STATE = {
    date: "2026-08-30",
    programPosition: "Week 5 complete; entering Week 6",
    readiness: "Lower body green based on all reported responses. No medial-elbow flare was reported after the strapped neutral-grip row re-entry; continue to treat the elbows as a delayed-response monitor.",
    mostRecentHighOutput: "Week 5 Thursday: 3 × 120 m in 16.3 / 16.1 / 16.3 s, approximately 1.2% spread, with no reported mechanical or tissue issue.",
    profile: {
      cmj: "Approximately 16.7 in best from 120 fps slow-motion flight-time conversion; internal method.",
      broadJump: "94 in standardized best",
      acceleration30m: "3.99 s best; 4.11 / 4.11 / 3.99 s",
      flying20m: "2.01 s provisional best; repeatability remains lower-confidence because later benchmark reps deteriorated.",
      sprint120m: "16.1 s best; 16.3 / 16.1 / 16.3 s with approximately 1.2% spread.",
      sprint150m: "Approximately 18.8 s using combined hand timing and video corroboration; nearest-tenth internal baseline."
    },
    technicalTheme: "Use objective timing, relaxation and repeatability rather than trying to feel an exact difference between 95% and 100% effort.",
    strength: "Primary lower-body maintenance and Monday upper work were completed in Week 5. The strapped row re-entry produced no reported delayed flare. Thursday Upper B completion was not separately confirmed.",
    aerobic: "Strong reserve maintained. Tuesday: 46 min at 8:17/mi and 132 avg HR. Saturday: 62:32, 7.35 mi, approximately 8:30/mi and 126 avg HR.",
    tissue: "No reported hamstring, calf/Achilles, foot, shin or adductor issue. Medial elbows remain an exercise-specific monitor rather than a current training restriction.",
    nutrition: "No new seven-day body-weight or calorie trend was reported; calorie cycling remains unchanged."
  };

  const week5 = plans.find((plan) => plan && plan.week === 5);
  if (week5 && Array.isArray(week5.days) && week5.days.length >= 7) {
    week5.focus = "Week 5 complete: benchmark-guided speed returned, timed 120 m work was highly repeatable, lower-body tissues stayed green and aerobic reserve remained strong.";
    week5.statusNote = "Review completed Aug 30. Monday's profile-guided speed and Full Body A were completed qualitatively but not timed, so flying-speed repeatability was not objectively reassessed. Tuesday easy running was controlled. Wednesday extensive-tempo completion was not separately reported. Thursday's 120 m series was 16.3/16.1/16.3 s, all within the prescribed band and only about 1.2% apart; Upper B completion was not separately reported. Friday rest and Saturday's easy run were completed; Saturday exceeded the 60-minute cap by 2:32 but remained low-cost. No lower-body or medial-elbow flare was reported. Progress to Week 6 while extending the fly zone to 30 m and the speed-endurance distance to three 150s. No body-weight trend was reported, so nutrition is unchanged.";

    if (week5.days[0]) week5.days[0].status = "Completed";
    if (week5.days[1]) week5.days[1].status = "Completed";
    if (week5.days[2]) {
      week5.days[2].status = "Unconfirmed";
      week5.days[2].detail = "The planned 2 × 5 × 100 m extensive-tempo session was not separately reported, so formal completion is unconfirmed.";
    }
    if (week5.days[3]) {
      week5.days[3].status = "Completed — track";
      week5.days[3].detail = "Timed 120 m work completed in 16.3/16.1/16.3 s with excellent repeatability. Upper B completion was not separately reported.";
    }
    if (week5.days[4]) week5.days[4].status = "Completed";
    if (week5.days[5]) week5.days[5].status = "Completed";
    if (week5.days[6]) {
      week5.days[6].status = "Locked";
      week5.days[6].detail = "Full rest. Week 5 review is complete and the detailed Week 6 plan is published.";
    }
  }

  const week6 = plans.find((plan) => plan && plan.week === 6);
  if (!week6 || !Array.isArray(week6.days) || week6.days.length < 7) return;

  week6.title = "Maximum-velocity development and 150 m repeatability";
  week6.focus = "Use hill-to-flat acceleration contrast, extend the fly zone to 30 m and repeat three profile-guided 150 m efforts while preserving lower-body force, aerobic support and elbow-tolerant upper-body progression.";
  week6.statusNote = "Detailed Week 6 sessions published Aug 30. Monday introduces two hill accelerations, two flat accelerations and three flying 30s. The provisional flying-30 guide is broad because the 2.01 s flying-20 benchmark had limited repeatability; the day's-best 3% drop-off is more important than chasing a single target. Thursday uses the approximately 18.8 s 150 m baseline to prescribe 20.2–20.9 s at roughly 90–93% velocity. Trainers remain the default. A spike rep is not allowed unless a prior spike exposure was completed without a delayed lower-leg response. No new unilateral plyometric progression is added while fly distance and sprint-endurance demand increase.";

  const week6Days = [
    {
      day: "Mon",
      type: "High",
      status: "Planned",
      title: "Hill-to-flat acceleration contrast + flying 30s + Full Body A",
      detail: "Two lightly resisted hill accelerations prime horizontal force before two flat accelerations and the first flying-30 exposure. Full recovery and objective drop-off govern volume.",
      volume: "2 × 30 m hill + 2 × 30 m flat + 3 × flying 30 m; familiar jump primer; 11 strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Easy aerobic support + tissue/elbow check",
      detail: "Conversational running and low-cost maintenance. The next-morning response to flying 30s and pulling determines Thursday's full dose.",
      volume: "40–45 min easy, 50-min cap + 5–7 min maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Extensive tempo / relaxed rhythm",
      detail: "Keep aerobic and contact work smooth enough that Thursday's 150s begin sharp.",
      volume: "2 × 5 × 100 m / 1,000 m total"
    },
    {
      day: "Thu",
      type: "High",
      status: "Planned",
      title: "Three timed 150s + Power / Upper B",
      detail: "Repeat three 150 m efforts at approximately 90–93% velocity with full recovery. Repeatability and mechanics matter more than a heroic first rep.",
      volume: "3 × 150 m / 450 m; 2 × 2 low box jumps; 7–9 upper-body sets"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "Full rest preferred. Optional easy walking or cycling only when it improves recovery.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Longer easy aerobic support + conditional low-grip Upper C",
      detail: "Keep the run conversational. Optional delt and grip-free biceps work is available only after a quiet elbow week.",
      volume: "50–55 min easy, 60-min cap + optional 7 low-grip upper sets"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + weekly review",
      detail: "Non-negotiable complete rest and Week 6 review.",
      volume: "No training"
    }
  ];
  week6Days.forEach((day, index) => Object.assign(week6.days[index], day));

  sessions.w6d1 = {
    purpose: "Hill-to-flat acceleration contrast + first flying 30s + Full Body A",
    duration: "120–150 min total; split track and strength by several hours when possible",
    volume: "2 × 30 m hill + 2 × 30 m flat + 3 × flying 30 m; 16 pogo contacts + 4 broad jumps; 11 strength sets",
    footwear: "Trainers on a dry, safe moderate hill and a firm predictable track. No spikes unless a prior spike exposure was completed and the next-morning response was fully green.",
    note: "Week 6 extends the fly zone from 20 to 30 m, so sprint distance—not footwear or plyometric complexity—is the main progression. The first flying-30 session is partly a profile extension. A broad guide of approximately 3.05–3.20 s may be useful with the same high-frame-rate method, but the 3% drop from the day's best and technical quality govern the session.",
    blocks: [
      {
        name: "Readiness and conditions gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; sleep/general readiness acceptable; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal calf/shin issue; medial elbows stable at 0–1/10 without numbness, tingling or weakness." },
          { id: "conditions", name: "Hill, track and timing", dosage: "Dry predictable moderate hill, dry firm track, measured marks and the same high-frame-rate timing rules used previously. Wind or a changed setup makes target bands contextual." },
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
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact beneath the body." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: connect posture to relaxed elastic rhythm." }
        ]
      },
      {
        name: "Elastic primer",
        items: [
          { id: "pogo", name: "Low ankle pogo", dosage: "2 × 8 contacts; 45–60 sec rest. Quiet and quick, not high." },
          { id: "broad", name: "Standing broad jump with stick", dosage: "2 × 2 at approximately 85–90%; 75–90 sec rest. Full reset; no benchmark-distance chase." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "build60", name: "Buildup 1", dosage: "1 × 40 m at approximately 60%; walk back" },
          { id: "build75", name: "Buildup 2", dosage: "1 × 50 m at approximately 75%; 90 sec rest" },
          { id: "build85", name: "Buildup 3", dosage: "1 × 60 m at approximately 85%; 2 min rest" },
          { id: "build92", name: "Buildup 4", dosage: "1 × 60 m at approximately 90–92%; 3 min before the hill work" }
        ]
      },
      {
        name: "Acceleration contrast",
        items: [
          { id: "hill", name: "2 × 30 m moderate-hill acceleration", dosage: "Approximately 90–95% current intent; 4 min recovery. Use a safe moderate grade that preserves projection and does not force short choppy steps." },
          { id: "flat", name: "2 × 30 m flat acceleration", dosage: "Approximately 95–100% current velocity; 5 min recovery. Time when setup allows. Comparable guide: approximately 4.00–4.16 s." },
          { id: "accelcue", name: "Primary acceleration cue", dosage: "Push back and rise gradually." },
          { id: "accelstop", name: "Acceleration stop rule", dosage: "End for approximately 3–4% deterioration from the day's best flat rep, declining projection, repeated popping upright, hesitation or increasing localized discomfort." }
        ]
      },
      {
        name: "Flying 30 m",
        items: [
          { id: "fly30", name: "3 × flying 30 m", dosage: "35–40 m progressive buildup + 30 m timed zone + at least 50 m gradual deceleration; 7–8 min recovery. Broad comparable guide: approximately 3.05–3.20 s, but treat the first session as a profile extension." },
          { id: "flycue", name: "Primary maximum-velocity cue", dosage: "Tall and down. Let speed happen; do not manufacture stride length." },
          { id: "flystop", name: "Maximum-velocity stop rule", dosage: "Stop after two when a rep is more than approximately 3% slower than the day's best, contacts lengthen or get louder, relaxation disappears, posture worsens or localized discomfort increases." }
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
          { id: "row", name: "Chest-supported neutral-grip row with straps", dosage: "2 × 8–10 at RPE 7; 90 sec rest. Light grip; stop if medial-elbow soreness exceeds 2/10 or changes during the set." },
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
          { id: "amber", name: "Amber modification", dosage: "1 × 30 m hill + 2 × 30 m flat at approximately 92–95%, then 2 × flying 30 m at approximately 92–95% only if the warm-up becomes normal. Use 1 × 8 pogos, omit broad jumps, perform one deadlift set and two bench sets, and omit RFESS/calf work." },
          { id: "red", name: "Red alternative", dosage: "No sprinting, plyometrics or lower-body lifting. Full rest or 25–35 min very easy cycling when symptom-free. Pain-free upper pressing is optional only when a red flag is isolated to the lower body and systemic readiness is normal." }
        ]
      }
    ]
  };

  sessions.w6d2 = {
    purpose: "Easy aerobic support + flying-30 and elbow response check",
    duration: "48–60 min",
    volume: "40–45 min easy, 50-min cap + 5–7 min maintenance",
    footwear: "Trainers on flat or gently rolling predictable terrain",
    note: "The first 8–10 minutes are the warm-up. Keep the run conversational. The delayed lower-leg, hamstring and medial-elbow response determines Thursday's full dose and conditional pulling. No lifting today.",
    blocks: [
      { name: "Readiness gate", items: [
        { id: "check", name: "First-steps check", dosage: "Normal gait; no sharp, localized, worsening or one-sided hamstring, calf/Achilles, shin, foot/ankle or adductor/hip issue; elbows stable without numbness/tingling." }
      ]},
      { name: "Easy aerobic work", items: [
        { id: "opening", name: "Gradual opening", dosage: "2 min brisk walk or shuffle, then 8 min extremely easy running" },
        { id: "run", name: "Easy run", dosage: "Continue to 40–45 min total; 50-min hard cap; conversational / RPE 2–3. No hills, strides, cadence target or fast finish." },
        { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
      ]},
      { name: "Tissue maintenance", items: [
        { id: "ankle", name: "Ankle rocker", dosage: "1 × 8 each side" },
        { id: "calfiso", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side" },
        { id: "soleus", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
        { id: "adductor", name: "Adductor rock-back", dosage: "1 × 6 each side" }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Around the session", dosage: "Use normal pre-run carbohydrate as useful, water/electrolytes according to conditions, then 25–40 g protein and a carbohydrate-containing meal afterward." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "30–40 min easy, or 25–35 min very easy cycling when generalized soreness is greater than expected but gait is normal." },
        { id: "red", name: "Red alternative", dosage: "Full rest for sharp, localized, worsening or gait-altering symptoms." }
      ]}
    ]
  };

  sessions.w6d3 = {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "45–58 min",
    volume: "2 × 5 × 100 m / 1,000 m total",
    footwear: "Trainers on a forgiving track surface or predictable flat grass",
    note: "This is low-cost aerobic and contact work, not threshold. Keep the pace and contacts quiet enough that Thursday's 150 m work begins sharp. No lifting.",
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
        { id: "amarch", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: posture and contact position." },
        { id: "askip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: relaxed elastic rhythm." },
        { id: "build60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
        { id: "build70", name: "Buildup 2", dosage: "1 × 60 m at approximately 70%; 60–90 sec rest" }
      ]},
      { name: "Extensive tempo", items: [
        { id: "set1", name: "Set 1", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
        { id: "rest", name: "Set recovery", dosage: "3 min walking/standing" },
        { id: "set2", name: "Set 2", dosage: "5 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
        { id: "cue", name: "Primary cue", dosage: "Float and stay quiet." },
        { id: "stop", name: "Stop rule", dosage: "Stop or reduce if contacts get louder, you begin pressing/reaching, stride becomes asymmetric or soreness increases/localizes." }
      ]},
      { name: "Cooldown", items: [
        { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; no added mileage" }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Around the session", dosage: "Use a carbohydrate-containing meal or snack beforehand as useful, water/electrolytes according to conditions, then 25–40 g protein and a normal carbohydrate serving afterward." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "2 × 4 × 100 m / 800 m total at the same relaxed pace, or 25–35 min very easy cycling." },
        { id: "red", name: "Red alternative", dosage: "No tempo. Full rest or symptom-free easy non-impact work." }
      ]}
    ]
  };

  sessions.w6d4 = {
    purpose: "Three profile-guided 150 m repetitions + Power / Upper B",
    duration: "105–135 min total; split track and lift when possible",
    volume: "3 × 150 m / 450 m + 2 × 2 low box jumps + 7–9 upper-body sets",
    footwear: "Trainers on a dry predictable track; same start, lane and timing method when possible",
    note: "The approximately 18.8 s 150 m benchmark produces a 90–93% velocity guide of roughly 20.2–20.9 s. Because the benchmark used combined hand/video timing, use a broad band and prioritize repeatability, mechanics and the day's-best 3% cutoff. Do not run the first rep near 18.8–19.5 s; that would turn the session into testing rather than training.",
    blocks: [
      { name: "Readiness and conditions gate", items: [
        { id: "readiness", name: "Morning readiness", dosage: "Normal gait; Monday flying-30 response settled; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal calf/shin issue; elbows stable without nerve symptoms." },
        { id: "conditions", name: "Track and timing", dosage: "Dry predictable track and the same practical timing method across all three reps. Record surface, footwear and meaningful wind." },
        { id: "warmup", name: "Warm-up response", dosage: "Proceed only when movement becomes springier and more coordinated without increasing localized symptoms." }
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
        { id: "amarch", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position." },
        { id: "askip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: connect posture to relaxed rhythm." }
      ]},
      { name: "Power primer — green only", items: [
        { id: "box", name: "Low box jump with stick", dosage: "2 × 2; full reset; 60–90 sec rest. Quiet, stable landing. Stop for asymmetry, loud contacts or degraded position." }
      ]},
      { name: "Progressive buildups", items: [
        { id: "build60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
        { id: "build75", name: "Buildup 2", dosage: "1 × 60 m at approximately 75%; 90 sec rest" },
        { id: "build85", name: "Buildup 3", dosage: "1 × 80 m at approximately 85%; 2 min rest" },
        { id: "build90", name: "Buildup 4", dosage: "1 × 80 m at approximately 90%; 4 min before rep 1" }
      ]},
      { name: "150 m speed endurance", items: [
        { id: "reps", name: "3 × 150 m", dosage: "Approximately 90–93% velocity; target guide 20.2–20.9 s; 10–12 min recovery. Use the same two-point start and timing method. Build through the opening, float through the middle and carry the final 30 m." },
        { id: "cue", name: "Primary cue", dosage: "Build, float, carry." },
        { id: "stop", name: "Stop rule", dosage: "Stop after one or two if a repetition is more than approximately 3% slower than the day's best, posture collapses, the final 30 m becomes survival, contacts become louder/reachier or localized discomfort increases." }
      ]},
      { name: "Cooldown", items: [
        { id: "cooldown", name: "Easy jog-to-walk", dosage: "8–10 minutes; finish composed" }
      ]},
      { name: "Upper B — later, pain-free only", items: [
        { id: "incline", name: "Paused incline dumbbell press", dosage: "80 lb dumbbells × 6 × 3; 2 min rest; keep 1–3 reps in reserve." },
        { id: "pulldown", name: "Neutral-grip pulldown with straps", dosage: "2 × 8 at RPE 6–7; 90–120 sec rest. This is the only new pulling progression and is conditional on no delayed elbow increase after Monday." },
        { id: "shoulder", name: "Neutral-grip machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
        { id: "rear", name: "Supported rear-delt fly", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest. Light grip, no swinging." }
      ]},
      { name: "Fueling", items: [
        { id: "pre", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with approximately 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easily digested carbohydrate shortly before." },
        { id: "during", name: "During", dosage: "Water/electrolytes; add 30–60 g carbohydrate per hour when track and lift are combined, total duration is prolonged or conditions are hot." },
        { id: "post", name: "After", dosage: "30–40 g protein, substantial carbohydrate and normal fluid/sodium replacement." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "Omit box jumps. Perform 2 × 150 m at approximately 88–90% with 10–12 min recovery; treat times as contextual. Reduce Upper B to two incline-press sets and two shoulder-press sets; omit pulling and rear delts." },
        { id: "red", name: "Red alternative", dosage: "No sprinting or jumping for a lower-body red flag. No upper lifting for worsening medial-elbow pain, weakness, numbness/tingling, swelling or altered arm use. Full rest or symptom-free very easy cycling as appropriate." }
      ]}
    ]
  };

  sessions.w6d5 = {
    purpose: "Recovery and absorption",
    duration: "0–40 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday remains a genuine recovery day after three timed 150s. Full rest is preferred. Do not add a social upper-body session this week while the vertical-pull re-entry and special-endurance response are being assessed.",
    blocks: [
      { name: "Recovery options", items: [
        { id: "rest", name: "Full rest", dosage: "Preferred" },
        { id: "walk", name: "Easy walk", dosage: "Optional 15–30 min at a relaxed pace" },
        { id: "cycle", name: "Very easy cycle", dosage: "Optional 20–30 min at RPE 1–2, light resistance, only when it leaves the legs looser" }
      ]},
      { name: "Restrictions", items: [
        { id: "none", name: "No make-up work", dosage: "No running workout, lower-body work, social lift or direct arm work." }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Recovery-day intake", dosage: "Keep protein near the normal daily target, include enough carbohydrate to restore Thursday and avoid an aggressive deficit." }
      ]}
    ]
  };

  sessions.w6d6 = {
    purpose: "Longer easy aerobic support + conditional low-grip Upper C",
    duration: "50–85 min",
    volume: "50–55 min easy, 60-min cap + optional 7 low-grip upper sets",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "The easy run is required and must remain conversational. Optional upper work is available only when medial elbows remained 0–1/10 after both Monday and Thursday pulling and no session created a worse next-morning response. BFR is not programmed without individualized cuff-pressure setup.",
    blocks: [
      { name: "Readiness gate", items: [
        { id: "check", name: "First-steps check", dosage: "Normal gait; no localized or worsening lower-body response after Thursday; elbows stable at 0–1/10." }
      ]},
      { name: "Easy aerobic work", items: [
        { id: "opening", name: "Gradual opening", dosage: "First 10 min extremely easy" },
        { id: "run", name: "Easy run", dosage: "50–55 min total, 60-min hard cap; conversational / RPE 2–3; full sentences effortless; no hills, cadence target or fast finish." },
        { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
      ]},
      { name: "Optional Upper C — elbow-green only", items: [
        { id: "curl", name: "Grip-free cuffed cable curl", dosage: "2 × 12–15 at RPE 6–7; 60 sec rest. Cable cuff around the distal forearm; no hard gripping. Judge tolerance by the following morning." },
        { id: "lateral", name: "Machine or cable lateral raise", dosage: "3 × 12–20 at RPE 7–8; 60 sec rest" },
        { id: "rear", name: "Supported rear-delt fly", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest" }
      ]},
      { name: "Fueling", items: [
        { id: "fuel", name: "Around the session", dosage: "Normal pre-run carbohydrate as useful, water/electrolytes according to conditions, then 25–40 g protein and a carbohydrate-containing meal afterward." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "amber", name: "Amber modification", dosage: "35–45 min easy and omit optional Upper C." },
        { id: "red", name: "Red alternative", dosage: "Full rest or 25–35 min very easy cycling only when symptom-free." }
      ]}
    ]
  };

  sessions.w6d7 = {
    purpose: "Full rest + weekly review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Sunday remains the non-negotiable rest day. Week 6 review determines the exact Week 7 flying-30 and 180 m doses.",
    blocks: [
      { name: "Rest", items: [
        { id: "full", name: "No training", dosage: "Normal daily movement only; no make-up work" }
      ]}
    ]
  };
})();