(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Theme_Checker {
			static activation_info() {
				console.info("Theme Checker activated!");
			}

			constructor() {
				this.dark_theme_class = "dark-theme";
			}

			set_dark_mode = () => {
				try {
					document.body.classList.add(this.dark_theme_class);
				} catch (error) {
					this.handle_theme_error("An error occurred while setting dark mode:", error);
				}
			};

			set_light_mode = () => {
				try {
					document.body.classList.remove(this.dark_theme_class);
				} catch (error) {
					this.handle_theme_error("An error occurred while setting light mode:", error);
				}
			};

			toggle_theme_based_on_preference = (is_dark_mode) => {
				is_dark_mode ? this.set_dark_mode() : this.set_light_mode();
			};

			async check_and_set_theme_preference() {
				try {
					const debounced_toggle = this.debounce(this.toggle_theme_based_on_preference, 250);

					if (window.matchMedia) {
						const media_query = window.matchMedia("(prefers-color-scheme: dark)");

						debounced_toggle(media_query.matches);

						media_query.addEventListener("change", (event) => {
							debounced_toggle(event.matches);
						});
					} else {
						console.error("matchMedia is not supported. Theme preference may not work.");
					}
				} catch (error) {
					this.handle_theme_error("An error occurred while checking theme preference:", error);
				}
			}

			handle_theme_error = (message, error) => {
				console.error(message, error);
			};

			debounce = (callback, delay) => {
				let timeout_id = null;
				return (...args) => {
					clearTimeout(timeout_id);
					timeout_id = setTimeout(() => {
						callback.apply(this, args);
					}, delay);
				};
			};
		}

		const theme_checker = new Theme_Checker();

		(async function initialize() {
			await theme_checker.check_and_set_theme_preference();
		})();

		Theme_Checker.activation_info();
	});
})();