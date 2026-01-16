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


        #hide_elements_by_default(): void {
            const hidden_elements: NodeListOf<HTMLElement> = document.querySelectorAll('[id^="step-hidden-from-"]');
            
            hidden_elements.forEach(element => {
                element.style.display = "none";
                element.setAttribute("aria-hidden", "true");
            });
        }

        // function to check and handle toggling of hidden steps
        #toggle_elements(): void {
            try {
                const hidden_elements: NodeListOf<HTMLElement> = document.querySelectorAll('[id^="step-hidden-from-"]');

                if (!hidden_elements.length) {
                    throw new Error("Initial hidden elements not found!");
                }

                hidden_elements.forEach(element => {
                    this.#toggle_element_visibility(element);
                    const match: RegExpMatchArray | null = element.id.match(/step-hidden-from-(\d+)/);

                    if (match) {
                        const heading_id: string = `step${match[1]}-hidden-heading`;
                        if (element.style.display !== "none") {
                            element.setAttribute("aria-labelledby", heading_id);
                        }
                        else {
                            element.removeAttribute("aria-labelledby");
                        }
                    }
                });

                this.#update_button_text_and_aria();
            }
            catch (err) {
                throw new Error(`Error during toggle of hidden steps: ${err}`);
            }
        }
        
        #toggle_element_visibility(element: HTMLElement): void {
            if (!element) {
                throw new Error("No element given!");
            }

            try {
                const is_hidden: boolean = element.style.display === "none";

                if (is_hidden) {
                    element.style.display = "block";
                    element.setAttribute("aria-hidden", "false");
                }
                else {
                    element.style.display = "none";
                    element.setAttribute("aria-hidden", "true");
                }
            }
            catch (err) {
                throw new Error(`Error occurred while toggling element visibility: ${err}`);
            }
        }

        #update_button_text_and_aria(): void {
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
