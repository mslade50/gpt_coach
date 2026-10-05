(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  window.CURRENT_ATHLETE_STATE = {
    date: "2026-10-05",
    programPosition: "Aerobic Rebuild + Speed Retention — B Week 1",
    readiness: "All training from the prior week was completed. Thursday threshold felt substantially harder than intended after Tuesday speed + lifting, so the weekly architecture is revised to one true lower-body high day.",
    primaryGoal: "Rebuild aerobic/10K capacity while retaining speed, elasticity and strength.",
    weeklyRhythm: "Monday upper + easy run; Tuesday threshold + primary strength; Wednesday low-impact aerobic recovery; Thursday speed microdose; Friday upper + easy aerobic; Saturday long run; Sunday rest.",
    keyChange: "Wednesday is now the low-impact recovery day. Thursday has no lifting. Tuesday is the only true two-a-day."
  };

  const week = plans.find((plan) => plan && plan.week === 11);
  if (!week || !Array.isArray(week.days) || week.days.length < 7) return;

  week.blockWeekLabel = "AEROBIC REBUILD · B WEEK 1";
  week.title = "One high day, one speed touch, one long aerobic anchor";
  week.focus = "Tuesday is the only genuinely hard lower-body day. Wednesday becomes low-impact cross-training to improve recovery. Thursday retains speed with a small submaximal microdose. Friday combines Upper B and easy aerobic work so only Tuesday requires two separate training windows.";
  week.statusNote = "Architecture revised after the prior Thursday threshold felt disproportionately hard 48 hours after Tuesday sprint + lifting. The goal is better recovery and adherence, not less training.";
  week.days = [
    { day: "Mon", type: "Low–moderate", status: "Planned", title: "Upper A + easy run", detail: "Lift first, then easy running in one session. Keep the run genuinely easy so Tuesday threshold quality is protected.", volume: "Upper A + 45 min easy run" },
    { day: "Tue", type: "High", status: "Planned", title: "Threshold + primary strength", detail: "The week's one true high-output lower-body day and only planned two-a-day.", volume: "4 × 6 min threshold / 2 min jog + primary strength later" },
    { day: "Wed", type: "Recovery", status: "Planned", title: "Low-impact aerobic recovery", detail: "Bike or elliptical only. Use this day to improve leg recovery after Tuesday.", volume: "50–60 min easy cross-training at RPE 2–3" },
    { day: "Thu", type: "Low–moderate", status: "Planned", title: "Speed microdose + easy jogging", detail: "Smooth fast contacts without turning Thursday into another high day. No lifting.", volume: "2 × 20 m accel + 2 × flying 20 m at ~90–92% + 15–20 min easy jog" },
    { day: "Fri", type: "Low–moderate", status: "Planned", title: "Upper B + easy aerobic", detail: "Lift first, then easy run. Use bike/elliptical if lower-leg or leg fatigue would compromise Saturday.", volume: "Upper B + 40–45 min easy run OR 50–60 min easy bike/elliptical" },
    { day: "Sat", type: "Moderate–high aerobic", status: "Planned", title: "Long easy run", detail: "Primary weekly aerobic-volume anchor. No fast finish.", volume: "90 min easy if recovery is normal; 70–75 min amber" },
    { day: "Sun", type: "Recovery", status: "Locked", title: "Full rest + weekly review", detail: "No make-up work. Review the week and publish the following week's plan.", volume: "No training" }
  ];

  sessions.w11d1 = {
    purpose: "Upper A + easy run",
    duration: "Approximately 95–110 min in one continuous training window",
    volume: "14–16 upper-body work sets + 45 min easy running",
    footwear: "Normal gym footwear, then trainers",
    note: "Lift first so motivation is not dependent on returning to the gym after endurance work. The run must stay easy enough that Tuesday threshold quality is unaffected.",
    blocks: [
      { name: "Upper A", items: [
        { id: "ba-m-inc", name: "Incline dumbbell press", dosage: "3 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "ba-m-pull", name: "Neutral-grip pulldown or pull-up", dosage: "3 × 8–10 at RPE 7–8; 90 sec rest." },
        { id: "ba-m-row", name: "Chest-supported row", dosage: "3 × 10–12 at RPE 7–8; 75–90 sec rest." },
        { id: "ba-m-lat", name: "Lateral raise", dosage: "3 × 15–20; 45–60 sec rest." },
        { id: "ba-m-curl", name: "Curl", dosage: "2 × 10–15; 60 sec rest. Final set may be AMRAP(-2)." },
        { id: "ba-m-tri", name: "Pressdown", dosage: "2 × 10–15; 60 sec rest. Final set may be AMRAP(-2)." }
      ]},
      { name: "Easy run", items: [
        { id: "ba-m-run", name: "45 min easy", dosage: "RPE 2–3, conversational, flat or gently rolling. No progression and no fast finish." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "ba-m-amber", name: "Amber", dosage: "2 sets per lift + 30–35 min easy run." },
        { id: "ba-m-red", name: "Red", dosage: "Upper work only if the issue is isolated to the lower body and systemic readiness is otherwise normal; otherwise rest." }
      ]}
    ]
  };

  sessions.w11d2 = {
    purpose: "Controlled threshold + primary strength",
    duration: "Run 60–70 min + strength 55–65 min; separate by several hours",
    volume: "4 × 6 min threshold / 2 min jog + primary strength",
    footwear: "Trainers for running; normal gym footwear later",
    note: "This is the week's only true high lower-body day. Threshold should finish controlled, not depleted. A fifth rep should feel clearly possible.",
    blocks: [
      { name: "Threshold warm-up", items: [
        { id: "ba-t-jog", name: "Easy jog", dosage: "12–15 min easy." },
        { id: "ba-t-mob", name: "Mobility", dosage: "Ankle rockers 8/side, walking lunges 5/side, leg swings 8/side." },
        { id: "ba-t-strides", name: "Relaxed strides", dosage: "3 × 20 sec around current 5K rhythm; 60 sec easy jog between." }
      ]},
      { name: "Main threshold set", items: [
        { id: "ba-t-main", name: "4 × 6 min threshold", dosage: "RPE 6–7 with 2:00 easy jog. Rep 1 conservative. Record pace, average HR and RPE for each rep." },
        { id: "ba-t-cue", name: "Primary cue", dosage: "Float early. Finish knowing another rep was available." },
        { id: "ba-t-cool", name: "Cooldown", dosage: "10–15 min easy." }
      ]},
      { name: "Primary strength — later", items: [
        { id: "ba-t-squat", name: "Back squat", dosage: "2 × 4–5 at RPE 7–7.5; 3 min rest." },
        { id: "ba-t-bench", name: "Bench press", dosage: "4 × 5 at RPE 7.5–8; 2½–3 min rest." },
        { id: "ba-t-rfess", name: "RFESS", dosage: "2 × 5 each leg at RPE 7; 90–120 sec rest." },
        { id: "ba-t-row", name: "Chest-supported row", dosage: "3 × 8–10; 90 sec rest." },
        { id: "ba-t-calf", name: "Standing calf raise", dosage: "2 × 8–10 at RPE 7; 75–90 sec rest." }
      ]},
      { name: "Fueling", items: [
        { id: "ba-t-fuel", name: "High-day fueling", dosage: "Carbohydrate-rich meal before the run, full carb/protein meal between sessions, and 30–40 g protein plus substantial carbohydrate after lifting." }
      ]},
      { name: "Readiness alternatives", items: [
        { id: "ba-t-amber", name: "Amber", dosage: "3 × 6 min threshold; squat 2 × 4; RFESS 1–2 sets." },
        { id: "ba-t-red", name: "Red", dosage: "Easy aerobic only. No lower-body strength." }
      ]}
    ]
  };

  sessions.w11d3 = {
    purpose: "Low-impact aerobic recovery",
    duration: "50–60 min",
    volume: "50–60 min easy bike or elliptical",
    footwear: "Cycling/elliptical shoes",
    note: "This is intentionally the recovery day after Tuesday. Do not turn low-impact aerobic work into another workout.",
    blocks: [
      { name: "Aerobic recovery", items: [
        { id: "ba-w-aero", name: "Bike or elliptical", dosage: "50–60 min at RPE 2–3, full-sentence conversational effort. Bike cadence generally 80–95 rpm." },
        { id: "ba-w-rule", name: "Execution rule", dosage: "No intervals, no hard finish, no lifting. Finish feeling better than you started." }
      ]},
      { name: "Optional maintenance", items: [
        { id: "ba-w-maint", name: "Foot/ankle/hip maintenance", dosage: "Ankle rocker 8/side, soleus iso 20 sec/side, straight-knee calf iso 20 sec/side, adductor rockback 6/side." }
      ]}
    ]
  };

  sessions.w11d4 = {
    purpose: "Speed microdose + easy jogging",
    duration: "Approximately 50–60 min",
    volume: "2 × 20 m acceleration + 2 × flying 20 m at ~90–92% + 15–20 min easy jog",
    footwear: "Trainers on a dry, predictable track",
    note: "Do not time the fast reps. Thursday is a speed reminder, not a test and not a second high day.",
    blocks: [
      { name: "Warm-up", items: [
        { id: "ba-th-jog", name: "Easy jog", dosage: "10 min easy." },
        { id: "ba-th-mob", name: "Mobility", dosage: "Ankle rocker 8/side, adductor rockback 6/side, walking lunge 5/side." },
        { id: "ba-th-drills", name: "Sprint drills", dosage: "A-march 20 m, A-skip 20 m, low dribble 20 m." }
      ]},
      { name: "Primer and buildups", items: [
        { id: "ba-th-pogo", name: "Low pogos", dosage: "2 × 8 contacts; 45–60 sec rest." },
        { id: "ba-th-build", name: "Buildups", dosage: "40 m ~60%, 50 m ~75%, 50 m ~85%." }
      ]},
      { name: "Speed microdose", items: [
        { id: "ba-th-accel", name: "2 × 20 m acceleration", dosage: "Approximately 90–92%; 4–5 min recovery. Smooth, not maximal." },
        { id: "ba-th-fly", name: "2 × flying 20 m", dosage: "30 m progressive buildup + 20 m fast zone; approximately 90–92%; 5–6 min recovery. Do not time." },
        { id: "ba-th-cue", name: "Primary cue", dosage: "Tall and easy." }
      ]},
      { name: "Aerobic finish", items: [
        { id: "ba-th-easy", name: "Very easy jog", dosage: "15–20 min at RPE 2." }
      ]},
      { name: "Alternatives", items: [
        { id: "ba-th-amber", name: "Amber", dosage: "Two buildups + 2 × 20 m acceleration only." },
        { id: "ba-th-red", name: "Red", dosage: "35–45 min easy non-impact aerobic work." }
      ]}
    ]
  };

  sessions.w11d5 = {
    purpose: "Upper B + easy aerobic",
    duration: "Approximately 100–115 min in one training window",
    volume: "18 upper-body work sets + 40–45 min easy run OR 50–60 min easy bike/elliptical",
    footwear: "Normal gym footwear, then trainers or cross-training shoes",
    note: "Lift first. Friday should not create meaningful leg fatigue before Saturday's long run.",
    blocks: [
      { name: "Upper B", items: [
        { id: "ba-f-press", name: "DB or machine shoulder press", dosage: "3 × 8–10; 90 sec rest." },
        { id: "ba-f-pull", name: "Neutral-grip pull-up or pulldown", dosage: "3 × 8–10; 90 sec rest." },
        { id: "ba-f-chest", name: "Flat DB or machine chest press", dosage: "3 × 8–12; 90 sec rest." },
        { id: "ba-f-row", name: "Cable or chest-supported row", dosage: "3 × 10–12; 75–90 sec rest." },
        { id: "ba-f-rear", name: "Rear-delt fly", dosage: "2 × 15–20; 45–60 sec rest." },
        { id: "ba-f-curl", name: "Curl", dosage: "2 × 10–15; 60 sec rest." },
        { id: "ba-f-tri", name: "Pressdown", dosage: "2 × 10–15; 60 sec rest." }
      ]},
      { name: "Easy aerobic", items: [
        { id: "ba-f-run", name: "Primary option: easy run", dosage: "40–45 min at RPE 2–3, conversational." },
        { id: "ba-f-bike", name: "Impact-management option", dosage: "50–60 min easy bike/elliptical if legs or lower legs are carrying fatigue." }
      ]}
    ]
  };

  sessions.w11d6 = {
    purpose: "Long easy aerobic run",
    duration: "90 min",
    volume: "90 min easy if recovery is normal",
    footwear: "Comfortable trainers on predictable terrain",
    note: "Primary weekly aerobic-volume anchor. No fast finish.",
    blocks: [
      { name: "Long run", items: [
        { id: "ba-s-run", name: "90 min easy", dosage: "First 15 min deliberately slow, then settle into RPE 2–3 conversational effort. No fast finish." },
        { id: "ba-s-cue", name: "Primary cue", dosage: "Accumulate time, not pace." }
      ]},
      { name: "Fueling", items: [
        { id: "ba-s-fuel", name: "During-session fueling", dosage: "30–60 g carbohydrate before; roughly 30–45 g carbohydrate/hour during; fluids/electrolytes and meaningful sodium when sweat losses are high." }
      ]},
      { name: "Alternatives", items: [
        { id: "ba-s-amber", name: "Amber", dosage: "70–75 min easy." },
        { id: "ba-s-red", name: "Impact issue", dosage: "80–90 min easy cycling instead." }
      ]}
    ]
  };

  sessions.w11d7 = {
    purpose: "Full rest + weekly review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "No make-up mileage. Review the week and prepare the next A-week prescription.",
    blocks: [
      { name: "Recovery", items: [
        { id: "ba-su-rest", name: "Full rest", dosage: "Normal daily movement only." },
        { id: "ba-su-review", name: "Weekly review", dosage: "Review Tuesday threshold pace/HR/RPE, lifting response, Thursday speed quality, Saturday long-run response and any tissue issues." }
      ]}
    ]
  };
})();