(() => {
  "use strict";

  window.SESSION_PLANS = window.SESSION_PLANS || {};

  window.SESSION_PLANS.w1d4 = {
    purpose: "Controlled sprint rhythm + Upper B",
    duration: "90–110 min total; split preferred",
    volume: "5 × 100 m / 500 m controlled sprinting + 16 low-pogo contacts + 10 upper-body working sets",
    footwear: "Trainers on a dry, predictable track surface",
    note: "Provisionally green after Wednesday's 800 m extensive-tempo session was completed without a noteworthy tissue response. Final green / amber / red classification still requires Thursday morning readiness. The technical objective is less pushing and more relaxed, quick rhythm: sprint-shaped, not sprint-forced.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "morning-readiness", name: "Morning check", dosage: "Normal gait; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no sharp, localized or worsening issue" },
          { id: "warmup-readiness", name: "Warm-up response", dosage: "Proceed only if stiffness stays stable or improves and movement becomes more coordinated rather than more protective" }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "5 minutes, beginning very easy" },
          { id: "forward-skip", name: "Forward skip", dosage: "1 × 20 m, relaxed" },
          { id: "lateral-shuffle", name: "Lateral shuffle", dosage: "1 × 15 m each direction" },
          { id: "backward-run", name: "Relaxed backward run", dosage: "1 × 20 m" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side; controlled range" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side; tall trunk" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side; firm but comfortable" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and foot placement without reaching." },
          { id: "ankle-dribble-walk", name: "Regressed ankle dribble", dosage: "1 × 20 m at walk-to-slow-jog speed. Cue: Small circle, step down. Purpose: learn a quick recovery and under-hip contact without forcing the ground." }
        ]
      },
      {
        name: "Elastic primer — green only",
        items: [
          { id: "low-pogo", name: "Low ankle pogo", dosage: "2 × 8 contacts; 45–60 sec rest. Cue: Quiet and quick, not high. Stop if contacts become loud, slow or asymmetric." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60% velocity; walk back" },
          { id: "buildup-70", name: "Buildup 2", dosage: "1 × 60 m at approximately 70% velocity; 90 sec rest" },
          { id: "buildup-78", name: "Buildup 3", dosage: "1 × 60 m at approximately 75–80% velocity; 2 min before the main set" }
        ]
      },
      {
        name: "Controlled sprint rhythm",
        items: [
          { id: "hundreds", name: "5 × 100 m", dosage: "Approximately 75–80% of current velocity; 4 min recovery after every rep. Build 20 m, float 60 m, hold 20 m. Do not time this session." },
          { id: "technical-cue", name: "Primary cue", dosage: "Float—do not press. Firm, quick contacts under the hips; no stomping or deliberate extra force." },
          { id: "stop-rules", name: "Stop rules", dosage: "End at 3–4 reps if two consecutive reps become louder, more forceful, reaching or mechanically worse despite full recovery; stop immediately for localized worsening discomfort or gait change." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; finish relaxed" }
        ]
      },
      {
        name: "Upper B — secondary upper",
        items: [
          { id: "incline-db-press", name: "Incline dumbbell press", dosage: "3 × 6–8 at RPE 7; 2 min rest" },
          { id: "chest-supported-row", name: "Cable or chest-supported row", dosage: "3 × 8–10 at RPE 7–8; 90–120 sec rest" },
          { id: "landmine-press", name: "Landmine or machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
          { id: "rear-delt-fly", name: "Rear-delt fly", dosage: "2 × 15–20 at RPE 8; 60 sec rest" }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Omit pogos; perform 3 × 100 m at approximately 75% with 4–5 min recovery. If general fatigue is present, reduce Upper B to 2 sets for each press and row and omit rear delts." },
          { id: "red", name: "Red alternative", dosage: "No sprinting or plyometrics. Full rest, or 25–35 min very easy cycling only when it does not provoke the issue. Upper B only when the red flag is isolated to the lower body and systemic readiness is otherwise normal." }
        ]
      }
    ]
  };

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const week1 = plans.find((plan) => plan.week === 1);
  if (week1 && Array.isArray(week1.days) && week1.days[3]) {
    Object.assign(week1.days[3], {
      title: "Controlled sprint rhythm + Upper B",
      detail: "Exact session is loaded. Five relaxed 100s are planned; Thursday morning readiness determines green, amber or red execution.",
      volume: "Running: 5 × 100 m / 500 m · Primer: 2 × 8 low pogos · Lifting: 10 Upper B sets"
    });
  }
})();