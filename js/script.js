( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class MenuManager {
        static activationInfo() {
            console.info("MenuManager activated!");
        }
        constructor() {
            this.drawer = document.querySelector("#drawer");
            this.menuIcon = document.querySelector("#menuIcon");
            if (!this.drawer || !this.menuIcon) {
                console.error("Missing required MenuManager elements in the DOM!");
                return;
            }
            if (this.drawer || this.menuIcon) {
            this.drawer.setAttribute("aria-hidden", "true");
            this.menuIcon.setAttribute("aria-expanded", "false");
            }
            else {
                console.error("drawer and/or menuIcon not found!");
            }
            this.handleDrawerClick = (event) => {
                const isLinkClick = event.target.tagName === "A";
                if (isLinkClick || event.target.id === "hideDrawerBtn") {
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
                    throw new err("menuIcon event failed!");
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
    menuManagerInstance.drawer.removeEventListener("click", menuManagerInstance);
    menuManagerInstance.menuIcon.removeEventListener("click", menuManagerInstance);
    MenuManager.activationInfo();
});
})();