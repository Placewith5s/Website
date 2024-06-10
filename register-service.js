'use strict';
const serviceWorkerFile = 'service-worker.js';
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration(serviceWorkerFile)
    .then(existingRegistration => {
      if (existingRegistration) {
        existingRegistration.update()
          .then(registration => {
            console.log('Service Worker updated successfully (scope:', registration.scope, ').');
          })
          .catch(error => {
            console.error('Service Worker update failed:', error);
          });
      } else {
        navigator.serviceWorker.register(serviceWorkerFile)
          .then(registration => {
            console.log('Service Worker registered successfully (scope:', registration.scope, ').');
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
              installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (confirm('A new version of the app is available. Refresh now?')) {
                    window.location.reload();
                  } else {
                    console.log('Update available but not applied yet. You will be prompted again later.');
                  }
                } else if (installingWorker.state === 'installed') {
                  console.log('Service Worker installed for the first time.');
                }
              };
            };
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);

            if (error.name === 'SecurityError') {
              console.error('SecurityError: Service Worker registration failed due to HTTPS requirement or other security restrictions.');
            } else if (error.name === 'QuotaExceededError') {
              console.error('QuotaExceededError: Unable to register Service Worker due to exceeding storage limits.');
            } else {
              console.error('UnknownError: An unexpected error occurred during Service Worker registration.');
            }
          });
      }
    })
    .catch(error => {
      console.error('Error checking Service Worker registration:', error);
    });
}
function sendMessageToServiceWorker(message) {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message);
  }
}