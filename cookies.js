// Dark mode functions
function setDarkMode() {
    // Add 'dark-theme' class to the body
    document.body.classList.add('dark-theme');
}

function setLightMode() {
    // Remove 'dark-theme' class from the body
    document.body.classList.remove('dark-theme');
}

function toggleDarkMode() {
    // Toggle between dark and light mode
    const isDarkMode = document.body.classList.contains('dark-theme');
    if (isDarkMode) {
        setLightMode();
    } else {
        setDarkMode();
    }
}

// Check for dark mode preference and set the theme accordingly
document.addEventListener("DOMContentLoaded", function () {
    try {
        if (window.matchMedia) {
            const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

            if (darkModeMediaQuery.matches) {
                setDarkMode();
            }
        } else {
            console.error('matchMedia is not supported. Dark mode preference may not work.');
        }
    } catch (error) {
        console.error('An error occurred while checking dark mode preference:', error);
    }
});
