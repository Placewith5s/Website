/* jshint esversion: 8 */
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

			set_dark_mode() {
				try {
					document.body.classList.add(this.dark_theme_class);
				} catch (err) {
					this.handle_theme_error("An error occurred while setting dark mode:", err);
				}
			}

			set_light_mode() {
				try {
					document.body.classList.remove(this.dark_theme_class);
				} catch (err) {
					this.handle_theme_error("An error occurred while setting light mode:", err);
				}
			}

			toggle_theme_based_on_preference(is_dark_mode) {
				if (is_dark_mode) {
					this.set_dark_mode();
				} else {
					this.set_light_mode();
				}
			}

			async check_and_set_theme_preference() {
				try {
					if (window.matchMedia) {
						const media_query = window.matchMedia("(prefers-color-scheme: dark)");

						this.toggle_theme_based_on_preference(media_query.matches);

						media_query.addEventListener("change", (event) => {
							this.toggle_theme_based_on_preference(event.matches);
						})
					} else {
						console.error("matchMedia is not supported. Theme preference may not work.");
					}
				} catch (err) {
					this.handle_theme_error("An error occurred while checking theme preference:", err);
				}
			}

			handle_theme_error(msg, err) {
				console.error(msg, err);
			}
		}

		const theme_checker = new Theme_Checker();

		async function init() {
			await theme_checker.check_and_set_theme_preference();
		}

		init();
		Theme_Checker.activation_info();
	});
})();