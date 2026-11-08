window.SESSION_PLANS = {
  w1d1: {
    purpose: "Acceleration foundation + lower-body strength",
    duration: "95–110 min",
    volume: "160 m acceleration + 80 m buildups; 11 lower/core working sets",
    footwear: "Trainers / flats",
    note: "Completed official high-output session. Straight-bar deadlift: 455 lb × 3 × 3. The planned primary upper-body exposure was not included in the completed session; do not add it today. Upper A is moved to Tuesday for Week 1 only.",
    source: "week1Day1Exercises"
  },
  w1d2: {
    purpose: "Easy aerobic support + Upper A",
    duration: "80–100 min total; split friendly",
    volume: "35–45 min easy + 10 upper-body working sets",
    footwear: "Trainers",
    note: "Week 1 exception: Upper A moves here because Monday's completed session did not include upper-body work. This is not extra lower-body volume. Keep the run genuinely easy. Log the bench working load and total completed volume; accessory loads only need reporting if something is noteworthy.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Quick tissue check", dosage: "Proceed with the run if there is no sharp, worsening, or gait-altering hamstring, calf/Achilles, foot/ankle, or adductor issue" }
        ]
      },
      {
        name: "Aerobic work",
        items: [
          { id: "easy-run", name: "Easy run", dosage: "35–45 min at conversational effort / RPE 2–3 on flat or gently rolling terrain; no fast finish" }
        ]
      },
      {
        name: "Upper A — primary strength",
        items: [
          { id: "bench-press", name: "Barbell bench press", dosage: "Warm-ups, then 3 × 5 at RPE 7 / 2–3 reps in reserve; 2½–3 min rest" },
          { id: "vertical-pull", name: "Pull-up or lat pulldown", dosage: "3 × 6–8 at RPE 7–8; 90–120 sec rest" },
          { id: "chest-supported-row", name: "Chest-supported row", dosage: "2 × 8–10 at RPE 7–8; 90 sec rest" },
          { id: "triceps-pressdown", name: "Cable triceps pressdown", dosage: "2 × 10–15 at RPE 8; 60–75 sec rest" }
        ]
      },
      {
        name: "Light tissue maintenance",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 10 each side" },
          { id: "calf-soleus-iso", name: "Calf + soleus isometrics", dosage: "1 × 20 sec straight-knee and 1 × 20 sec bent-knee each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 8 each side" }
        ]
      }
    ]
  },
  w1d3: {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "40–55 min",
    volume: "2 sets of 4 × 100 m / 800 m tempo total",
    footwear: "Trainers on a track or predictable flat grass",
    note: "Simplified does not mean improvised: follow the listed preparation in order. Generalized DOMS is acceptable only when gait is normal and the soreness stays stable or eases as you warm up. Stop if it increases, localizes, or changes your stride.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "walk-jog-check", name: "Walk and easy-jog check", dosage: "Normal gait; no sharp, localized, worsening, or one-sided tissue issue. Generalized DOMS may proceed only if stable or improving." }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "6 minutes, beginning very easy and gradually settling into normal easy-run rhythm" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side; controlled range" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side; tall trunk" },
          { id: "leg-swing-front-back", name: "Leg swing — front to back", dosage: "1 × 8 each leg; pelvis stays quiet" }
        ]
      },
      {
        name: "Technical preparation",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, then step down under the hip. Purpose: rehearse posture and foot placement beneath the body." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: add rhythm and a light elastic contact without sprint effort." },
          { id: "buildup-60", name: "Progressive buildup 1", dosage: "1 × 60 m at about 60% velocity; walk back" },
          { id: "buildup-70", name: "Progressive buildup 2", dosage: "1 × 60 m at about 70% velocity; 60–90 sec before the first tempo rep" }
        ]
      },
      {
        name: "Extensive tempo",
        items: [
          { id: "tempo-set-1", name: "Set 1", dosage: "4 × 100 m at approximately 65–70% of velocity; 60–75 sec between reps" },
          { id: "set-recovery", name: "Set recovery", dosage: "3 minutes walking / standing; begin Set 2 only if rhythm and soreness are stable" },
          { id: "tempo-set-2", name: "Set 2", dosage: "4 × 100 m at approximately 65–70% of velocity; 60–75 sec between reps" }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy cooldown", dosage: "5–8 minutes easy jog-to-walk; finish relaxed, not conditioned" }
        ]
      }
    ]
  },
  w1d4: {
    purpose: "Controlled sprint rhythm + power / Upper B",
    duration: "85–110 min total; split preferred",
    volume: "Provisional 5 × 100 m + 9 power contacts + 10 upper-body working sets",
    footwear: "Trainers",
    note: "The sprint dose and lower-body power primer remain provisional until tissue response is reviewed. Upper B is the second primary upper-body exposure. If the day is red because of general illness or systemic fatigue, skip all training; if sprinting is withheld for a localized lower-body issue, retain upper work only after coach confirmation.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "clearance", name: "Confirm Thursday dose", dosage: "Use the coach's same-day green / amber / red decision before starting" }
        ]
      },
      {
        name: "Streamlined preparation",
        items: [
          { id: "warmup", name: "Warm-up + 2–3 drills", dosage: "Short, progressive, and directly connected to sprint rhythm" }
        ]
      },
      {
        name: "Power primer — green only",
        items: [
          { id: "low-box-jump", name: "Low box jump with stick", dosage: "3 × 3, full reset between reps, 60–90 sec between sets; omit on amber" }
        ]
      },
      {
        name: "Provisional main set",
        items: [
          { id: "hundreds", name: "Controlled 100s", dosage: "Planned 5 × 100 m at ~75–80% velocity with 3–4 min recovery" }
        ]
      },
      {
        name: "Upper B — secondary upper",
        items: [
          { id: "incline-db-press", name: "Incline dumbbell press", dosage: "3 × 6–8 at RPE 7; 2 min rest" },
          { id: "cable-row", name: "Cable or chest-supported row", dosage: "3 × 8–10 at RPE 7–8; 90–120 sec rest" },
          { id: "landmine-press", name: "Landmine or machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
          { id: "rear-delt-fly", name: "Rear-delt fly", dosage: "2 × 15–20 at RPE 8; 60 sec rest" }
        ]
      }
    ]
  },
  w1d5: {
    purpose: "Recovery and absorption",
    duration: "0–35 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Rest is acceptable. Walking, very easy cycling, and light mobility are optional only if they improve how you feel.",
    blocks: [
      {
        name: "Recovery",
        items: [
          { id: "recovery-choice", name: "Choose the lowest-cost option", dosage: "Full rest, an easy walk, or 20–35 min very easy cycling at RPE 2–3" }
        ]
      }
    ]
  },
  w1d6: {
    purpose: "Longer easy aerobic support + optional arms",
    duration: "45–90 min total",
    volume: "45–55 min easy + optional 8 arm / shoulder sets",
    footwear: "Trainers",
    note: "The arm session is optional, not a third primary upper day. Skip it if it would create shoulder, chest, or lat soreness that could interfere with Monday sprint mechanics.",
    blocks: [
      {
        name: "Aerobic work",
        items: [
          { id: "easy-run", name: "Easy run", dosage: "45–55 min conversational / RPE 2–3" }
        ]
      },
      {
        name: "Optional arm hypertrophy",
        items: [
          { id: "cable-curl", name: "Cable or dumbbell curl", dosage: "3 × 10–15 at RPE 8; 60–75 sec rest" },
          { id: "triceps-extension", name: "Rope pressdown or overhead cable extension", dosage: "3 × 10–15 at RPE 8; 60–75 sec rest" },
          { id: "lateral-raise", name: "Lateral raise", dosage: "2 × 15–20 at RPE 8; 60 sec rest" }
        ]
      }
    ]
  },
  w1d7: {
    purpose: "Full rest",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Locked full rest day and weekly review anchor.",
    blocks: [
      {
        name: "Rest",
        items: [
          { id: "full-rest", name: "No training", dosage: "Normal daily movement only; no make-up work" }
        ]
      }
    ]
  },
  "w15d1": {
    "purpose": "Upper A first + short easy run, one continuous session",
    "duration": "Approximately 90–105 min combined",
    "volume": "14 upper work sets + 40–45 min RPE 2–3 running",
    "footwear": "Gym shoes for upper work; cushioned trainers on flat/gentle terrain for run",
    "note": "Bench adjustment: Oct 26 barbell incline 145 lb × 8 × 3 reached RPE 9. Use only a load that stays at RPE 7–8 throughout; do not add weight merely because reps were completed. No lower-body strength or hard running.",
    "blocks": [
      {
        "name": "Readiness and Upper A — lift first",
        "items": [
          {
            "id": "b15-mon-1",
            "name": "Readiness gate",
            "dosage": "Normal gait, no worsening calf/Achilles, hamstring, adductor or foot pain. Limit lifting if systemic fatigue or pain changes mechanics."
          },
          {
            "id": "b15-mon-2",
            "name": "Incline barbell press OR incline DB press",
            "dosage": "3 × 8 at RPE 7–8, ~2 reps in reserve; 90–120 sec rest. Reduce from Oct 26's 145 lb if necessary to avoid RPE 9."
          },
          {
            "id": "b15-mon-3",
            "name": "Neutral-grip pulldown or pull-up",
            "dosage": "3 × 8–10 at RPE 7–8; 90 sec rest."
          },
          {
            "id": "b15-mon-4",
            "name": "Chest-supported row",
            "dosage": "2 × 10–12 at RPE 7–8; 75–90 sec rest."
          },
          {
            "id": "b15-mon-5",
            "name": "Lateral raises",
            "dosage": "2 × 15–20 at RPE 7–8; 45–60 sec rest."
          },
          {
            "id": "b15-mon-6",
            "name": "Curl",
            "dosage": "2 × 10–15, 1–2 reps in reserve; 60 sec rest."
          },
          {
            "id": "b15-mon-7",
            "name": "Pressdown",
            "dosage": "2 × 10–15, 1–2 reps in reserve; 60 sec rest."
          }
        ]
      },
      {
        "name": "Easy aerobic — immediately afterward",
        "items": [
          {
            "id": "b15-mon-8",
            "name": "Easy run",
            "dosage": "40–45 min, flat/gently rolling, RPE 2–3 conversational; first 10 min extra easy. No strides or fast finish."
          }
        ]
      },
      {
        "name": "Fueling and alternatives",
        "items": [
          {
            "id": "b15-mon-9",
            "name": "Fueling",
            "dosage": "Carbohydrate-containing snack/meal beforehand; 25–40 g protein and carbohydrate afterward; fluids to thirst and conditions."
          },
          {
            "id": "b15-mon-10",
            "name": "Amber",
            "dosage": "2 upper sets per exercise + 30–35 min easy run or bike. If impact tenderness, bike instead."
          },
          {
            "id": "b15-mon-11",
            "name": "Red / stop",
            "dosage": "Stop running for sharp, worsening, asymmetric, or gait-altering pain; skip the whole session for illness or serious systemic fatigue."
          }
        ]
      }
    ]
  },
  "w15d2": {
    "purpose": "Conservative controlled threshold AM; primary strength PM — only true two-a-day",
    "duration": "Run approximately 50–55 min; strength approximately 45–60 min, separated by at least 3 h",
    "volume": "3 × 6 min threshold, 2 min jog recoveries; 10–11 strength working sets",
    "footwear": "Comfortable trainers on flat safe pavement/track for threshold; stable gym shoes for lift",
    "note": "No documented threshold splits or Tuesday lower-body strength last week. Use a consolidation dose, not 4 × 6 progression. First rep should feel controlled; a fourth rep should remain clearly possible. Lifting does not need to be a maximal-strength test.",
    "blocks": [
      {
        "name": "AM — readiness and warm-up",
        "items": [
          {
            "id": "b15-tue-1",
            "name": "Go/no-go",
            "dosage": "Green: normal gait, stable sleep/energy, hamstring, calf/Achilles, foot and adductor/hip pain 0–1/10 with no worsening. If questionable, choose amber. Do not treat unlogged prior work as completed."
          },
          {
            "id": "b15-tue-2",
            "name": "Easy warm-up",
            "dosage": "12–15 min jogging at RPE 2–3; ankle rockers 8/side; leg swings 8/side; walking lunges 5/side."
          },
          {
            "id": "b15-tue-3",
            "name": "Warm-up strides",
            "dosage": "2 × 20 seconds relaxed progressive strides around 5K rhythm, with ~60–90 sec easy jog. These are not maximal sprints."
          }
        ]
      },
      {
        "name": "AM — threshold",
        "items": [
          {
            "id": "b15-tue-4",
            "name": "Main set",
            "dosage": "3 × 6 min controlled threshold at RPE 6–7, with 2:00 very easy jogging between reps. Begin conservatively. No pace chasing."
          },
          {
            "id": "b15-tue-5",
            "name": "Record quality",
            "dosage": "Log each rep's pace, average HR, RPE, and whether an additional rep felt possible. If rep 1 exceeds RPE 7.5, slow down; if form deteriorates, finish easy."
          },
          {
            "id": "b15-tue-6",
            "name": "Cooldown",
            "dosage": "10–15 min very easy jogging; no extra mileage."
          }
        ]
      },
      {
        "name": "PM — controlled primary strength",
        "items": [
          {
            "id": "b15-tue-7",
            "name": "Back squat",
            "dosage": "After warm-up sets, 2 × 4 at RPE 7; 3 min rest; smooth reps, no grinder. Avoid if lower-body soreness or tissue symptoms."
          },
          {
            "id": "b15-tue-8",
            "name": "Barbell bench press",
            "dosage": "3 × 5 at RPE 7–7.5; 2½–3 min rest. Account for Monday incline pressing; reduce if shoulders/chest are fatigued."
          },
          {
            "id": "b15-tue-9",
            "name": "Rear-foot-elevated split squat",
            "dosage": "2 × 5 each leg at RPE 6.5–7; 90–120 sec rest. Omit if legs are significantly taxed by running."
          },
          {
            "id": "b15-tue-10",
            "name": "Chest-supported row",
            "dosage": "2 × 8–10 at RPE 7–8; 90 sec rest."
          },
          {
            "id": "b15-tue-11",
            "name": "Standing calf raise — optional",
            "dosage": "1–2 × 8–10 at RPE 7; 75–90 sec rest, only if calf/Achilles fully quiet. No AMRAP."
          }
        ]
      },
      {
        "name": "Fueling and readiness modifications",
        "items": [
          {
            "id": "b15-tue-12",
            "name": "Between-session fueling",
            "dosage": "Eat carbohydrate plus 25–40 g protein after the run; a substantial meal and fluids/sodium commensurate with sweat loss during the separation. Target normal high-training-day intake."
          },
          {
            "id": "b15-tue-13",
            "name": "Amber",
            "dosage": "2 × 6 min threshold only if gait and tissues normal; otherwise 35–45 min easy. Limit lift to bench/rows; no squat, RFESS or calf loading when leg response is uncertain."
          },
          {
            "id": "b15-tue-14",
            "name": "Red / stop",
            "dosage": "No hard running or heavy legs for sharp/worsening/gait-altering pain, illness, or severe fatigue; rest or pain-free very easy non-impact. No makeup intervals."
          }
        ]
      }
    ]
  },
  "w15d3": {
    "purpose": "Post-threshold recovery through non-impact aerobic work",
    "duration": "50–55 min",
    "volume": "50–55 min easy bike or elliptical RPE 2–3",
    "footwear": "Cycling or elliptical shoes",
    "note": "Deliberately no running and no lifting. Last Wednesday had a 6-mile easy run instead of the recovery cross-training prescription; the planned session is non-impact this week to control cumulative loading.",
    "blocks": [
      {
        "name": "Easy cross-training",
        "items": [
          {
            "id": "b15-wed-1",
            "name": "Bike or elliptical",
            "dosage": "50–55 min at RPE 2–3, conversational; start 5 min extra easy. Bike cadence comfortable ~80–95 rpm if applicable."
          },
          {
            "id": "b15-wed-2",
            "name": "No intensity",
            "dosage": "No intervals, resistance surges, hills, strides, or fast finish. Leave feeling fresher."
          }
        ]
      },
      {
        "name": "Optional mobility",
        "items": [
          {
            "id": "b15-wed-3",
            "name": "Foot, calf and hip",
            "dosage": "Ankle rocker 8/side, soleus isometric 20 sec/side, straight-knee calf isometric 20 sec/side and adductor rockbacks 6/side; only comfortable ranges."
          }
        ]
      },
      {
        "name": "Contingencies",
        "items": [
          {
            "id": "b15-wed-4",
            "name": "Amber",
            "dosage": "25–40 min very easy bike or complete rest."
          },
          {
            "id": "b15-wed-5",
            "name": "Red / stop",
            "dosage": "Rest for gait-altering pain, acute illness, or worsening localized symptoms. No compensatory running."
          }
        ]
      }
    ]
  },
  "w15d4": {
    "purpose": "Medium-long easy aerobic run; optional smooth uphill strides",
    "duration": "65–70 min easy running; add only the time needed for 0–4 optional hill strides and walking recoveries",
    "volume": "65–70 min RPE 2–3 easy + up to 4 × 8 sec uphill at 85–90% only fully green",
    "footwear": "Cushioned trainers on predictable flat/gentle route; safe dry ~3–5% hill for optional strides",
    "note": "This is an aerobic durability session, not a high-speed workout. A-week true acceleration/flying sprint remains the maximum-velocity exposure. Finish with walking after hills—no additional jogging cooldown.",
    "blocks": [
      {
        "name": "Aerobic volume",
        "items": [
          {
            "id": "b15-thu-1",
            "name": "Readiness check",
            "dosage": "Tuesday soreness is improving and gait normal. If not, shorten and omit all strides. No lifting Thursday."
          },
          {
            "id": "b15-thu-2",
            "name": "Easy run",
            "dosage": "65–70 min RPE 2–3, flat or gentle rolling terrain, first 10–15 min especially relaxed. No tempo, moderate progression or fast finish."
          },
          {
            "id": "b15-thu-3",
            "name": "Pace cue",
            "dosage": "Conversation possible in full sentences; prioritize controlled duration over speed."
          }
        ]
      },
      {
        "name": "Optional strides at END — green tissues only",
        "items": [
          {
            "id": "b15-thu-4",
            "name": "Gate",
            "dosage": "Only if calf/Achilles, hamstring, adductor/hip and foot remain 0–1/10 and mechanics are springy, no protective gait or unusual soreness."
          },
          {
            "id": "b15-thu-5",
            "name": "Uphill strides",
            "dosage": "0–4 × 8 sec controlled uphill accelerations on moderate ~3–5% grade; smoothly build to ~85–90% effort, not max; 2–3 min walking back/standing recovery between."
          },
          {
            "id": "b15-thu-6",
            "name": "Finish",
            "dosage": "Walk a few minutes, done. No easy jog after the last hill. If legs are heavy after easy run, omit strides entirely."
          }
        ]
      },
      {
        "name": "Fueling and alternatives",
        "items": [
          {
            "id": "b15-thu-7",
            "name": "Fuel",
            "dosage": "Normal carb-containing meal/snack beforehand as needed; hydration per conditions, protein + carbohydrate after. Midrun carbohydrate optional at this intensity/duration unless underfueled."
          },
          {
            "id": "b15-thu-8",
            "name": "Amber",
            "dosage": "45–55 min easy running with no hills; use non-impact cardio for impact soreness."
          },
          {
            "id": "b15-thu-9",
            "name": "Red / stop",
            "dosage": "Stop the strides for calf/Achilles tightness, hamstring grabbing, asymmetry or altered push-off. Stop running for sharp or escalating pain."
          }
        ]
      }
    ]
  },
  "w15d5": {
    "purpose": "Upper B first + low-cost aerobic in one training window",
    "duration": "Approximately 85–105 min",
    "volume": "16 upper-body sets + 35–40 min easy running OR 50–55 min bike/elliptical",
    "footwear": "Gym shoes, then trainers or bike shoes",
    "note": "No heavy leg work or lower-body isolation that compromises Saturday. Friday Oct 30 was a rest day with 18,500 walk-only steps; accumulated daily activity can affect recovery even with zero running.",
    "blocks": [
      {
        "name": "Upper B — lift first",
        "items": [
          {
            "id": "b15-fri-1",
            "name": "Shoulder press — DB or machine",
            "dosage": "3 × 8–10 at RPE 7–8; 90 sec rest."
          },
          {
            "id": "b15-fri-2",
            "name": "Neutral-grip pull-up or pulldown",
            "dosage": "3 × 8–10 at RPE 7–8; 90 sec rest."
          },
          {
            "id": "b15-fri-3",
            "name": "Flat DB or machine chest press",
            "dosage": "2 × 8–12 at RPE 7–8; 90 sec rest."
          },
          {
            "id": "b15-fri-4",
            "name": "Cable/chest-supported row",
            "dosage": "2 × 10–12 at RPE 7–8; 75–90 sec rest."
          },
          {
            "id": "b15-fri-5",
            "name": "Rear-delt fly",
            "dosage": "2 × 15–20; 45–60 sec rest."
          },
          {
            "id": "b15-fri-6",
            "name": "Curl",
            "dosage": "2 × 10–15, 1–2 reps in reserve; 60 sec rest."
          },
          {
            "id": "b15-fri-7",
            "name": "Triceps pressdown",
            "dosage": "2 × 10–15, 1–2 reps in reserve; 60 sec rest."
          }
        ]
      },
      {
        "name": "Easy aerobic — immediately afterward",
        "items": [
          {
            "id": "b15-fri-8",
            "name": "Primary run",
            "dosage": "35–40 min at RPE 2–3, relaxed flat terrain, no strides/fast finish."
          },
          {
            "id": "b15-fri-9",
            "name": "Non-impact swap",
            "dosage": "50–55 min easy bike or elliptical instead when legs, feet or lower legs are carrying fatigue."
          }
        ]
      },
      {
        "name": "Fueling, readiness",
        "items": [
          {
            "id": "b15-fri-10",
            "name": "Fuel",
            "dosage": "Carbohydrate-containing meal/snack before, 25–40 g protein plus carbohydrate after; fluids for conditions."
          },
          {
            "id": "b15-fri-11",
            "name": "Amber",
            "dosage": "2 sets per upper lift and 25–30 min easy cardio, preferably bike if impact fatigue."
          },
          {
            "id": "b15-fri-12",
            "name": "Red / stop",
            "dosage": "Rest during acute illness or severe systemic fatigue; no impact with gait-altering pain or escalating symptoms."
          }
        ]
      }
    ]
  },
  "w15d6": {
    "purpose": "Long easy run — primary weekly aerobic anchor",
    "duration": "80–85 min",
    "volume": "80–85 min easy RPE 2–3, no fast finish",
    "footwear": "Comfortable trainers on predictable terrain",
    "note": "Oct 31 shows 10.6 running miles but no duration, average HR, RPE or tissue response. Last verified timed long run was Oct 17: 84 min/10.05 mi/127 bpm. Hold duration near that instead of assuming tolerance for a longer run.",
    "blocks": [
      {
        "name": "Long run",
        "items": [
          {
            "id": "b15-sat-1",
            "name": "Readiness gate",
            "dosage": "Normal gait, improving soreness, no focal calf/Achilles/hamstring/adductor/foot symptoms. Consider Fri training and the week's cumulative running."
          },
          {
            "id": "b15-sat-2",
            "name": "Easy long run",
            "dosage": "80–85 min RPE 2–3; first 15 min deliberately easy, then steady conversational cruising. Flat/gently rolling route, no progression or fast finish."
          },
          {
            "id": "b15-sat-3",
            "name": "Primary cue",
            "dosage": "Accumulate comfortable aerobic time. Do not run faster to hit an unverified mileage target."
          }
        ]
      },
      {
        "name": "Fueling and fluids",
        "items": [
          {
            "id": "b15-sat-4",
            "name": "Pre- and during-run carbohydrate",
            "dosage": "30–60 g carbohydrate in a pre-run snack/meal as tolerated; ~30–45 g/hour during for an 80+ minute run if useful, particularly when starting with low glycogen."
          },
          {
            "id": "b15-sat-5",
            "name": "Post-run recovery",
            "dosage": "Protein 25–40 g plus carbohydrate, fluids and sodium consistent with sweat losses."
          }
        ]
      },
      {
        "name": "Alternatives",
        "items": [
          {
            "id": "b15-sat-6",
            "name": "Amber",
            "dosage": "65–75 min easy; no fast finish, shorten again for accumulating lower-leg fatigue."
          },
          {
            "id": "b15-sat-7",
            "name": "Red / stop",
            "dosage": "For focal or gait-altering pain skip impact; choose comfortable non-impact aerobic only if genuinely pain-free or rest. Seek medical evaluation for severe symptoms."
          }
        ]
      }
    ]
  },
  "w15d7": {
    "purpose": "Full rest and data-quality review",
    "duration": "All day",
    "volume": "No training",
    "footwear": "Not applicable",
    "note": "Keep Sunday fully off. No make-up runs or lifting. Next A-week sprint dose depends on actual recent speed tolerance and green tissue response, not prescribed entries.",
    "blocks": [
      {
        "name": "Rest",
        "items": [
          {
            "id": "b15-sun-1",
            "name": "Full rest",
            "dosage": "Normal life movement only. No prescribed cardio, mobility session, lifting, sprinting or mileage make-up."
          }
        ]
      },
      {
        "name": "Review for A week",
        "items": [
          {
            "id": "b15-sun-2",
            "name": "Log training details",
            "dosage": "Record each run's duration/distance and easy HR, Tuesday rep pace/HR/RPE, lower-lift loads/RPE, Thursday hill reps (0–4) and any symptoms, Saturday duration/HR, sleep and readiness."
          },
          {
            "id": "b15-sun-3",
            "name": "Next-week speed readiness",
            "dosage": "Full A-week flying sprints require recent fast-running tolerance, pain-free mechanics and acceptable recovery; otherwise use controlled starts only."
          },
          {
            "id": "b15-sun-4",
            "name": "Red flags",
            "dosage": "Worsening localized pain, altered gait, systemic illness or unusual exhaustion warrants recovery and appropriate evaluation, not catch-up training."
          }
        ]
      }
    ]
  },
  "w16d1": {
    "purpose": "Upper A then easy running, one window",
    "duration": "~85–100 min total",
    "volume": "14 upper sets + 40–45 min easy",
    "footwear": "Gym shoes; supportive trainers on flat/gentle terrain",
    "note": "Oct 26 incline bench 145×8×3 reached RPE 9; do not automatically progress the load.",
    "blocks": [
      {
        "name": "Readiness and Upper A — lift first",
        "items": [
          {
            "id": "a16d1-1-1",
            "name": "Readiness gate",
            "dosage": "Check normal gait, energy, hamstrings, calves/Achilles, feet and adductors. Reduce for systemic fatigue; stop painful movement."
          },
          {
            "id": "a16d1-1-2",
            "name": "Incline DB or barbell press",
            "dosage": "3×8 @ RPE 7–8; 90–120 sec. Reduce loading if RPE would approach 9."
          },
          {
            "id": "a16d1-1-3",
            "name": "Neutral-grip pulldown/pull-up",
            "dosage": "3×8–10 @ RPE 7–8; 90 sec rest."
          },
          {
            "id": "a16d1-1-4",
            "name": "Chest-supported row",
            "dosage": "2×10–12 @ RPE 7–8; 75–90 sec rest."
          },
          {
            "id": "a16d1-1-5",
            "name": "Lateral raise",
            "dosage": "2×15–20, 1–3 reps in reserve; 45–60 sec rest."
          },
          {
            "id": "a16d1-1-6",
            "name": "Curl",
            "dosage": "2×10–15, 1–2 reps in reserve; 60 sec rest."
          },
          {
            "id": "a16d1-1-7",
            "name": "Pressdown",
            "dosage": "2×10–15, 1–2 reps in reserve; 60 sec rest."
          }
        ]
      },
      {
        "name": "Easy run — immediately after",
        "items": [
          {
            "id": "a16d1-2-1",
            "name": "Easy run",
            "dosage": "40–45 min RPE 2–3, full-sentence conversational effort; first 10 min extra easy. Flat/gently rolling. No strides or fast finish."
          }
        ]
      },
      {
        "name": "Fueling and contingencies",
        "items": [
          {
            "id": "a16d1-3-1",
            "name": "Fuel",
            "dosage": "Carbohydrate-containing meal/snack before as tolerated; 25–40g protein plus carbs after; fluids matched to conditions."
          },
          {
            "id": "a16d1-3-2",
            "name": "AMBER",
            "dosage": "2 sets per main lift + 30–35 min easy running or non-impact if impact-sensitive."
          },
          {
            "id": "a16d1-3-3",
            "name": "RED/stop",
            "dosage": "Rest for illness, sharp/worsening localized pain or gait change. No make-up miles."
          }
        ]
      }
    ]
  },
  "w16d2": {
    "purpose": "True speed retention + primary controlled strength, separated",
    "duration": "Track ~45–65 min; lift ~45–60 min 3+ h later",
    "volume": "GREEN: 3×20–30 m acceleration + 2×flying 20; lift 9–12 sets",
    "footwear": "Dry predictable straight track in trainers; stable gym shoes for lift",
    "note": "True sprint tolerance since October is not verified. Full speed requires personally confirmed recent fast exposures AND quiet tissues. If unknown use AMBER controlled starts, no flying reps.",
    "blocks": [
      {
        "name": "GREEN/AMBER gate and warm-up",
        "items": [
          {
            "id": "a16d2-1-1",
            "name": "Gate",
            "dosage": "GREEN only if normal gait, adequate energy, hamstring/calf/Achilles/foot/adductor symptoms 0–1/10, mechanics unguarded and recent fast-running tolerance known. Otherwise AMBER."
          },
          {
            "id": "a16d2-1-2",
            "name": "Jog and mobility",
            "dosage": "12–15 min easy jogging; ankle rockers 8/side, leg swings 8/side, walking lunges 5/side."
          },
          {
            "id": "a16d2-1-3",
            "name": "Sprint drills",
            "dosage": "A-march 20m; A-skip 20m; low dribble 20m. Low pogos 2×6 only fully green."
          },
          {
            "id": "a16d2-1-4",
            "name": "Buildups",
            "dosage": "3–4×40–50m progressing ~60/75/85/(90)% with full walkback/rest."
          }
        ]
      },
      {
        "name": "Track speed — GREEN only",
        "items": [
          {
            "id": "a16d2-2-1",
            "name": "Acceleration",
            "dosage": "3×20–30m two-point starts at ~92–95% current max, 4–5 min full recovery; relaxed quality."
          },
          {
            "id": "a16d2-2-2",
            "name": "Flying 20s",
            "dosage": "2×flying 20m: 30–35m progressive buildup, 20m fly, 30–40m gradual deceleration at ~93–95% current feel; 5–7 min full rest."
          },
          {
            "id": "a16d2-2-3",
            "name": "Speed stop rule",
            "dosage": "Stop for any focal pain, asymmetry, protective gait, sudden slowdown or loss of smoothness. No timed testing or extra running quota."
          }
        ]
      },
      {
        "name": "AMBER / unverified fast-running history",
        "items": [
          {
            "id": "a16d2-3-1",
            "name": "Controlled starts only",
            "dosage": "2×20m at ~85–90% with 4–5 min full rest; NO flying sprints or maximal effort. If awkward or sore, drop accelerations and finish easy or stop."
          }
        ]
      },
      {
        "name": "Primary lift, several hours later",
        "items": [
          {
            "id": "a16d2-4-1",
            "name": "Deadlift",
            "dosage": "Warm up in small steps; 2×3 @ RPE 6.5–7 with 3–4 min rest. Do not assume old maximal loads still apply."
          },
          {
            "id": "a16d2-4-2",
            "name": "Bench press",
            "dosage": "3×5 @ RPE 7–7.5; 2.5–3 min rest, account for Monday pressing."
          },
          {
            "id": "a16d2-4-3",
            "name": "Rear-foot-elevated split squat",
            "dosage": "1–2×5 each leg @ RPE 6.5–7; 90–120 sec. Omit for meaningful leg fatigue."
          },
          {
            "id": "a16d2-4-4",
            "name": "Chest-supported row",
            "dosage": "2×8–10 @ RPE 7–8; 90 sec rest."
          },
          {
            "id": "a16d2-4-5",
            "name": "Calf raises, optional",
            "dosage": "1–2×8–10 @ RPE 7; 75–90 sec only with absolutely quiet Achilles/calf."
          }
        ]
      },
      {
        "name": "Between sessions, alternatives",
        "items": [
          {
            "id": "a16d2-5-1",
            "name": "Fuel",
            "dosage": "High-carbohydrate food plus 25–40g protein after track; another substantial carbohydrate/protein meal between sessions; replenish fluids/sodium."
          },
          {
            "id": "a16d2-5-2",
            "name": "AMBER strength",
            "dosage": "Bench + row as tolerated; skip deadlift/RFESS/calf loading for lower-body symptoms. Do not turn into a second hard leg session."
          },
          {
            "id": "a16d2-5-3",
            "name": "RED",
            "dosage": "No sprinting or loaded legs for sharp/worsening/gait-altering pain, illness, or pronounced systemic fatigue; rest or comfortable non-impact only if appropriate."
          }
        ]
      }
    ]
  },
  "w16d3": {
    "purpose": "Easy non-impact aerobic recovery",
    "duration": "45–55 min",
    "volume": "Bike or elliptical 45–55 min RPE 2–3",
    "footwear": "Bike/elliptical, comfortable shoes",
    "note": "The Daily Log reported a Wednesday run Nov 4; preserve recovery by avoiding another midweek impact day this week.",
    "blocks": [
      {
        "name": "Easy aerobic",
        "items": [
          {
            "id": "a16d3-1-1",
            "name": "Bike or elliptical",
            "dosage": "45–55 min RPE 2–3. Start especially easy for 5–10 min, conversational throughout; no intervals, hard resistance or fast finish."
          },
          {
            "id": "a16d3-1-2",
            "name": "Optional mobility",
            "dosage": "Ankle rockers 8/side, adductor rockback 6/side, soleus isometric 20sec/side only if comfortable. No lifting/plyos."
          }
        ]
      },
      {
        "name": "Recovery gates",
        "items": [
          {
            "id": "a16d3-2-1",
            "name": "AMBER",
            "dosage": "30–40 min easy non-impact, shorten if not improving."
          },
          {
            "id": "a16d3-2-2",
            "name": "RED",
            "dosage": "Full rest if ill, unusually exhausted, or pain worsens even with easy movement."
          },
          {
            "id": "a16d3-2-3",
            "name": "Fuel",
            "dosage": "Normal carb/protein meals and fluids to support recovery. Do not chase missed running mileage."
          }
        ]
      }
    ]
  },
  "w16d4": {
    "purpose": "Controlled aerobic subthreshold, not threshold",
    "duration": "~48–60 min including easy running",
    "volume": "2×8 min @ RPE 5–6 with 2 min easy jog",
    "footwear": "Daily trainers on flat predictable track/path",
    "note": "Reduce from earlier 3×8 because recent speed/lift and Thursday efforts are undocumented. Tuesday lower-leg recovery must be good. Never turn this into a second high session.",
    "blocks": [
      {
        "name": "Warm-up",
        "items": [
          {
            "id": "a16d4-1-1",
            "name": "Readiness",
            "dosage": "Check normal mechanics, energy and quiet lower-leg/hamstring/adductor tissues after Tuesday; change to easy aerobic if heavy."
          },
          {
            "id": "a16d4-1-2",
            "name": "Easy jog",
            "dosage": "15 min at RPE 2–3, flat, plus ankle rockers/relaxed leg swings if useful."
          }
        ]
      },
      {
        "name": "Medium aerobic work",
        "items": [
          {
            "id": "a16d4-2-1",
            "name": "Subthreshold",
            "dosage": "2×8 min @ RPE 5–6, with 2 min very easy jog; comfortable control, clearly easier than threshold, no pace chasing."
          },
          {
            "id": "a16d4-2-2",
            "name": "Cooldown",
            "dosage": "12–15 min easy jogging, no fast finish or added strides."
          },
          {
            "id": "a16d4-2-3",
            "name": "Record",
            "dosage": "Log pace, HR, RPE for each rep and next-morning tissue response. No third repetition without confirmed tolerance."
          }
        ]
      },
      {
        "name": "Fueling and modifications",
        "items": [
          {
            "id": "a16d4-3-1",
            "name": "Fuel",
            "dosage": "Normal carb-containing snack/meal, hydration, and recovery protein/carbohydrate."
          },
          {
            "id": "a16d4-3-2",
            "name": "AMBER",
            "dosage": "40–50 min easy RPE 2–3 or easy bike if impact fatigue; no subthreshold."
          },
          {
            "id": "a16d4-3-3",
            "name": "RED",
            "dosage": "No running if illness, gait alteration or worsening focal pain; rest and consider evaluation as needed."
          }
        ]
      }
    ]
  },
  "w16d5": {
    "purpose": "Upper B then easy aerobic, combined",
    "duration": "Upper ~40–50 min + 35–40 min run or 45–55 min bike",
    "volume": "16 upper sets + one easy aerobic option",
    "footwear": "Gym footwear then comfortable trainers or bike/elliptical shoes",
    "note": "No lower-body lifting or hard cardio before Saturday.",
    "blocks": [
      {
        "name": "Upper B — lift first",
        "items": [
          {
            "id": "a16d5-1-1",
            "name": "Shoulder press DB/machine",
            "dosage": "3×8–10 @ RPE 7–8; 90 sec rest."
          },
          {
            "id": "a16d5-1-2",
            "name": "Neutral-grip pull-up or pulldown",
            "dosage": "3×8–10 @ RPE 7–8; 90 sec rest."
          },
          {
            "id": "a16d5-1-3",
            "name": "Flat DB/machine chest press",
            "dosage": "2×8–12 @ RPE 7–8; 75–90 sec rest."
          },
          {
            "id": "a16d5-1-4",
            "name": "Cable/chest-supported row",
            "dosage": "2×10–12 @ RPE 7–8; 75–90 sec rest."
          },
          {
            "id": "a16d5-1-5",
            "name": "Rear-delt fly",
            "dosage": "2×15–20, 1–2 reps in reserve; 45–60 sec rest."
          },
          {
            "id": "a16d5-1-6",
            "name": "Curl",
            "dosage": "2×10–15, 1–2 reps in reserve; 60 sec rest."
          },
          {
            "id": "a16d5-1-7",
            "name": "Pressdown",
            "dosage": "2×10–15, 1–2 reps in reserve; 60 sec rest."
          }
        ]
      },
      {
        "name": "Easy aerobic directly after",
        "items": [
          {
            "id": "a16d5-2-1",
            "name": "Primary easy run",
            "dosage": "35–40 min RPE 2–3 on flat/gentle ground, no progression, no fast finish."
          },
          {
            "id": "a16d5-2-2",
            "name": "Impact alternative",
            "dosage": "45–55 min bike/elliptical RPE 2–3 instead of run if legs or lower legs tired. Do not do both."
          }
        ]
      },
      {
        "name": "Fuel / readiness",
        "items": [
          {
            "id": "a16d5-3-1",
            "name": "Fuel",
            "dosage": "Carb-containing meal/snack before and 25–40g protein plus carbs after; don't underfuel after multiple running days."
          },
          {
            "id": "a16d5-3-2",
            "name": "AMBER",
            "dosage": "2 sets of upper work and 25–30 min easy aerobic."
          },
          {
            "id": "a16d5-3-3",
            "name": "RED",
            "dosage": "Rest if systemic illness or worsening localized symptoms; no make-up."
          }
        ]
      }
    ]
  },
  "w16d6": {
    "purpose": "Long easy run with no automatic progression",
    "duration": "75–80 min green; 65–70 amber",
    "volume": "75–80 min easy conversational; no fast finish",
    "footwear": "Cushioned trainers on familiar stable mostly flat/rolling route",
    "note": "Nov 7 run duration and effort absent. Nov 2–6 logged 33.6 miles already; last verified timed long run Oct 17 was 84 min / 10.05mi / 127 bpm. Hold below that duration until recovery known.",
    "blocks": [
      {
        "name": "Long run",
        "items": [
          {
            "id": "a16d6-1-1",
            "name": "Easy continuous run",
            "dosage": "75–80 min RPE 2–3. First 15 min extra easy, then full-sentence conversational. No pacing target, fast finish or bonus mileage."
          },
          {
            "id": "a16d6-1-2",
            "name": "Stop rules",
            "dosage": "Shorten or stop for worsening local pain, abnormal gait, dizziness, disproportionate strain or unusual fatigue. Prefer safe familiar terrain."
          },
          {
            "id": "a16d6-1-3",
            "name": "Log",
            "dosage": "Record actual elapsed running duration, distance, avg HR, effort and next-day tissue response."
          }
        ]
      },
      {
        "name": "Fueling / hydration",
        "items": [
          {
            "id": "a16d6-2-1",
            "name": "Before",
            "dosage": "~30–60g carbs beforehand as tolerated and start hydrated."
          },
          {
            "id": "a16d6-2-2",
            "name": "During",
            "dosage": "For 75–80 min, ~30–45g carbs/hour if useful, especially when underfueled; fluids/sodium by sweat and weather."
          },
          {
            "id": "a16d6-2-3",
            "name": "After",
            "dosage": "25–40g protein plus substantial carbohydrate; replenish sweat losses."
          }
        ]
      },
      {
        "name": "Modifications",
        "items": [
          {
            "id": "a16d6-3-1",
            "name": "AMBER",
            "dosage": "65–70 min easy or 60–75 min easy bike for impact sensitivity."
          },
          {
            "id": "a16d6-3-2",
            "name": "RED",
            "dosage": "Skip running for sharp, worsening or gait-altering pain; no hard replacement workout."
          }
        ]
      }
    ]
  },
  "w16d7": {
    "purpose": "Full rest and review",
    "duration": "All day",
    "volume": "No training",
    "footwear": "No special footwear",
    "note": "No makeup mileage or strength. Use actual completed-session data, not plan defaults, to set the next B week.",
    "blocks": [
      {
        "name": "Full rest",
        "items": [
          {
            "id": "a16d7-1-1",
            "name": "Rest",
            "dosage": "Normal daily movement only; no run, gym, intervals, sprinting or added cardio."
          }
        ]
      },
      {
        "name": "Review",
        "items": [
          {
            "id": "a16d7-2-1",
            "name": "Record actual doses",
            "dosage": "Tuesday accelerations/flys performed and mechanics; strength loads/RPE; Thursday rep pace/HR/RPE; Saturday duration/avg HR; sleep and tissue scores."
          },
          {
            "id": "a16d7-2-2",
            "name": "Evidence rule",
            "dosage": "Missing log entries remain unknown. Do not claim completion or progress intensity without documented response."
          },
          {
            "id": "a16d7-2-3",
            "name": "Red flags",
            "dosage": "Worsening focal pain, altered gait, unusual exhaustion or illness = reduce workload and seek appropriate evaluation."
          }
        ]
      }
    ]
  }
};