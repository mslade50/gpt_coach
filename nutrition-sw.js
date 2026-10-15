/* Cache only the public dashboard and logger shell. Never cache OAuth or Google API responses. */
const CACHE = "nutrition-shell-v6";
const ASSETS = [
  "nutrition.html",
  "nutrition.css",
  "styles.css",
  "nutrition.js",
  "nutrition-sync-core.js",
  "nutrition-sync.js",
  "google-connection.js",
  "privacy.html",
  "meal-plan.html",
  "meal-plan.css",
  "index.html",
  "schedule.css",
  "session.css",
  "session-log.css",
  "data/exercises-01.js",
  "data/exercises-02.js",
  "data/exercises-03.js",
  "data/exercises-04.js",
  "data/exercises-05.js",
  "data/exercises-06.js",
  "data/exercises-07.js",
  "data/week-plans.js",
  "data/session-plans.js",
  "data/week1-strength-override.js",
  "data/future-macro-expectations.js",
  "data/week3-plan.js",
  "data/week3-adjustment-w3d1.js",
  "data/week4-plan.js",
  "data/week5-plan.js",
  "data/week6-plan.js",
  "data/week6-w6d1-complete.js",
  "data/week7-plan.js",
  "data/aerobic-rebuild-week1.js",
  "data/aerobic-rebuild-b-week1.js",
  "app.js",
  "sunday-preview.js",
  "session-log.js",
  "training-sync-core.js",
  "training-sync.js",
  "data/week3-threshold-swap.js",
  "data/week3-w3d3-complete.js",
  "data/week3-w3d4-complete.js",
  "data/week4-w4d1-results.js",
  "data/week4-w4d2-complete.js",
  "data/week4-w4d3-complete.js",
  "data/week4-w4d4-complete.js",
  "data/week5-w5d1-complete.js",
  "data/week5-w5d2-complete.js",
  "data/week5-w5d4-sprints-complete.js",
  "data/week5-w5d6-complete.js",
  "data/aerobic-rebuild-a-week1.js",
  "data/aerobic-rebuild-a-week1-days.js",
  "data/a12-session-mon.js",
  "data/a12-session-tue.js",
  "data/a12-session-wed.js",
  "data/a12-session-thu.js",
  "data/a12-session-fri.js",
  "data/a12-session-sat.js",
  "data/a12-session-sun.js"
];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS.map(asset =>
    new Request(asset + (/\.(js|css)$/.test(asset) ? "?v=20261015a" : ""), { cache: "reload" })))));
});
self.addEventListener("activate", event => {
  // This worker owns only nutrition-shell-* caches; other apps' caches are untouched.
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("nutrition-shell-") && key !== CACHE).map(key => caches.delete(key)))));
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  const name = url.pathname.slice(new URL(self.registration.scope).pathname.length) || "index.html";
  if (!ASSETS.includes(name)) return; // Only explicitly listed public assets are cached.
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && response.type === "basic") {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(new URL(name, self.registration.scope), copy)));
    }
    return response;
  }).catch(() => caches.open(CACHE).then(cache => cache.match(new URL(name, self.registration.scope), { ignoreSearch: true })).then(cached => cached || Response.error())));
});
