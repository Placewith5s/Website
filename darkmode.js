// darkMode.js
const myDarkModeModule = (function () {
    // Check if document and document.body are available
    if (!document || !document.body) {
        console.error('Cannot find document or document.body. Dark mode functionality may not work.');
        return {};
    }

    function setDarkMode() {
        try {
            document.body.classList.add('dark-theme');
        } catch (error) {
            console.error('An error occurred while setting dark mode:', error);
        }
    }

    function setLightMode() {
        try {
            document.body.classList.remove('dark-theme');
        } catch (error) {
            console.error('An error occurred while setting light mode:', error);
        }
    }

    function toggleDarkMode() {
        try {
            const isDarkMode = document.body.classList.contains('dark-theme');
            isDarkMode ? setLightMode() : setDarkMode();
        } catch (error) {
            console.error('An error occurred while toggling dark mode:', error);
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
            console.error('An error occurred while checking dark mode preference:', error);
        }
    }

    return {
        setDarkMode,
        setLightMode,
        toggleDarkMode,
        checkAndSetDarkModePreference
    };
})();
