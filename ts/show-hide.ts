document.addEventListener("DOMContentLoaded", () => {
    class Expand_Collapse {
        #main: HTMLElement | null;
        #show_hide_btn: HTMLButtonElement | null;

        constructor() {
            this.#main = document.querySelector('main');

            if (!this.#main) {
                throw new Error("No main element!");
            }

            this.#show_hide_btn = this.#main.querySelector("#show-hide-btn");

            if (this.#show_hide_btn) {
                this.#show_hide_btn.addEventListener("click", () => this.#toggle_elements(), {
                    passive: true
                });
                this.#hide_elements_by_default();
            }
            else {
                throw new Error("Missing show hide button!");
            }
        }


        #hide_elements_by_default(): void | never {
            const hidden_elements: NodeListOf<HTMLElement> = document.querySelectorAll('[id^="step-hidden-from-"]');
            
            hidden_elements.forEach(elem => {
                elem.style.display = "none";
                elem.setAttribute("aria-hidden", "true");
            });
        }

        #check_hidden_elements(hidden_elements: NodeListOf<HTMLElement>): void {
            if (!hidden_elements.length) {
                throw new Error("No initial hidden elements!");
            }
        }

        #handle_match(match: RegExpMatchArray | null, elem: HTMLElement): void {
            if (match) {
                const heading_id: string = `step${match[1]}-hidden-heading`;

                if (elem.style.display !== "none") {
                    elem.setAttribute("aria-labelledby", heading_id);
                }
                else {
                    elem.removeAttribute("aria-labelledby");
                }
            }
        }

        #toggle_elements(): void | never {
            try {
                const hidden_elements: NodeListOf<HTMLElement> = document.querySelectorAll('[id^="step-hidden-from-"]');

                this.#check_hidden_elements(hidden_elements);

                hidden_elements.forEach(elem => {
                    this.#toggle_elem_visibility(elem);
                    const match: RegExpMatchArray | null = elem.id.match(/step-hidden-from-(\d+)/);
                    this.#handle_match(match, elem);
                });

                this.#update_btn_text_and_aria();
            }
            catch (err) {
                throw new Error(`Error during toggle of hidden steps: ${err}`);
            }
        }

        #check_elem(elem: HTMLElement): void | never {
            if (!elem) {
                throw new Error("No html element given!");
            }
        }

        #handle_hidden(is_hidden: boolean, elem: HTMLElement): void {
            if (is_hidden) {
                elem.style.display = "block";
                elem.setAttribute("aria-hidden", "false");
            }
            else {
                elem.style.display = "none";
                elem.setAttribute("aria-hidden", "true");
            }
        }
        
        #toggle_elem_visibility(elem: HTMLElement): void | never {
            this.#check_elem(elem);

            try {
                const is_hidden: boolean = elem.style.display === "none";
                this.#handle_hidden(is_hidden, elem);
            }
            catch (err) {
                throw new Error(`Error occurred while toggling element visibility: ${err}`);
            }
        }

        #update_btn_text_and_aria(): void {
            if (this.#show_hide_btn) {
                if (this.#show_hide_btn.textContent === "Show All") {
                    this.#show_hide_btn.textContent = "Hide All";
                    this.#show_hide_btn.setAttribute("aria-expanded", "true");
                }
                else {
                    this.#show_hide_btn.textContent = "Show All";
                    this.#show_hide_btn.setAttribute("aria-expanded", "false");
                }
            }
        }
    }

    new Expand_Collapse();
});
