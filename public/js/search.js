(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Search {
			#search_bar;
			#not_found_msg;
			constructor() {
				this.#search_bar = document.querySelector("#search-bar");
				this.#not_found_msg = document.querySelector("#not-found-msg");

				// check search items' existance to handle calling the search_listener()
				if (this.#search_bar && this.#not_found_msg) {
					this.#not_found_msg.setAttribute("aria-hidden", "true");
					this.#search_listener();
				} else {
					console.error("Missing required Search elements!");
				}
			}

			// function to debounce searching
			#search_listener() {
				let debounce_search_bar = false;
				this.#search_bar.addEventListener("input", () => {
					if (debounce_search_bar) {
						return;
					}
					debounce_search_bar = true;

					setTimeout(() => {
						debounce_search_bar = false;
						this.#search_sections();
					}, 750)
				})
			}

			// function to handle searches
			#search_sections() {
				// attempt to handle searches
				try {
					const search_term = this.#search_bar.value.trim().toLowerCase();
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

					this.#toggle_not_found_msg(!found);
				} catch (err) {
					throw new Error("An error occurred while searching sections:", err);
				}
			}

			// function for whether an error message shall be shown
			#toggle_not_found_msg(visible) {
				// check and handle both the aria-hidden and aria-live values
				if (visible) {
					this.#not_found_msg.style.display = "block";
					this.#not_found_msg.setAttribute("aria-hidden", "false");
					this.#not_found_msg.setAttribute("aria-live", "polite");
				} else {
					this.#not_found_msg.style.display = "none";
					this.#not_found_msg.setAttribute("aria-hidden", "true");
					this.#not_found_msg.setAttribute("aria-live", "off");
				}
				// handle role, aria-relevant, and aria-atomic values
				this.#not_found_msg.setAttribute("role", "status");
				this.#not_found_msg.setAttribute("aria-relevant", "additions");
				this.#not_found_msg.setAttribute("aria-atomic", "true");
			}
		}

		// call the search constructor
		new Search();
	});
})();