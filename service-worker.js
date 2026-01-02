const CACHE_NAME = "rps-v1";
const BASE_PATH = "/Rock-Paper-Scissors/";

const ASSETS = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "styles/styles.css",
  BASE_PATH + "logic/app.js",
  BASE_PATH + "asset/rock.png",
  BASE_PATH + "manifest.json"
];


self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

