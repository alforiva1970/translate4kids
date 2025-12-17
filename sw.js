const CACHE_NAME = 'traduci-impara-v3';
const urlsToCache = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './icon.svg',
    './manifest.json'
];

// Installazione - cache dei file
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aperta');
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.log('Errore cache:', err);
            })
    );
    self.skipWaiting();
});

// Attivazione - pulizia vecchie cache
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch - servi da cache o rete
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Ritorna dalla cache se disponibile
                if (response) {
                    return response;
                }
                // Altrimenti fetch dalla rete
                return fetch(event.request);
            })
    );
});
