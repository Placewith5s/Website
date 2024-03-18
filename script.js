"use strict";
document.addEventListener("DOMContentLoaded", async function () {
    await myDarkModeModule.checkAndSetDarkModePreference();
});

drawer.setAttribute('aria-hidden', 'true');

const MenuManager = {
    handleDrawerClick: function (event) {
        const drawer = document.getElementById('drawer');

        const closeDrawer = () => {
            drawer.classList.remove('opened');
            drawer.setAttribute('aria-hidden', 'true');
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

            case 'hideDrawerBtn':
                closeDrawer();
                break;
        }
    },

    handleScroll: function () {
        const drawer = document.getElementById('drawer');

        if (drawer.classList.contains('opened')) {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;

            drawer.style.position = 'fixed';
            drawer.style.top = '50px';
        }
    },

    initializeMenu: function () {
        const menuIcon = document.getElementById('menuIcon');
        const drawer = document.getElementById('drawer');
        const hideDrawerBtn = document.getElementById('hideDrawerBtn');

        menuIcon.addEventListener('click', () => {
            drawer.classList.toggle('opened');
            if (drawer.classList.contains('opened')) {
                drawer.removeAttribute('aria-hidden');
            } else {
                drawer.setAttribute('aria-hidden', 'true');
            }
            this.handleScroll();
        });

        drawer.addEventListener('click', (event) => {
            this.handleDrawerClick(event);
        });

        hideDrawerBtn.addEventListener('click', () => {
            this.handleDrawerClick({ target: { id: 'hideDrawerBtn' } });
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
};

MenuManager.initializeMenu();