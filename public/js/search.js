(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Search {
			constructor() {
				this.search_bar = document.querySelector("#search-bar");
				this.not_found_message = document.querySelector("#not-found-message");

				// check search items' existance to handle calling the search_listener()
				if (this.search_bar && this.not_found_message) {
					this.not_found_message.setAttribute("aria-hidden", "true");
					this.search_listener();
				} else {
					console.error("Missing required Search elements!");
				}
			}

			// function to debounce searching
			search_listener() {
				let debounce_search_bar = false;
				this.search_bar.addEventListener("input", () => {
					if (debounce_search_bar) {
						return;
					}
					debounce_search_bar = true;

					setTimeout(() => {
						debounce_search_bar = false;
						this.search_sections();
					}, 750)
				})
			}

			// function to handle searches
			search_sections() {
				// attempt to handle searches
				try {
					const search_term = this.search_bar.value.trim().toLowerCase();
					const sections = document.querySelectorAll(".search-section");
					let found = false;

					sections.forEach(section => {
						const match = section.textContent.toLowerCase().includes(search_term);
						// check and handle both the display and aria-hidden values
						if (match) {
							section.style.display = "block";
							section.setAttribute("aria-hidden", "false");
						} else {
							section.style.display = "none";
							section.setAttribute("aria-hidden", "true");
						}
						found ||= match;
					});

					this.toggle_not_found_message(!found);
				} catch (err) {
					throw new Error("An error occurred while searching sections:", err);
				}
			}

			// function for whether an error message shall be shown
			toggle_not_found_message(visible) {
				// check and handle both the aria-hidden and aria-live values
				if (visible) {
					this.not_found_message.style.display = "block";
					this.not_found_message.setAttribute("aria-hidden", "false");
					this.not_found_message.setAttribute("aria-live", "polite");
				} else {
					this.not_found_message.style.display = "none";
					this.not_found_message.setAttribute("aria-hidden", "true");
					this.not_found_message.setAttribute("aria-live", "off");
				}
				// handle role, aria-relevant, and aria-atomic values
				this.not_found_message.setAttribute("role", "status");
				this.not_found_message.setAttribute("aria-relevant", "additions");
				this.not_found_message.setAttribute("aria-atomic", "true");
			}
		}

		// call the search constructor
		new Search();
	});
})();