document.addEventListener("DOMContentLoaded", () => {
    class Footer_Date {
        #footer: HTMLElement | null;
        #year: HTMLSpanElement | null;
        
        constructor() {
            this.#footer = document.querySelector('footer');

            if (!this.#footer) {
                throw new Error("No footer element!");
            }

            this.#year = this.#footer.querySelector("#year");

            this.#upd_year();
        }


        #upd_year(): void {
            const current_date: Date = new Date();
            const current_year: number = current_date.getFullYear();
            
            if (this.#year) {
                this.#year.textContent = current_year.toString() + "\u2009";
            }
        }
    }

    new Footer_Date();
});
