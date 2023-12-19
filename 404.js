document.addEventListener('DOMContentLoaded', function () {
  // Check if the requested resource was not found (404 error)
  if (window.location.href.indexOf('404') > -1) {
      // Show the error container
      var errorContainer = document.querySelector('.container');
      if (errorContainer) {
          errorContainer.style.display = 'block';
      }
  }
});
