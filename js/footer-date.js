(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Footer_Date {
			static activation_info() {
				console.info("Footer Date activated!");
			}

			constructor() {
				this.year = document.querySelector("#year");

				if (this.year) {
					this.variable = null;
					this.variable_final = null;
					this.update_year();
				} else {
					console.error("Missing required FooterDate elements!");
				}
			}

			update_year = () => {
				this.variable = new Date();
				this.variable_final = this.variable.getFullYear();
				this.year.textContent = this.variable_final;
			};
		}

		new Footer_Date();

		Footer_Date.activation_info();
	});
})();