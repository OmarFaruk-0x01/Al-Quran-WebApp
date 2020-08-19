const staticCacheName = "staticCache";
const daynamicCacheName = "daynamicCache-v1";

var staticFiles = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/img/favicon-16x16.png",
  "/assets/img/icon-192x192.png",
  "/assets/img/icon-256x256.png",
  "/assets/fonts/ico.eot",
  "/assets/fonts/ico.eot?xwe62k",
  //   "/assets/fonts/ico.eot?xwe62k#iefix",
  "/assets/fonts/ico.ttf",
  "/assets/fonts/ico.ttf?xwe62k",
  "/assets/fonts/ico.woff",
  "/assets/fonts/ico.woff?xwe62k",
  "/assets/fonts/ico.svg",
  "/assets/fonts/ico.svg?xwe62k#ico",
  "/assets/ie7/ie7.css",
  "/assets/ie7/ie7.js",
  "/assets/style.css",
  "/assets/selection.json",
  "/css/main.min.css",
  "/js/bookmarkJS.js",
  "/js/main.js",
  "/js/staticElements.js",
  "/js/utilities.js",
  "https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap",
  "/sw.js",
];

function checkLimit(cacheName, size) {
  caches.open(cacheName).then((cache) => {
    cache.keys().then((key) => {
      if (key.length > size) {
        cache.delete(key[0]).then(checkLimit(cacheName));
      }
    });
  });
}

self.addEventListener("install", (evt) => {
  console.log("Worker Installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(staticFiles);
    })
  );
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((key) => {
      return Promise.all(
        key
          .filter((key) => key !== staticCacheName && key !== daynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cachesResp) => {
      return (
        cachesResp ||
        fetch(evt.request).then((fetchResp) => {
          return caches.open(daynamicCacheName).then((ceche) => {
            if (
              evt.request.url.indexOf("chrome-extension") === -1 &&
              evt.request.method === "GET"
            ) {
              ceche.put(evt.request.url, fetchResp.clone());
              checkLimit(daynamicCacheName, 15);
            }

            return fetchResp;
          });
        })
      );
    })
  );
});
