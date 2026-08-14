(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week3 = plans.find((plan) => plan && plan.week === 3);
  if (week3 && Array.isArray(week3.days) && week3.days.length >= 5) {
    Object.assign(week3.days[3], {
      status: "Completed",
      title: "Recovery + elbow-modified Upper B",
      detail: "Completed Aug 13 as prescribed: no running, sprinting or jumping; elbow-tolerant Upper B completed without a serious immediate elbow issue. Delayed next-morning response remains the final elbow check.",
      volume: "No running; 7 elbow-tolerant upper-body sets completed"
    });

    Object.assign(week3.days[4], {
      status: "Provisional",
      detail: "Two controlled 150s remain planned. Final green/amber/red execution depends on Friday morning leg freshness, left calf/shin status and any delayed medial-elbow response."
    });
  }

  if (sessions.w3d4) {
    sessions.w3d4.note = `${sessions.w3d4.note} Completed Aug 13 as prescribed. No serious elbow issue was reported during or immediately after the modified upper-body work; the delayed next-morning response remains the final elbow check.`;
  }
})();
