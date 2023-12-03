// darkMode.js
const myDarkModeModule = (function () {
    function setDarkMode() {
        document.body.classList.add('dark-theme');
    }

    function setLightMode() {
        document.body.classList.remove('dark-theme');
    }

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        isDarkMode ? setLightMode() : setDarkMode();
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