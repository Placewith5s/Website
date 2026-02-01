"use strict";
document.addEventListener("DOMContentLoaded", () => {
    class Footer_Date {
        #footer;
        #year;
        constructor() {
            this.#footer = document.querySelector('footer');
            if (!this.#footer) {
                throw new Error("No footer element!");
            }
            this.#year = this.#footer.querySelector("#year");
            this.#upd_year();
        }
        #upd_year() {
            const current_date = new Date();
            const current_year = current_date.getFullYear();
            if (this.#year) {
                this.#year.textContent = current_year.toString() + "\u2009";
            }
        }
    }
    new Footer_Date();
});
