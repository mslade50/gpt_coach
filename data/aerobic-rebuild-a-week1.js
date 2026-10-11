(() => {
 const w=window.WEEK_PLANS.find(p=>p.week===12);
 if(!w)return;
 window.CURRENT_ATHLETE_STATE={
  date:"2026-10-11",
  programPosition:"A Week 1 · Aerobic rebuild / 10K · Oct 12–18",
  readiness:"Provisional: Oct 5–11 completed workouts, mileage and current tissue ratings unavailable. The last reported hard Thursday was Oct 1 after Tuesday sprint + lifting.",
  primaryGoal:"Rebuild aerobic fitness and maintain near-max speed and strength.",
  weeklyRhythm:"Monday Upper A + easy run; Tuesday speed + primary lift; Wednesday easy bike; Thursday controlled subthreshold; Friday Upper B + easy aerobic; Saturday long run; Sunday rest."
 };
 w.title="A week · Speed quality + controlled aerobic";
 w.blockWeekLabel="AEROBIC REBUILD · A WEEK 1 · OCT 12–18";
 w.focus="One high leg day Tuesday; only Tuesday split into two sessions. No Thursday lifting. Conserve load until last-week response is verified.";
 w.statusNote="Provisional plan: do not assume Oct 5–11 sessions were completed. Use readiness alternatives; avoid unverified mileage increases.";
})();