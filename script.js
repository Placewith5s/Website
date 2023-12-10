document.addEventListener("DOMContentLoaded", function () {
    // Call the function to check and set dark mode preference
    myDarkModeModule.checkAndSetDarkModePreference();
});

const MenuManager = {
    // Toggle the drawer's display
    toggleDrawer: function() {
        const drawer = document.getElementById('drawer');
        drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
    },

    // Handle clicks on links within the drawer
    handleDrawerClick: function(event) {
        const drawer = document.getElementById('drawer');

        if (event.target.id === 'aboutUsLink') {
            toggleAboutUs();
            drawer.style.display = 'none';
        }

        if (event.target.id === 'privacyPolicyLink') {
            drawer.style.display = 'none';
        }

        if (event.target.id === 'cookiesLink') {
            drawer.style.display = 'none';
        }

        if (event.target.id === 'faqLink') {
            drawer.style.display = 'none';
        }
    },

    // Initialize menu-related event listeners
    initializeMenu: function() {
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
