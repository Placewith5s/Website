'use strict';

const myDarkModeModule = (function () {
    const DARK_THEME_CLASS = 'dark-theme';

    function setDarkMode() {
        try {
            document.body.classList.add(DARK_THEME_CLASS);
        } catch (error) {
            handleDarkModeError('An error occurred while setting dark mode:', error);
        }
    }

    function setLightMode() {
        try {
            document.body.classList.remove(DARK_THEME_CLASS);
        } catch (error) {
            handleDarkModeError('An error occurred while setting light mode:', error);
        }
    }

    function toggleDarkModeBasedOnPreference(prefersDarkMode) {
        prefersDarkMode ? setDarkMode() : setLightMode();
    }

    async function checkAndSetDarkModePreference() {
        try {
            // Wait for a small delay to ensure other styles have loaded
            await new Promise(resolve => setTimeout(resolve, 100)); 

            if (window.matchMedia) {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
                toggleDarkModeBasedOnPreference(darkModeMediaQuery.matches);

                darkModeMediaQuery.addEventListener('change', (event) => {
                    toggleDarkModeBasedOnPreference(event.matches);
                });
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

    return {
        checkAndSetDarkModePreference
    };
})();

document.addEventListener("DOMContentLoaded", async function () {
    await myDarkModeModule.checkAndSetDarkModePreference(); 
});
