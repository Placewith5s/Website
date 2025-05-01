"use strict";
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		class Menu_Manager {
			static activation_info() {
				console.info("Menu Manager activated!")
			}

			constructor() {
				this.drawer = document.querySelector("#drawer");
				this.menu_icon = document.querySelector("#menu-icon")

				if (this.drawer && this.menu_icon) {
					this.drawer.setAttribute("aria-hidden", "true");
					this.menu_icon.setAttribute("aria-expanded", "false");

					this.handle_drawer_click = (e) => {
						if (e.target.tagName === "A" || e.target.id === "hide-drawer-btn") {
							this.close_drawer()
						}
					};

					this.initialize_menu()
				} else {
					console.error("Missing required Menu_Manager elements!")
				}
			}

			initialize_menu() {
				this.menu_icon.addEventListener("click", () => {
					try {
						const is_opened = this.drawer.classList.toggle("opened");
						this.drawer.setAttribute("aria-hidden", !is_opened);
						this.menu_icon.setAttribute("aria-expanded", is_opened)
					} catch (e) {
						throw new Error("menu-icon event failed!")
					}
				}, {
					passive: true
				})

				this.drawer.addEventListener("click", this.handle_drawer_click, {
					passive: true
				})
			}

			close_drawer() {
				this.drawer.classList.remove("opened");
				this.drawer.setAttribute("aria-hidden", "true");
				this.menu_icon.setAttribute("aria-expanded", "false")
			}
		}

		new Menu_Manager();
		Menu_Manager.activation_info()
	});
})()