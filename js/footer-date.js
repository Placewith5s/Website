"use strict";
document.addEventListener("DOMContentLoaded", () => {
    class Footer_Date {
        #footer;
        #year;
        constructor() {
            this.#footer = document.querySelector('footer');
            this.#year = this.#footer?.querySelector("#year");
            if (this.#year) {
                this.#upd_year();
                // handle invalid footer date elements
            }
            else {
                console.error("Missing required Footer Date elements!");
            }
        }
        // function for updating the footer date's year
        #upd_year() {
            const current_date = new Date();
            const current_year = current_date.getFullYear();
            if (this.#year) {
                this.#year.textContent = current_year.toString();
            }
        }
    }
    // call the footer date constructor
    new Footer_Date();
});
