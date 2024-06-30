'use strict';
(function() {
  class ServiceWorkerCache {
    constructor(cacheName, filesToCache) {
      this.cacheName = cacheName;
      this.filesToCache = filesToCache;
      this.initializeEventListeners();
    }
    initializeEventListeners() {
      self.addEventListener('install', (event) => this.onInstall(event));
      self.addEventListener('activate', (event) => this.onActivate(event));
      self.addEventListener('fetch', (event) => this.onFetch(event));
      self.addEventListener('beforeinstallprompt', (event) => this.onBeforeInstallPrompt(event));
      self.addEventListener('push', (event) => this.onPush(event));
      self.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SKIP_WAITING') {
          self.skipWaiting();
        } else if (event.data && event.data.type === 'updateCache') {
          if (Array.isArray(event.data.updatedFiles)) {
            this.updateCache(event.data.updatedFiles);
          } else {
            console.warn("Invalid updateCache message:", event.data);
          }
        }
      });
    }
    async onInstall(event) {
      const cache = await caches.open(this.cacheName);
      await cache.addAll(this.filesToCache);
    }
    async onActivate(event) {
      const cacheWhitelist = [this.cacheName];
      const keyList = await caches.keys();
      await Promise.all(keyList.map((key) => !cacheWhitelist.includes(key) ? caches.delete(key) : null));
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
            if (networkResponse.ok) {
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
      if (confirm("Install this app?")) {
        event.prompt();
        event.userChoice.then((choiceResult) => choiceResult.outcome === 'accepted' ? console.log('User accepted the install prompt') : console.log('User dismissed the install prompt'));
      }
    }
    onPush(event) {
      const options = {
        body: event.data.text(),
        icon: '/icons/Settings.png',
        actions: [{ action: 'open_app', title: 'Open App' }, { action: 'dismiss', title: 'Dismiss' }],
        data: { notificationType: 'push' }
      };
      event.waitUntil(self.registration.showNotification('Placewith5s', options));
    }
    updateCache(updatedFiles) {
      caches.open(this.cacheName).then((cache) => cache.addAll(updatedFiles || this.filesToCache));
    }
  }
const CACHE_NAME = 'placewith5s-v111';
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
    '/js/contactForm.js',
    '/js/register-service.js',
    '/js/DataGuardian.js',
    '/manifest.json',
];
new ServiceWorkerCache(CACHE_NAME, FILES_TO_CACHE); 
})();