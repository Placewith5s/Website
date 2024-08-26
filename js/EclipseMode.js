(function () {
    "use strict";
    class DarkModeModule {
        constructor() {
            this.DARK_THEME_CLASS = "dark-theme";
        }
        setDarkMode() {
            try {
                document.body.classList.add(this.DARK_THEME_CLASS);
            } catch (error) {
                this.handleDarkModeError("An error occurred while setting dark mode:", error);
            }
        }
        setLightMode() {
            try {
                document.body.classList.remove(this.DARK_THEME_CLASS);
            } catch (error) {
                this.handleDarkModeError("An error occurred while setting light mode:", error);
            }
        }
        toggleDarkModeBasedOnPreference(prefersDarkMode) {
            prefersDarkMode ? this.setDarkMode() : this.setLightMode();
        }
        async checkAndSetDarkModePreference() {
            try {
                const debouncedUpdate = debounce(this.toggleDarkModeBasedOnPreference, 100);
                if (window.matchMedia) {
                    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                    debouncedUpdate(darkModeMediaQuery.matches);
                    darkModeMediaQuery.addEventListener("change", (event) => {
                        debouncedUpdate(event.matches);
                    }, { passive: true });
                } else {
                    console.error("matchMedia is not supported. Dark mode preference may not work.");
                }
            } catch (error) {
                this.handleDarkModeError("An error occurred while checking dark mode preference:", error);
            }
        }
        handleDarkModeError(message, error) {
            console.error(message, error);
        }
    }
    const myDarkModeModule = new DarkModeModule();
    document.addEventListener("DOMContentLoaded", async function () {
        await myDarkModeModule.checkAndSetDarkModePreference();
    });
    function debounce(func, wait) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }
})();