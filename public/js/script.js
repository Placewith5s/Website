(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Menu_Manager {
			static activation_info() {
				console.info("Menu Manager activated!");
			}

			constructor() {
				this.drawer = document.querySelector("#drawer");
				this.menu_icon = document.querySelector("#menu-icon");
				this.summary_element = document.querySelector("summary");

				if (this.drawer && this.menu_icon && this.summary_element) {
					this.drawer.setAttribute("aria-hidden", "true");
					this.menu_icon.setAttribute("aria-expanded", "false");
					this.summary_element.setAttribute("aria-expanded", "false");

					this.handle_drawer_click = (e) => {
						if (e.target.tagName === "A" || e.target.id === "hide-drawer-btn") {
							this.close_drawer();
						}
					};

				document.addEventListener("keydown", (e) => {
					if (e.key === "Escape" && this.drawer.classList.contains("opened")) {
						this.close_drawer();
					}
				})

					this.initialize_menu()
				} else {
					console.error("Missing required Menu Manager elements!");
				}
			}

			initialize_menu() {
				this.menu_icon.addEventListener("click", () => {
					try {
						const is_opened = this.drawer.classList.toggle("opened");
						this.drawer.setAttribute("aria-hidden", (!is_opened).toString());
						this.menu_icon.setAttribute("aria-expanded", is_opened.toString());

					} catch (e) {
						throw new Error("menu-icon event failed!");
					}
				}, {
					passive: true
				})

				this.drawer.addEventListener("click", this.handle_drawer_click, {
					passive: true
				})

				document.addEventListener("click", (event) => {
					const target = event.target;

					if (target.tagName === "SUMMARY") {
						const is_expanded = target.getAttribute("aria-expanded") === "true";
						target.setAttribute("aria-expanded", !is_expanded);
					}
				},
				{ passive: true}
				)
			}

			close_drawer() {
				this.drawer.classList.remove("opened");
				this.drawer.setAttribute("aria-hidden", "true");
				this.menu_icon.setAttribute("aria-expanded", "false");
			}
		}

		new Menu_Manager();
		Menu_Manager.activation_info();
	});
})();