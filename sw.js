/* Service Worker - Photo Booth HUT RI Ke-81 Karangjambe RT 05 */
const CACHE_NAME = 'photobooth-ri81-v9';
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './favicon.svg',
  './site.webmanifest',
  './assets/og-preview.jpg',
  './assets/qris.webp',
  './assets/frames/background_foto_agustusan.png',
  './assets/frames/frame1.svg',
  './assets/frames/frame2.svg',
  './assets/frames/frame3.svg',
  './assets/frames/frame4.svg',
  './assets/frames/frame5.svg',
  './assets/frames/frame6.svg',
  './assets/frames/frame7.svg',
  './assets/frames/frame8.svg'
];

// Install Event: Pre-cache core shell & assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('Pre-cache item warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Cache First for static assets, Network First for external APIs
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Exclude non-GET requests and external webhook uploads (like Google Script)
  if (event.request.method !== 'GET' || url.hostname.includes('script.google.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version immediately, but refresh cache in background if connected (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => {});
        return cachedResponse;
      }

      // If not cached, fetch from network and cache
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return response;
      });
    }).catch(() => {
      // Offline fallback
      return caches.match('./index.html');
    })
  );
});
