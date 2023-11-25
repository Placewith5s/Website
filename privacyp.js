// Function to update the URL without page refresh
function updateUrl() {
    // Get the base URL of the external website
    var baseUrl = 'http://placewith5s.com/';

    // New URL with the 'page' parameter
    var newUrl = baseUrl + 'privacyp.html?page=new-privacy-page';

    // Log to the console to check if the function is being called
    console.log('Updating URL:', newUrl);

    // Update the URL without a page refresh
    history.pushState({}, document.title, newUrl);
}

// Call the function when the page loads
window.onload = function () {
    updateUrl();
    // Log to the console to check if the page load event is firing
    console.log('Page loaded');
};

// Privacy functions
const privacyModule = (function () {
    // Private variables
    let policyMain = document.getElementById("policy");
    const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Private function to toggle dark mode
    function toggleDarkMode() {
        policyMain.classList.toggle("dark-mode");
    }

    // Private function to handle changes in color scheme
    function handleColorSchemeChange(event) {
        if (event.matches) {
            toggleDarkMode();
        }
    }

    // Private function to initialize privacy settings
    function initializePrivacy() {
        // Add an event listener for changes in color scheme
        colorSchemeMediaQuery.addEventListener("change", handleColorSchemeChange);

        // Check the initial color scheme and toggle dark mode if necessary
        if (colorSchemeMediaQuery.matches) {
            toggleDarkMode();
        }

        // Event listener for before unloading the page
        window.addEventListener("beforeunload", function () {
            // Remove the event listener for changes in color scheme
            colorSchemeMediaQuery.removeEventListener("change", handleColorSchemeChange);
        });
    }

    // Public interface
    return {
        initializePrivacy: initializePrivacy,
        toggleDarkMode: toggleDarkMode,
    };
})();

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize privacy settings
    privacyModule.initializePrivacy();
});
