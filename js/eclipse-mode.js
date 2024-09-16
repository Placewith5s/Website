( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class themeChecker {
        static activationInfo() {
            console.info("themeChecker activated!");
        }
        constructor() {
            this.DARK_THEME_CLASS = "dark-theme";
        }
        setDarkMode = () => {
            try {
                document.body.classList.add(this.DARK_THEME_CLASS);
            } catch (error) {
                this.handleThemeError("An error occurred while setting dark mode:", error);
            }
        }
        setLightMode = () => {
            try {
                document.body.classList.remove(this.DARK_THEME_CLASS);
            } catch (error) {
                this.handleThemeError("An error occurred while setting light mode:", error);
            }
        }
        toggleThemeBasedOnPreference = (prefersDarkMode) => {
            prefersDarkMode ? this.setDarkMode() : this.setLightMode();
        }
        async checkAndSetThemePreference() {
            try {
                const debouncedUpdate = this.debounce(this.toggleThemeBasedOnPreference, 250);
                if (window.matchMedia) {
                    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
                    debouncedUpdate(darkModeMediaQuery.matches);
                    darkModeMediaQuery.addEventListener("change", (event) => {
                        debouncedUpdate(event.matches);
                    });
                } else {
                    console.error("matchMedia is not supported. Theme preference may not work.");
                }
            } catch (error) {
                this.handleThemeError("An error occurred while checking theme preference:", error);
            }
        }
        handleThemeError = (message, error) => {
            console.error(message, error);
        }
        debounce = (func, delay) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
            }, delay);
            }
        }
    }
    const themeCheckerInstance = new themeChecker();
    async function a() {
        await themeCheckerInstance.checkAndSetThemePreference();
    }
    a();
    themeChecker.activationInfo();
});
})();