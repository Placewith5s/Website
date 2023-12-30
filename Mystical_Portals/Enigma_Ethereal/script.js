document.addEventListener("DOMContentLoaded", function () {
    // Call the function to check and set dark mode preference
    myDarkModeModule.checkAndSetDarkModePreference();
});


const MenuManager = {
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

            case 'faqLink':
            case 'aboutSoftwareLink':
                closeDrawer();
                break;
        }
    },

    // Handle scroll event to adjust the menu position
    handleScroll: function () {
        const drawer = document.getElementById('drawer');

        if (drawer.classList.contains('opened')) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            // Use position: fixed and set the top property to 50px
            drawer.style.position = 'fixed';
            drawer.style.top = '50px';
        }
    },

    // Initialize menu-related event listeners
    initializeMenu: function () {
        const menuIcon = document.getElementById('menuIcon');
        const drawer = document.getElementById('drawer');

        menuIcon.addEventListener('click', () => {
            drawer.classList.toggle('opened');
            this.handleScroll(); // Adjust position when opening/closing
        });

        drawer.addEventListener('click', (event) => {
            this.handleDrawerClick(event);
        });

        // Add scroll event listener to adjust the menu position
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
};

// Initialize module
MenuManager.initializeMenu();
