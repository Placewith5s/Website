(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Summary_Element {
			static activation_info() {
				console.info("Summary Element activated!");
			}

			constructor() {
				this.element = document.querySelector("summary");

				if (this.element) {
					this.element.setAttribute("aria-expanded", "false");

					document.addEventListener(
						"click",
						(event) => {
							const target = event.target;

							if (target.tagName === "SUMMARY") {
								const is_expanded = target.getAttribute("aria-expanded") === "true";
								target.setAttribute("aria-expanded", !is_expanded);
							}
						},
						{ passive: true }
					);
				}
			}
		}

		new Summary_Element();

		Summary_Element.activation_info();
	});
})();