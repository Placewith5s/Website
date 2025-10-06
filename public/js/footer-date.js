(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Footer_Date {
			#year;
			#current_date;
			#current_year;
			constructor() {
				this.#year = document.querySelector("#year");

				// check year item' existance to handle current_date, current_year, and calling upd_year()
				if (this.#year) {
					this.#current_date = null;
					this.#current_year = null;
					this.#upd_year();
				} else {
					console.error("Missing required Footer_Date elements!");
				}
			}

			// function for updating the footer date's year
			#upd_year() {
				this.#current_date = new Date();
				this.#current_year = this.#current_date.getFullYear();
				this.#year.textContent = this.#current_year;
			}
		}

		// call the footer date constructor
		new Footer_Date();
	});
})();