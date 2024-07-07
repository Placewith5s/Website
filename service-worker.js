'use strict';
(function () {
  class ServiceWorkerCache {
    constructor(cacheName, filesToCache) {
      this.cacheName = cacheName;
      this.filesToCache = filesToCache;
    }
    async onInstall(event) {
      try {
        const cache = await caches.open(this.cacheName);
        await cache.addAll(this.filesToCache);
        console.log('Cached files during install');
      } catch (error) {
        console.error('Install event error:', error);
        throw error;
      }
    }
    onActivate(event) {
      const cacheWhitelist = [this.cacheName];
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return Promise.all(
            cacheNames.map(cacheName => {
              if (!cacheWhitelist.includes(cacheName)) {
                return caches.delete(cacheName);
              } else {
                const expirationTime = Date.now() - 24 * 60 * 60 * 1000;
                return caches.open(cacheName).then(cache => {
                  return cache.keys().then(requests => {
                    return Promise.all(
                      requests.map(async request => {
                        const response = await cache.match(request);
                        if (response.headers.get('date') < expirationTime) {
                          return cache.delete(request);
                        }
                      })
                    );
                  });
                });
              }
            })
          );
        })
      );
    }
    async onFetch(event) {
      const request = event.request;
      if (request.method !== 'GET') {
        return fetch(request);
      }
      event.respondWith(
        (async () => {
          try {
            const cacheResponse = await caches.match(request);
            if (cacheResponse) {
              return cacheResponse;
            }
            const networkResponse = await fetch(request);
            if (networkResponse && networkResponse.status === 200) {
              const cache = await caches.open(this.cacheName);
              cache.put(request, networkResponse.clone());
            }
            return networkResponse;
          } catch (error) {
            console.error('Fetch error:', error);
            return new Response("Offline content unavailable", { status: 503, headers: { 'Content-Type': 'text/plain' } });
          }
        })()
      );
    }
    onBeforeInstallPrompt(event) {
      event.preventDefault();
      event.prompt();
      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      }).catch(error => {
        console.error('BeforeInstallPrompt event error:', error);
      });
    }
    onPush(event) {
      const options = {
        body: event.data ? event.data.text() : 'No payload',
        icon: '/icons/Settings.png',
        actions: [
          { action: 'open_app', title: 'Open App' },
          { action: 'dismiss', title: 'Dismiss' }
        ],
        data: { notificationType: 'push' }
      };
      event.waitUntil(
        self.registration.showNotification('Placewith5s', options).catch(error => {
          console.error('Push event error:', error);
        })
      );
    }
    updateCache(updatedFiles) {
      caches.open(this.cacheName)
        .then(cache => {
          return cache.addAll(updatedFiles || this.filesToCache);
        })
        .catch(error => {
          console.error('Update cache error:', error);
        });
    }
  }
  const CACHE_NAME = 'placewith5s-v120';
  const FILES_TO_CACHE = [
    '/icons/Settings.png',
    '/icons/Settings.svg',
    '/icons/Policy.svg',
    '/icons/Cookies.svg',
    '/',
    '/html/privacyp',
    '/html/cookiep',
    '/html/aboutSoftware',
    '/html/about',
    '/html/faq',
    '/html/contactForm',
    '/html/404',
    '/css/preloader.css',
    '/css/contactForm.css',
    '/css/404.css',
    '/css/DataGuardian.css',
    '/manifest.json',
  ];
  const serviceWorkerCache = new ServiceWorkerCache(CACHE_NAME, FILES_TO_CACHE);
  self.addEventListener('install', (event) => {
    event.waitUntil(serviceWorkerCache.onInstall(event));
  }, {passive: true});
  self.addEventListener('activate', (event) => {
    event.waitUntil(serviceWorkerCache.onActivate(event));
  }, {passive: true});
  self.addEventListener('fetch', (event) => {
    serviceWorkerCache.onFetch(event);
  }, {passive: true});
  self.addEventListener('beforeinstallprompt', (event) => {
    serviceWorkerCache.onBeforeInstallPrompt(event);
  }, {passive: true});
  self.addEventListener('push', (event) => {
    serviceWorkerCache.onPush(event);
  }, {passive: true});
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    } else if (event.data && event.data.type === 'updateCache') {
      if (Array.isArray(event.data.updatedFiles)) {
        serviceWorkerCache.updateCache(event.data.updatedFiles);
      } else {
        console.warn("Invalid updateCache message:", event.data);
      }
    }
  }, {passive: true});
})();