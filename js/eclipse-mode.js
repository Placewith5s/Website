(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class ThemeChecker {
			static activationInfo() {
				console.info("ThemeChecker activated!");
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
			};

			setLightMode = () => {
				try {
					document.body.classList.remove(this.DARK_THEME_CLASS);
				} catch (error) {
					this.handleThemeError("An error occurred while setting light mode:", error);
				}
			};

			toggleThemeBasedOnPreference = (isDarkMode) => {
				isDarkMode ? this.setDarkMode() : this.setLightMode();
			};

			async checkAndSetThemePreference() {
				try {
					const debouncedToggle = this.debounce(this.toggleThemeBasedOnPreference, 250);

					if (window.matchMedia) {
						const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

						debouncedToggle(mediaQuery.matches);

						mediaQuery.addEventListener("change", (event) => {
							debouncedToggle(event.matches);
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
			};

			debounce = (callback, delay) => {
				let timeoutId = null;
				return (...args) => {
					clearTimeout(timeoutId);
					timeoutId = setTimeout(() => {
						callback.apply(this, args);
					}, delay);
				};
			};
		}

		const themeChecker = new ThemeChecker();

		(async function initialize() {
			await themeChecker.checkAndSetThemePreference();
		})();

		ThemeChecker.activationInfo();
	});
})();