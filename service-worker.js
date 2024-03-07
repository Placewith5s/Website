"use strict";

const CACHE_NAME = 'placewith5s';
const FILES_TO_CACHE = [
    '/',
    'Screenshot144033.avif',
    'Screenshot144229.avif',
    'Screenshot195249.avif',
    'Screenshot201115.avif',
    'style.css',
    'script.js',
    'preloader.css',
    'preloader.js',
    '/faq',
    'faq.css',
    'faq.js',
    '/about',
    'about.css',
    '/aboutSoftware',
    'aboutSoftware.css',
    '/privacyp',
    'privacyp.css',
    '/cookiep',
    'cookiep.css',
    '/404',
    '404.css',
    'manifest.json',
    'Settings.svg',
    'Policy.svg',
    'Cookies.svg',
    'DataGuardian.css',
    'DataGuardian.js',
    'topnbottom.css',
    'main.js',
    'EclipseMode.js',
    'animation.js',
    'register-service.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.all(FILES_TO_CACHE.map((url) => {
                return fetch(url).then((response) => {
                    if (!response.ok) {
                        throw new Error(`Failed to fetch resource: ${url}`);
                    }
                    return cache.put(url, response);
                }).catch((error) => {
                    console.error(`Failed to fetch resource: ${url}`, error);
                });
            }));
        }).catch((error) => {
            console.error('Cache addAll error:', error);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        }).catch((error) => {
            console.error('Cache deletion error:', error);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        }).catch((error) => {
            console.error('Fetch error:', error);
        })
    );
});

self.addEventListener('beforeinstallprompt', (event) => {
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
});

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: 'Settings.png'
    };

    event.waitUntil(
        self.registration.showNotification('Placewith5s', options)
    );
});
