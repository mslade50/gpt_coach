(() => {
 const w=window.WEEK_PLANS.find(p=>p.week===12); if(!w)return;
 w.days=[
 {day:"Mon",type:"Low–moderate",status:"Planned",title:"Upper A + easy run",detail:"Lift first then run easy in one session; protect Tuesday sprint freshness.",volume:"Upper A (14 sets) + 40–45 min easy run"},
 {day:"Tue",type:"High",status:"Readiness-gated",title:"Acceleration + flying speed; later primary lift",detail:"Only true high leg day and only two-a-day. Require green tissues.",volume:"3 × 20–30 m acceleration + 2 × flying 20 m; later 2 × 3 deadlift + bench/RFESS/row/calf"},
 {day:"Wed",type:"Recovery",status:"Planned",title:"Easy low-impact aerobic",detail:"Bike/elliptical for recovery after Tuesday; no strides or lifting.",volume:"50–60 min bike/elliptical RPE 2–3"},
 {day:"Thu",type:"Medium",status:"Readiness-gated",title:"Controlled subthreshold aerobic",detail:"24 min at RPE 5–6, slower than threshold. No lifting.",volume:"3 × 8 min subthreshold, 2 min jog between"},
 {day:"Fri",type:"Low–moderate",status:"Planned",title:"Upper B + easy aerobic",detail:"Lift first then run/bike in one visit. No lower-body strength work.",volume:"Upper B (18 sets) + 40 min easy run OR 50–60 min bike"},
 {day:"Sat",type:"Low intensity / high volume",status:"Readiness-gated",title:"Long easy run",detail:"85 min default; 90 only if last weekend was comfortable and current tissues green.",volume:"85 min easy; up to 90 min green only"},
 {day:"Sun",type:"Recovery",status:"Locked",title:"Full rest + weekly review",detail:"No make-up miles. Record completed sessions and tissue response.",volume:"Full rest"}];
})();