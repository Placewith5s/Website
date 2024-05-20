"use strict"; // Enable strict mode for better error handling

    // Get references to the drawer and menu icon elements
    const drawer = document.getElementById('drawer'); 
    const menuIcon = document.getElementById('menuIcon');

    // Set initial ARIA attributes for accessibility
    drawer.setAttribute('aria-hidden', 'true'); // Drawer is hidden by default
    drawer.setAttribute('role', 'navigation');  // Indicate the drawer's role
    menuIcon.setAttribute('aria-expanded', 'false'); // Menu is closed by default
    menuIcon.setAttribute('aria-controls', 'drawer'); // Menu icon controls the drawer

    // Create a MenuManager object to handle drawer behavior
    const MenuManager = {
        handleDrawerClick: function (event) {
            // Get references to elements
            const drawer = document.getElementById('drawer');
            const isLinkClick = event.target.tagName === 'A'; // Check if click was on a link

            // Close the drawer if a link or the hide button was clicked
            if (isLinkClick || event.target.id === 'hideDrawerBtn') {
                drawer.classList.remove('opened'); 
                drawer.setAttribute('aria-hidden', 'true'); // Hide drawer
                menuIcon.setAttribute('aria-expanded', 'false'); // Update menu icon state
            }
        },

        handleScroll: function () {
            // Adjust drawer position on scroll if it's open
            const drawer = document.getElementById('drawer');
            const isOpen = drawer.classList.contains('opened');
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            drawer.style.position = isOpen ? 'fixed' : ''; // Make it sticky if open
            drawer.style.top = isOpen ? '50px' : '';       // Offset from the top when sticky
        },

        initializeMenu: function () {
            // Get references and set ARIA roles
            const menuIcon = document.getElementById('menuIcon');
            const drawer = document.getElementById('drawer');
            drawer.querySelectorAll('a').forEach(link => link.setAttribute('role', 'menuitem'));

            // Handle menu icon click (toggle drawer)
            menuIcon.addEventListener('click', () => {
                const isExpanded = drawer.classList.toggle('opened'); 
                drawer.setAttribute('aria-hidden', !isExpanded); // Update aria-hidden
                menuIcon.setAttribute('aria-expanded', isExpanded); // Update aria-expanded

                this.handleScroll(); // Adjust position after toggling
            });

            // Attach event listeners
            drawer.addEventListener('click', this.handleDrawerClick.bind(this));
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    };

    // Initialize the menu functionality
    MenuManager.initializeMenu();