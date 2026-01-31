document.addEventListener("DOMContentLoaded", () => {
    class Search {
        #search_bar: HTMLInputElement | null;
        #not_found_msg: HTMLDivElement | null;

        constructor() {
            this.#search_bar = document.querySelector("#search-bar");
            this.#not_found_msg = document.querySelector("#not-found-msg");

            if ((this.#search_bar && this.#not_found_msg)) {
                this.#not_found_msg.setAttribute("aria-hidden", "true");
                this.#search_listener();
            }
            else {
                throw new Error("Missing required Search elements!");
            }
        }


        #search_listener(): void {
            let debounce_search_bar: boolean = false;

            this.#search_bar?.addEventListener("input", () => {

                if (debounce_search_bar) return;
                debounce_search_bar = true;

                setTimeout(() => {
                    debounce_search_bar = false;
                    this.#search_sections();
                }, 500);
            });
        }

        #handle_match(match: boolean, section: HTMLElement): void {
            if (match) {
                section.style.display = "block";
                section.setAttribute("aria-hidden", "false");
            }
            else {
                section.style.display = "none";
                section.setAttribute("aria-hidden", "true");
            }
        }

        #search_sections(): void | never {
            try {
                const search_term: string | undefined = this.#search_bar?.value.trim().toLowerCase();

                const sections: NodeListOf<HTMLElement> = document.querySelectorAll(".search-section");

                let found: boolean = false;
                
                sections.forEach(section => {
                    if (search_term) {
                        const match: boolean = section.textContent.toLowerCase().includes(search_term);

                        this.#handle_match(match, section);
                        found ||= match;
                    }
                });
                this.#toggle_not_found_msg(!found);
            }
            catch (err) {
                throw new Error(`An error occurred while searching sections: ${err}`);
            }
        }

        #handle_visible(visible: boolean, not_found_msg: HTMLDivElement): void {
            if (visible) {
                not_found_msg.style.display = "block";
                not_found_msg.setAttribute("aria-hidden", "false");
                not_found_msg.setAttribute("aria-live", "polite");
            }
            else {
                not_found_msg.style.display = "none";
                not_found_msg.setAttribute("aria-hidden", "true");
                not_found_msg.setAttribute("aria-live", "off");
            }
        }

        #toggle_not_found_msg(visible: boolean): void {
            if (this.#not_found_msg) {
                this.#handle_visible(visible, this.#not_found_msg);

                this.#not_found_msg.setAttribute("role", "status");
                this.#not_found_msg.setAttribute("aria-relevant", "additions");
                this.#not_found_msg.setAttribute("aria-atomic", "true");
            }
        }
    }

    new Search();
});
