(() => {
  "use strict";
  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const week = plans.find(p => p && p.week === 14);
  if (!week) return;
  Object.assign(week, {
  "week": 14,
  "blockWeekLabel": "AEROBIC REBUILD · A WEEK 2 · OCT 26 – NOV 1, 2026",
  "title": "Speed retention + controlled aerobic — A Week 2",
  "focus": "One high lower-body day and one true two-a-day Tuesday; upper-lifting + easy aerobic combined Monday and Friday; Wednesday cross-training recovery; controlled subthreshold Thursday; Saturday long aerobic anchor; Sunday rest.",
  "statusNote": "Provisional: last verified Training Log entries Oct 16–17, 2026. No sessions reported for Oct 20–25, so no inferred completion, mileage, threshold response, or tissue readiness. Maintain or reduce workloads rather than automatically progressing."
}, {days:[
  {
    "day": "Mon",
    "type": "Low–moderate",
    "status": "Provisional",
    "title": "Upper A + easy run",
    "detail": "One continuous training window; lift first, then easy running. Do not create Tuesday leg fatigue.",
    "volume": "Upper A (14 sets) + 40–45 min easy"
  },
  {
    "day": "Tue",
    "type": "High",
    "status": "Provisional",
    "title": "Acceleration + flying sprints; primary strength",
    "detail": "Only genuinely high leg day and only planned two-a-day. Flying reps require fully green tissues and recent sprint tolerance.",
    "volume": "3 × 20–30 m acceleration + 2 × flying 20 m; lift later"
  },
  {
    "day": "Wed",
    "type": "Recovery",
    "status": "Provisional",
    "title": "Low-impact aerobic recovery",
    "detail": "Absorb Tuesday. No running or lifting; leave this session feeling better, not depleted.",
    "volume": "50–55 min easy bike or elliptical"
  },
  {
    "day": "Thu",
    "type": "Medium",
    "status": "Provisional",
    "title": "Controlled subthreshold aerobic",
    "detail": "Medium aerobic stimulus without threshold strain or lifting. On A weeks the speed work remains Tuesday.",
    "volume": "3 × 8 min RPE 5–6 / 2 min easy jog"
  },
  {
    "day": "Fri",
    "type": "Low–moderate",
    "status": "Provisional",
    "title": "Upper B + easy aerobic",
    "detail": "One combined workout: upper lifting before easy cardio. No meaningful lower-body loading ahead of Saturday.",
    "volume": "Upper B (17 sets) + 35–40 min easy run OR 50 min bike"
  },
  {
    "day": "Sat",
    "type": "Aerobic volume",
    "status": "Provisional",
    "title": "Long easy run",
    "detail": "Hold approximately the last confirmed 84-minute run. Do not assume an undocumented October 24 long run was completed.",
    "volume": "80–85 min easy (no duration increase this week)"
  },
  {
    "day": "Sun",
    "type": "Recovery",
    "status": "Locked",
    "title": "Full rest and weekly review",
    "detail": "Full rest. Review actual logged sessions and readiness before the next B week.",
    "volume": "No training"
  }
]});
  window.CURRENT_ATHLETE_STATE = {
  "date": "2026-10-25",
  "programPosition": "A Week 2 · aerobic rebuild / 10K · Oct 26–Nov 1, 2026",
  "readiness": "Unverified for Oct 20–25. Last confirmed long run Oct 17: 10.05 mi / 84 min, average HR 127. Oct 16 combined session had easy run plus partial upper lifting; Oct 19 nutrition log lists rest. Do not infer any unlogged training.",
  "primaryGoal": "Improve 10K/aerobic capacity while retaining acceleration, top speed and existing strength.",
  "weeklyRhythm": "Monday Upper A + easy run; Tuesday true speed + primary strength (only two-a-day and high leg day); Wednesday easy non-impact; Thursday controlled subthreshold; Friday Upper B + easy aerobic; Saturday long run; Sunday rest.",
  "runningTarget": "Conservative roughly 27–31 miles depending on easy pace and warm-up; no compensatory running for missing Oct 20–25 data.",
  "safety": "Full-speed flying reps only with green hamstring, calf/Achilles, adductor/hip and foot; if no recent tolerance verified, use short controlled starts and skip fly reps. Maintain long run ~80–85 min until week is verified."
};
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const detailed = [
  {
    "purpose": "Upper A + easy run — one session",
    "duration": "90–105 min",
    "volume": "Upper A (14 sets) + 40–45 min easy",
    "footwear": "Gym footwear, then trainers",
    "note": "Lift first and run second in the same visit. Easy effort is the priority; no strides, tempo or fast finish.",
    "blocks": [
      {
        "name": "Readiness",
        "items": [
          {
            "id": "a14d1-1-1",
            "name": "Before training",
            "dosage": "Normal gait. If lower legs are painful or Tuesday freshness seems compromised, swap the run for easy cycling or shorten it."
          }
        ]
      },
      {
        "name": "Upper A — lift first",
        "items": [
          {
            "id": "a14d1-2-1",
            "name": "Incline dumbbell press",
            "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rests, leave 2 reps in reserve."
          },
          {
            "id": "a14d1-2-2",
            "name": "Neutral-grip pulldown / comfortable unweighted pull-up",
            "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rest. Respect shoulder range."
          },
          {
            "id": "a14d1-2-3",
            "name": "Chest-supported row",
            "dosage": "2 × 10–12 @ RPE 7–8; 75–90 sec rests."
          },
          {
            "id": "a14d1-2-4",
            "name": "Lateral raise",
            "dosage": "2 × 15–20; 45–60 sec rests."
          },
          {
            "id": "a14d1-2-5",
            "name": "Dumbbell/cable curl",
            "dosage": "2 × 10–15; 60 sec rests, finish at 1–2 RIR."
          },
          {
            "id": "a14d1-2-6",
            "name": "Cable pressdown",
            "dosage": "2 × 10–15; 60 sec rests, finish at 1–2 RIR."
          }
        ]
      },
      {
        "name": "Easy running",
        "items": [
          {
            "id": "a14d1-3-1",
            "name": "Run",
            "dosage": "40–45 min RPE 2–3, conversational. First 10 min extra easy; flat/gently rolling route. No fast finish."
          }
        ]
      },
      {
        "name": "Fueling / contingency",
        "items": [
          {
            "id": "a14d1-4-1",
            "name": "Fuel",
            "dosage": "Carb-containing meal/snack before; ~25–40 g protein and normal carbohydrate after. Drink for conditions."
          },
          {
            "id": "a14d1-4-2",
            "name": "Amber",
            "dosage": "2 sets per upper movement and 30–35 min easy running or cycling."
          },
          {
            "id": "a14d1-4-3",
            "name": "Red",
            "dosage": "Rest for illness, systemic fatigue, or worsening/gait-altering pain; upper-only may be appropriate for isolated pain-free lower-body limitation."
          }
        ]
      }
    ]
  },
  {
    "purpose": "True speed retention + primary lift",
    "duration": "Track ~50–70 min; lift ~50–65 min, separated by 3+ hours",
    "volume": "3 × 20–30 m acceleration + 2 × flying 20 m; lift later",
    "footwear": "Trainers on dry predictable track; gym shoes later",
    "note": "Green-day full speed is conditional. Recent sprint completion is unverified, so if fast running has been absent, perform the conservative amber starts only. Full recovery between fast reps; never sprint while fatigued.",
    "blocks": [
      {
        "name": "Readiness and warm-up",
        "items": [
          {
            "id": "a14d2-1-1",
            "name": "Go/no-go",
            "dosage": "Full sprint plan ONLY with normal gait, recovered legs, and hamstring, Achilles/calf, foot and adductor/hip pain 0–1/10; no stiff or guarded accelerations. Confirm recent sprint tolerance in your own log."
          },
          {
            "id": "a14d2-1-2",
            "name": "Easy jog + mobility",
            "dosage": "12–15 min easy jogging; ankle rocker 8/side, leg swings 8/side, walking lunge 5/side."
          },
          {
            "id": "a14d2-1-3",
            "name": "Sprint drills",
            "dosage": "A-march 20 m, A-skip 20 m, low dribble 20 m. Green only: 2 × 6 low pogos."
          },
          {
            "id": "a14d2-1-4",
            "name": "Build-ups",
            "dosage": "4 progressive build-ups 40–50 m (~60%, ~75%, ~85%, ~90%) with walk-back and full recovery."
          }
        ]
      },
      {
        "name": "True speed — GREEN only",
        "items": [
          {
            "id": "a14d2-2-1",
            "name": "Acceleration",
            "dosage": "3 × 20–30 m two-point starts at ~93–97% of current maximum; full 4–5 min walk/standing recovery. No reaching or straining."
          },
          {
            "id": "a14d2-2-2",
            "name": "Flying 20s",
            "dosage": "2 × 20 m fly with 30–35 m progressive build-up and 30–40 m gradual deceleration; ~95–97% current top-speed feel, with 5–7 min full rest. No timed testing required."
          },
          {
            "id": "a14d2-2-3",
            "name": "Exit criteria",
            "dosage": "Stop immediately for localized pain, protective mechanics, unusual loss of smoothness, or clear rep-to-rep slowdown. Walk several minutes afterward; no need to add mileage to the track session."
          }
        ]
      },
      {
        "name": "Strength — later, separate window",
        "items": [
          {
            "id": "a14d2-3-1",
            "name": "Deadlift",
            "dosage": "Warm up gradually, then 2 × 3 @ RPE 7–7.5; 3–4 min rest. No grinders or technical deterioration."
          },
          {
            "id": "a14d2-3-2",
            "name": "Barbell bench press",
            "dosage": "4 × 5 @ RPE 7.5–8; 2.5–3 min rest."
          },
          {
            "id": "a14d2-3-3",
            "name": "Rear-foot elevated split squat",
            "dosage": "2 × 5 per leg @ RPE 7; 90–120 sec rest. Keep load modest after sprinting."
          },
          {
            "id": "a14d2-3-4",
            "name": "Chest-supported row",
            "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rests."
          },
          {
            "id": "a14d2-3-5",
            "name": "Standing calf raise",
            "dosage": "2 × 8–10 @ RPE 7; 75–90 sec rests, only if Achilles/calf are completely quiet."
          }
        ]
      },
      {
        "name": "Fueling / contingency",
        "items": [
          {
            "id": "a14d2-4-1",
            "name": "Between sessions",
            "dosage": "A carbohydrate-rich meal plus 25–40 g protein after track; an additional ~60–100 g carbohydrate over the gap is reasonable depending on normal total intake, appetite and time; replenish fluids/sodium for sweat."
          },
          {
            "id": "a14d2-4-2",
            "name": "Amber / unverified recent sprint exposure",
            "dosage": "2 × 20 m controlled accelerations at ~85–92%, with 4–5 min rest; NO flying reps, pogo jumps or hard lower-body lift. Bench and supported row can remain if otherwise recovered."
          },
          {
            "id": "a14d2-4-3",
            "name": "Red",
            "dosage": "No fast running or heavy legs for pain, illness, gait change or systemic fatigue. Rest or non-impact easy activity if appropriate. No make-up sprint reps."
          }
        ]
      }
    ]
  },
  {
    "purpose": "Low-impact aerobic recovery",
    "duration": "50–55 min",
    "volume": "50–55 min easy bike or elliptical",
    "footwear": "Bike/elliptical shoes",
    "note": "Conversational effort only. Recovery day is intentionally placed after Tuesday's sprint/lift pairing.",
    "blocks": [
      {
        "name": "Recovery aerobic",
        "items": [
          {
            "id": "a14d3-1-1",
            "name": "Bike or elliptical",
            "dosage": "50–55 min RPE 2–3; start with 5 min very easy. Comfortable cycling cadence ~80–95 rpm if using bike. No intervals, hills or finishing surge."
          }
        ]
      },
      {
        "name": "Optional tissue maintenance",
        "items": [
          {
            "id": "a14d3-2-1",
            "name": "Mobility / isometrics",
            "dosage": "Ankle rockers 8/side, soleus isometric 20 sec/side, straight-knee calf isometric 20 sec/side, adductor rockback 6/side; only comfortable ranges."
          }
        ]
      },
      {
        "name": "Contingencies",
        "items": [
          {
            "id": "a14d3-3-1",
            "name": "Amber",
            "dosage": "30–40 min very easy non-impact or complete rest if unusually fatigued."
          },
          {
            "id": "a14d3-3-2",
            "name": "Red",
            "dosage": "Rest; no training through sharp pain, gait-altering symptoms, illness or escalating localized soreness."
          }
        ]
      }
    ]
  },
  {
    "purpose": "Aerobic development — controlled subthreshold",
    "duration": "50–60 min",
    "volume": "3 × 8 min RPE 5–6 / 2 min easy jog",
    "footwear": "Comfortable trainers on flat or gently rolling, predictable terrain",
    "note": "Target sustainable controlled effort, not last month's pace. Finish able to complete another repetition or two. No hill sprints, no lifting.",
    "blocks": [
      {
        "name": "Readiness",
        "items": [
          {
            "id": "a14d4-1-1",
            "name": "Tuesday response",
            "dosage": "Start the quality portion only when Tuesday soreness is clearly improving and stride is normal. If legs still heavy, run easy instead."
          }
        ]
      },
      {
        "name": "Warm-up and subthreshold",
        "items": [
          {
            "id": "a14d4-2-1",
            "name": "Warm-up",
            "dosage": "12–15 min easy running (RPE 2–3)."
          },
          {
            "id": "a14d4-2-2",
            "name": "Main set",
            "dosage": "3 × 8 min at RPE 5–6 with 2 min easy jogging recoveries (between reps). Even breathing, relaxed form; pace is secondary."
          },
          {
            "id": "a14d4-2-3",
            "name": "Effort cap",
            "dosage": "If the first rep feels >RPE 6.5, ease back. No threshold or 5K effort. Finish with reserve."
          },
          {
            "id": "a14d4-2-4",
            "name": "Cooldown",
            "dosage": "10–12 min easy jog, adjusting to keep total near 50–60 min. No extra mileage or fast finish."
          }
        ]
      },
      {
        "name": "Fueling / contingency",
        "items": [
          {
            "id": "a14d4-3-1",
            "name": "Fuel",
            "dosage": "Normal carbohydrate-containing meal/snack before if needed; rehydrate and eat protein/carbohydrate after."
          },
          {
            "id": "a14d4-3-2",
            "name": "Amber",
            "dosage": "40–50 min easy running, RPE 2–3, no work reps."
          },
          {
            "id": "a14d4-3-3",
            "name": "Impact red",
            "dosage": "Rest or 40–50 min comfortable non-impact aerobic if pain-free. Stop for pain escalating or altering gait."
          }
        ]
      }
    ]
  },
  {
    "purpose": "Upper B + easy aerobic — one session",
    "duration": "~90–110 min",
    "volume": "Upper B (17 sets) + 35–40 min easy run OR 50 min bike",
    "footwear": "Gym shoes then trainers or bike shoes",
    "note": "Lift before easy aerobic so there is no second session to return for. Keep every effort low-cost to Saturday's legs.",
    "blocks": [
      {
        "name": "Upper B — lift first",
        "items": [
          {
            "id": "a14d5-1-1",
            "name": "DB or machine shoulder press",
            "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rests, comfortable shoulder path."
          },
          {
            "id": "a14d5-1-2",
            "name": "Neutral-grip pulldown / unweighted pull-up",
            "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rests."
          },
          {
            "id": "a14d5-1-3",
            "name": "Flat DB or machine chest press",
            "dosage": "3 × 8–12 @ RPE 7–8; 90 sec rests."
          },
          {
            "id": "a14d5-1-4",
            "name": "Chest-supported/cable row",
            "dosage": "2 × 10–12 @ RPE 7–8; 75–90 sec rests."
          },
          {
            "id": "a14d5-1-5",
            "name": "Rear-delt fly",
            "dosage": "2 × 15–20; 45–60 sec rests."
          },
          {
            "id": "a14d5-1-6",
            "name": "Curl",
            "dosage": "2 × 10–15; 60 sec rests."
          },
          {
            "id": "a14d5-1-7",
            "name": "Cable pressdown",
            "dosage": "2 × 10–15; 60 sec rests."
          }
        ]
      },
      {
        "name": "Easy aerobic",
        "items": [
          {
            "id": "a14d5-2-1",
            "name": "Run option",
            "dosage": "35–40 min very easy RPE 2–3, flat route, no fast finish."
          },
          {
            "id": "a14d5-2-2",
            "name": "Non-impact option",
            "dosage": "50–55 min easy bike/elliptical if leg or lower-leg load would compromise Saturday. Choose one aerobic option, not both."
          }
        ]
      },
      {
        "name": "Fueling / contingency",
        "items": [
          {
            "id": "a14d5-3-1",
            "name": "Fuel",
            "dosage": "Carbohydrate and protein around the session, fluid appropriate to conditions."
          },
          {
            "id": "a14d5-3-2",
            "name": "Amber",
            "dosage": "2 sets per lift + 25–30 min easy run or non-impact."
          },
          {
            "id": "a14d5-3-3",
            "name": "Red",
            "dosage": "Rest for systemic red flags; upper-only if isolated lower-body impact symptoms and lifting is pain-free."
          }
        ]
      }
    ]
  },
  {
    "purpose": "Long easy aerobic run",
    "duration": "80–85 min",
    "volume": "80–85 min easy (no duration increase this week)",
    "footwear": "Familiar cushioned trainers; safe flat or gently rolling route",
    "note": "No fast finish. The last verified long run is Oct 17: 10.05 mi in 84 min at 127 bpm. Hold duration steady until October 19–25 training is actually confirmed.",
    "blocks": [
      {
        "name": "Readiness",
        "items": [
          {
            "id": "a14d6-1-1",
            "name": "Before starting",
            "dosage": "Normal gait, quiet Achilles/calf/foot/hamstring/adductor, reasonable sleep and energy. If Thursday or Friday produced unexpected fatigue, reduce duration."
          }
        ]
      },
      {
        "name": "Long run",
        "items": [
          {
            "id": "a14d6-2-1",
            "name": "80–85 min easy",
            "dosage": "First 15 min intentionally relaxed, then conversational RPE 2–3. Do not add tempo or a fast finish."
          },
          {
            "id": "a14d6-2-2",
            "name": "Progression rule",
            "dosage": "Hold below 90 min unless recent completed long runs and next-day tissue tolerance are documented. No make-up miles for missed sessions."
          }
        ]
      },
      {
        "name": "Fueling",
        "items": [
          {
            "id": "a14d6-3-1",
            "name": "Before and during",
            "dosage": "Carb-containing meal/snack beforehand. Aim ~30–45 g carbohydrate per hour during if practical and tolerated, with water/electrolytes and sodium appropriate to sweat losses."
          },
          {
            "id": "a14d6-3-2",
            "name": "After",
            "dosage": "Carb-rich meal and ~30–40 g protein; replace fluid/sodium based on conditions and thirst."
          }
        ]
      },
      {
        "name": "Alternatives",
        "items": [
          {
            "id": "a14d6-4-1",
            "name": "Amber",
            "dosage": "65–75 min very easy running or last comfortably completed duration if shorter."
          },
          {
            "id": "a14d6-4-2",
            "name": "Impact limitation",
            "dosage": "75–85 min easy cycling only if pain-free."
          },
          {
            "id": "a14d6-4-3",
            "name": "Red stop",
            "dosage": "Stop for sharp/increasing pain, altered stride, marked dizziness or unusual symptoms. Do not compensate Sunday."
          }
        ]
      }
    ]
  },
  {
    "purpose": "Full rest + review",
    "duration": "All day",
    "volume": "No training",
    "footwear": "Not applicable",
    "note": "Full rest, no make-up mileage. This is an A week; the next B week should be driven by actual recorded response, not a presumed successful sprint or threshold result.",
    "blocks": [
      {
        "name": "Rest",
        "items": [
          {
            "id": "a14d7-1-1",
            "name": "No training",
            "dosage": "Normal daily activity is fine. No supplemental cardio, speed or lifting."
          }
        ]
      },
      {
        "name": "Review",
        "items": [
          {
            "id": "a14d7-2-1",
            "name": "Record training outcomes",
            "dosage": "Record actual runs and durations, Tuesday sprint mechanics/tissue response, strength loads/RPE, Thursday RPE, Saturday time/HR, sleep and readiness."
          },
          {
            "id": "a14d7-2-2",
            "name": "Next-week condition",
            "dosage": "Plan the next B week around documented volume and recovery; do not automatically increase easy mileage and threshold work together."
          }
        ]
      }
    ]
  }
];
  detailed.forEach((session, i) => { window.SESSION_PLANS[`w14d${i + 1}`] = session; });
})();
