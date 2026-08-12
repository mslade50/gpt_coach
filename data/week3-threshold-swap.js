(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days.length >= 7) {
    week3.statusNote = "Week 3 adjustment: Wednesday extensive tempo is replaced by one controlled 3-2 float threshold-maintenance session at the athlete's request. Thursday becomes recovery plus elbow-modified Upper B. The introductory 150 m session moves to Friday at a reduced two-repetition dose, preserving 48 hours after threshold and approximately 72 hours before Monday's Week 4 benchmark.";

    Object.assign(week3.days[2], {
      title: "Controlled 3-2 float threshold replacement",
      detail: "This replaces the planned 1,200 m extensive tempo; it is not additional work. Keep the session controlled enough that the fourth round matches the first.",
      volume: "4 × (3:00 controlled threshold / 2:00 float), continuous; no lifting"
    });

    Object.assign(week3.days[3], {
      type: "Recovery",
      title: "Recovery + elbow-modified Upper B",
      detail: "No running, sprinting or jumping. Use Thursday to absorb Wednesday and complete only pain-free neutral-grip pressing/rear-delt work.",
      volume: "No running; 7 elbow-tolerant upper-body sets only if medial-elbow response is stable"
    });

    Object.assign(week3.days[4], {
      type: "High",
      title: "Reduced introductory 150 m speed endurance",
      detail: "The high-output track exposure moves from Thursday to Friday. Two controlled 150s preserve the phase purpose without compromising Monday's benchmark.",
      volume: "2 × 150 m at approximately 85–88%; 8–10 min recovery; no lifting or jumps"
    });

    Object.assign(week3.days[5], {
      title: "Reduced longer easy aerobic support",
      detail: "Because Friday is now the second high day, keep Saturday shorter and strictly conversational. No optional arm work.",
      volume: "35–45 min easy; 45-min hard cap; no lifting"
    });
  }

  sessions.w3d3 = {
    purpose: "Controlled 3-2 float threshold-maintenance replacement",
    duration: "45–55 min",
    volume: "4 × (3:00 controlled threshold / 2:00 float), continuous",
    footwear: "Trainers on a flat, predictable road, path or track",
    note: "This replaces the planned 2 × 6 × 100 m extensive-tempo session. Do not add the 100s afterward. This is an early, deliberately capped threshold-maintenance exposure, not a return to a full endurance-workout load. The objective is controlled aerobic pressure while preserving Friday sprint quality.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "lower-body-readiness", name: "Lower-body check", dosage: "Normal gait; no sharp, localized, worsening or one-sided hamstring, calf/Achilles, foot/ankle or adductor/hip issue. Any return of focal left calf/shin symptoms changes the day to easy running only." },
          { id: "elbow-readiness", name: "Medial-elbow check", dosage: "Ordinary arm swing is comfortable; soreness is 0–2/10 and not increasing; no ring/pinky numbness, tingling or weakness." }
        ]
      },
      {
        name: "Warm-up",
        items: [
          { id: "easy-jog", name: "Easy running", dosage: "10 minutes total; first 5 minutes extremely easy, then settle into normal easy rhythm" },
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side; heel stays down" },
          { id: "leg-swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg; pelvis stays quiet" },
          { id: "pickup-1", name: "Controlled pickup 1", dosage: "30 sec at the intended 3-minute-segment rhythm, then 60 sec easy jog" },
          { id: "pickup-2", name: "Controlled pickup 2", dosage: "30 sec at the intended 3-minute-segment rhythm, then 90 sec easy jog before the main set" }
        ]
      },
      {
        name: "3-2 float main set",
        items: [
          { id: "float-set", name: "4 continuous rounds", dosage: "3:00 at controlled threshold / RPE 6–7, then 2:00 float at steady aerobic RPE 4–5. The float is slower but remains running; do not surge into the 3-minute segments or race the final round." },
          { id: "threshold-cue", name: "Primary cue", dosage: "Control the 3; float the 2. Smooth pressure, no heroics." },
          { id: "threshold-stop", name: "Stop rules", dosage: "Stop after 3 rounds if the fourth would require RPE 8+, pace falls materially at the same effort, breathing becomes ragged, mechanics tighten, or any localized lower-body or elbow symptom increases." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "10 minutes total; finish feeling composed rather than emptied" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "Normal carbohydrate-containing pre-run meal or snack, fluid and sodium according to conditions. Do not add caffeine beyond the normal routine." },
          { id: "post-fuel", name: "After", dosage: "25–40 g protein plus a substantial carbohydrate serving and normal fluid/sodium replacement." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "3 rounds only, keeping the 3-minute segments at RPE 6 and the floats clearly controlled; no lifting." },
          { id: "red", name: "Red alternative", dosage: "No threshold. Full rest or 30–40 min genuinely easy running/cycling only when symptom-free." }
        ]
      }
    ]
  };

  sessions.w3d4 = {
    purpose: "Recovery + elbow-modified Upper B",
    duration: "0–50 min",
    volume: "No running; up to 7 pain-free upper-body sets",
    footwear: "Not applicable unless walking",
    note: "Thursday is no longer a sprint day because Wednesday became a threshold-maintenance session. Full rest is acceptable. Complete Upper B only when medial-elbow soreness is stable at 0–2/10, no nerve symptoms are present and light warm-up sets do not increase the sensation.",
    blocks: [
      {
        name: "Recovery",
        items: [
          { id: "rest", name: "Full rest", dosage: "Preferred when the legs feel normal and no active recovery is needed" },
          { id: "walk", name: "Optional easy walk", dosage: "15–30 min at a relaxed pace only when it improves how you feel" }
        ]
      },
      {
        name: "Upper B — elbow-modified, pain-free only",
        items: [
          { id: "machine-chest-press", name: "Neutral-grip machine chest press or light incline dumbbell press", dosage: "3 × 6–8 at RPE 6–7; 2 min rest. Keep wrists neutral and grip only as hard as needed. Stop if medial-elbow soreness increases." },
          { id: "machine-shoulder-press", name: "Neutral-grip machine shoulder press", dosage: "2 × 8–10 at RPE 6–7; 90 sec rest. Omit if gripping or pressing changes the elbow sensation." },
          { id: "rear-delt", name: "Supported rear-delt fly", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest. Light grip, no swinging." }
        ]
      },
      {
        name: "Restrictions",
        items: [
          { id: "no-pull", name: "No elbow-aggravating work", dosage: "No rows, weighted pull-ups, curls, pressdowns, heavy gripping, sprinting, jumping or lower-body lifting." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Recovery only; omit all lifting when elbow soreness is more noticeable than baseline or a warm-up set changes it." },
          { id: "red", name: "Red alternative", dosage: "Full rest and seek assessment for worsening pain, weakness, numbness/tingling, swelling or altered arm use." }
        ]
      }
    ]
  };

  sessions.w3d5 = {
    purpose: "Reduced introductory 150 m speed endurance",
    duration: "55–70 min",
    volume: "2 × 150 m / 300 m intensive running",
    footwear: "Trainers on a dry, predictable track surface",
    note: "This is the week's second high-output exposure, moved from Thursday to Friday after Wednesday's threshold replacement. Two repetitions preserve the speed-endurance teaching objective while maintaining approximately 72 hours before Monday's Week 4 benchmark. Do not add a third rep.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; threshold-related heaviness resolved; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal left calf/shin awareness" },
          { id: "warmup-gate", name: "Warm-up response", dosage: "Proceed only when movement becomes springier and more coordinated without increasing localized symptoms" }
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
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" },
          { id: "walking-lunge-reach", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: connect upright posture to relaxed rhythm." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "buildup-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60% velocity; walk back" },
          { id: "buildup-75", name: "Buildup 2", dosage: "1 × 60 m at approximately 75% velocity; 90 sec rest" },
          { id: "buildup-85", name: "Buildup 3", dosage: "1 × 80 m at approximately 85% velocity; 2–3 min rest" }
        ]
      },
      {
        name: "Introductory 150 m speed endurance",
        items: [
          { id: "one-fifties", name: "2 × 150 m", dosage: "Approximately 85–88% velocity; 8–10 min recovery. Build 30 m, float 90 m, hold 30 m. Do not time as a benchmark." },
          { id: "cue", name: "Primary cue", dosage: "Float fast—do not press. Carry rhythm through the final 30 m rather than chasing the line." },
          { id: "stop", name: "Stop rule", dosage: "Stop after one rep if threshold fatigue remains, left calf/shin awareness appears, mechanics become louder/reachier/tighter or any localized discomfort increases. Stop immediately for pain, focal tenderness or gait change." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; finish relaxed" }
        ]
      },
      {
        name: "No added work",
        items: [
          { id: "no-lift", name: "No lifting or jumps", dosage: "Thursday contains the week's Upper B work. Friday is track only so Monday's benchmark remains protected." }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate shortly before." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein, substantial carbohydrate and normal fluid/sodium replacement." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "One 150 m at approximately 83–85% only when the warm-up becomes fully normal; otherwise no intensive running." },
          { id: "red", name: "Red alternative", dosage: "No sprinting. Full rest or 25–35 min very easy cycling only when symptom-free." }
        ]
      }
    ]
  };

  sessions.w3d6 = {
    purpose: "Reduced longer easy aerobic support",
    duration: "35–45 min",
    volume: "35–45 min easy; 45-min hard cap",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "Friday is now the high-output day. Saturday is reduced so Sunday rest and Monday's benchmark can restore full sprint quality. No optional arm work this week.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "First-steps check", dosage: "Normal gait and no localized or worsening lower-body response after Friday" }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "opening", name: "Gradual opening", dosage: "First 10 minutes extremely easy" },
          { id: "easy-run", name: "Easy run", dosage: "35–45 min total, 45-min hard cap; conversational / RPE 2–3; full sentences effortless; no hills, cadence target or fast finish" },
          { id: "cue", name: "Only form cue", dosage: "Relax and let the stride happen." }
        ]
      },
      {
        name: "No added work",
        items: [
          { id: "no-arms", name: "No lifting", dosage: "No curls, pressdowns, pulling or optional Upper C while medial-elbow soreness is being monitored." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "25–35 min easy or symptom-free very easy cycling." },
          { id: "red", name: "Red alternative", dosage: "Full rest for localized, worsening, sharp or gait-altering symptoms." }
        ]
      }
    ]
  };
})();