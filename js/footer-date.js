"use strict";
document.addEventListener("DOMContentLoaded", () => {
	class Footer_Date {
		#footer;
		#year;
		#current_date;
		#current_year;
		constructor() {
			// get the footer element
			this.#footer = document.querySelector('footer');
			// get the footer's year
			this.#year = this.#footer.querySelector("#year");

			if (this.#year) {
				this.#current_date = null;
				this.#current_year = null;
				this.#upd_year();
			// handle invalid footer date elements
			} else {
				console.error("Missing required Footer Date elements!");
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