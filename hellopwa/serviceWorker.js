var CACHE_NAME  = "mycache";
var urlsToCache = [
    "https://naoya-ma.github.io/mockups/hellopwa/",
    "https://naoya-ma.github.io/mockups/hellopwa/index.html"
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(
            function(cache){
            	console.log('[ServiceWorker] Install');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys()
      .then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          console.log('[ServiceWorker] Removing old cache...');
          return caches.delete(key);
        }));
      })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(
        function (response) {
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
