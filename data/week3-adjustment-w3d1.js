(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days.length >= 2) {
    Object.assign(week3.days[0], {
      status: "Completed",
      detail: "Sprint, jump, lower-body and primary upper-body work completed. Chest-supported rows and triceps pressdowns were moved to Tuesday because of a time constraint; this is redistribution, not additional volume.",
      volume: "Full sprint/jump dose; deadlift 455 × 3 × 2; bench 250 × 5 × 3; 4 accessory sets moved to Tuesday"
    });

    Object.assign(week3.days[1], {
      title: "Easy aerobic support + moved upper accessories",
      detail: "Conversational easy running plus four low-cost upper accessory sets moved from Monday. Complete them only if upper-body soreness and general readiness are normal.",
      volume: "45 min easy target, 50-min cap + 5–7 min maintenance + 4 upper accessory sets"
    });
  }

  if (sessions.w3d1) {
    sessions.w3d1.note = `${sessions.w3d1.note} Session completed Aug 10. Chest-supported rows and cable pressdowns were omitted for time and moved to Tuesday; no other make-up work is added.`;
  }

  const tuesday = sessions.w3d2;
  if (!tuesday || !Array.isArray(tuesday.blocks)) return;

  tuesday.purpose = "Easy aerobic support + tissue maintenance + moved upper accessories";
  tuesday.duration = "60–75 min total; split friendly";
  tuesday.volume = "45 min easy target, 50-min cap + 5–7 min maintenance + 4 upper accessory sets";
  tuesday.note = `${tuesday.note} Week 3 only: two chest-supported-row sets and two cable-pressdown sets move here from Monday because of a time constraint. They are redistributed volume, not extra work. Perform them after the run or several hours later. Omit them rather than moving them again if lats, upper back, elbows or triceps are meaningfully sore, or if general fatigue is elevated.`;

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

  const alternatives = tuesday.blocks.find((block) => block && String(block.name).includes("Readiness alternatives"));
  if (alternatives && Array.isArray(alternatives.items)) {
    const amber = alternatives.items.find((item) => item && item.id === "amber");
    if (amber && !String(amber.dosage).includes("Omit the moved accessories")) {
      amber.dosage = `${amber.dosage} Omit the moved accessories.`;
    }
    const red = alternatives.items.find((item) => item && item.id === "red");
    if (red && !String(red.dosage).includes("No accessory lifting")) {
      red.dosage = `${red.dosage} No accessory lifting.`;
    }
  }
})();
