// Function to generate a unique identifier (timestamp)
function generateUniqueIdentifier() {
    return new Date().getTime();
  }
  
  // Check if the URL has already been modified
  let urlModified = localStorage.getItem('urlModified') === 'true';
  
  // If the URL has not been modified, update it with a unique identifier
  if (!urlModified) {
    var uniqueIdentifier = generateUniqueIdentifier();
    history.replaceState(null, null, `404.html?error=${uniqueIdentifier}`);
    localStorage.setItem('urlModified', 'true');
  }
  
  // Attach an event listener to the 'beforeunload' event
  window.addEventListener('beforeunload', function () {
    // Clear the flag in local storage when the user leaves the page
    localStorage.removeItem('urlModified');
  });