"use strict";
const myDarkModeModule = (function () {
    const DARK_THEME_CLASS = 'dark-theme';

    // Button for toggling dark mode
    const darkModeToggleBtn = document.createElement('button');
    darkModeToggleBtn.setAttribute('aria-label', 'Toggle Dark Mode'); // ARIA label
    darkModeToggleBtn.setAttribute('role', 'switch'); // ARIA role
    darkModeToggleBtn.setAttribute('aria-checked', 'false'); // Initial state

    // Add button to the DOM (adjust placement as needed)
    document.body.appendChild(darkModeToggleBtn);

    function setDarkMode() {
        try {
            document.body.classList.add(DARK_THEME_CLASS);
            darkModeToggleBtn.setAttribute('aria-checked', 'true'); // Update ARIA state
        } catch (error) {
            handleDarkModeError('An error occurred while setting dark mode:', error);
        }
    }

    function setLightMode() {
        try {
            document.body.classList.remove(DARK_THEME_CLASS);
            darkModeToggleBtn.setAttribute('aria-checked', 'false'); // Update ARIA state
        } catch (error) {
            handleDarkModeError('An error occurred while setting light mode:', error);
        }
    }

    function toggleDarkMode() {
        try {
            const isDarkMode = document.body.classList.contains(DARK_THEME_CLASS);
            isDarkMode ? setLightMode() : setDarkMode();
        } catch (error) {
            handleDarkModeError('An error occurred while toggling dark mode:', error);
        }
    }

    function checkAndSetDarkModePreference() {
        try {
            if (window.matchMedia) {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                darkModeMediaQuery.addEventListener('change', (event) => { // Event listener
                    event.matches ? setDarkMode() : setLightMode();
                });
                if (darkModeMediaQuery.matches) {
                    setDarkMode();
                }
            } else {
                console.error('matchMedia is not supported. Dark mode preference may not work.');
            }
        } catch (error) {
            handleDarkModeError('An error occurred while checking dark mode preference:', error);
        }
    }

    function handleDarkModeError(message, error) {
        console.error(message, error);
    }

    // Attach event listener to the button
    darkModeToggleBtn.addEventListener('click', toggleDarkMode);

    return {
        setDarkMode,
        setLightMode,
        toggleDarkMode,
        checkAndSetDarkModePreference
    };
})();
