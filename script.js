"use strict";

    const drawer = document.getElementById('drawer'); 
    const menuIcon = document.getElementById('menuIcon');

    drawer.setAttribute('aria-hidden', 'true');
    menuIcon.setAttribute('aria-expanded', 'false');

    const MenuManager = {
        handleDrawerClick: function (event) {
            const drawer = document.getElementById('drawer');
            const isLinkClick = event.target.tagName === 'A';

            if (isLinkClick || event.target.id === 'hideDrawerBtn') {
                drawer.classList.remove('opened'); 
                drawer.setAttribute('aria-hidden', 'true');
                menuIcon.setAttribute('aria-expanded', 'false');
            }
        },

        handleScroll: function () {
            const drawer = document.getElementById('drawer');
            const isOpen = drawer.classList.contains('opened');
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            drawer.style.position = isOpen ? 'fixed' : '';
            drawer.style.top = isOpen ? '50px' : '';
        },

        initializeMenu: function () {
            const menuIcon = document.getElementById('menuIcon');
            const drawer = document.getElementById('drawer');
            drawer.querySelectorAll('a').forEach(link => link.setAttribute('role', 'menuitem'));

            menuIcon.addEventListener('click', () => {
                const isExpanded = drawer.classList.toggle('opened'); 
                drawer.setAttribute('aria-hidden', !isExpanded);
                menuIcon.setAttribute('aria-expanded', isExpanded);

                this.handleScroll();
            });

            drawer.addEventListener('click', this.handleDrawerClick.bind(this));
            window.addEventListener('scroll', this.handleScroll.bind(this));
        }
    };

    MenuManager.initializeMenu();