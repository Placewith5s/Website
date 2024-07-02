'use strict';
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
  async onActivate(event) {
    try {
      const cacheWhitelist = [this.cacheName];
      const keyList = await caches.keys();
      await Promise.all(keyList.map((key) => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }));
      console.log('Activated and cleaned up old caches');
    } catch (error) {
      console.error('Activate event error:', error);
      throw error;
    }
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
    caches.open(this.cacheName).then((cache) => {
      return cache.addAll(updatedFiles || this.filesToCache);
    }).catch(error => {
      console.error('Update cache error:', error);
    });
  }
}
const CACHE_NAME = 'placewith5s-v112';
const FILES_TO_CACHE = [
  '/icons/Settings.png',
  '/icons/Settings.svg',
  '/icons/Policy.svg',
  '/icons/Cookies.svg',
  '/images/Screenshot144033.avif',
  '/images/Screenshot144229.avif',
  '/images/Screenshot195249.avif',
  '/images/Screenshot195303.avif',
  '/',
  '/html/privacyp',
  '/html/cookiep',
  '/html/aboutSoftware',
  '/html/about',
  '/html/faq',
  '/html/contactForm',
  '/html/404',
  '/css/style.css',
  '/css/preloader.css',
  '/css/topnbottom.css',
  '/css/privacyp.css',
  '/css/cookiep.css',
  '/css/aboutSoftware.css',
  '/css/about.css',
  '/css/faq.css',
  '/css/contactForm.css',
  '/css/404.css',
  '/css/DataGuardian.css',
  '/js/EclipseMode.js',
  '/js/animation.js',
  '/js/preloader.js',
  '/js/expand.js',
  '/js/index.js',
  '/js/script.js',
  '/js/faq.js',
  '/js/register-service.js',
  '/js/DataGuardian.js',
  '/manifest.json',
];
const serviceWorkerCache = new ServiceWorkerCache(CACHE_NAME, FILES_TO_CACHE);
self.addEventListener('install', (event) => {
  event.waitUntil(serviceWorkerCache.onInstall(event));
});
self.addEventListener('activate', (event) => {
  event.waitUntil(serviceWorkerCache.onActivate(event));
});
self.addEventListener('fetch', (event) => {
  serviceWorkerCache.onFetch(event);
});
self.addEventListener('beforeinstallprompt', (event) => {
  serviceWorkerCache.onBeforeInstallPrompt(event);
});
self.addEventListener('push', (event) => {
  serviceWorkerCache.onPush(event);
});
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
});