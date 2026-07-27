# GPT Coach — Hybrid 400 Exercise Library

A durable exercise and drill reference for McKinley’s 14-week speed-conversion block.

## Included now

The initial release contains all **34 movements and contingency exercises** used in **Week 1, Day 1 — acceleration foundation + lower-body strength**:

- General warm-up and locomotion
- Ankle, calf, soleus, adductor and hip preparation
- Wall drills, A-drills, dribbles and progressive buildups
- Pogos and standing broad jumps
- Falling starts and two-point acceleration
- Trap-bar deadlift, rear-foot-elevated split squat, hamstring isometric, calf raise and Pallof press
- Amber-day medicine-ball alternative
- Red-day recovery isometrics and easy cycling

The exercise registry is split into small ordered files under `data/` so it can expand throughout the 14-week project without making one monolithic source file.

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
- **Local use:** open [`index.html`](index.html), or use [`dashboard.html`](dashboard.html) as an alias. All application assets are stored in this repository; video demonstrations require internet access.

## Source structure

```text
.github/workflows/deploy-pages.yml  # automatic GitHub Pages deployment
index.html                          # dashboard markup
styles.css                          # responsive visual system
data/exercises-01.js ... -06.js     # 34-exercise registry
app.js                              # search, filters, shortlist, modal and checklist
dashboard.html                      # convenience alias to index.html
DEPLOY.md                           # publishing instructions
.nojekyll                           # static-host compatibility
```

## Add future exercises

Add a new object to the final ordered file in `data/`, or start the next numbered file. Preserve these fields:

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

Then add a new `<script>` tag in `index.html` before `app.js` only when creating a new data file.

## Coaching safeguard

This library explains movement execution; it does not override the daily readiness decision. Sharp, localized, worsening or gait-altering pain is a stop signal, not a technique problem to push through.
