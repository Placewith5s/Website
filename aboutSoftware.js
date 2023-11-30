// Dark mode functions
const darkMode = (function () {
    // Private functions

    // Function to set dark mode by adding 'dark-theme' class to the body
    function setDarkMode() {
        document.body.classList.add('dark-theme');
    }

    // Function to set light mode by removing 'dark-theme' class from the body
    function setLightMode() {
        document.body.classList.remove('dark-theme');
    }

    // Function to toggle between dark and light mode
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    }

    // Check for dark mode preference and set the theme accordingly
    function checkAndSetDarkModePreference() {
        try {
            if (window.matchMedia) {
                // Use matchMedia to check the user's preference for dark mode
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

                // If the user prefers dark mode, set the dark theme
                if (darkModeMediaQuery.matches) {
                    setDarkMode();
                }
            } else {
                // Log an error if matchMedia is not supported
                console.error('matchMedia is not supported. Dark mode preference may not work.');
            }
        } catch (error) {
            // Log an error if an exception occurs during dark mode preference check
            console.error('An error occurred while checking dark mode preference:', error);
        }
    }

    // Expose public functions
    return {
        setDarkMode,
        setLightMode,
        toggleDarkMode,
        checkAndSetDarkModePreference
    };
})();

// Check and set dark mode preference when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    darkMode.checkAndSetDarkModePreference();
});
