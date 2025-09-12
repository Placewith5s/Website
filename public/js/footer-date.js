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
					this.var = null;
					this.var_final = null;
					this.upd_year();
				} else {
					console.error("Missing required Footer_Date elements!");
				}
			}

			upd_year() {
				this.var = new Date();
				this.var_final = this.var.getFullYear();
				this.year.textContent = this.var_final;
			}
		}

		new Footer_Date();

		Footer_Date.activation_info();
	});
})();