"use strict";
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

    return {
        setDarkMode,
        setLightMode,
        toggleDarkMode,
        checkAndSetDarkModePreference
    };
})();
