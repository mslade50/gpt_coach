(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  window.CURRENT_ATHLETE_STATE = {
    date: "2026-09-28",
    programPosition: "Aerobic Rebuild + Speed Retention — Week 1",
    readiness: "All sprint-relevant tissues reported good entering the transition.",
    primaryGoal: "Rebuild aerobic/10K capacity while retaining acceleration, maximum velocity, elastic ability and most existing strength.",
    weeklyRhythm: "Tuesday speed/primary strength; Thursday threshold/secondary strength; Saturday long run. Monday remains productive but deliberately low-cost.",
    runningTarget: "Approximately 30–33 miles plus one low-impact aerobic cross-training exposure.",
    strength: "Three exposures: Monday upper hypertrophy, Tuesday primary full-body strength, Thursday secondary full-body strength.",
    speed: "One weekly retention exposure: 3 × 30 m acceleration + 3 × flying 20 m with full recovery and familiar low-volume jumps."
  };

  const week = plans.find((plan) => plan && plan.week === 10);
  if (!week || !Array.isArray(week.days) || week.days.length < 7) return;

  week.blockWeekLabel = "AEROBIC REBUILD · WEEK 1";
  week.title = "Aerobic rebuild + speed retention";
  week.focus = "Shift the developmental priority to aerobic/10K fitness while retaining one high-quality speed exposure, three lifting exposures and low-impact cross-training. Tuesday, Thursday and Saturday are the three anchor days.";
  week.statusNote = "New block begins Sep 28. Monday is intentionally low-cost. Tuesday is the highest neuromuscular day, Thursday is controlled threshold, Saturday is the long aerobic anchor. Do not add a second hard aerobic session in Week 1.";
  week.days = [
    { day: "Mon", type: "Low–moderate", status: "Planned", title: "Easy cross-training + Upper A", detail: "Accumulate low-impact aerobic work and upper-body volume while improving Tuesday freshness.", volume: "45–50 min bike/elliptical + 14 upper-body work sets" },
    { day: "Tue", type: "High", status: "Planned", title: "Speed retention + Full Body A", detail: "One protected acceleration/max-velocity exposure with full recovery, familiar jumps and primary strength later.", volume: "3 × 30 m + 3 × flying 20 m; 20 low-level jump contacts; primary full-body strength" },
    { day: "Wed", type: "Low", status: "Planned", title: "Medium easy run", detail: "Build running volume and recover from Tuesday without compromising Thursday.", volume: "60 min conversational easy running" },
    { day: "Thu", type: "High", status: "Planned", title: "Threshold + Full Body B", detail: "Restart controlled threshold work, then perform a moderate secondary strength exposure later.", volume: "3 × 8 min threshold / 2 min jog + secondary full-body strength" },
    { day: "Fri", type: "Low", status: "Planned", title: "Easy aerobic recovery", detail: "Run easy if impact response is quiet; substitute low-impact aerobic work if Thursday leaves the legs flat or lower legs stiff.", volume: "45 min easy run OR 50–60 min easy bike/elliptical" },
    { day: "Sat", type: "Moderate–high aerobic", status: "Planned", title: "Long easy run", detail: "Primary weekly aerobic-volume anchor. No fast finish.", volume: "85 min easy; first 15 min deliberately very easy" },
    { day: "Sun", type: "Recovery", status: "Locked", title: "Full rest", detail: "No make-up work. Normal walking and light mobility only.", volume: "No training" }
  ];

  sessions.w10d1 = {
    purpose: "Easy cross-training + Upper A",
    duration: "90–105 min combined; split friendly",
    volume: "45–50 min low-impact aerobic + 14 upper-body work sets",
    footwear: "Cycling/elliptical shoes; normal gym footwear",
    note: "Monday must not become a hidden high day. Finish with legs that feel as good or better for Tuesday.",
    blocks: [
      { name: "Readiness", items: [
        { id: "m-readiness", name: "Quick tissue check", dosage: "Proceed if gait is normal and hamstring, calf/Achilles, foot/ankle and adductor/hip are quiet. This is a low-cost day." }
      ]},
      { name: "Aerobic cross-training", items: [
        { id: "m-aerobic", name: "Bike or elliptical", dosage: "45–50 min at RPE 2–3. 5 min very easy, 35–40 min steady conversational, 5 min easy. Bike cadence generally 80–95 rpm. No intervals or fast finish." }
      ]},
      { name: "Upper A — hypertrophy", items: [
        { id: "m-inc-db", name: "Incline dumbbell press", dosage: "3 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "m-pulldown", name: "Neutral-grip pulldown or pull-up", dosage: "3 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "m-row", name: "Chest-supported or cable row", dosage: "2 × 10–12 at RPE 7–8; 75–90 sec rest." },
        { id: "m-lateral", name: "Lateral raise", dosage: "2 × 15–20; 45–60 sec rest." },
        { id: "m-curl", name: "Cable or dumbbell curl", dosage: "2 × 10–15; 60 sec rest. Final set may be AMRAP(-2)." },
        { id: "m-triceps", name: "Rope pressdown", dosage: "2 × 10–15; 60 sec rest. Final set may be AMRAP(-2)." }
      ]},
      { name: "Fueling", items: [
        { id: "m-fuel", name: "Normal training-day fueling", dosage: "Normal meal 1–3 hr before with approximately 25–35 g protein plus carbohydrate. Water during is usually sufficient unless conditions are hot." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "m-amber", name: "Amber", dosage: "35–40 min aerobic + 2 sets per movement." },
        { id: "m-red", name: "Red", dosage: "Rest or 20–30 min very easy non-impact movement if appropriate." }
      ]}
    ]
  };

  sessions.w10d2 = {
    purpose: "Speed retention + Full Body A",
    duration: "Track 65–80 min + strength 55–70 min; separate by 3+ hr when possible",
    volume: "3 × 30 m acceleration + 3 × flying 20 m; 16 pogo contacts + 4 broad jumps; primary full-body strength",
    footwear: "Trainers on a dry, firm, predictable track; normal gym footwear later",
    note: "This is the week's highest neuromuscular day. Speed volume is maintenance, not a new progression. Full recovery is part of the prescription.",
    blocks: [
      { name: "Readiness and conditions gate", items: [
        { id: "t-readiness", name: "Morning readiness", dosage: "Normal gait; hamstring, calf/Achilles, foot/ankle and adductor/hip ideally 0–1/10; no worsening local symptom." },
        { id: "t-track", name: "Track check", dosage: "Dry, firm, predictable surface. Use consistent measured marks if timing." }
      ]},
      { name: "Raise temperature", items: [
        { id: "t-jog", name: "Easy jog", dosage: "5 min, beginning very easy." },
        { id: "t-skip", name: "Forward skip", dosage: "1 × 20 m relaxed." },
        { id: "t-shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction." },
        { id: "t-backward", name: "Backward run", dosage: "1 × 20 m relaxed." }
      ]},
      { name: "Mobility", items: [
        { id: "t-ankle", name: "Ankle rocker", dosage: "1 × 8 each side." },
        { id: "t-adductor", name: "Adductor rockback", dosage: "1 × 6 each side." },
        { id: "t-lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side." },
        { id: "t-legswing1", name: "Front/back leg swing", dosage: "1 × 8 each leg." },
        { id: "t-legswing2", name: "Side-to-side leg swing", dosage: "1 × 8 each leg." }
      ]},
      { name: "Sprint drills", items: [
        { id: "t-amarch", name: "A-march", dosage: "1 × 20 m. Purpose: posture and contact underneath the body." },
        { id: "t-askip", name: "A-skip", dosage: "1 × 20 m. Purpose: rhythm and stiffness." },
        { id: "t-dribble", name: "Low dribble", dosage: "1 × 20 m. Purpose: quick contacts beneath the hips." }
      ]},
      { name: "Elastic primer", items: [
        { id: "t-pogo", name: "Low pogos", dosage: "2 × 8 contacts; 45–60 sec rest. Quiet and quick." },
        { id: "t-broad", name: "Standing broad jump", dosage: "2 × 2 at approximately 90%; 75–90 sec rest. Full reset." }
      ]},
      { name: "Progressive buildups", items: [
        { id: "t-b60", name: "Buildup 1", dosage: "40 m at approximately 60%; walk back." },
        { id: "t-b75", name: "Buildup 2", dosage: "50 m at approximately 75%; 90 sec rest." },
        { id: "t-b85", name: "Buildup 3", dosage: "50 m at approximately 85%; 2 min rest." },
        { id: "t-b90", name: "Buildup 4", dosage: "60 m at approximately 90%; 3 min before first acceleration." }
      ]},
      { name: "Acceleration", items: [
        { id: "t-30s", name: "3 × 30 m", dosage: "Two-point start; approximately 95–98% current velocity; 4½–5 min recovery. Comparable prior profile roughly 4.00–4.16 s only when timing conditions match." },
        { id: "t-accelcue", name: "Primary cue", dosage: "Push back and rise gradually." },
        { id: "t-accelstop", name: "Stop rule", dosage: "Stop for roughly 3–4% deterioration, worsening projection, repeated popping upright or increasing localized discomfort." }
      ]},
      { name: "Maximum velocity", items: [
        { id: "t-fly20", name: "3 × flying 20 m", dosage: "30–35 m progressive buildup + 20 m fast zone + at least 40 m gradual deceleration; 6 min recovery. Prior comparable fly territory roughly 2.03–2.11 s when setup matches." },
        { id: "t-flycue", name: "Primary cue", dosage: "Tall and down. Do not manufacture stride length." },
        { id: "t-flystop", name: "Stop rule", dosage: "Stop for more than about 3% deterioration from the day's best, reaching/straining, worsening posture or increasing localized discomfort." }
      ]},
      { name: "Cooldown", items: [
        { id: "t-cool", name: "Easy jog", dosage: "10–15 min very easy. No extra strides." }
      ]},
      { name: "Full Body A — later", items: [
        { id: "t-deadlift", name: "Conventional deadlift", dosage: "3 × 3 at RPE 7.5–8; 3–4 min rest. Rough opening range 445–455 lb if warmups look normal. No AMRAP." },
        { id: "t-bench", name: "Bench press", dosage: "4 × 5 at RPE 7.5–8; 2½–3 min rest. Likely around 245–250 lb; let set 1 decide." },
        { id: "t-rfess", name: "Rear-foot-elevated split squat", dosage: "2 × 5 each leg at RPE 7–8; 90–120 sec rest." },
        { id: "t-row", name: "Chest-supported row", dosage: "2 × 8–10 at RPE 7–8; 90 sec rest. Final set may be AMRAP(-2)." },
        { id: "t-calf", name: "Standing calf raise", dosage: "2 × 8–10 at RPE 7; 75–90 sec rest." }
      ]},
      { name: "Fueling", items: [
        { id: "t-pre", name: "Pre-track", dosage: "2–3 hr before: carbohydrate-rich meal + approximately 25–35 g protein, fluid and sodium." },
        { id: "t-between", name: "Between track and lift", dosage: "Eat a full carbohydrate/protein meal when sessions are separated by hours." },
        { id: "t-post", name: "Post-lift", dosage: "30–40 g protein plus substantial carbohydrate and normal fluid/sodium replacement." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "t-amber", name: "Amber", dosage: "2 × 30 m + 2 × fly 20; remove broad jumps; deadlift 2 sets; RFESS 1–2 sets." },
        { id: "t-red", name: "Red", dosage: "No sprinting or intensive jumping. Use easy bike/elliptical if appropriate." }
      ]}
    ]
  };

  sessions.w10d3 = {
    purpose: "Medium easy run",
    duration: "Approximately 65 min including brief maintenance",
    volume: "60 min easy conversational running",
    footwear: "Normal trainers on flat or gently rolling terrain",
    note: "This is volume accumulation and recovery, not a moderate workout.",
    blocks: [
      { name: "Aerobic work", items: [
        { id: "w-run", name: "Easy run", dosage: "60 min at RPE 2–3. Begin the first 8–10 min slower than normal. Conversational throughout; no progression finish." }
      ]},
      { name: "Post-run maintenance", items: [
        { id: "w-ankle", name: "Ankle rocker", dosage: "1 × 8 each side." },
        { id: "w-soleus", name: "Bent-knee calf isometric", dosage: "1 × 20 sec each side." },
        { id: "w-calf", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side." },
        { id: "w-add", name: "Adductor rockback", dosage: "1 × 6 each side." }
      ]},
      { name: "Cue and alternatives", items: [
        { id: "w-cue", name: "Primary cue", dosage: "Quiet feet, easy breathing." },
        { id: "w-amber", name: "Amber", dosage: "45–50 min easy." },
        { id: "w-red", name: "Impact issue", dosage: "50–60 min easy bike/elliptical instead." }
      ]}
    ]
  };

  sessions.w10d4 = {
    purpose: "Threshold development + Full Body B",
    duration: "Run 55–70 min + lift 50–60 min; split preferred",
    volume: "3 × 8 min controlled threshold / 2 min easy jog + secondary full-body strength",
    footwear: "Trainers for running; normal gym footwear later",
    note: "Threshold is the day's developmental priority. Do not use old 5K pace as an automatic target; use controlled effort and record pace/HR/RPE for Week 2.",
    blocks: [
      { name: "Readiness", items: [
        { id: "th-ready", name: "Recovery gate", dosage: "Tuesday must be absorbed: normal gait, no meaningful local tissue soreness and no worsening calf/Achilles/hamstring/adductor response." }
      ]},
      { name: "Running warm-up", items: [
        { id: "th-jog", name: "Easy jog", dosage: "12 min easy." },
        { id: "th-ankle", name: "Ankle rocker", dosage: "1 × 8 each side." },
        { id: "th-lunge", name: "Walking lunge", dosage: "1 × 5 each side." },
        { id: "th-swing", name: "Leg swings", dosage: "1 × 8 each side." },
        { id: "th-askip", name: "A-skip", dosage: "1 × 20 m relaxed." },
        { id: "th-strides", name: "4 × 20 sec relaxed strides", dosage: "Approximately current 5K rhythm, not sprinting; 60 sec easy jog between." }
      ]},
      { name: "Main threshold set", items: [
        { id: "th-main", name: "3 × 8 min threshold", dosage: "RPE 6–7/10 with 2 min easy jog recovery. Controlled breathing; short phrases possible; repeatable from rep 1 to rep 3." },
        { id: "th-record", name: "Record the useful data", dosage: "Average pace, average HR if available and RPE after each rep." },
        { id: "th-cue", name: "Primary cue", dosage: "Float the first half." },
        { id: "th-stop", name: "Intensity rule", dosage: "If rep 1 exceeds roughly RPE 7.5 halfway through, slow down rather than turning this into a race." }
      ]},
      { name: "Cooldown", items: [
        { id: "th-cool", name: "Easy cooldown", dosage: "10–15 min easy." }
      ]},
      { name: "Full Body B — later", items: [
        { id: "th-squat", name: "Back squat", dosage: "3 × 5 at approximately RPE 7; 2½–3 min rest. Rough opening range 305–325 lb depending on the day." },
        { id: "th-ham", name: "Seated or lying hamstring curl", dosage: "3 × 8–12 at RPE 7–8; 75–90 sec rest. Final set may be AMRAP(-2)." },
        { id: "th-press", name: "DB or machine shoulder press", dosage: "3 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "th-pull", name: "Neutral-grip pulldown or pull-up", dosage: "2 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "th-rear", name: "Rear-delt fly", dosage: "2 × 15–20; 45–60 sec rest." },
        { id: "th-arms", name: "Optional curl + pressdown superset", dosage: "2 × 12–15 each; 60 sec between rounds. Only if still fresh." }
      ]},
      { name: "Fueling", items: [
        { id: "th-pre", name: "Before running", dosage: "Carbohydrate-rich meal 2–3 hr prior + approximately 25–35 g protein." },
        { id: "th-between", name: "Between run and lift", dosage: "Full carbohydrate/protein meal plus fluid and sodium." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "th-amber", name: "Amber", dosage: "Replace threshold with 40–45 min easy running; squat 2 sets; remove optional arms." },
        { id: "th-red", name: "Red", dosage: "No threshold or lower-body strength." }
      ]}
    ]
  };

  sessions.w10d5 = {
    purpose: "Easy aerobic recovery",
    duration: "45–60 min",
    volume: "45 min easy run OR 50–60 min easy bike/elliptical",
    footwear: "Trainers if running",
    note: "Choose the modality that best preserves Saturday. Do not force running for mileage if Thursday created meaningful impact fatigue.",
    blocks: [
      { name: "Primary option", items: [
        { id: "f-run", name: "Easy run", dosage: "45 min at RPE 2–3. Conversational, flat/gently rolling, no fast finish." }
      ]},
      { name: "Impact-management option", items: [
        { id: "f-bike", name: "Bike or elliptical substitute", dosage: "50–60 min easy at RPE 2–3 if legs are flat or calf/Achilles/foot tissues are stiff after Thursday." }
      ]},
      { name: "Rule", items: [
        { id: "f-rule", name: "Saturday protection", dosage: "Finish Friday feeling like you could have done more. No lifting." }
      ]}
    ]
  };

  sessions.w10d6 = {
    purpose: "Long easy aerobic run",
    duration: "85 min plus brief preparation",
    volume: "85 min easy; first 15 min deliberately very easy",
    footwear: "Comfortable trainers on road, crushed gravel or predictable path",
    note: "This is the week's largest aerobic-volume stimulus. Accumulate time, not pace. No fast finish.",
    blocks: [
      { name: "Pre-run", items: [
        { id: "s-ready", name: "Impact readiness", dosage: "Proceed with 85 min if gait is normal and lower-leg tissues are quiet. If not, use the amber/red alternatives." },
        { id: "s-precarb", name: "Pre-run carbohydrate", dosage: "Approximately 30–60 g carbohydrate plus fluids before starting." }
      ]},
      { name: "Long run", items: [
        { id: "s-run", name: "85 min easy", dosage: "First 15 min intentionally slow, then settle naturally at RPE 2–3. Full-sentence effort. No fast finish." },
        { id: "s-cue", name: "Primary cue", dosage: "Relax and accumulate time." }
      ]},
      { name: "During and after", items: [
        { id: "s-during", name: "During", dosage: "Approximately 30–45 g carbohydrate per hour plus water/electrolytes; use meaningful sodium when sweat losses are high." },
        { id: "s-post", name: "After", dosage: "30–40 g protein plus a carbohydrate-heavy meal and normal fluid/sodium replacement." }
      ]},
      { name: "Alternatives", items: [
        { id: "s-amber", name: "Amber", dosage: "65–70 min easy." },
        { id: "s-red", name: "Impact issue", dosage: "75–90 min easy cycling instead." }
      ]}
    ]
  };

  sessions.w10d7 = {
    purpose: "Full rest",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "No make-up mileage or lifting. Normal walking and light mobility only.",
    blocks: [
      { name: "Recovery", items: [
        { id: "su-rest", name: "Full rest", dosage: "Normal daily movement only. No make-up work." }
      ]},
      { name: "Weekly review items", items: [
        { id: "su-review", name: "Report useful Week 1 data", dosage: "Tuesday sprint quality/tissue response, Thursday threshold pace/HR/RPE, Saturday duration/pace/HR, lifting loads/RPE and any lower-leg response." }
      ]}
    ]
  };
})();