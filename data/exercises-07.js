window.EXERCISES = window.EXERCISES || [];
window.EXERCISES.push(...[
  {
    id: "bench-press",
    name: "Barbell Bench Press",
    aliases: ["bench press", "flat bench"],
    category: "Upper body",
    block: "Upper A",
    order: 31,
    dosage: "3 × 5 at RPE 7 in Week 1",
    equipment: "Bench, barbell, plates, collars, safeties or spotter",
    purpose: "Maintain and gradually progress primary upper-body pressing strength without creating systemic fatigue.",
    steps: [
      "Set the eyes just behind the bar, plant the feet and create a stable upper-back position.",
      "Unrack with the shoulder blades still set, lower the bar under control to the lower chest or sternum area.",
      "Press up and slightly back while keeping the feet planted and the bar path repeatable."
    ],
    cue: "Upper back locked; press up and back.",
    avoid: "Grinding, bouncing the bar, losing foot pressure or letting the shoulders roll forward.",
    videoQuery: "Juggernaut Training Systems bench press technique",
    intensity: "Moderate-heavy",
    monday: false
  },
  {
    id: "vertical-pull",
    name: "Pull-Up or Lat Pulldown",
    aliases: ["pullup", "chin-up", "lat pulldown", "vertical pull"],
    category: "Upper body",
    block: "Upper A",
    order: 32,
    dosage: "3 × 6–8 at RPE 7–8",
    equipment: "Pull-up bar or lat-pulldown machine",
    purpose: "Develop vertical pulling strength and lat capacity while balancing pressing volume.",
    steps: [
      "Begin from a controlled shoulder position with the ribs stacked rather than flared.",
      "Drive the elbows down toward the ribs while keeping the neck relaxed.",
      "Lower under control to a full range that the shoulders tolerate without losing position."
    ],
    cue: "Elbows to your back pockets.",
    avoid: "Kipping, craning the neck, shrugging or shortening range to chase repetitions.",
    videoQuery: "E3 Rehab pull up lat pulldown technique",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "chest-supported-row",
    name: "Chest-Supported Row",
    aliases: ["incline bench row", "supported dumbbell row"],
    category: "Upper body",
    block: "Upper A / Upper B",
    order: 33,
    dosage: "2–3 × 8–10 at RPE 7–8",
    equipment: "Chest-supported row machine or incline bench and dumbbells",
    purpose: "Train upper-back strength with minimal lower-back and leg fatigue.",
    steps: [
      "Set the chest firmly against the pad and let the arms reach without the shoulders dumping forward.",
      "Pull the elbows back while keeping the torso quiet against the support.",
      "Pause briefly, then lower until the shoulder blades can move naturally."
    ],
    cue: "Chest stays heavy on the pad.",
    avoid: "Jerking the load, lifting the chest off the support or turning the movement into a shrug.",
    videoQuery: "chest supported row technique Renaissance Periodization",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "triceps-pressdown",
    name: "Cable Triceps Pressdown",
    aliases: ["rope pressdown", "triceps pushdown"],
    category: "Upper body",
    block: "Upper A / Optional arms",
    order: 34,
    dosage: "2–3 × 10–15 at RPE 8",
    equipment: "Cable stack and rope or straight-bar attachment",
    purpose: "Add recoverable direct triceps volume for arm growth and pressing support.",
    steps: [
      "Stand tall with the upper arms close to the torso and the cable tension already loaded.",
      "Extend the elbows until the arms are straight without letting the shoulders roll forward.",
      "Return under control while keeping the upper arms nearly fixed."
    ],
    cue: "Pin the elbows; finish long.",
    avoid: "Rocking the torso, flaring the elbows or using momentum to finish the set.",
    videoQuery: "Renaissance Periodization triceps pressdown technique",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "incline-db-press",
    name: "Incline Dumbbell Press",
    aliases: ["incline press", "incline dumbbell bench"],
    category: "Upper body",
    block: "Upper B",
    order: 35,
    dosage: "3 × 6–8 at RPE 7",
    equipment: "Adjustable bench and dumbbells",
    purpose: "Provide a second pressing exposure with a joint-friendly angle and manageable fatigue.",
    steps: [
      "Use a modest incline, plant the feet and set the shoulder blades against the bench.",
      "Lower the dumbbells with the elbows slightly below the shoulders and the forearms near vertical.",
      "Press smoothly to a stable finish without crashing the dumbbells together."
    ],
    cue: "Control down; press toward the ceiling.",
    avoid: "Excessive bench angle, elbows flared hard to the side or losing shoulder position at the bottom.",
    videoQuery: "incline dumbbell press technique Renaissance Periodization",
    intensity: "Moderate-heavy",
    monday: false
  },
  {
    id: "cable-row",
    name: "Seated Cable Row",
    aliases: ["cable row", "horizontal cable row"],
    category: "Upper body",
    block: "Upper B",
    order: 36,
    dosage: "3 × 8–10 at RPE 7–8",
    equipment: "Cable row station and handle",
    purpose: "Build horizontal pulling volume without loading the legs or spinal erectors heavily.",
    steps: [
      "Sit tall with the ribs stacked and begin with the arms long but the torso controlled.",
      "Pull the handle toward the lower ribs while the elbows travel behind the body.",
      "Return smoothly without turning the repetition into a forward-and-back torso swing."
    ],
    cue: "Row the handle; do not row your torso.",
    avoid: "Leaning far back, shrugging or shortening the return to use more load.",
    videoQuery: "seated cable row technique E3 Rehab",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "landmine-press",
    name: "Landmine Press",
    aliases: ["single arm landmine press", "angled barbell press", "machine shoulder press"],
    category: "Upper body",
    block: "Upper B",
    order: 37,
    dosage: "2 × 8–10 at RPE 7",
    equipment: "Landmine attachment and barbell, or shoulder-press machine",
    purpose: "Add secondary pressing volume with a stable, shoulder-tolerant path.",
    steps: [
      "Stand or kneel with the ribs stacked and hold the end of the bar near the shoulder.",
      "Press up and forward along the bar path while keeping the trunk quiet.",
      "Lower under control until the hand returns near the shoulder without collapsing posture."
    ],
    cue: "Reach along the bar path.",
    avoid: "Leaning back, rotating through the trunk or turning the rep into a full-body push.",
    videoQuery: "landmine press technique E3 Rehab",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "rear-delt-fly",
    name: "Rear-Delt Fly",
    aliases: ["reverse fly", "reverse pec deck", "rear delt raise"],
    category: "Upper body",
    block: "Upper B",
    order: 38,
    dosage: "2 × 15–20 at RPE 8",
    equipment: "Reverse pec-deck, cables or light dumbbells",
    purpose: "Develop rear-deltoid and scapular control with little systemic cost.",
    steps: [
      "Set the torso against a support when possible and begin with soft elbows.",
      "Move the arms out and back without shrugging or extending the low back.",
      "Pause briefly, then return under control while maintaining tension."
    ],
    cue: "Reach wide, not high.",
    avoid: "Shrugging, swinging or choosing a load that turns the movement into a row.",
    videoQuery: "rear delt fly technique Renaissance Periodization",
    intensity: "Low-moderate",
    monday: false
  },
  {
    id: "cable-curl",
    name: "Cable or Dumbbell Curl",
    aliases: ["biceps curl", "cable curl", "dumbbell curl"],
    category: "Upper body",
    block: "Optional arms",
    order: 39,
    dosage: "3 × 10–15 at RPE 8",
    equipment: "Cable stack or dumbbells",
    purpose: "Provide direct biceps volume with a controlled fatigue cost.",
    steps: [
      "Stand tall with the upper arms close to the torso and begin from a controlled elbow extension.",
      "Curl through the elbow without driving the shoulders forward.",
      "Lower slowly until the biceps are lengthened while the torso remains still."
    ],
    cue: "Elbows quiet; squeeze and lower.",
    avoid: "Hip drive, shoulder swing or cutting the bottom range short.",
    videoQuery: "biceps curl technique Renaissance Periodization",
    intensity: "Moderate",
    monday: false
  },
  {
    id: "lateral-raise",
    name: "Lateral Raise",
    aliases: ["side raise", "dumbbell lateral raise", "cable lateral raise"],
    category: "Upper body",
    block: "Optional arms",
    order: 40,
    dosage: "2 × 15–20 at RPE 8",
    equipment: "Dumbbells or cable stack",
    purpose: "Add low-cost lateral-deltoid volume without heavy pressing fatigue.",
    steps: [
      "Stand tall with soft elbows and the weights slightly in front of the body.",
      "Raise the arms out and slightly forward until the deltoids are working hard without shrugging.",
      "Lower under control and keep continuous tension rather than resting at the bottom."
    ],
    cue: "Lead wide with the elbows.",
    avoid: "Shrugging, swinging or using a load that forces the torso to rock.",
    videoQuery: "lateral raise technique Renaissance Periodization",
    intensity: "Low-moderate",
    monday: false
  }
]);