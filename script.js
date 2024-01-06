document.addEventListener("DOMContentLoaded", function () {
    // Call the function to check and set dark mode preference
    myDarkModeModule.checkAndSetDarkModePreference();
});

const MenuManager = {
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


document.getElementById('Extend-Collapse-Button').addEventListener('click', toggleElements);

function toggleElements() {
    const firstElement = document.getElementById('step-hidden-from-5');

    if (firstElement) {
        const isHidden = window.getComputedStyle(firstElement).display === 'none';

        for (let i = 5; i <= 12; i++) {
            const element = document.getElementById(`step-hidden-from-${i}`);
            if (element) {
                element.style.display = isHidden ? 'block' : 'none';
            }
        }

        const button = document.getElementById('Extend-Collapse-Button');
        button.innerText = isHidden ? 'Extend' : 'Collapse';
    }
}
