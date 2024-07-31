'use strict';
(function () {
    class ServiceWorkerCache {
        constructor(cacheName, filesToCache) {
            this.cacheName = cacheName;
            this.filesToCache = filesToCache;
        }
        onInstall = async (event) => {
            event.waitUntil(
                caches.open(this.cacheName)
                    .then(cache => cache.addAll(this.filesToCache))
                    .catch(error => {
                        console.error('Install error:', error);
                        throw error;
                    })
            );
        };
        onActivate = (event) => {
            const cacheWhitelist = [this.cacheName];
            event.waitUntil(
                caches.keys().then(cacheNames => {
                    return Promise.all(
                        cacheNames.map(cacheName => {
                            if (!cacheWhitelist.includes(cacheName)) {
                                return caches.delete(cacheName).catch(error => {
                                    console.error('Cache delete error:', error);
                                });
                            } else {
                                const expirationTime = Date.now() - 24 * 60 * 60 * 1000;
                                return caches.open(cacheName).then(cache => {
                                    return cache.keys().then(requests => {
                                        return Promise.all(
                                            requests.map(async request => {
                                                const response = await cache.match(request);
                                                if (response) {
                                                    const dateHeader = response.headers.get('date');
                                                    if (dateHeader && new Date(dateHeader) < expirationTime) {
                                                        return cache.delete(request);
                                                    }
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
        };
        onFetch = (event) => {
            const request = event.request;
            if (request.method !== 'GET') {
                return;
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
        };
        onBeforeInstallPrompt = (event) => {
            event.preventDefault();
            event.prompt();
            event.userChoice.then(choiceResult => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
            }).catch(error => {
                console.error('BeforeInstallPrompt error:', error);
            });
        };
        onPush = (event) => {
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
                    console.error('Push error:', error);
                })
            );
        };
        updateCache = (updatedFiles) => {
            caches.open(this.cacheName)
                .then(cache => {
                    return cache.addAll(updatedFiles || this.filesToCache);
                })
                .catch(error => {
                    console.error('Update cache error:', error);
                });
        };
    }
    const CACHE_NAME = 'placewith5s-v1';
    const FILES_TO_CACHE = [
        '/icons/Settings.png',
        '/icons/Settings.svg',
        '/icons/Policy.svg',
        '/icons/Cookies.svg',
        '/manifest.json',
        '/sitemap.xml',
    ];
    const serviceWorkerCache = new ServiceWorkerCache(CACHE_NAME, FILES_TO_CACHE);
    const eventHandlers = {
        'install': serviceWorkerCache.onInstall,
        'activate': serviceWorkerCache.onActivate,
        'fetch': serviceWorkerCache.onFetch,
        'beforeinstallprompt': serviceWorkerCache.onBeforeInstallPrompt,
        'push': serviceWorkerCache.onPush,
        'message': (event) => {
            if (event.data && event.data.type === 'SKIP_WAITING') {
                self.skipWaiting();
            } else if (event.data && event.data.type === 'updateCache') {
                if (Array.isArray(event.data.updatedFiles)) {
                    serviceWorkerCache.updateCache(event.data.updatedFiles);
                } else {
                    console.warn("Invalid updateCache message:", event.data);
                }
            }
        }
    };
    for (const eventType in eventHandlers) {
        self.addEventListener(eventType, eventHandlers[eventType]);
    }
})();