(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Search {
			static activationInfo() {
				console.info("Search activated!");
			}

			constructor() {
				this.searchBar = document.querySelector("#search-bar");
				this.notFoundMessage = document.querySelector("#not-found-message");

				if (this.searchBar && this.notFoundMessage) {
					this.notFoundMessage.setAttribute("aria-hidden", "true");

					this.searchBar.addEventListener("input", this.debounce(this.searchSections, 300), {
						passive: true
					});

					this.searchSections();
				} else {
					console.error("Missing required Search elements!");
				}
			}

			searchSections = () => {
				try {
					const searchTerm = this.searchBar.value.trim().toLowerCase();
					const sections = document.querySelectorAll(".search-section");
					let found = false;

					sections.forEach(section => {
						const match = section.textContent.toLowerCase().includes(searchTerm);
						section.style.display = match ? "block" : "none";
						section.setAttribute("aria-hidden", !match);
						found ||= match;
					});

					this.toggleNotFoundMessage(!found);
				} catch (error) {
					console.error("An error occurred while searching sections:", error);
				}
			};

			debounce = (fn, delay) => {
				let timeout = null;
				return (...args) => {
					clearTimeout(timeout);
					timeout = setTimeout(() => {
						fn.apply(this, args);
					}, delay);
				};
			};

			toggleNotFoundMessage = (visible) => {
				this.notFoundMessage.style.display = visible ? "block" : "none";
				this.notFoundMessage.setAttribute("aria-hidden", !visible);
				this.notFoundMessage.setAttribute("aria-live", visible ? "polite" : "off");
				this.notFoundMessage.setAttribute("role", "status");
				this.notFoundMessage.setAttribute("aria-relevant", "additions");
				this.notFoundMessage.setAttribute("aria-atomic", "true");
			};
		}

		new Search();
		Search.activationInfo();
	});
})();