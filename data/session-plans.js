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
  },
  "w17d1": {
  "purpose": "Upper A, then easy run in one session",
  "duration": "~85–100 min combined",
  "volume": "14 upper working sets + 40–45 min easy run",
  "footwear": "Stable gym footwear, then supportive trainers on flat/gently rolling roads or paths",
  "note": "Friday/Saturday prior week carried substantial run volume and a fast long run. Keep today's run relaxed and Upper A below failure. If Sunday readiness stays 3/5, prefer the amber option.",
  "blocks": [
    {
      "name": "Readiness and upper lifting — lift first",
      "items": [
        {
          "id": "a17d1-1-1",
          "name": "Start check",
          "dosage": "Check sleep, energy, gait, hamstrings, calves/Achilles, foot and adductors. No maximal sets; leave 2–3 reps in reserve."
        },
        {
          "id": "a17d1-1-2",
          "name": "Incline DB or barbell press",
          "dosage": "3 × 8 @ RPE 7–8; 90–120 sec. Oct 26 barbell 145×8×3 reached RPE 7.5–9; do not automatically add load."
        },
        {
          "id": "a17d1-1-3",
          "name": "Neutral-grip pulldown or pull-up",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec."
        },
        {
          "id": "a17d1-1-4",
          "name": "Chest-supported row",
          "dosage": "2 × 10–12 @ RPE 7–8; 75–90 sec."
        },
        {
          "id": "a17d1-1-5",
          "name": "Lateral raises",
          "dosage": "2 × 15–20; 45–60 sec; leave 2 RIR."
        },
        {
          "id": "a17d1-1-6",
          "name": "Curls",
          "dosage": "2 × 10–15; 60 sec; leave 2 RIR."
        },
        {
          "id": "a17d1-1-7",
          "name": "Pressdowns",
          "dosage": "2 × 10–15; 60 sec; leave 2 RIR."
        }
      ]
    },
    {
      "name": "Run — immediately after lifting",
      "items": [
        {
          "id": "a17d1-2-1",
          "name": "40–45 min genuinely easy",
          "dosage": "RPE 2–3, full-sentence conversation, flat/gently rolling; first 10 min extra easy. No strides, progression or fast finish."
        }
      ]
    },
    {
      "name": "Fuel and recovery options",
      "items": [
        {
          "id": "a17d1-3-1",
          "name": "Fuel",
          "dosage": "Carbohydrate-containing pre-session meal/snack if needed; drink according to conditions; 25–40 g protein + carbohydrates afterward."
        },
        {
          "id": "a17d1-3-2",
          "name": "AMBER",
          "dosage": "2 sets per major exercise, 1 set arms if needed; 25–35 min easy or 35–45 min bike if impact soreness."
        },
        {
          "id": "a17d1-3-3",
          "name": "RED",
          "dosage": "Rest or non-painful mobility only if unusual systemic fatigue, sharp/worsening pain or altered gait. Avoid training through pain."
        }
      ]
    }
  ]
},
  "w17d2": {
  "purpose": "Controlled threshold AM + primary strength PM",
  "duration": "Run ~55–65 min; lifting ~50–60 min, separated by several hours",
  "volume": "3 × 6 min RPE 6–7 with 2 min jog + controlled primary strength",
  "footwear": "Supportive running trainers on flat measured road/track; stable gym shoes for lifting",
  "note": "Only genuine lower-body high day and true two-a-day. Due to Nov 14's hard long run and absent lift/tissue detail, do not increase to 4 reps or race threshold pace. Green required for any intensity.",
  "blocks": [
    {
      "name": "Decision gate and warm-up",
      "items": [
        {
          "id": "a17d2-1-1",
          "name": "Green / amber / red check",
          "dosage": "GREEN: normal gait, typical easy HR/effort, no focal discomfort, prior long-run soreness resolving. AMBER: stale/heavy legs, low readiness or persistent soreness; use shorter option. RED: painful/altered gait, illness or unusual fatigue; no threshold or lower lifting."
        },
        {
          "id": "a17d2-1-2",
          "name": "Easy warm-up",
          "dosage": "12–15 min easy RPE 2–3; ankle rocker 8/side, walking lunge 5/side, leg swing 8/side."
        },
        {
          "id": "a17d2-1-3",
          "name": "Relaxed preparation strides",
          "dosage": "2–3 × 15–20 sec smooth progressive, NOT sprinting; 60–75 sec easy jog. Skip if lower leg unhappy."
        }
      ]
    },
    {
      "name": "Threshold — primary aerobic stimulus",
      "items": [
        {
          "id": "a17d2-2-1",
          "name": "3 × 6 min controlled threshold",
          "dosage": "RPE 6–7 (comfortably hard) with 2:00 easy jog after reps 1–2. Rep 1 intentionally conservative; avoid using Nov 10 faster splits as a pace target."
        },
        {
          "id": "a17d2-2-2",
          "name": "Record each rep",
          "dosage": "Log rep pace, average HR and RPE, plus whether breathing/stride remained controlled; should be able to do another rep."
        },
        {
          "id": "a17d2-2-3",
          "name": "Cooldown",
          "dosage": "10–12 min easy; end early if mechanics deteriorate. Stop if rep 1 >RPE 7.5, pain appears or normal form fails."
        }
      ]
    },
    {
      "name": "Primary strength — hours later",
      "items": [
        {
          "id": "a17d2-3-1",
          "name": "Back squat",
          "dosage": "2 × 4 at RPE 7–7.5; 3 min rest; no forced reps or load progression."
        },
        {
          "id": "a17d2-3-2",
          "name": "Bench press",
          "dosage": "3 × 5 at RPE 7–7.5; 2.5–3 min rest."
        },
        {
          "id": "a17d2-3-3",
          "name": "Rear-foot-elevated split squat",
          "dosage": "1–2 × 5 each leg at RPE 6–7; 90–120 sec; omit for lingering fatigue."
        },
        {
          "id": "a17d2-3-4",
          "name": "Chest-supported row",
          "dosage": "3 × 8–10 at RPE 7; 90 sec."
        },
        {
          "id": "a17d2-3-5",
          "name": "Standing calf raise",
          "dosage": "2 × 8–10 at RPE 7, controlled eccentric; 75–90 sec. Omit if Achilles irritable."
        }
      ]
    },
    {
      "name": "Fuel and readiness alternatives",
      "items": [
        {
          "id": "a17d2-4-1",
          "name": "High-day fueling",
          "dosage": "Carbohydrate and fluid before running; substantial carb/protein meal between sessions; 25–40 g protein + carbohydrate after lifting. Avoid a large energy shortfall."
        },
        {
          "id": "a17d2-4-2",
          "name": "AMBER",
          "dosage": "2 × 6 min threshold at RPE ≤6–6.5, 2 min jog; upper-only bench/row in PM, no lower body; or easy aerobic if recovery not good."
        },
        {
          "id": "a17d2-4-3",
          "name": "RED",
          "dosage": "25–40 min very easy bike only if symptom-free; otherwise rest. Skip threshold and lower-body lifting. Seek assessment for worsening/localized symptoms."
        }
      ]
    }
  ]
},
  "w17d3": {
  "purpose": "Low-impact aerobic recovery",
  "duration": "45–55 min",
  "volume": "45–55 min easy bike or elliptical RPE 2–3",
  "footwear": "Comfortable bike/elliptical shoes, no impact surface",
  "note": "Low-impact day by design; reported Nov 11 had 6.2 running miles despite planned bike. Do not convert today's recovery to a run to reach an arbitrary mileage total.",
  "blocks": [
    {
      "name": "Easy recovery",
      "items": [
        {
          "id": "a17d3-1-1",
          "name": "Bike or elliptical",
          "dosage": "45–55 min @ RPE 2–3, comfortable conversation; bike generally 80–95 rpm without grinding."
        },
        {
          "id": "a17d3-1-2",
          "name": "Effort discipline",
          "dosage": "No intervals, tempo segments, fast finish, strength or impact running. Finish feeling refreshed."
        }
      ]
    },
    {
      "name": "Maintenance and fuel",
      "items": [
        {
          "id": "a17d3-2-1",
          "name": "Optional mobility",
          "dosage": "Ankle rocker 8/side, soleus isometric 20 sec/side, straight-knee calf iso 20 sec/side, adductor rockback 6/side; stop if provocative."
        },
        {
          "id": "a17d3-2-2",
          "name": "Fuel",
          "dosage": "Normal balanced meals with carbohydrate plus protein; keep hydration consistent."
        },
        {
          "id": "a17d3-2-3",
          "name": "AMBER",
          "dosage": "30–40 min gentle cycling or rest if unusually tired."
        },
        {
          "id": "a17d3-2-4",
          "name": "RED",
          "dosage": "Rest for illness, gait alteration or significant pain; do not substitute another hard workout."
        }
      ]
    }
  ]
},
  "w17d4": {
  "purpose": "Medium-long easy run + conditional uphill strides",
  "duration": "65–70 min running; strides/walk-back may extend clock time slightly",
  "volume": "65–70 min easy RPE 2–3, then 0–4 × 8 sec controlled uphill strides",
  "footwear": "Supportive trainers on flat/gentle running route; dry predictable 3–5% uphill only for optional strides",
  "note": "Aerobic development first; hill strides provide a little acceleration stimulus, not max velocity. Complete all jogging before the strides; walk home/cool down without extra jogging. Suppress hills if Tuesday still in the legs.",
  "blocks": [
    {
      "name": "Readiness gate",
      "items": [
        {
          "id": "a17d4-1-1",
          "name": "Tissue and fatigue screen",
          "dosage": "Only do the full 65–70 min if Tuesday is absorbed, gait normal and no focal calf/Achilles, hamstring, foot or adductor discomfort. Sunday 3/5 readiness and Saturday intensity require restraint."
        },
        {
          "id": "a17d4-1-2",
          "name": "Start easy",
          "dosage": "First 10–15 min especially gentle; avoid steep descents, racing companions or an unplanned progression."
        }
      ]
    },
    {
      "name": "Easy aerobic volume",
      "items": [
        {
          "id": "a17d4-2-1",
          "name": "65–70 min easy run",
          "dosage": "RPE 2–3 conversational, flat-to-gently rolling, no steady section. Hold lower-than-usual pace if needed after Tuesday."
        },
        {
          "id": "a17d4-2-2",
          "name": "No extra running after strides",
          "dosage": "Finish the planned easy running before hill strides; walking recovery and a short walk home are sufficient."
        }
      ]
    },
    {
      "name": "Optional strides — GREEN tissue only",
      "items": [
        {
          "id": "a17d4-3-1",
          "name": "4 × 8 sec moderate uphill",
          "dosage": "Smooth build to ~85–90% effort on dry 3–5% incline. Walk back; at least 2–3 min between; no bounding, timing or racing."
        },
        {
          "id": "a17d4-3-2",
          "name": "Skip criteria",
          "dosage": "Omit all strides if tired calves/Achilles, hamstring or adductor, localized discomfort, heavy legs or asymmetrical push-off. No running cooldown."
        },
        {
          "id": "a17d4-3-3",
          "name": "Stop rule",
          "dosage": "End the set immediately for sharp sensation, shortened/asymmetric stride or poor coordination."
        }
      ]
    },
    {
      "name": "Fuel and alternatives",
      "items": [
        {
          "id": "a17d4-4-1",
          "name": "Fuel",
          "dosage": "Normal carbohydrate-containing meal/snack before, fluid as needed, carb/protein meal after. 65–70 min easy generally does not require aggressive midrun fueling."
        },
        {
          "id": "a17d4-4-2",
          "name": "AMBER",
          "dosage": "45–55 min easy with no strides; if impact-sensitive, 45–55 min easy bike instead."
        },
        {
          "id": "a17d4-4-3",
          "name": "RED",
          "dosage": "Rest or very easy non-impact only if comfortable; no hills or running through altered gait."
        }
      ]
    }
  ]
},
  "w17d5": {
  "purpose": "Upper B, then easy aerobic in one session",
  "duration": "~85–105 min combined",
  "volume": "16 upper sets + 35–40 min easy run OR 45–55 min easy bike/elliptical",
  "footwear": "Stable gym footwear then trainers/bike shoes",
  "note": "Lift first, run or cycle immediately after. No meaningful lower-body strength and no adding missed aerobic minutes to Saturday.",
  "blocks": [
    {
      "name": "Upper B — lift first",
      "items": [
        {
          "id": "a17d5-1-1",
          "name": "DB/machine shoulder press",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec."
        },
        {
          "id": "a17d5-1-2",
          "name": "Neutral pulldown/pull-up",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec."
        },
        {
          "id": "a17d5-1-3",
          "name": "Flat DB/machine press",
          "dosage": "2 × 8–12 @ RPE 7–8; 90 sec."
        },
        {
          "id": "a17d5-1-4",
          "name": "Cable or chest-supported row",
          "dosage": "2 × 10–12 @ RPE 7; 75–90 sec."
        },
        {
          "id": "a17d5-1-5",
          "name": "Rear-delt fly",
          "dosage": "2 × 15–20; 45–60 sec."
        },
        {
          "id": "a17d5-1-6",
          "name": "Curl",
          "dosage": "2 × 10–15; 60 sec; leave 2 RIR."
        },
        {
          "id": "a17d5-1-7",
          "name": "Pressdown",
          "dosage": "2 × 10–15; 60 sec; leave 2 RIR."
        }
      ]
    },
    {
      "name": "Aerobic — same session",
      "items": [
        {
          "id": "a17d5-2-1",
          "name": "Default easy run",
          "dosage": "35–40 min @ RPE 2–3; conversational, no faster finish."
        },
        {
          "id": "a17d5-2-2",
          "name": "Low-impact replacement",
          "dosage": "45–55 min easy bike/elliptical if calves/legs feel beaten up. Do one option, not both."
        }
      ]
    },
    {
      "name": "Fuel and contingencies",
      "items": [
        {
          "id": "a17d5-3-1",
          "name": "Fuel",
          "dosage": "Carbohydrate-containing pre-session meal; 25–40 g protein plus carbohydrate after."
        },
        {
          "id": "a17d5-3-2",
          "name": "AMBER",
          "dosage": "Reduce major lifts to 2 sets, choose 25–30 min easy running or bike."
        },
        {
          "id": "a17d5-3-3",
          "name": "RED",
          "dosage": "Rest if pain changes gait or unusual fatigue persists."
        }
      ]
    }
  ]
},
  "w17d6": {
  "purpose": "Easy long run — aerobic only",
  "duration": "75–80 min",
  "volume": "75–80 min conversational easy; no tempo, hills surges, or fast finish",
  "footwear": "Supportive trainers on flat/gentle predictable route",
  "note": "Nov 14's 10.60 miles in 77:16 (HR147 avg, one 6:01 mile) was not the easy long-run stimulus intended. Correct intensity this week rather than extending duration or chasing distance.",
  "blocks": [
    {
      "name": "Start and long-run execution",
      "items": [
        {
          "id": "a17d6-1-1",
          "name": "Readiness check",
          "dosage": "Only run 75–80 min with normal gait, recovered lower legs and routine fatigue. Use 60–70 min when amber."
        },
        {
          "id": "a17d6-1-2",
          "name": "Easy long run",
          "dosage": "75–80 min at RPE 2–3, full sentences, first 15 min especially slow. Keep effort near personal genuinely easy range rather than pace from Nov 14."
        },
        {
          "id": "a17d6-1-3",
          "name": "No fast finish",
          "dosage": "Do not include threshold repeats, 6-minute miles, pickups or hill sprints; if effort climbs, slow down or shorten."
        },
        {
          "id": "a17d6-1-4",
          "name": "Stop rule",
          "dosage": "Stop for focal worsening pain, obvious gait change, dizziness or unusual exhaustion; substitute rest/non-impact only if comfortable."
        }
      ]
    },
    {
      "name": "Fuel",
      "items": [
        {
          "id": "a17d6-2-1",
          "name": "Before",
          "dosage": "30–60 g carbohydrate 1–2 hr beforehand as tolerated; adjust meal timing to gut comfort."
        },
        {
          "id": "a17d6-2-2",
          "name": "During",
          "dosage": "Water/electrolytes according to weather and sweating; ~30–45 g carbohydrate/hr optional-to-useful for 75–80 min, especially if otherwise underfueled."
        },
        {
          "id": "a17d6-2-3",
          "name": "After",
          "dosage": "Within a normal meal, 25–40 g protein plus substantial carbohydrates; replace fluids/sodium as needed."
        }
      ]
    },
    {
      "name": "Alternatives and logging",
      "items": [
        {
          "id": "a17d6-3-1",
          "name": "AMBER",
          "dosage": "60–70 min easy, or 70–80 min easy cycle if impact soreness; no make-up mileage."
        },
        {
          "id": "a17d6-3-2",
          "name": "RED",
          "dosage": "Rest for pain/altered gait or illness."
        },
        {
          "id": "a17d6-3-3",
          "name": "Record",
          "dosage": "Log actual duration, distance, average HR, pace and RPE; tissue and next-morning response. This is not a time trial."
        }
      ]
    }
  ]
},
  "w17d7": {
  "purpose": "Full rest + weekly review",
  "duration": "All day",
  "volume": "No workout",
  "footwear": "None",
  "note": "Next week alternates to A, but true fast running must remain green-tissue and recent-speed-tolerance gated.",
  "blocks": [
    {
      "name": "Recovery",
      "items": [
        {
          "id": "a17d7-1-1",
          "name": "Complete rest",
          "dosage": "Normal daily life only. No make-up mileage, gym, intervals or sprinting."
        }
      ]
    },
    {
      "name": "Review for next A week",
      "items": [
        {
          "id": "a17d7-2-1",
          "name": "Document actual work",
          "dosage": "Record Tuesday threshold rep HR/pace/RPE and lift loads/reps; Thursday strides yes/no; Saturday long-run duration/HR/RPE."
        },
        {
          "id": "a17d7-2-2",
          "name": "Readiness",
          "dosage": "Document sleep, lower-leg/hamstring/adductor/foot symptoms and recovery over the next morning. Missing detail remains unknown."
        },
        {
          "id": "a17d7-2-3",
          "name": "Programming rule",
          "dosage": "A-week true speed requires fully green tissues and recently tolerated near-maximal running. If unverified, use restrained short accelerations instead."
        }
      ]
    }
  ]
}

