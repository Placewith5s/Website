document.addEventListener('DOMContentLoaded', function() {
    // Function to check and set the theme based on user preference
    function setTheme() {
        const body = document.body;
        const savedDarkMode = localStorage.getItem('dark-mode');

        if (savedDarkMode === 'true' || body.classList.contains('dark-theme')) {
            body.classList.add('dark-theme');
        }
    }

    // Check and set the theme on page load
    setTheme();

    // Function to toggle between light and dark modes
    function toggleTheme() {
        const body = document.body;

        // Toggle dark theme class
        body.classList.toggle('dark-theme');

        // Save user preference in local storage
        const isDarkTheme = body.classList.contains('dark-theme');
        localStorage.setItem('dark-mode', isDarkTheme);
    }

    // Listen for changes in color scheme preference and adjust the theme accordingly
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (e.matches) {
            setTheme();
        }
    });
});
