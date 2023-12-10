// Dark mode functionality
const darkMode = (function () {
    // Private functions for dark mode
    function setDarkMode() {
        document.body.classList.add('dark-theme');
    }

    function setLightMode() {
        document.body.classList.remove('dark-theme');
    }

    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        isDarkMode ? setLightMode() : setDarkMode();
    }

    // Check for dark mode preference and set the theme accordingly
    function checkAndSetDarkModePreference() {
        try {
            if (window.matchMedia) {
                const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

                // If the user prefers dark mode, set the dark theme
                if (darkModeMediaQuery.matches) {
                    setDarkMode();
                }
            } else {
                // Log an error if matchMedia is not supported
                console.error('matchMedia is not supported. Dark mode preference may not work.');
            }
        } catch (error) {
            // Log an error if an exception occurs during dark mode preference check
            console.error('An error occurred while checking dark mode preference:', error);
        }
    }

    // Expose public functions
    return {
        setDarkMode,
        setLightMode,
        toggleDarkMode,
        checkAndSetDarkModePreference
    };
})();

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

const CookieManager = {
    consentKey: "cookieConsent",

    hasConsent() {
        return localStorage.getItem(this.consentKey) === "true";
    },

    setConsent() {
        localStorage.setItem(this.consentKey, "true");
    },

    displayBanner() {
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.style.display = "block";
        }
    },

    acceptCookies() {
        this.setConsent();
        this.setCookiePreferences();
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.style.display = "none";
        }
    },

    denyCookies() {
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.style.display = "none";
        }

        localStorage.setItem("denyCookies", "true");
    },

    setCookiePreferences() {
        const checkboxes = ['essentialCheckbox', 'performanceCheckbox', 'functionalityCheckbox', 'thirdPartyCheckbox'];
        checkboxes.forEach(checkboxId => this.setCookiePreference(checkboxId));
    },

    setCookiePreference(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            const cookieType = checkboxId.replace('Checkbox', '');
            document.cookie = `${cookieType}=${checkbox.checked ? 'true' : ''}; expires=Thu, 01 Jan 2100 00:00:00 UTC; path=/`;
        }
    },

    checkDenyOnLoad() {
        try {
            if (localStorage.getItem("denyCookies") === "true") {
                this.denyCookies();
            } else {
                this.hasConsent() ? this.setCookiePreferences() : null;
            }
        } catch (error) {
            console.error('An error occurred while checking consent on page load:', error);
        }
    },

    initializeCookies() {
        try {
            document.addEventListener("DOMContentLoaded", () => {
                this.checkDenyOnLoad();
            });

            const manageCookiesLink = document.getElementById('manageCookiesLink');
            if (manageCookiesLink) {
                manageCookiesLink.addEventListener('click', () => {
                    this.displayBanner();  // Display the banner when the link is clicked
                    this.manageCookies();
                });
            }

        } catch (error) {
            console.error('An error occurred during cookie initialization:', error);
        }
    },

    manageCookies() {
        openManageCookiesContent();
    },
};

function acceptCookies() {
    CookieManager.acceptCookies();
}

function denyCookies() {
    CookieManager.denyCookies();
}

function openManageCookiesContent() {
    const manageCookiesContent = document.getElementById('manageCookiesContent');
    if (manageCookiesContent) {
        manageCookiesContent.style.display = 'block';
    }
}

function closeManageCookiesContent() {
    const manageCookiesContent = document.getElementById('manageCookiesContent');
    if (manageCookiesContent) {
        manageCookiesContent.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", () => {
    CookieManager.checkDenyOnLoad();
});

// Initialize modules (Assuming darkMode and MenuManager are properly defined and implemented.)
darkMode.checkAndSetDarkModePreference();
MenuManager.initializeMenu();
CookieManager.initializeCookies();
