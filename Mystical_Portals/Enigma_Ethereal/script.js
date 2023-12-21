document.addEventListener("DOMContentLoaded", function () {
    // Call the function to check and set dark mode preference
    myDarkModeModule.checkAndSetDarkModePreference();
});

const MenuManager = {
    // Toggle the drawer's visibility
    toggleDrawer: function () {
        const drawer = document.getElementById('drawer');
        drawer.classList.toggle('opened');
    },

    // Handle clicks on links within the drawer
    handleDrawerClick: function (event) {
        const drawer = document.getElementById('drawer');

        const closeDrawer = () => {
            drawer.classList.remove('opened');
        };

        switch (event.target.id) {
            case 'aboutUsLink':
                toggleAboutUs();
                closeDrawer();
                break;

            case 'privacyPolicyLink':
            case 'cookiesLink':
            case 'faqLink':
                closeDrawer();
                break;
        }
    },

    // Initialize menu-related event listeners
    initializeMenu: function () {
        const menuIcon = document.getElementById('menuIcon');
        menuIcon.addEventListener('click', () => {
            this.toggleDrawer();
        });

        const drawer = document.getElementById('drawer');
        drawer.addEventListener('click', (event) => {
            this.handleDrawerClick(event);
        });
    }
};

// Initialize module
MenuManager.initializeMenu();
