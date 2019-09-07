var CACHENAME = "js13kPWA-v1.0.3";

self.addEventListener("install", event => {
  console.log("[Service Worker] Install");
  event.waitUntil(
    caches.open(CACHENAME).then(cache => {
      console.log("[Service Worker] Caching resources");
      return cache.addAll([
        "/",
        "/index.html",
        "/web_modules/lit-element.js",
        "/web_modules/@vaadin/router.js",
        "/web_modules/kv-storage-polyfill.js",
        "/web_modules/es-module-shims.js",
        "/web_modules/cutestrap/dist/css/cutestrap.min.css",
        "/src/api/storage.js",
        "/src/components/checklist-procedure-form.js",
        "/src/components/checklist-progress-bar.js",
        "/src/checklist-pwa-app.js",
        "/src/checklist-pwa-create.js",
        "/src/checklist-pwa-detail.js",
        "/src/checklist-pwa-edit.js",
        "/src/checklist-pwa-history-detail.js",
        "/src/checklist-pwa-history.js",
        "/src/checklist-pwa-list.js",
        "/src/checklist-pwa-not-found.js"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => {
      console.log("[Service Worker] Fetching resource: " + e.request.url);
      return (
        r ||
        fetch(e.request).then(response => {
          return caches.open(CACHENAME).then(cache => {
            console.log(
              "[Service Worker] Caching new resource: " + e.request.url
            );
            cache.put(e.request, response.clone());
            return response;
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('js13kPWA-') && cacheName !== CACHENAME)
          .map(cacheName => caches.delete(cacheName))
      )
    })
  )
});
