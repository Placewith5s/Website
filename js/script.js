(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class MenuManager {
			static activationInfo() {
				console.info("MenuManager activated!");
			}

			constructor() {
				this.drawer = document.querySelector("#drawer");
				this.menuIcon = document.querySelector("#menu-icon");

				if (this.drawer && this.menuIcon) {
					this.drawer.setAttribute("aria-hidden", "true");
					this.menuIcon.setAttribute("aria-expanded", "false");

					this.handleDrawerClick = (e) => {
						if (e.target.tagName === "A" || e.target.id === "hide-drawer-btn") {
							this.closeDrawer();
						}
					};

					this.initializeMenu();
				} else {
					console.error("Missing required MenuManager elements!");
				}
			}

			initializeMenu() {
				this.menuIcon.addEventListener("click", () => {
					try {
						const isOpened = this.drawer.classList.toggle("opened");
						this.drawer.setAttribute("aria-hidden", !isOpened);
						this.menuIcon.setAttribute("aria-expanded", isOpened);
					} catch (e) {
						throw new Error("menu-icon event failed!");
					}
				}, {
					passive: true
				});

				this.drawer.addEventListener("click", this.handleDrawerClick, {
					passive: true
				});
			}

			closeDrawer() {
				this.drawer.classList.remove("opened");
				this.drawer.setAttribute("aria-hidden", "true");
				this.menuIcon.setAttribute("aria-expanded", "false");
			}
		}

		new MenuManager();
		MenuManager.activationInfo();
	});
})();