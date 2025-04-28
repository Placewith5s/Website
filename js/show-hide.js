"use strict";
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		class Expand_Collapse {
			static activation_info() {
				console.info("Expand Collapse activated!")
			}

			constructor() {
				this.expand_collapse_button = document.querySelector("#show-hide-btn");
				this.is_initial_click = true;

				if (this.expand_collapse_button) {
					this.expand_collapse_button.addEventListener("click", () => this.toggle_elements(), {
						passive: true
					});
					this.hide_elements_by_default()
				} else {
					console.error("Missing required Expand_Collapse elements!")
				}
			}

			hide_elements_by_default() {
				document.querySelectorAll('[id^="step-hidden-from-"]').forEach(element => {
					element.style.display = "none";
					element.setAttribute("aria-hidden", "true")
				})
			}

			toggle_elements() {
				try {
					const hidden_elements = document.querySelectorAll('[id^="step-hidden-from-"]')

					if (!hidden_elements.length) {
						console.error("Initial hidden elements not found.");
						return
					}

					hidden_elements.forEach(element => {
						this.toggle_element_visibility(element);

						const match = element.id.match(/step-hidden-from-(\d+)/);
						if (match) {
							const heading_id = `step${match[1]}-hidden-heading`

							if (element.style.display !== "none") {
								element.setAttribute("aria-labelledby", heading_id)
							} else {
								element.removeAttribute("aria-labelledby")
							}
						}
					})

					this.update_button_text_and_aria();
					this.is_initial_click = false
				} catch (err) {
					console.error("Error occurred:", err)
				}
			}

			toggle_element_visibility(element) {
				try {
					if (this.is_initial_click) {
						element.style.display = "block";
						element.removeAttribute("aria-hidden")
					} else {
						const is_hidden = element.style.display === "none";
						element.style.display = is_hidden ? "block" : "none";
						element.setAttribute("aria-hidden", is_hidden ? "false" : "true")
					}
				} catch (err) {
					console.error("Error occurred while toggling element visibility:", err)
				}
			}

			update_button_text_and_aria() {
				const new_text = this.expand_collapse_button.textContent === "Show All" ? "Hide All" : "Show All";
				this.expand_collapse_button.textContent = new_text;
				this.expand_collapse_button.setAttribute("aria-expanded", new_text === "Hide All" ? "true" : "false")
			}
		}

		new Expand_Collapse();
		Expand_Collapse.activation_info()
	});
})()