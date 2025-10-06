(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Menu_Manager {
			#drawer;
			#menu_icon;
			#summary_element;
			constructor() {
				this.#drawer = document.querySelector("#drawer");
				this.#menu_icon = document.querySelector("#menu-icon");
				this.#summary_element = document.querySelector("summary");

				// check menu manager items' existance to handle aria-hidden, aria-expanded, drawer clicks, adding keydown event listener, and calling initialize_menu()
				if (this.#drawer && this.#menu_icon && this.#summary_element) {
					this.#drawer.setAttribute("aria-hidden", "true");
					this.#menu_icon.setAttribute("aria-expanded", "false");
					this.#summary_element.setAttribute("aria-expanded", "false");

					// check and handle drawer click
					this.handle_drawer_click = (e) => {
						if (e.target.tagName === "A" || e.target.id === "hide-drawer-btn") {
							this.#close_drawer();
						}
					};

				// check and handle drawer click on mobile with keyboard
				document.addEventListener("keydown", (e) => {
					if (e.key === "Escape" && this.#drawer.classList.contains("opened")) {
						this.#close_drawer();
					}
				})

					this.#initialize_menu()
				} else {
					console.error("Missing required Menu Manager elements!");
				}
			}

			// function to handle both the menu and drawer
			#initialize_menu() {
				this.#menu_icon.addEventListener("click", () => {
					// attempt to handle both the menu and drawer
					try {
						const is_opened = this.#drawer.classList.toggle("opened");
						this.#drawer.setAttribute("aria-hidden", (!is_opened).toString());
						this.#menu_icon.setAttribute("aria-expanded", is_opened.toString());

					} catch (e) {
						throw new Error("menu-icon event failed:", e);
					}
				}, {
					passive: true
				})

				// add a passive click event listener to the drawer
				this.#drawer.addEventListener("click", this.handle_drawer_click, {
					passive: true
				})

				// add a passive click event listener to the document
				document.addEventListener("click", (event) => {
					const target = event.target;

					// check and handle target's tag name
					if (target.tagName === "SUMMARY") {
						const is_expanded = target.getAttribute("aria-expanded") === "true";
						target.setAttribute("aria-expanded", !is_expanded);
					}
				},
				{ passive: true}
				)
			}

			// function to close the drawer
			#close_drawer() {
				this.#drawer.classList.remove("opened");
				this.#drawer.setAttribute("aria-hidden", "true");
				this.#menu_icon.setAttribute("aria-expanded", "false");
			}
		}

		// call the menu manager constructor
		new Menu_Manager();
	});
})();