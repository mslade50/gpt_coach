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
  }
};