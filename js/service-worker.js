"use strict";
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
    self.addEventListener('beforeinstallprompt', (event) =>
      this.onBeforeInstallPrompt(event)
    );
    self.addEventListener('push', (event) => this.onPush(event));
    self.addEventListener('message', (event) => this.onMessage(event));
  }
  onMessage(event) {
    if (event.origin !== self.location.origin) { 
      console.warn("Message received from untrusted origin:", event.origin);
      return;
    }
    if (event.data && event.data.type === 'updateCache') {
      if (!Array.isArray(event.data.updatedFiles)) {
        console.warn("Invalid updateCache message:", event.data);
        return;
      }
      this.updateCache(event.data.updatedFiles);  
    }
  }
  updateCache(updatedFiles) { 
    caches.open(this.cacheName).then((cache) => {
      return cache.addAll(updatedFiles || this.filesToCache);
    });
  }
  async onInstall(event) {
    event.waitUntil(
      caches.open(this.cacheName).then((cache) =>
        Promise.all(
          this.filesToCache.map(async (url) => {
            try {
              const response = await fetch(url, { mode: 'cors' });
              if (!response.ok || !url.startsWith('https://')) {
                throw new Error(`Failed to fetch resource: ${url}`);
              }
              return cache.put(url, response);
            } catch (error) {
              console.error(`Failed to fetch resource: ${url}`, error);
              throw error;
            }
          })
        )
      ).catch((error) => {
        console.error('Cache addAll error:', error);
        throw error;
      })
    );
  }
  async onActivate(event) {
    event.waitUntil(
      caches.keys().then((keyList) =>
        Promise.all(
          keyList.map((key) => (key !== this.cacheName ? caches.delete(key) : null))
        )
      ).catch((error) => {
        console.error('Cache deletion error:', error);
      })
    );
  }
  onFetch(event) {
    event.respondWith(
      (async () => {
        const cacheResponse = await caches.match(event.request);
        if (cacheResponse) {
          return cacheResponse;
        }
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok && event.request.url.startsWith('https://')) {
            const cache = await caches.open(this.cacheName);
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          console.error('Fetch error:', 'An error occurred while fetching.');
        }
      })()
    );
  }
  onBeforeInstallPrompt(event) {
    event.preventDefault();
    const installPrompt = confirm("Install this app?");
    if (installPrompt) {
      event.prompt();
      event.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
      }).catch((error) => {
        console.error('Install prompt error:', error);
      });
    }
  }
  onPush(event) {
    const options = {
      body: event.data.text(),
      icon: '/icons/Settings.png',
      actions: [
        { action: 'open_app', title: 'Open App' },
        { action: 'dismiss', title: 'Dismiss' }
      ],
      data: { notificationType: 'push' }
    };
    event.waitUntil(
      self.registration.showNotification('Placewith5s', options)
    );
  }
  onMessage(event) {
    if (event.data && event.data.type === 'updateCache') {
      this.updateCache();
    }
  }
  updateCache() {
    caches.open(this.cacheName).then((cache) => {
      return cache.addAll(this.filesToCache);
    });
  }
}
const CACHE_NAME = 'placewith5s-v110';
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