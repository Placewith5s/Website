( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class MenuManager {
        static activationInfo() {
            console.info("MenuManager activated!");
        }
        constructor() {
            this.drawer = document.querySelector("#drawer");
            this.menuIcon = document.querySelector("#menu-icon");
            if (!this.drawer || !this.menuIcon) {
                console.error("Missing required MenuManager elements!");
                return;
            }
            if (this.drawer || this.menuIcon) {
            this.drawer.setAttribute("aria-hidden", "true");
            this.menuIcon.setAttribute("aria-expanded", "false");
            }
            this.handleDrawerClick = (event) => {
                const isLinkClick = event.target.tagName === "A";
                if (isLinkClick || event.target.id === "hide-drawer-btn") {
                    this.closeDrawer();
                }
            };
            this.initializeMenu();
        }
        initializeMenu = () => {
            this.menuIcon.addEventListener("click", () => {
                try {
                const isExpanded = this.drawer.classList.toggle("opened");
                this.drawer.setAttribute("aria-hidden", !isExpanded);
                this.menuIcon.setAttribute("aria-expanded", isExpanded);
                } catch (err) {
                    throw new err("menu-icon event failed!");
                }
                },
                { passive: true }
            );
            this.drawer.addEventListener("click", this.handleDrawerClick, { passive: true });
        }
        closeDrawer = () => {
            this.drawer.classList.remove("opened");
            this.drawer.setAttribute("aria-hidden", "true");
            this.menuIcon.setAttribute("aria-expanded", "false");
        }
    }
    const menuManagerInstance = new MenuManager();
    MenuManager.activationInfo();
});
})();