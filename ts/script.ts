document.addEventListener("DOMContentLoaded", () => {
    class Menu_Manager {
        #drawer: HTMLElement | null;
        #menu_icon: HTMLButtonElement | null;
        #handle_drawer_click;

        constructor() {
            this.#drawer = document.querySelector("#drawer");
            this.#menu_icon = document.querySelector("#menu-icon");

            if (this.#drawer && this.#menu_icon) {
                this.#drawer.setAttribute("aria-hidden", "true");
                this.#menu_icon.setAttribute("aria-expanded", "false");

                this.#handle_drawer_click = (e: Event) => {
                    if (e.target instanceof HTMLLinkElement && (e.target.tagName === "A" || e.target.id === "hide-drawer-btn")) {
                        this.#close_drawer();
                    }
                };

                document.addEventListener("keydown", (e: KeyboardEvent) => {
                    if (e.key === "Escape" && this.#drawer?.classList.contains("opened")) {
                        this.#close_drawer();
                    }
                });

                this.#init_menu();
            }
            else {
                throw new Error("Missing required Menu Manager elements!");
            }
        }


        // function to handle both the menu and drawer
        #init_menu(): void {
            this.#menu_icon?.addEventListener("click", () => {
                try {
                    const is_opened: boolean | undefined = this.#drawer?.classList.toggle("opened");

                    if (typeof is_opened === "boolean") {
                        this.#drawer?.setAttribute("aria-hidden", String(!is_opened));
                        this.#menu_icon?.setAttribute("aria-expanded", String(is_opened));
                    }
                }
                catch (err) {
                    throw new Error(`Menu event failed: ${err}`);
                }
            }, {
                passive: true
            });

            this.#drawer?.addEventListener("click", this.#handle_drawer_click, {
                passive: true
            });
        }

        #close_drawer(): void {
            this.#drawer?.classList.remove("opened");
            this.#drawer?.setAttribute("aria-hidden", "true");
            this.#menu_icon?.setAttribute("aria-expanded", "false");
        }
    }

    new Menu_Manager();
});
