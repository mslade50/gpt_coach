(() => {
window.a12Session = (d,purpose,duration,volume,footwear,note,groups) => {
 let n=0;
 window.SESSION_PLANS=window.SESSION_PLANS||{};
 window.SESSION_PLANS["w12d"+d]={purpose,duration,volume,footwear,note,
 blocks:groups.map(g=>({name:g[0],items:g[1].map(e=>({id:"a12d"+d+"-"+(++n),name:e[0],dosage:e[1]}))}))};
};
window.a12Session(1,
"Upper A then easy run — one continuous session",
"90–105 min",
"14 upper-body work sets + 40–45 min easy run",
"Gym shoes followed by normal trainers",
"Lift BEFORE aerobic work. Preserve Tuesday freshness; no lower-body loading, strides or fast finish.",
[
["Readiness",[["Check","Normal gait, no worsening calf/Achilles/hamstring/adductor pain. If legs feel heavy, choose easy bike instead."]]],
["Upper A — lift first",[
["Incline DB press","3 × 8–10 @ RPE 7–8, rest 90 s."],
["Neutral-grip pulldown or unweighted pull-up","3 × 8–10 @ RPE 7–8, 90 s; shoulder-friendly range."],
["Chest-supported row","2 × 10–12 @ RPE 7–8, 75–90 s."],
["Lateral raise","2 × 15–20, 45–60 s."],
["Curl","2 × 10–15, 60 s."],
["Cable triceps pressdown","2 × 10–15, 60 s."]
]],
["Easy aerobic afterward",[["Easy run","40–45 min RPE 2–3, flat/gently rolling; first 10 min extra easy. No progression."]]],
["Fueling / alternatives",[
["Fuel","Normal carbohydrate-containing meal and 25–35 g protein around training; drink for conditions."],
["Amber","2 sets per lift + 30–35 min easy run or bike."],
["Red","Rest if systemic fatigue/illness or worsening pain; pain-free upper-only if impact is the sole limitation."]
]]
]);
})();