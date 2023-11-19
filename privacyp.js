// Function to toggle dark mode
function toggleDarkMode() {
    // Get the main content section element by ID
    let policyMain = document.getElementById("policy");

    // Toggle the 'dark-mode' class on the main content section
    policyMain.classList.toggle("dark-mode");
}

// Function to handle changes in color scheme
function handleColorSchemeChange(event) {
    // Check if the color scheme matches (dark mode)
    if (event.matches) {
        // If there's a match, toggle dark mode
        toggleDarkMode();
    }
}

// Create a media query to detect changes in color scheme preference
const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Add an event listener for changes in color scheme
colorSchemeMediaQuery.addEventListener("change", handleColorSchemeChange);

// Event listener for when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check the initial color scheme and toggle dark mode if necessary
    if (colorSchemeMediaQuery.matches) {
        toggleDarkMode();
    }
});

// Event listener for before unloading the page
window.addEventListener("beforeunload", function () {
    // Remove the event listener for changes in color scheme
    colorSchemeMediaQuery.removeEventListener("change", handleColorSchemeChange);
});
