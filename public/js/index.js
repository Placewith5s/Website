"use strict";
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		class Search {
			static activation_info() {
				console.info("Search activated!")
			}

			constructor() {
				this.search_bar = document.querySelector("#search-bar");
				this.not_found_message = document.querySelector("#not-found-message")

				if (this.search_bar && this.not_found_message) {
					this.not_found_message.setAttribute("aria-hidden", "true");
					this.search_sections()
				} else {
					console.error("Missing required Search elements!")
				}
			}

			search_sections() {
				let debounce_search_bar = false;
				this.search_bar.addEventListener("input", () => {
					if (debounce_search_bar) {
						return 
					}
					debounce_search_bar = true

					setTimeout(() => {
						debounce_search_bar = false
					}, 100)
				}, {passive: true });

				try {
					const search_term = this.search_bar.value.trim().toLowerCase();
					const sections = document.querySelectorAll(".search-section");
					let found = false;

					sections.forEach(section => {
						const match = section.textContent.toLowerCase().includes(search_term);
						section.style.display = match ? "block" : "none";
						section.setAttribute("aria-hidden", !match);
						found ||= match
					});

					this.toggle_not_found_message(!found)
				} catch (error) {
					console.error("An error occurred while searching sections:", error)
				}
			}

			toggle_not_found_message(visible) {
				this.not_found_message.style.display = visible ? "block" : "none";
				this.not_found_message.setAttribute("aria-hidden", !visible);
				this.not_found_message.setAttribute("aria-live", visible ? "polite" : "off");
				this.not_found_message.setAttribute("role", "status");
				this.not_found_message.setAttribute("aria-relevant", "additions");
				this.not_found_message.setAttribute("aria-atomic", "true")
			}
		}

		new Search();
		Search.activation_info()
	});
})()