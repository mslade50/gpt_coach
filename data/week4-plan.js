(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  window.SESSION_PLANS = window.SESSION_PLANS || {};
  const sessions = window.SESSION_PLANS;

  // Week 3 closeout — review completed August 16, 2026.
  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days.length >= 7) {
    week3.focus = "Week 3 complete: acceleration and flying distance progressed, one controlled threshold-maintenance exposure replaced extensive tempo, the second high day moved to Friday, and lower-body tissues remained green.";
    week3.statusNote = "Review completed Aug 16. Monday's 30 m accelerations and flying 20s were completed, Tuesday remained genuinely easy, Wednesday's 3-2 float replacement was controlled at effort 6, Thursday's elbow-modified Upper B caused no serious issue, and Friday/Saturday were completed as prescribed. Mild delayed medial-elbow soreness remains an exercise-specific monitor, but no persistent lower-body issue was reported. Progress to Week 4 benchmark testing in trainers; spikes remain deferred. Exact Saturday duration and current body-weight trend were not reported, so no nutrition adjustment is made.";

    [0, 1, 2, 3, 4, 5].forEach((index) => {
      if (week3.days[index]) week3.days[index].status = "Completed";
    });
    if (week3.days[6]) {
      week3.days[6].status = "Locked";
      week3.days[6].detail = "Non-negotiable full rest. Week 3 review is complete and the detailed Week 4 benchmark plan is published.";
    }
  }

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (!week4 || !Array.isArray(week4.days) || week4.days.length < 7) return;

  week4.title = "First formal performance profile";
  week4.focus = "Reduce volume, establish the first usable jump/acceleration/maximum-velocity/speed-endurance profile, and use the results to build Weeks 5–8 target bands.";
  week4.statusNote = "Detailed Week 4 sessions published Aug 16. Monday and Thursday are formal benchmark days only when readiness and conditions are green. Use trainers; spikes remain deferred because no prior spike exposure was completed. Standardize phone-video or hand timing and record start type, surface, footwear, weather and wind. Lower-body lifting and upper-body volume are deliberately reduced, and grip-intensive pulling/direct arm work remains omitted while the medial elbows settle.";

  const week4Days = [
    {
      day: "Mon",
      type: "High",
      status: "Planned",
      title: "Benchmark: CMJ, broad jump, 30 m and flying 20 + reduced Full Body A",
      detail: "First formal profile. Full recovery, standardized timing, trainers and no extra sprint volume after testing.",
      volume: "CMJ best of 3; broad jump best of 3; 2–3 × timed 30 m; 2–3 × timed flying 20 m; 6 reduced strength sets"
    },
    {
      day: "Tue",
      type: "Low",
      status: "Planned",
      title: "Reduced easy aerobic support + tissue check",
      detail: "Absorb Monday testing and report the next-morning lower-body response. No lifting.",
      volume: "30–35 min easy, 40-min cap + 5–7 min tissue maintenance"
    },
    {
      day: "Wed",
      type: "Low–moderate",
      status: "Planned",
      title: "Reduced relaxed tempo",
      detail: "Light rhythm only. Thursday's 150 m benchmark must begin fresh.",
      volume: "2 × 3 × 100 m / 600 m total at approximately 65–70%"
    },
    {
      day: "Thu",
      type: "High",
      status: "Planned",
      title: "Benchmark: one timed 150 m + reduced Upper B",
      detail: "One strong technically committed effort with standardized timing. No second 150 m.",
      volume: "1 × timed 150 m + optional 1–2 × 80 m relaxed when green; 6 elbow-tolerant upper sets"
    },
    {
      day: "Fri",
      type: "Recovery",
      status: "Planned",
      title: "Recovery and absorption",
      detail: "No conditioning. Let the benchmark response settle.",
      volume: "No required running or lifting"
    },
    {
      day: "Sat",
      type: "Low",
      status: "Planned",
      title: "Reduced easy aerobic support",
      detail: "Conversational running only. No optional arm work during the benchmark/elbow unload week.",
      volume: "40 min target, 45-min cap; no lifting"
    },
    {
      day: "Sun",
      type: "Recovery",
      status: "Locked",
      title: "Full rest + Week 4 profile review",
      detail: "Update jump, acceleration, maximum-velocity, speed-endurance and tissue profiles; establish Weeks 5–8 target bands.",
      volume: "No training"
    }
  ];
  week4Days.forEach((day, index) => Object.assign(week4.days[index], day));

  sessions.w4d1 = {
    purpose: "First formal profile: jumps, 30 m, flying 20 + reduced Full Body A",
    duration: "110–140 min total; split track and strength by several hours when possible",
    volume: "CMJ best of 3; broad jump best of 3; 2–3 timed 30 m; 2–3 timed flying 20 m; 6 reduced strength sets",
    footwear: "Trainers on a dry, firm, predictable track; same shoes for every timed attempt",
    note: "This is a profile, not a fatigue session. Monday is formal only when readiness, surface and weather are green. Standardize distance marks, start method, camera placement/frame rate and timing method. No spikes: sprint intensity and footwear load will not rise together. Record every valid result, conditions and one technical observation. A third sprint attempt is optional, not automatic.",
    blocks: [
      {
        name: "Readiness and conditions gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; sleep/general readiness acceptable; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal left calf/shin issue; medial elbows stable at 0–2/10 without numbness, tingling or weakness." },
          { id: "conditions", name: "Benchmark conditions", dosage: "Dry predictable track, no unsafe surface and no strong/gusting wind. Use visible measured marks, a stable tripod and the same timing method for all attempts. Poor conditions convert the session to technical work rather than producing a false benchmark." }
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
          { id: "leg-swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg; pelvis stays quiet" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side; firm but comfortable" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip. Purpose: organize posture and contact position without reaching." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward. Purpose: add relaxed elastic rhythm without introducing a difficult coordination task." }
        ]
      },
      {
        name: "Jump profile",
        items: [
          { id: "pogo-primer", name: "Low ankle pogo primer", dosage: "1 × 8 contacts. Quiet and quick; stop for pain, asymmetry or slow/loud contacts." },
          { id: "cmj", name: "Countermovement jump — best of 3", dosage: "Hands on hips; three maximal but clean attempts; 45–60 sec rest. Record side-on at 120–240 fps with the feet fully visible. Use flight-time/app measurement and keep the same method for future benchmarks." },
          { id: "broad-jump", name: "Standing broad jump — best of 3", dosage: "Arms free; start toes behind a measured line; stick the landing; 75–90 sec rest. Measure to the nearest heel. An unstable step-out is invalid." },
          { id: "jump-stop", name: "Jump stop rule", dosage: "End testing for pain, asymmetry, unstable landings or approximately 5% output loss. Testing replaces developmental jump volume." }
        ]
      },
      {
        name: "Progressive buildups",
        items: [
          { id: "build-60", name: "Buildup 1", dosage: "1 × 40 m at approximately 60%; walk back" },
          { id: "build-75", name: "Buildup 2", dosage: "1 × 50 m at approximately 75%; 90 sec rest" },
          { id: "build-85", name: "Buildup 3", dosage: "1 × 60 m at approximately 85%; 2 min rest" },
          { id: "build-92", name: "Buildup 4", dosage: "1 × 60 m at approximately 90–92%; 3 min before the first 30 m attempt" }
        ]
      },
      {
        name: "30 m acceleration benchmark",
        items: [
          { id: "thirty-setup", name: "Standardized setup", dosage: "Preferred two-point start with the same lead leg every attempt. Phone/video option: 120–240 fps, fixed side-on view with start and finish marks visible; time first visible movement to torso crossing 30 m. Hand timing is acceptable only when the same timer/method is recorded." },
          { id: "thirties", name: "2 timed 30 m attempts + optional third", dosage: "Full 5 min recovery. Attempt 3 only when the first two are within approximately 3%, mechanics remain sharp and all tissues are green. Primary cue: Push back and rise gradually." },
          { id: "thirty-stop", name: "Acceleration stop rule", dosage: "No third attempt when performance drops approximately 3–4%, projection/first-step quality declines, you repeatedly pop upright, or localized discomfort increases." }
        ]
      },
      {
        name: "Flying 20 m benchmark",
        items: [
          { id: "fly-setup", name: "Standardized setup", dosage: "30 m progressive buildup + 20 m timed zone + at least 40 m gradual deceleration. Place the phone side-on near the middle of the fly zone with both gate marks visible; time torso crossing entry to torso crossing exit." },
          { id: "flying-twenties", name: "2 timed flying 20 m attempts + optional third", dosage: "Full 6 min recovery. Attempt 3 only when the first two are within approximately 3%, relaxation remains intact and tissues are green. Primary cue: Tall and down." },
          { id: "fly-stop", name: "Maximum-velocity stop rule", dosage: "End when performance deteriorates about 3%, contacts become louder/longer, you reach or strain, posture/relaxation worsens, or localized discomfort increases." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "6–10 minutes; no extra strides or conditioning" }
        ]
      },
      {
        name: "Reduced Full Body A — later",
        items: [
          { id: "deadlift", name: "Straight-bar deadlift", dosage: "435 lb × 3 × 2 at RPE 7–7.5; 3 min rest. Use straps if they reduce medial-elbow/forearm loading. Stop after one set if benchmark fatigue makes bar speed meaningfully slow." },
          { id: "bench", name: "Barbell bench press", dosage: "245 lb × 5 × 2 at RPE 7; 2½–3 min rest. Use a neutral-wrist setup and stop/change variation if medial-elbow soreness increases." },
          { id: "rfess", name: "Rear-foot-elevated split squat", dosage: "1 × 4 each leg at RPE 7; controlled and non-grindy" },
          { id: "calf", name: "Standing calf raise", dosage: "1 × 6 at RPE 7; omit for any calf/Achilles/shin awareness" }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, low-to-moderate fat/fibre, fluid and sodium. Optional 20–40 g easy carbohydrate shortly before." },
          { id: "intra-fuel", name: "During", dosage: "Water/electrolytes. Add 30–60 g carbohydrate per hour when track and strength are combined or total duration is prolonged/hot." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein plus substantial carbohydrate, fluid/sodium replacement and a normal complete meal." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Do not force a formal profile. Use 2 jump attempts each, 2 × 30 m at about 90–92% and at most 1–2 flying 20s at about 90% only if the warm-up normalizes. Treat all times as non-benchmark. Reduce strength to one deadlift set and one bench set; omit RFESS/calf." },
          { id: "red", name: "Red alternative", dosage: "No sprinting, jumping or lower-body lifting. Full rest or 25–35 min very easy cycling only when symptom-free. Pain-free upper pressing is optional only when the red flag is isolated to the lower body and systemic readiness is normal." }
        ]
      }
    ]
  };

  sessions.w4d2 = {
    purpose: "Reduced easy aerobic support + next-morning benchmark check",
    duration: "38–50 min",
    volume: "30–35 min easy, 40-min cap + 5–7 min tissue maintenance",
    footwear: "Trainers on flat or gently rolling predictable terrain",
    note: "The first 8–10 minutes are the warm-up. Report Monday's jump/sprint results and any next-morning hamstring, calf/Achilles, foot/ankle, adductor/hip or elbow response. No lifting and no fast finish.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "First-steps check", dosage: "Normal gait; no sharp, localized, worsening or one-sided response after benchmark testing." }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "opening", name: "Gradual opening", dosage: "2 min brisk walk or shuffle, then 8 min extremely easy running" },
          { id: "easy-run", name: "Easy run", dosage: "Continue to 30–35 min total; 40-min hard cap; conversational / RPE 2–3; no hills, strides, cadence target or fast finish." }
        ]
      },
      {
        name: "Tissue maintenance",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "calf-iso", name: "Straight-knee calf isometric", dosage: "1 × 20 sec each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "20–30 min easy or 25–35 min very easy cycling when generalized soreness is greater than expected but gait is normal." },
          { id: "red", name: "Red alternative", dosage: "Full rest for sharp, localized, worsening or gait-altering symptoms." }
        ]
      }
    ]
  };

  sessions.w4d3 = {
    purpose: "Reduced relaxed tempo before the 150 m benchmark",
    duration: "40–52 min",
    volume: "2 × 3 × 100 m / 600 m total",
    footwear: "Trainers on a forgiving track surface or predictable flat grass",
    note: "This is a rhythm touch, not conditioning. Keep pace and contacts relaxed enough that Thursday feels sharper, not flatter. No lifting.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "walk-jog-check", name: "Walk and easy-jog check", dosage: "Normal gait and Monday benchmark soreness stable or improving; no localized lower-body issue." }
        ]
      },
      {
        name: "Raise temperature",
        items: [
          { id: "easy-jog", name: "Easy jog", dosage: "6 minutes, beginning very easy" }
        ]
      },
      {
        name: "Mobility / activation",
        items: [
          { id: "ankle-rocker", name: "Ankle rocker", dosage: "1 × 8 each side" },
          { id: "adductor-rockback", name: "Adductor rock-back", dosage: "1 × 6 each side" },
          { id: "walking-lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
          { id: "leg-swing", name: "Leg swing — front to back", dosage: "1 × 8 each leg" }
        ]
      },
      {
        name: "Technical preparation",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward." },
          { id: "build-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
          { id: "build-70", name: "Buildup 2", dosage: "1 × 60 m at approximately 70%; 60–90 sec rest" }
        ]
      },
      {
        name: "Relaxed tempo",
        items: [
          { id: "set-1", name: "Set 1", dosage: "3 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "set-rest", name: "Set recovery", dosage: "3 minutes walking/standing" },
          { id: "set-2", name: "Set 2", dosage: "3 × 100 m at approximately 65–70% velocity; 60–75 sec between reps" },
          { id: "cue", name: "Primary cue", dosage: "Float and stay quiet. No pace chase." },
          { id: "stop", name: "Stop rule", dosage: "Stop or reduce if contacts get louder, you press/reach, stride becomes asymmetric, or soreness increases/localizes." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "5–8 minutes; no added mileage" }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "4 × 100 m total at approximately 65%, relaxed, or 25–35 min very easy cycling." },
          { id: "red", name: "Red alternative", dosage: "No tempo. Full rest or symptom-free easy non-impact work." }
        ]
      }
    ]
  };

  sessions.w4d4 = {
    purpose: "Timed 150 m benchmark + reduced elbow-tolerant Upper B",
    duration: "80–105 min total; split preferred",
    volume: "1 timed 150 m + optional 1–2 × 80 m relaxed + 6 upper-body sets",
    footwear: "Trainers on a dry, predictable track; same lane/surface and timing method recorded",
    note: "One strong technically committed 150 m establishes the initial speed-endurance profile. There is no target time and no second 150 m. Use electronic/high-frame-rate timing when available; otherwise use the same helper and hand-timing method and label the result accordingly. The result is interpreted with surface, curve, wind, footwear and timing method—not as false precision.",
    blocks: [
      {
        name: "Readiness and conditions gate",
        items: [
          { id: "readiness", name: "Morning readiness", dosage: "Normal gait; Monday testing fully settled; hamstring, calf/Achilles, foot/ankle and adductor/hip approximately 0–1/10; no focal left calf/shin issue; no threshold-related heaviness." },
          { id: "conditions", name: "Benchmark conditions", dosage: "Dry predictable track, safe lane, measured 150 m and recorded wind/weather. Poor conditions postpone or make the result non-comparable rather than forcing a benchmark." },
          { id: "elbow", name: "Medial-elbow readiness", dosage: "Normal arm swing; soreness stable at 0–2/10 without weakness, numbness or tingling. Upper B requires pain-free light warm-up sets." }
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
          { id: "walking-lunge", name: "Walking lunge + overhead reach", dosage: "1 × 5 each side" },
          { id: "soleus-iso", name: "Bent-knee soleus isometric", dosage: "1 × 20 sec each side" }
        ]
      },
      {
        name: "Sprint drills",
        items: [
          { id: "a-march", name: "A-march", dosage: "1 × 20 m. Cue: Tall, step down under the hip." },
          { id: "a-skip", name: "A-skip", dosage: "1 × 20 m. Cue: Bounce down, not forward." }
        ]
      },
      {
        name: "Primer and buildups",
        items: [
          { id: "pogo", name: "Low ankle pogo", dosage: "1 × 8 contacts, green only; quiet and quick" },
          { id: "build-60", name: "Buildup 1", dosage: "1 × 60 m at approximately 60%; walk back" },
          { id: "build-75", name: "Buildup 2", dosage: "1 × 60 m at approximately 75%; 90 sec rest" },
          { id: "build-85", name: "Buildup 3", dosage: "1 × 80 m at approximately 85%; 2 min rest" },
          { id: "build-92", name: "Buildup 4", dosage: "1 × 80 m at approximately 90–92%; 4 min before the benchmark" }
        ]
      },
      {
        name: "150 m benchmark",
        items: [
          { id: "timing", name: "Timing method", dosage: "Preferred: electronic or high-frame-rate video. Practical fallback: one consistent helper starts the watch on first movement and stops when the torso crosses the finish; record it as hand-timed. Use the same start type and lane for future comparisons." },
          { id: "one-fifty", name: "1 × timed 150 m", dosage: "Two-point standing start. Run the fastest strong technical effort you can execute without abandoning posture or rhythm. Build through the opening, carry speed and stay organized through the final 30–40 m. No target-time chase and no second attempt." },
          { id: "cue", name: "Primary cue", dosage: "Commit, then carry. Fast and technically honest—not a cautious training rep and not a desperate finish." },
          { id: "stop", name: "Stop rule", dosage: "Abort during the buildup for localized pain, focal lower-leg awareness, clear asymmetry or mechanics that cannot normalize. After a valid 150 m, the benchmark is complete regardless of the time." }
        ]
      },
      {
        name: "Optional post-benchmark rhythm — green only",
        items: [
          { id: "relaxed-80", name: "1–2 × 80 m relaxed", dosage: "After 10–12 min recovery, approximately 65–70%, walk-back/full recovery. Perform one only by default; the second requires completely normal tissues and effortless rhythm. Omit without penalty." }
        ]
      },
      {
        name: "Cooldown",
        items: [
          { id: "cooldown", name: "Easy jog-to-walk", dosage: "8–10 minutes; finish composed" }
        ]
      },
      {
        name: "Reduced Upper B — pain-free only",
        items: [
          { id: "machine-chest", name: "Neutral-grip machine chest press or light incline dumbbell press", dosage: "2 × 6–8 at RPE 7; 2 min rest. Stop/change variation if medial-elbow soreness increases." },
          { id: "machine-shoulder", name: "Neutral-grip machine shoulder press", dosage: "2 × 8–10 at RPE 7; 90 sec rest" },
          { id: "rear-delt", name: "Supported rear-delt fly", dosage: "2 × 15–20 at RPE 7–8; 60 sec rest. Light grip, no swinging." }
        ]
      },
      {
        name: "Restrictions",
        items: [
          { id: "no-pull", name: "No grip-intensive pulling or direct arms", dosage: "No weighted pull-ups, rows, curls or pressdowns this week. Re-entry is decided after the benchmark-week delayed elbow response." }
        ]
      },
      {
        name: "Fueling",
        items: [
          { id: "pre-fuel", name: "Pre-session", dosage: "2–3 hr before: carbohydrate-rich meal with 25–35 g protein, fluid and sodium; optional 20–40 g easy carbohydrate shortly before." },
          { id: "post-fuel", name: "After", dosage: "30–40 g protein, substantial carbohydrate and normal fluid/sodium replacement." }
        ]
      },
      {
        name: "Readiness alternatives",
        items: [
          { id: "amber", name: "Amber modification", dosage: "Do not record a formal 150 m. Perform 1 × 120 m at approximately 85–90% only if the warm-up becomes fully normal, then stop. Elbow amber: track only and omit Upper B." },
          { id: "red", name: "Red alternative", dosage: "No sprinting or jumping for a lower-body red flag. No upper lifting for worsening medial-elbow pain, weakness, numbness/tingling, swelling or altered arm use. Full rest or symptom-free very easy cycling as appropriate." }
        ]
      }
    ]
  };

  sessions.w4d5 = {
    purpose: "Recovery and absorption",
    duration: "0–35 min",
    volume: "No required running or lifting",
    footwear: "Everyday shoes or cycling shoes",
    note: "Friday is not an opportunity to test fitness again. Full rest is preferred. Optional easy walking or very easy cycling is allowed only when it improves recovery from the 150 m benchmark.",
    blocks: [
      {
        name: "Recovery options",
        items: [
          { id: "rest", name: "Full rest", dosage: "Preferred when you feel normal" },
          { id: "walk", name: "Easy walk", dosage: "Optional 15–30 min at a relaxed pace" },
          { id: "cycle", name: "Very easy cycle", dosage: "Optional 20–30 min at RPE 1–2, light resistance, only when it leaves the legs looser" }
        ]
      }
    ]
  };

  sessions.w4d6 = {
    purpose: "Reduced easy aerobic support",
    duration: "40–50 min",
    volume: "40 min easy target, 45-min hard cap; no lifting",
    footwear: "Trainers on flat or gently rolling terrain",
    note: "Keep the run genuinely conversational and let the stride happen. Benchmark week remains reduced. No optional arm work while the medial-elbow response is being clarified.",
    blocks: [
      {
        name: "Readiness gate",
        items: [
          { id: "gait-check", name: "First-steps check", dosage: "Normal gait; no localized or worsening lower-body response after Thursday" }
        ]
      },
      {
        name: "Easy aerobic work",
        items: [
          { id: "opening", name: "Gradual opening", dosage: "First 10 minutes extremely easy" },
          { id: "easy-run", name: "Easy run", dosage: "40 min target, 45-min hard cap; conversational / RPE 2–3; full sentences effortless; no hills, cadence target or fast finish." }
        ]
      },
      {
        name: "No added work",
        items: [
          { id: "no-lift", name: "No lifting", dosage: "No curls, pressdowns, weighted pulling or optional Upper C during the benchmark/elbow unload week." }
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

  sessions.w4d7 = {
    purpose: "Full rest + Week 4 performance-profile review",
    duration: "All day",
    volume: "No training",
    footwear: "Not applicable",
    note: "Sunday remains the non-negotiable rest day. Review all jump/sprint results, timing methods, conditions, tissue response and delayed medial-elbow response. Publish the dated Current Athlete State and Weeks 5–8 benchmark-derived target bands.",
    blocks: [
      {
        name: "Rest",
        items: [
          { id: "full-rest", name: "No training", dosage: "Normal daily movement only; no make-up work" }
        ]
      },
      {
        name: "Required review data",
        items: [
          { id: "jump-data", name: "Jump results", dosage: "Best CMJ measurement and best standing broad jump, including measurement method" },
          { id: "sprint-data", name: "Sprint results", dosage: "Every valid 30 m and flying 20 m time, the timed 150 m, start type and timing method" },
          { id: "conditions-data", name: "Conditions", dosage: "Surface, footwear, lane/curve, weather and wind when meaningful" },
          { id: "response-data", name: "Response", dosage: "Immediate and next-morning lower-body tissue response, session RPE and delayed medial-elbow response" }
        ]
      }
    ]
  };
})();
