window.SESSION_PLANS = {
  w1d1: {
    purpose: "Acceleration foundation + lower-body strength",
    duration: "95–110 min",
    volume: "160 m acceleration + 80 m buildups",
    footwear: "Trainers / flats",
    note: "Completed official high-output session. Straight-bar deadlift: 455 lb × 3 × 3. No extra work and no make-up hill session.",
    source: "week1Day1Exercises"
  },
  w1d2: {
    purpose: "Easy aerobic support + tissue circulation",
    duration: "45–55 min",
    volume: "35–45 min easy",
    footwear: "Trainers",
    note: "Keep this genuinely easy with no fast finish. If a noteworthy tissue issue appears, replace the run with 25–35 min easy cycling.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Quick tissue check", dosage: "Proceed if there is no sharp, worsening, or gait-altering hamstring, calf/Achilles, foot/ankle, or adductor issue" }
        ]
      },
      {
        name: "Aerobic work",
        items: [
          { id: "easy-run", name: "Easy run", dosage: "35–45 min at conversational effort / RPE 2–3 on flat or gently rolling terrain" }
        ]
      },
      {
        name: "Light maintenance",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 10 each side" },
          { id: "calf-iso", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 8 each side" }
        ]
      }
    ]
  },
  w1d3: {
    purpose: "Extensive tempo / relaxed rhythm",
    duration: "40–55 min",
    volume: "800–1,000 m tempo total or equivalent",
    footwear: "Trainers",
    note: "Keep the work smooth enough to protect Thursday. The exact rep structure can be refined after Tuesday's response.",
    blocks: [
      {
        name: "Preparation",
        items: [
          { id: "warmup", name: "Simple warm-up", dosage: "8–10 min easy movement plus only the mobility needed to feel loose" }
        ]
      },
      {
        name: "Tempo",
        items: [
          { id: "tempo", name: "Extensive tempo", dosage: "800–1,000 m total at relaxed, repeatable rhythm; do not chase pace" }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy cooldown", dosage: "5–10 min walk or easy jog" }
        ]
      }
    ]
  },
  w1d4: {
    purpose: "Controlled sprint rhythm",
    duration: "55–70 min",
    volume: "Provisional: 5 × 100 m at ~75–80%",
    footwear: "Trainers",
    note: "Provisional only. The final sprint dose must be confirmed after the next-morning tissue response; do not treat this card as clearance for high-output work.",
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
        name: "Provisional main set",
        items: [
          { id: "hundreds", name: "Controlled 100s", dosage: "Planned 5 × 100 m at ~75–80% velocity with 3–4 min recovery" }
        ]
      }
    ]
  },
  w1d5: {
    purpose: "Recovery and absorption",
    duration: "0–35 min",
    volume: "No required running",
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
    purpose: "Longer easy aerobic support",
    duration: "45–70 min",
    volume: "45–55 min easy",
    footwear: "Trainers",
    note: "Optional upper-body accessories are allowed only if the legs and trunk are quiet. Do not add lower-body volume.",
    blocks: [
      {
        name: "Aerobic work",
        items: [
          { id: "easy-run", name: "Easy run", dosage: "45–55 min conversational / RPE 2–3" }
        ]
      },
      {
        name: "Optional upper body",
        items: [
          { id: "upper", name: "Upper-body accessories", dosage: "Optional, moderate volume, and stop well short of systemic fatigue" }
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