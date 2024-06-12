"use strict";
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
  async onInstall(event) {
    event.waitUntil(
      caches.open(this.cacheName).then((cache) =>
        Promise.all(
          this.filesToCache.map(async (url) => {
            try {
              const response = await fetch(url);
              if (!response.ok) {
                throw new Error(`Failed to fetch resource: ${url}`);
              }
              return cache.put(url, response);
            } catch (error) {
              console.error(`Failed to fetch resource: ${url}`, error);
            }
          })
        )
      ).catch((error) => {
        console.error('Cache addAll error:', error);
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
  async onFetch(event) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      }).catch((error) => {
        console.error('Fetch error:', error);
      })
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
      icon: 'Settings.png' 
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
const CACHE_NAME = 'placewith5s-v102';
const FILES_TO_CACHE = [
    '/',
    '/index.js',
    'manifest.json',
    '/register-service.js',
    'Settings.png',
    'Settings.svg',
    'Policy.svg',
    'Cookies.svg',
    'Screenshot144033.avif',
    'Screenshot144229.avif',
    'Screenshot195249.avif',
    'Screenshot195303.avif',
    '/style.css',
    '/script.js',
    '/animation.js',
    '/expand.js',
    '/EclipseMode.js',
    '/preloader.css',
    '/preloader.js',
    '/DataGuardian.css',
    '/DataGuardian.js',
    '/topnbottom.css',
    '/404',
    '/404.css',
    '/privacyp',
    '/privacyp.css',
    '/cookiep',
    '/cookiep.css',
    '/faq',
    '/faq.css',
    '/faq.js',
    '/aboutSoftware',
    '/aboutSoftware.css',
    '/about',
    '/about.css',
    '/contactForm',
    '/contactForm.css',
    '/contactForm.js',
];
new ServiceWorkerCache(CACHE_NAME, FILES_TO_CACHE); 