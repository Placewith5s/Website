const CACHE_NAME = 'your-cache-name-v1';
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/faq.html',
    '/faq.css',
    '/faq.js',
    '/about.html',
    '/about.css',
    '/about.js',
    '/aboutSoftware.html',
    '/aboutSoftware.css',
    '/aboutSoftware.js',
    '/privacyp.html',
    '/privacyp.css',
    '/privacyp.js',
    '/cookies.html',
    '/cookies.css',
    '/cookies.js',
    '/404.html',
    '/404.css',
    '/manifest.json',
    '/Astral_Artifacts/Settings.svg',
    '/Astral_Artifacts/Policy.svg',
    '/Astral_Artifacts/Cookies.svg',
    '/DataGuardian.css',
    '/DataGuardian.js',
    '/topnbottom.css',
    '/main.js',
    '/EclipseMode.js',
    '/register-service.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
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
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
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
        });
    }
});

self.addEventListener('push', (event) => {
    const options = {
        body: event.data.text(),
        icon: '/Astral_Artifacts/Settings.svg'
    };

    event.waitUntil(
        self.registration.showNotification('Placewith5s', options)
    );
});