,
  "w18d1": {
  "purpose": "Upper A and easy run in one window",
  "duration": "~85–105 min total",
  "volume": "14 upper working sets + 40–45 min easy run",
  "footwear": "Stable gym shoes then comfortable neutral trainers; level or gently rolling ground",
  "note": "Upper A comes first. This is not a second high day. Progression and AMRAPs inappropriate after a 51.4-mi week.",
  "blocks": [
    {
      "name": "Before and Upper A",
      "items": [
        {
          "id": "a18d1-1-1",
          "name": "Readiness gate",
          "dosage": "Start only with normal gait and no concerning focal pain. Sleep/fatigue below usual: reduce to 2 sets per large lift and 25–30 min easy run. No added leg work."
        },
        {
          "id": "a18d1-1-2",
          "name": "Incline dumbbell press",
          "dosage": "3 × 8–10 @ RPE 7–7.5; 90 sec rest; last rep should not grind."
        },
        {
          "id": "a18d1-1-3",
          "name": "Neutral-grip pull-up or pulldown",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rest."
        },
        {
          "id": "a18d1-1-4",
          "name": "Chest-supported row",
          "dosage": "2 × 10–12 @ RPE 7; 75–90 sec rest."
        },
        {
          "id": "a18d1-1-5",
          "name": "DB lateral raise",
          "dosage": "2 × 15–20 @ RPE 7; 45–60 sec rest."
        },
        {
          "id": "a18d1-1-6",
          "name": "Curl",
          "dosage": "2 × 10–15 with 2–3 reps in reserve; 60 sec rest."
        },
        {
          "id": "a18d1-1-7",
          "name": "Cable pressdown",
          "dosage": "2 × 10–15 with 2–3 reps in reserve; 60 sec rest."
        }
      ]
    },
    {
      "name": "Easy aerobic immediately after",
      "items": [
        {
          "id": "a18d1-2-1",
          "name": "Run",
          "dosage": "40–45 min @ RPE 2–3; conversational on flat/gentle road or path; first 10 min deliberately slow. No strides, hills or faster last mile."
        },
        {
          "id": "a18d1-2-2",
          "name": "No extra workout",
          "dosage": "Finish after the run; do not add another evening session or compensate for reduced weekly mileage."
        }
      ]
    },
    {
      "name": "Fuel and modifications",
      "items": [
        {
          "id": "a18d1-3-1",
          "name": "Fuel",
          "dosage": "Eat carbohydrate-containing meal/snack before this combined session; afterward 25–40 g protein and a substantial carbohydrate serving. Replace fluids and sodium as needed."
        },
        {
          "id": "a18d1-3-2",
          "name": "AMBER",
          "dosage": "Upper A: 2 × per major lift, 1 × accessories; then 25–30 min easy run or easy bike."
        },
        {
          "id": "a18d1-3-3",
          "name": "RED",
          "dosage": "Rest if pain changes gait, illness or profound fatigue."
        }
      ]
    }
  ]
},
  "w18d2": {
  "purpose": "Speed retention then controlled primary strength — only two-a-day",
  "duration": "AM ~35–50 min; PM ~45–60 min separated by 4–6+ hours",
  "volume": "Default 2 × 20–30 m controlled acceleration; GREEN & verified fast tolerance 3 × 20–30 m accel + 2 × fly 20 m; PM primary lift",
  "footwear": "Dry level track or predictable straightaway in cushioned trainers; stable gym footwear for lifting",
  "note": "Latest Training Log documents fast 1-mi repetitions, not a verified near-maximal sprint session. Therefore default is submaximal controlled accelerations, NOT automatic flying 20s. Do not assume green tissues.",
  "blocks": [
    {
      "name": "AM readiness and warm-up",
      "items": [
        {
          "id": "a18d2-1-1",
          "name": "GREEN gate",
          "dosage": "Full speed only with 0–1/10 localized calf/Achilles, hamstring, adductor and foot issues, normal gait, springy warm-up, AND documented near-max running tolerated recently. If the latter is unknown, use default accelerations."
        },
        {
          "id": "a18d2-1-2",
          "name": "Easy jog",
          "dosage": "12–15 min very easy."
        },
        {
          "id": "a18d2-1-3",
          "name": "Movement prep",
          "dosage": "Ankle rockers 8/side; adductor rockbacks 6/side; leg swings 8/side; walking lunge 5/side; A-march 20 m and A-skip 20 m."
        },
        {
          "id": "a18d2-1-4",
          "name": "Buildups",
          "dosage": "2 × 40–50 m smooth at ~60% then ~75–80%; 2–3 min walk."
        }
      ]
    },
    {
      "name": "AM speed choices — not additive",
      "items": [
        {
          "id": "a18d2-2-1",
          "name": "DEFAULT: 2 × 20–30 m smooth accelerations",
          "dosage": "~85–90% effort on level dry surface, 4–5 min walk between; no timing; stop if sluggish or forced. No flying reps."
        },
        {
          "id": "a18d2-2-2",
          "name": "GREEN + known recent fast-running tolerance ONLY",
          "dosage": "3 × 20–30 m progressive acceleration @ ~90–93%, full 4–5 min rest; THEN 2 × flying 20 m using 25–30 m build-up @ fast but relaxed ~90–93% with 5–6 min recovery. No racing, no spikes."
        },
        {
          "id": "a18d2-2-3",
          "name": "Cool down",
          "dosage": "8–12 min easy jog/walk if desired, contained in total AM time; skip if any tissue signal. Log exact reps and sensations."
        }
      ]
    },
    {
      "name": "PM primary lift, several hours later",
      "items": [
        {
          "id": "a18d2-3-1",
          "name": "Readiness recheck",
          "dosage": "Full lower-body lift only with normal post-sprint gait and no tissue signal. Recent lower lifting unverified; begin conservatively."
        },
        {
          "id": "a18d2-3-2",
          "name": "Back squat or trap-bar deadlift — choose one",
          "dosage": "2 × 4 squat OR 2 × 3 trap-bar deadlift @ RPE 6.5–7; 3 min rest; no maximal pull and no grinding."
        },
        {
          "id": "a18d2-3-3",
          "name": "Bench press",
          "dosage": "3 × 5 @ RPE 7–7.5; 2½–3 min rest."
        },
        {
          "id": "a18d2-3-4",
          "name": "Rear-foot-elevated split squat",
          "dosage": "1 × 5 each leg @ RPE ≤6.5; 90–120 sec rest; omit if heavy legs."
        },
        {
          "id": "a18d2-3-5",
          "name": "Chest-supported row",
          "dosage": "3 × 8 @ RPE 7; 90 sec rest."
        },
        {
          "id": "a18d2-3-6",
          "name": "Standing calf raise",
          "dosage": "2 × 8–10 @ RPE 6–7; 75–90 sec; only pain-free."
        }
      ]
    },
    {
      "name": "Fuel, AMBER/RED and stop",
      "items": [
        {
          "id": "a18d2-4-1",
          "name": "Fuel",
          "dosage": "Carbohydrate before AM; full carbohydrate/protein meal between sessions; 25–40 g protein plus carbohydrate after PM. Hydrate across the day; no intentional underfueling."
        },
        {
          "id": "a18d2-4-2",
          "name": "AMBER",
          "dosage": "Easy 30–40 min aerobic instead of sprinting if fatigued; PM upper-only bench/rows if appropriate, no lower-body strength. If symptoms from speed appear, stop entirely."
        },
        {
          "id": "a18d2-4-3",
          "name": "RED / stop",
          "dosage": "Stop speed immediately for sharp/localized pain, altered gait, loss of spring, coordination deterioration, or repeated 3–4% performance drop. Rest and arrange evaluation for persistent or worsening symptoms."
        }
      ]
    }
  ]
},
  "w18d3": {
  "purpose": "Non-impact recovery aerobic",
  "duration": "45–50 min",
  "volume": "45–50 min bike or elliptical @ RPE 2–3",
  "footwear": "Bike or elliptical shoes, no impact running surface",
  "note": "Wednesday is a recovery day after Tuesday. Do not convert it to a six-mile run just because that occurred Nov 18.",
  "blocks": [
    {
      "name": "Recovery session",
      "items": [
        {
          "id": "a18d3-1-1",
          "name": "Bike / elliptical",
          "dosage": "45–50 min @ RPE 2–3; full-sentence conversational, bike cadence generally 80–95 rpm; no hard gears, intervals or progressive finish."
        },
        {
          "id": "a18d3-1-2",
          "name": "Mobility optional",
          "dosage": "Gentle ankle rockers 8/side, calf isometric 20 sec/side, adductor rockback 6/side if comfortable; do not stretch through discomfort."
        }
      ]
    },
    {
      "name": "Fuel & alternatives",
      "items": [
        {
          "id": "a18d3-2-1",
          "name": "Fuel",
          "dosage": "Regular meals with adequate carbohydrates and protein; fluids as thirst and losses require."
        },
        {
          "id": "a18d3-2-2",
          "name": "AMBER",
          "dosage": "25–35 min very gentle cycle or full rest."
        },
        {
          "id": "a18d3-2-3",
          "name": "RED",
          "dosage": "Full rest for gait-altering symptoms or systemic illness. No make-up running."
        }
      ]
    }
  ]
},
  "w18d4": {
  "purpose": "Moderate subthreshold aerobic — no lifting",
  "duration": "~50–55 min",
  "volume": "2 × 8 min RPE 5–6 / 2 min jog; rest easy",
  "footwear": "Daily trainers on level measured path or track; avoid steep/technical terrain",
  "note": "Goal: controlled 10K/aerobic development without another hard day. Nov 17's aggressive fast-mile session does not justify progressing Thursday. Use talk test and RPE, not 5:51 mile pace.",
  "blocks": [
    {
      "name": "Before and warm-up",
      "items": [
        {
          "id": "a18d4-1-1",
          "name": "Readiness gate",
          "dosage": "Only do subthreshold if Tuesday's speed/lifting was absorbed, gait normal and no focal foot/calf/Achilles/hamstring/adductor symptoms. Heavy legs = easy instead."
        },
        {
          "id": "a18d4-1-2",
          "name": "Warm-up",
          "dosage": "15 min very easy jog then 2–3 min light dynamic mobility; no sprint strides needed."
        }
      ]
    },
    {
      "name": "Main aerobic block",
      "items": [
        {
          "id": "a18d4-2-1",
          "name": "2 × 8 min subthreshold",
          "dosage": "RPE 5–6, comfortably strong but clearly below threshold; 2 min light jog between. Start conservative, stable form/breathing, no forcing a pace."
        },
        {
          "id": "a18d4-2-2",
          "name": "Cool down",
          "dosage": "12–15 min very easy jog so total workout is ~50–55 min. No extra threshold set or hard finish."
        },
        {
          "id": "a18d4-2-3",
          "name": "Stop rule",
          "dosage": "If HR/effort drifts sharply, form changes, RPE rises above 6, or local pain develops, turn the session into easy running and stop intensity."
        }
      ]
    },
    {
      "name": "Fuel and modifications",
      "items": [
        {
          "id": "a18d4-3-1",
          "name": "Fuel",
          "dosage": "Carbohydrate-containing snack/meal before; normal carb/protein meal afterward; water as needed."
        },
        {
          "id": "a18d4-3-2",
          "name": "AMBER",
          "dosage": "One × 8 min @ RPE ≤5, or 40–45 min fully easy; no doubles or lower-body strength."
        },
        {
          "id": "a18d4-3-3",
          "name": "RED",
          "dosage": "20–40 min comfortable non-impact only if symptom-free; otherwise rest."
        }
      ]
    }
  ]
},
  "w18d5": {
  "purpose": "Upper B then easy aerobic — one window",
  "duration": "~85–105 min",
  "volume": "16 upper working sets + 35–40 min easy run OR 45–55 min easy bike",
  "footwear": "Gym footwear, then running trainers or bike shoes; flat/predictable route",
  "note": "Third lift of week. No lower-body fatigue, no doubling easy aerobic options.",
  "blocks": [
    {
      "name": "Upper B: lift first",
      "items": [
        {
          "id": "a18d5-1-1",
          "name": "DB/machine shoulder press",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rest."
        },
        {
          "id": "a18d5-1-2",
          "name": "Neutral pulldown/pull-up",
          "dosage": "3 × 8–10 @ RPE 7–8; 90 sec rest."
        },
        {
          "id": "a18d5-1-3",
          "name": "Flat DB or machine chest press",
          "dosage": "2 × 8–12 @ RPE 7; 90 sec rest."
        },
        {
          "id": "a18d5-1-4",
          "name": "Cable or supported row",
          "dosage": "2 × 10–12 @ RPE 7; 75–90 sec rest."
        },
        {
          "id": "a18d5-1-5",
          "name": "Rear-delt fly",
          "dosage": "2 × 15–20; 45–60 sec rest."
        },
        {
          "id": "a18d5-1-6",
          "name": "Curl",
          "dosage": "2 × 10–15; 60 sec, 2 reps in reserve."
        },
        {
          "id": "a18d5-1-7",
          "name": "Pressdown",
          "dosage": "2 × 10–15; 60 sec, 2 reps in reserve."
        }
      ]
    },
    {
      "name": "Aerobic immediately afterward",
      "items": [
        {
          "id": "a18d5-2-1",
          "name": "Default easy run",
          "dosage": "35–40 min @ RPE 2–3, conversational with no progression."
        },
        {
          "id": "a18d5-2-2",
          "name": "Alternative",
          "dosage": "If legs/foot/Achilles feel loaded: 45–55 min easy bike or elliptical instead. One modality only."
        }
      ]
    },
    {
      "name": "Fuel and alternatives",
      "items": [
        {
          "id": "a18d5-3-1",
          "name": "Fuel",
          "dosage": "Carb-containing meal/snack before; after: 25–40 g protein and carbohydrate; normal hydration."
        },
        {
          "id": "a18d5-3-2",
          "name": "AMBER",
          "dosage": "2 sets of big upper moves, 1 set accessories, then 20–30 min truly easy aerobic."
        },
        {
          "id": "a18d5-3-3",
          "name": "RED",
          "dosage": "Rest if ill or gait altered; do not bank missed mileage for Saturday."
        }
      ]
    }
  ]
},
  "w18d6": {
  "purpose": "Long easy run — deliberately easy, no fast finish",
  "duration": "75–80 min",
  "volume": "75–80 min RPE 2–3 only; 60–65 min amber",
  "footwear": "Comfortable trainers on flat or gently rolling, safe predictable route",
  "note": "Nov 21 11.15 mi in 82:42 at 7:25/mi HR147 was too brisk to assume easy. This week pace must be slower than fast recent long-run miles as needed to preserve genuinely easy effort. Do not increase volume.",
  "blocks": [
    {
      "name": "Before/during run",
      "items": [
        {
          "id": "a18d6-1-1",
          "name": "Readiness gate",
          "dosage": "Green if normal gait, no progressing localized pain and routine fatigue. Recent 51.43-mi week and strength/speed on Tuesday make restraint essential."
        },
        {
          "id": "a18d6-1-2",
          "name": "Warm into easy pace",
          "dosage": "First 15 min especially relaxed, RPE 2; then 60–65 min conversational RPE 2–3, no target pace."
        },
        {
          "id": "a18d6-1-3",
          "name": "No fast segments",
          "dosage": "No pickups, hills sprints, threshold, surges or fast finish. Reduce pace for hills; if HR/RPE climbs without reason, shorten."
        },
        {
          "id": "a18d6-1-4",
          "name": "Stop",
          "dosage": "Stop for focal sharp or worsening pain, gait change, dizziness or unusual exertion. Rest instead of making up minutes."
        }
      ]
    },
    {
      "name": "Fuel/hydration",
      "items": [
        {
          "id": "a18d6-2-1",
          "name": "Before",
          "dosage": "~30–60 g carbohydrate 1–2 hr before as tolerated; consider larger pre-run meal if chronically underfueled."
        },
        {
          "id": "a18d6-2-2",
          "name": "During",
          "dosage": "Water and sodium matched to conditions and sweat loss; 30–45 g carbohydrate per hour is reasonable for this duration if pre-run fueling is light."
        },
        {
          "id": "a18d6-2-3",
          "name": "After",
          "dosage": "Normal meal with 25–40 g protein, substantial carbohydrate, fluids and salt as needed."
        }
      ]
    },
    {
      "name": "Alternatives and record",
      "items": [
        {
          "id": "a18d6-3-1",
          "name": "AMBER",
          "dosage": "60–65 min easy, or 60–75 min low-impact bike if impact-sensitive; no additional running later."
        },
        {
          "id": "a18d6-3-2",
          "name": "RED",
          "dosage": "Rest if meaningful focal pain or illness."
        },
        {
          "id": "a18d6-3-3",
          "name": "Log",
          "dosage": "Actual minutes, distance, average HR, RPE, any faster miles and next-morning tissue score. Aim to avoid repeating HR147/7:25 as a purported easy day."
        }
      ]
    }
  ]
},
  "w18d7": {
  "purpose": "Complete rest and weekly review",
  "duration": "All day",
  "volume": "No workout or make-up miles",
  "footwear": "None",
  "note": "Review actual completion before moving to next B week. No assumption that scheduled training was performed.",
  "blocks": [
    {
      "name": "Rest",
      "items": [
        {
          "id": "a18d7-1-1",
          "name": "Full rest",
          "dosage": "Normal daily activity only; no running, cycling workout, strength, or sprint test."
        },
        {
          "id": "a18d7-1-2",
          "name": "Tissue review",
          "dosage": "Record foot, calf/Achilles, hamstring and adductor symptoms on a 0–10 scale and any asymmetry."
        }
      ]
    },
    {
      "name": "Data for next B-week prescription",
      "items": [
        {
          "id": "a18d7-2-1",
          "name": "Run/effort review",
          "dosage": "Confirm Tues acceleration or flying reps and RPE, Thurs subthreshold actual reps/HR, Sat easy run HR/RPE and weekly mileage."
        },
        {
          "id": "a18d7-2-2",
          "name": "Strength review",
          "dosage": "Log main lift loads, sets/reps and RPE; determine if Wednesday recovery day remained truly low impact."
        },
        {
          "id": "a18d7-2-3",
          "name": "Fuel/sleep review",
          "dosage": "Log sleep, readiness and realistic calorie estimates; missing records remain unknown."
        }
      ]
    }
  ]
}
};
