"use strict";
document.addEventListener("DOMContentLoaded", () => {
	class Expand_Collapse {
		#show_hide_btn;
		constructor() {
			// get the show hide button
			this.#show_hide_btn = document.querySelector("#show-hide-btn");

			// check the expand collapse button's existance to handle adding its passive event listener and calling hide_elements_by_default()
			if (this.#show_hide_btn) {
				this.#show_hide_btn.addEventListener("click", () => this.#toggle_elements(), {
					passive: true
				});
				this.#hide_elements_by_default();
			} else {
				console.error("Missing required Expand Collapse elements!");
			}
		}

		// function to handle hiding the hidden steps by default
		#hide_elements_by_default() {
			document.querySelectorAll('[id^="step-hidden-from-"]').forEach(element => {
				element.style.display = "none";
				element.setAttribute("aria-hidden", "true");
			})
		}

		// function to check and handle toggling of hidden steps
		#toggle_elements() {
			// attempt to check and handle toggling of hidden steps
			try {
				const hidden_elements = document.querySelectorAll('[id^="step-hidden-from-"]');

				// check whether no hidden steps exist
				if (!hidden_elements.length) {
					throw new Error("Initial hidden elements not found!");
				}

				hidden_elements.forEach(element => {
					this.#toggle_element_visibility(element);

					const match = element.id.match(/step-hidden-from-(\d+)/);
					// check and handle the string 'match'
					if (match) {
						const heading_id = `step${match[1]}-hidden-heading`;

						// check and handle the element style's display value and handle aria-labelledby
						if (element.style.display !== "none") {
							element.setAttribute("aria-labelledby", heading_id);
						} else {
							element.removeAttribute("aria-labelledby");
						}
					}
				})

				this.#update_button_text_and_aria();
			} catch (err) {
				throw new Error("Error during toggle of hidden steps:", err);
			}
		}

		// function to toggle the hidden steps' visibility
		#toggle_element_visibility(element) {
			if (!element) {
				console.error("No element given!");
				return;
			}

			// attempt to toggle the hidden steps' visibility
			try {
					const is_hidden = element.style.display === "none";
					// check and handle both the display and aria-hidden values
					if (is_hidden) {
						element.style.display = "block";
						element.setAttribute("aria-hidden", "false");
					} else {
						element.style.display = "none";
						element.setAttribute("aria-hidden", "true");
					}
			} catch (err) {
				throw new Error("Error occurred while toggling element visibility:", err);
			}
		}

		// function to check and handle the expand button's text and aria-expanded
		#update_button_text_and_aria() {
			// check and handle the expand button's text and handle aria-expanded value
			if (this.#show_hide_btn.textContent === "Show All") {
				this.#show_hide_btn.textContent = "Hide All";
				this.#show_hide_btn.setAttribute("aria-expanded", "true");
			} else {
				this.#show_hide_btn.textContent = "Show All";
				this.#show_hide_btn.setAttribute("aria-expanded", "false");
			}
		}
	}

	// call the expand collapse constructor
	new Expand_Collapse();
});