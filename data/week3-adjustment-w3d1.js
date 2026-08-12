(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days.length >= 6) {
    Object.assign(week3.days[0], {
      status: "Completed",
      detail: "Sprint, jump, lower-body and primary upper-body work completed. Chest-supported rows and triceps pressdowns were moved to Tuesday because of a time constraint; this is redistribution, not additional volume.",
      volume: "Full sprint/jump dose; deadlift 455 × 3 × 2; bench 250 × 5 × 3; 4 accessory sets moved to Tuesday"
    });

    Object.assign(week3.days[1], {
      status: "Completed",
      title: "Easy aerobic support + moved upper accessories",
      detail: "Easy run and moved Monday accessories completed. Mild delayed soreness recurred at the medial elbow region after lifting; lower-body response remained normal.",
      volume: "5.28 mi at 8:59/mi, 128 avg HR + moved rows/pressdowns completed"
    });

    Object.assign(week3.days[2], {
      detail: "Tempo remains unchanged. Use relaxed hands and normal arm swing; this no-lifting day is the cleanest check of whether sprint running alone changes the delayed medial-elbow response."
    });

    Object.assign(week3.days[3], {
      title: "Intro 150 m speed endurance + elbow-modified Upper B",
      detail: "Track remains readiness-gated. Upper B is reduced to pain-free pressing and rear-delt work; rows, curls and pressdowns are omitted to unload the medial elbow region.",
      volume: "3 × 150 m / 450 m; 2 × 2 low box jumps; 7 elbow-tolerant upper-body sets"
    });

    Object.assign(week3.days[4], {
      detail: "Recovery remains the priority. No Friday social upper-body lift this week while the medial-elbow response is being clarified."
    });

    Object.assign(week3.days[5], {
      title: "Longer easy aerobic support — no arm work",
      detail: "Complete the easy run only. Optional curls, pressdowns and other direct arm work are omitted this week because of recurrent delayed medial-elbow soreness.",
      volume: "50 min easy target, 55-min cap; no lifting"
    });
  }

  if (sessions.w3d1) {
    sessions.w3d1.note = `${sessions.w3d1.note} Session completed Aug 10. Chest-supported rows and cable pressdowns were omitted for time and moved to Tuesday; no other make-up work is added.`;
  }

  const tuesday = sessions.w3d2;
  if (tuesday && Array.isArray(tuesday.blocks)) {
    tuesday.purpose = "Easy aerobic support + tissue maintenance + moved upper accessories";
    tuesday.duration = "60–75 min total; split friendly";
    tuesday.volume = "45 min easy target, 50-min cap + 5–7 min maintenance + 4 upper accessory sets";
    tuesday.note = `${tuesday.note} Week 3 only: two chest-supported-row sets and two cable-pressdown sets moved here from Monday because of a time constraint. They were completed Aug 11. Mild medial-elbow soreness appeared later/next day rather than during the session; no additional upper-body work is added.`;

    const alreadyAdded = tuesday.blocks.some((block) => block && block.id === "moved-upper-accessories");
    if (!alreadyAdded) {
      const maintenanceIndex = tuesday.blocks.findIndex((block) => block && String(block.name).includes("Tissue maintenance"));
      const insertionIndex = maintenanceIndex >= 0 ? maintenanceIndex + 1 : tuesday.blocks.length;
      tuesday.blocks.splice(insertionIndex, 0, {
        id: "moved-upper-accessories",
        name: "Moved upper accessories — Week 3 only",
        items: [
          {
            id: "moved-row",
            name: "Chest-supported row",
            dosage: "2 × 8–10 at RPE 7–8; 90 sec rest. Keep the chest supported and leave at least 2 clean reps in reserve."
          },
          {
            id: "moved-pressdown",
            name: "Cable triceps pressdown",
            dosage: "2 × 10–15 at RPE 8; 60–75 sec rest. Stop with 1–2 clean reps in reserve."
          }
        ]
      });
    }
  }

  const wednesday = sessions.w3d3;
  if (wednesday && Array.isArray(wednesday.blocks)) {
    wednesday.note = `${wednesday.note} Elbow monitoring: run with loose hands and normal, unforced arm swing. Because symptoms are delayed, compare Wednesday evening and Thursday morning with the pre-run baseline.`;
    const readiness = wednesday.blocks.find((block) => block && String(block.name).includes("Readiness gate"));
    if (readiness && Array.isArray(readiness.items) && !readiness.items.some((item) => item.id === "elbow-check")) {
      readiness.items.push({
        id: "elbow-check",
        name: "Medial-elbow check",
        dosage: "Ordinary arm swing is comfortable; soreness is 0–2/10 and not increasing; no ring/pinky numbness or tingling. Keep hands loose and do not punch the arms."
      });
    }
  }

  const thursday = sessions.w3d4;
  if (thursday && Array.isArray(thursday.blocks)) {
    thursday.purpose = "Intro 150 m speed endurance + elbow-modified Upper B";
    thursday.duration = "90–115 min total; split preferred";
    thursday.volume = "3 × 150 m / 450 m + 2 × 2 low box jumps + 7 elbow-tolerant upper-body sets";
    thursday.note = `${thursday.note} Recurrent mild delayed soreness at the medial elbow region changes the lifting block, not the track dose. Rows, curls and pressdowns are omitted. Any upper-body exercise must remain at 0–2/10 during the session and must not produce a clearly worse next-morning response.`;

    const readiness = thursday.blocks.find((block) => block && String(block.name).includes("Readiness gate"));
    if (readiness && Array.isArray(readiness.items) && !readiness.items.some((item) => item.id === "elbow-readiness")) {
      readiness.items.push({
        id: "elbow-readiness",
        name: "Medial-elbow readiness",
        dosage: "Track may proceed when arm swing is normal and soreness is 0–2/10 without numbness, tingling or weakness. Upper lifting requires the same plus no increase with a light warm-up set."
      });
    }

    const upper = thursday.blocks.find((block) => block && String(block.name).includes("Upper B"));
    if (upper) {
      upper.name = "Upper B — elbow-modified, pain-free only";
      upper.items = [
        {
          id: "machine-chest-press",
          name: "Neutral-grip machine chest press or light incline dumbbell press",
          dosage: "3 × 6–8 at RPE 6–7; 2 min rest. Keep wrists neutral and grip only as hard as needed. Prefer the machine; reduce dumbbell load if used. Stop if medial-elbow soreness increases."
        },
        {
          id: "machine-shoulder-press",
          name: "Neutral-grip machine shoulder press",
          dosage: "2 × 8–10 at RPE 6–7; 90 sec rest. Use a stable setup and omit if gripping or pressing changes the elbow sensation."
        },
        {
          id: "rear-delt",
          name: "Supported rear-delt fly",
          dosage: "2 × 15–20 at RPE 7–8; 60 sec rest. Light grip, no swinging."
        }
      ];
    }

    const alternatives = thursday.blocks.find((block) => block && String(block.name).includes("Readiness alternatives"));
    if (alternatives && Array.isArray(alternatives.items)) {
      const amber = alternatives.items.find((item) => item && item.id === "amber");
      if (amber) amber.dosage = "Lower-body amber: omit box jumps and perform 2 × 150 m at approximately 83–85% with 8 min recovery. Elbow amber: complete track only and omit all Upper B work.";
      const red = alternatives.items.find((item) => item && item.id === "red");
      if (red) red.dosage = "No sprinting or jumping for a lower-body red flag. No upper-body lifting for worsening medial-elbow pain, weakness, numbness/tingling, swelling or altered arm use. Use full rest or symptom-free very easy cycling as appropriate.";
    }
  }

  const friday = sessions.w3d5;
  if (friday) {
    friday.note = "Friday is a recovery day. The occasional social upper-body option is suspended this week because recurrent delayed medial-elbow soreness is being monitored.";
    if (Array.isArray(friday.blocks)) {
      friday.blocks = friday.blocks.filter((block) => !String(block && block.name).includes("social"));
    }
  }

  const saturday = sessions.w3d6;
  if (saturday && Array.isArray(saturday.blocks)) {
    saturday.purpose = "Longer easy aerobic support — no arm work";
    saturday.duration = "50–60 min";
    saturday.volume = "50 min easy target, 55-min cap; no lifting";
    saturday.note = "Complete the easy run only. Optional curls, pressdowns and other direct arm work are omitted this week because of recurrent delayed medial-elbow soreness.";
    saturday.blocks = saturday.blocks.filter((block) => !String(block && block.name).includes("Upper C"));
  }
})();

// This file is already loaded before app.js. Insert the schedule override scripts
// synchronously so the dashboard renders the current Week 3 plan on first paint.
if (document.readyState === "loading") {
  document.write('<script src="data/week3-threshold-swap.js"><\/script>');
  document.write('<script src="data/week3-w3d3-complete.js"><\/script>');
}
