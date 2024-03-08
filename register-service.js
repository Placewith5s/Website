'use strict';

const serviceWorkerFile = 'service-worker.js';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(serviceWorkerFile)
        .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
            registration.onupdatefound = () => {
                const installingWorker = registration.installing;
                installingWorker.onstatechange = () => {
                    if (installingWorker.state === 'installed') {
                        if (navigator.serviceWorker.controller) {
                            console.log('New version available. Please refresh the page.');
                        } else {
                            console.log('Service worker installed for the first time.');
                        }
                    }
                };
            };
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
            if (error.name === 'SecurityError') {
                console.error('SecurityError: Service Worker registration failed due to security restrictions.');
            } else if (error.name === 'QuotaExceededError') {
                console.error('QuotaExceededError: Unable to register Service Worker due to storage quota exceeded.');
            } else {
                console.error('UnknownError: An unknown error occurred during Service Worker registration.');
            }
        });
}
