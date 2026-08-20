(() => {
  "use strict";

  const plans = Array.isArray(window.WEEK_PLANS) ? window.WEEK_PLANS : [];
  const sessions = window.SESSION_PLANS && typeof window.SESSION_PLANS === "object"
    ? window.SESSION_PLANS
    : {};

  const week4 = plans.find((plan) => plan && plan.week === 4);
  if (week4 && Array.isArray(week4.days) && week4.days[3]) {
    Object.assign(week4.days[3], {
      status: "Completed",
      title: "150 m benchmark complete + reduced Upper B",
      detail: "Single 150 m completed in an estimated 18.8 s as prescribed. The result was hand-timed and cross-checked against long-form video; it is suitable as an internal nearest-tenth baseline but is not fully automatic timing. No second attempt, pain or noteworthy tissue issue was reported. Reduced Upper B was completed as prescribed.",
      volume: "150 m: ~18.8 s, hybrid hand/video timing · reduced elbow-tolerant Upper B completed"
    });

    week4.statusNote = `${week4.statusNote} Thursday benchmark result: approximately 18.8 s for 150 m, hand-timed and corroborated by video. Treat it as a nearest-tenth internal baseline, not fully automatic timing; future comparisons should repeat the same start, helper, camera setup, lane, surface and footwear.`;
  }

  if (sessions.w4d4) {
    sessions.w4d4.note = `${sessions.w4d4.note} Completed Aug 20 as prescribed: one 150 m in approximately 18.8 s using combined hand timing and video cross-check, no second attempt, no noteworthy pain or tissue issue reported, and reduced Upper B completed. The result is an internal nearest-tenth baseline rather than fully automatic timing.`;
  }
})();
