var CACHE_NAME  = "mycache";
var urlsToCache = [
    "https://github.com/naoya-ma/mockups/hellopwa/",
    "https://github.com/naoya-ma/mockups/hellopwa/index.html"
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
