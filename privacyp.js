// privacyp.js

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
