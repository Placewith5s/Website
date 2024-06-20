'use strict';
(function() {
class ServiceWorkerManager {
  constructor(serviceWorkerFile) {
    this.serviceWorkerFile = serviceWorkerFile;
    this.initialize();
  }
  initialize() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration(this.serviceWorkerFile)
        .then(existingRegistration => this.handleRegistration(existingRegistration))
        .catch(error => console.error('Error checking Service Worker registration:', error));
    }
  }
  handleRegistration(existingRegistration) {
    if (existingRegistration) {
      this.updateServiceWorker(existingRegistration);
    } else {
      this.registerServiceWorker();
    }
  }
  updateServiceWorker(existingRegistration) {
    existingRegistration.update()
      .then(registration => {
        console.log('Service Worker updated successfully (scope:', registration.scope, ').');
      })
      .catch(error => {
        console.error('Service Worker update failed:', error);
      });
  }
  registerServiceWorker() {
    navigator.serviceWorker.register(this.serviceWorkerFile)
      .then(registration => {
        console.log('Service Worker registered successfully (scope:', registration.scope, ').');
        this.handleUpdateFound(registration);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
        this.handleRegistrationError(error);
      });
  }
  handleUpdateFound(registration) {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
          this.promptForReload();
        } else if (installingWorker.state === 'installed') {
          console.log('Service Worker installed for the first time.');
        }
      };
    };
  }
  promptForReload() {
    if (confirm('A new version of the app is available. Refresh now?')) {
      window.location.reload();
    } else {
      console.log('Update available but not applied yet. You will be prompted again later.');
    }
  }
  handleRegistrationError(error) {
    if (error.name === 'SecurityError') {
      console.error('SecurityError: Service Worker registration failed due to HTTPS requirement or other security restrictions.');
    } else if (error.name === 'QuotaExceededError') {
      console.error('QuotaExceededError: Unable to register Service Worker due to exceeding storage limits.');
    } else {
      console.error('UnknownError: An unexpected error occurred during Service Worker registration.');
    }
  }
  sendMessageToServiceWorker(message) {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage(message);
    }
  }
}
const serviceWorkerManager = new ServiceWorkerManager('service-worker.js');
})();