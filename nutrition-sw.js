/* Cache only the public logger shell. Never cache OAuth or Google API responses. */
const CACHE = "nutrition-shell-v2";
const ASSETS = ["nutrition.html", "nutrition.css", "styles.css", "nutrition.js", "nutrition-sync-core.js", "nutrition-sync.js"];
self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});
self.addEventListener("activate", event => {
  // This worker owns only nutrition-shell-* caches; other apps' caches are untouched.
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith("nutrition-shell-") && key !== CACHE).map(key => caches.delete(key)))));
});
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);
  if (event.request.method !== "GET" || url.origin !== self.location.origin) return;
  const name = url.pathname.slice(new URL(self.registration.scope).pathname.length);
  if (!ASSETS.includes(name)) return; // Dashboard and training data always use their existing flow.
  event.respondWith(fetch(event.request).then(response => {
    if (response.ok && response.type === "basic") {
      const copy = response.clone();
      event.waitUntil(caches.open(CACHE).then(cache => cache.put(event.request, copy)));
    }
    return response;
  }).catch(() => caches.match(event.request).then(cached => cached || Response.error())));
});
