(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class FooterDate {
			static activationInfo() {
				console.info("FooterDate activated!");
			}

			constructor() {
				this.year = document.querySelector("#year");

				if (this.year) {
					this.variable = null;
					this.variable_final = null;
					this.updateYear();
				} else {
					console.error("Missing required FooterDate elements!");
				}
			}

			updateYear = () => {
				this.variable = new Date();
				this.variable_final = this.variable.getFullYear();
				this.year.textContent = this.variable_final;
			};
		}

		new FooterDate();

		FooterDate.activationInfo();
	});
})();