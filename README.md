# GPT Coach — Hybrid 400 Exercise Library

A durable exercise and drill reference for McKinley’s 14-week speed-conversion block.

## What is included now

The initial release contains all **34 movements and contingency exercises** used in **Week 1, Day 1 — acceleration foundation + lower-body strength**:

- General warm-up and locomotion
- Ankle, calf, soleus, adductor and hip preparation
- Wall drills, A-drills, dribbles and progressive buildups
- Pogos and standing broad jumps
- Falling starts and two-point acceleration
- Trap-bar deadlift, rear-foot-elevated split squat, hamstring isometric, calf raise and Pallof press
- Amber-day medicine-ball alternative
- Red-day recovery isometrics and easy cycling

The data structure is designed to accept every new exercise introduced later in the 14-week plan without rebuilding the interface.

## Dashboard features

- Search by exercise name, alias, body area or purpose
- Category filters for drills, plyometrics, acceleration, strength, recovery and more
- Full setup and step-by-step execution for every movement
- One primary coaching cue and one main error to avoid
- Monday’s exact dose displayed on each card
- Targeted YouTube demonstration searches, including a preferred coaching source where available
- A Week 1 Day 1 session checklist with locally saved progress
- A locally saved exercise shortlist
- Green/amber/red-quality stop rules
- Responsive desktop and mobile layouts

## Open it

- **Hosted site:** `https://mslade50.github.io/gpt_coach/` after GitHub Pages is enabled; see [`DEPLOY.md`](DEPLOY.md).
- **Immediate offline dashboard:** open [`dashboard.html`](dashboard.html). This file contains the HTML, CSS, exercise data and application logic in one file.
- **Development version:** open `index.html` from a local static server.

## Source structure

```text
.github/workflows/deploy-pages.yml  # automatic GitHub Pages deployment
index.html                          # dashboard markup
styles.css                          # responsive visual system
data.js                             # exercise library and coaching content
app.js                              # search, filters, shortlist, modal and checklist
dashboard.html                      # self-contained offline build
DEPLOY.md                           # publishing instructions
.nojekyll                           # static-host compatibility
```

## Add a future exercise

Add one object to `window.EXERCISES` in `data.js`, preserving these fields:

```js
{
  id,
  name,
  aliases,
  category,
  block,
  order,
  dosage,
  equipment,
  purpose,
  steps,
  cue,
  avoid,
  videoQuery,
  intensity,
  monday
}
```

After editing `data.js`, regenerate `dashboard.html` by inlining `styles.css`, `data.js` and `app.js`, or use the development version normally. A future build script can automate that step if the library grows substantially.

## Coaching safeguard

This library explains movement execution; it does not override the daily readiness decision. Sharp, localized, worsening or gait-altering pain is a stop signal, not a technique problem to push through.
