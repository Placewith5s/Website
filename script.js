// Theme manager module
const ThemeManager = {
    setDarkTheme: function() {
        document.body.classList.add('dark-theme');
    },

    setLightTheme: function() {
        document.body.classList.remove('dark-theme');
    },

    initializeTheme: function() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.setDarkTheme();
        } else {
            this.setLightTheme();
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (e.matches) {
                this.setDarkTheme();
            } else {
                this.setLightTheme();
            }
        });
    }
};

// Menu manager module
const MenuManager = {
    toggleDrawer: function() {
        let drawer = document.getElementById('drawer');
        drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
    },

    handleDrawerClick: function(event) {
        if (event.target.id === 'aboutUsLink') {
            toggleAboutUs();  // Assuming there's a function toggleAboutUs
            document.getElementById('drawer').style.display = 'none';
        }

        if (event.target.id === 'privacyPolicyLink') {
            document.getElementById('drawer').style.display = 'none';
        }
    },

    initializeMenu: function() {
        document.getElementById('menuIcon').addEventListener('click', () => {
            this.toggleDrawer();
        });

        document.getElementById('drawer').addEventListener('click', (event) => {
            this.handleDrawerClick(event);
        });
    }
};

// Cookie manager module
const CookieManager = {
    hasConsent: function() {
        return localStorage.getItem("cookieConsent") === "true";
    },

    setConsent: function() {
        localStorage.setItem("cookieConsent", "true");
    },

    displayBanner: function() {
        let cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "block";
    },

    acceptCookies: function() {
        this.setConsent();
        this.setCookiePreferences();
        let cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "none";
    },

    denyCookies: function() {
        // Implement any additional actions you want to perform when denying cookies.
        let cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "none";
    },

    setCookiePreferences: function() {
        this.setCookiePreference('essentialCheckbox', 'essential');
        this.setCookiePreference('performanceCheckbox', 'performance');
        this.setCookiePreference('functionalityCheckbox', 'functionality');
        this.setCookiePreference('thirdPartyCheckbox', 'thirdParty');
    },

    setCookiePreference: function(checkboxId, cookieType) {
        let checkbox = document.getElementById(checkboxId);

        if (checkbox && checkbox.checked) {
            document.cookie = `${cookieType}=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
        } else {
            document.cookie = `${cookieType}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        }
    },

    initializeCookies: function() {
        document.addEventListener("DOMContentLoaded", () => {
            if (!this.hasConsent()) {
                this.displayBanner();
            }
        });
    }
};

// Initialize modules
ThemeManager.initializeTheme();
MenuManager.initializeMenu();
CookieManager.initializeCookies();

// Inline onclick functions for 'Accept' and 'Deny' buttons
function acceptCookies() {
    CookieManager.acceptCookies();
}

function denyCookies() {
    CookieManager.denyCookies();
}
