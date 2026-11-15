/* Same-origin cache only. This worker never requests another site.
   Cache name is separate from the other speech-coach app. */
var CACHE = "ricardo-speech-1.0.0";
var ASSETS = [
  "./index.html",
  "./styles.css",
  "./content.js",
  "./app.js",
  "./manifest.webmanifest",
  "./version.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png",
  "./robots.txt"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(ASSETS);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.filter(function (key) {
        return key !== CACHE;
      }).map(function (key) {
        return caches.delete(key);
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req).then(function (cached) {
        if (cached) return cached;
        return fetch(req).then(function (fresh) {
          if (fresh && fresh.ok) cache.put(req, fresh.clone());
          return fresh;
        }).catch(function () {
          if (req.mode === "navigate") {
            return cache.match("./index.html").then(function (home) {
              return home || new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
            });
          }
          return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
        });
      });
    })
  );
});
