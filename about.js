// Dark mode functions
function setDarkMode() {
    // Add 'dark-theme' class to the body
    document.body.classList.add('dark-theme');
    // Save dark mode preference to local storage
    localStorage.setItem('dark-mode', 'true');
}

function setLightMode() {
    // Remove 'dark-theme' class from the body
    document.body.classList.remove('dark-theme');
    // Remove dark mode preference from local storage
    localStorage.setItem('dark-mode', 'false');
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
        // Check if dark mode preference is stored in local storage
        const storedDarkMode = localStorage.getItem('dark-mode');

        if (storedDarkMode === 'true') {
            setDarkMode();
        } else {
            setLightMode();
        }
    } catch (error) {
        console.error('An error occurred while checking dark mode preference:', error);
    }
});
