(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class ExpandCollapse {
			static activationInfo() {
				console.info("ExpandCollapse activated!");
			}

			constructor() {
				this.expandCollapseButton = document.querySelector("#show-hide-btn");
				this.isInitialClick = true;

				if (this.expandCollapseButton) {
					this.expandCollapseButton.addEventListener("click", () => this.toggleElements(), {
						passive: true
					});
					this.hideElementsByDefault();
				} else {
					console.error("Missing required ExpandCollapse elements!");
				}
			}

			hideElementsByDefault() {
				document.querySelectorAll('[id^="step-hidden-from-"]').forEach(element => {
					element.style.display = "none";
					element.setAttribute("aria-hidden", "true");
				});
			}

			toggleElements() {
				try {
					const hiddenElements = document.querySelectorAll('[id^="step-hidden-from-"]');

					if (!hiddenElements.length) {
						console.error("Initial hidden elements not found.");
						return;
					}

					hiddenElements.forEach(element => {
						this.toggleElementVisibility(element);

						const match = element.id.match(/step-hidden-from-(\d+)/);
						if (match) {
							const headingId = `step${match[1]}-hidden-heading`;

							if (element.style.display !== "none") {
								element.setAttribute("aria-labelledby", headingId);
							} else {
								element.removeAttribute("aria-labelledby");
							}
						}
					});

					this.updateButtonTextAndAria();
					this.isInitialClick = false;
				} catch (error) {
					console.error("Error occurred:", error.message);
				}
			}

			toggleElementVisibility(element) {
				try {
					if (this.isInitialClick) {
						element.style.display = "block";
						element.removeAttribute("aria-hidden");
					} else {
						const isHidden = element.style.display === "none";
						element.style.display = isHidden ? "block" : "none";
						element.setAttribute("aria-hidden", isHidden ? "false" : "true");
					}
				} catch (error) {
					console.error("Error occurred while toggling element visibility:", error.message);
				}
			}

			updateButtonTextAndAria() {
				const newText = this.expandCollapseButton.textContent === "Show All" ? "Hide All" : "Show All";
				this.expandCollapseButton.textContent = newText;
				this.expandCollapseButton.setAttribute("aria-expanded", newText === "Hide All" ? "true" : "false");
			}
		}

		new ExpandCollapse();
		ExpandCollapse.activationInfo();
	});
})();