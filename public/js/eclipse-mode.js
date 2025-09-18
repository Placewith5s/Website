(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Theme_Checker {
			constructor() {
				this.dark_theme_class = "dark-theme";
			}

			// function to assist in enabling dark mode
			set_dark_mode() {
				// attempt to assist in enabling dark mode
				try {
					document.body.classList.add(this.dark_theme_class);
				} catch (err) {
					this.handle_theme_error("An error occurred while setting dark mode:", err);
				}
			}

			// function to assist in enabling light mode
			set_light_mode() {
				// attempt to assist in enabling light mode
				try {
					document.body.classList.remove(this.dark_theme_class);
				} catch (err) {
					this.handle_theme_error("An error occurred while setting light mode:", err);
				}
			}

			// function to handle theme toggle based on preference
			toggle_theme_based_on_preference(is_dark_mode) {
				// check and handle preferred theme
				if (is_dark_mode) {
					this.set_dark_mode();
				} else {
					this.set_light_mode();
				}
			}

			// async function to check and enable the preferred theme
			async check_and_set_theme_preference() {
				// attempt to check and enable the preferred theme
				try {
					// check window match media to handle enabling the preferred theme
					if (window.matchMedia) {
						const media_query = window.matchMedia("(prefers-color-scheme: dark)");

						this.toggle_theme_based_on_preference(media_query.matches);

						media_query.addEventListener("change", (event) => {
							this.toggle_theme_based_on_preference(event.matches);
						})
					} else {
						throw new Error("matchMedia is not supported. Theme preference may not work.");
					}
				} catch (err) {
					this.handle_theme_error("An error occurred while checking theme preference:", err);
				}
			}

			// function to assist in handling theme checker errors
			handle_theme_error(msg, err) {
				throw new Error(msg, err);
			}
		}

		// call the theme checker constructor
		const theme_checker = new Theme_Checker();

		// async function to initialize the other async function
		async function init() {
			await theme_checker.check_and_set_theme_preference();
		}

		// call the initialize function
		init();
	});
})();