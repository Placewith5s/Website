// Dark mode functions
const darkMode = (function () {
    // Private functions

    // Function to set dark mode by adding 'dark-theme' class to the body
    function setDarkMode() {
        document.body.classList.add('dark-theme');
    }

    // Function to set light mode by removing 'dark-theme' class from the body
    function setLightMode() {
        document.body.classList.remove('dark-theme');
    }

    // Function to toggle between dark and light mode
    function toggleDarkMode() {
        const isDarkMode = document.body.classList.contains('dark-theme');
        if (isDarkMode) {
            setLightMode();
        } else {
            setDarkMode();
        }
    }

    // Check for dark mode preference and set the theme accordingly
    function checkAndSetDarkModePreference() {
        try {
            if (window.matchMedia) {
                // Use matchMedia to check the user's preference for dark mode
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

// Menu manager module
const MenuManager = {
    toggleDrawer: function() {
        let drawer = document.getElementById('drawer');
        drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
    },

    handleDrawerClick: function(event) {
        if (event.target.id === 'aboutUsLink') {
            toggleAboutUs(); 
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
        try {
            document.addEventListener("DOMContentLoaded", () => {
                if (!this.hasConsent()) {
                    this.displayBanner();
                }
            });

            // Event listeners for "Manage Cookies" and "Read Cookie Policy" links in the footer
            document.getElementById('manageCookiesLink').addEventListener('click', () => {
                this.manageCookies();
            });

            document.getElementById('readCookiePolicyLink').addEventListener('click', () => {
                this.readCookiePolicy();
            });
        } catch (error) {
            console.error('An error occurred during cookie initialization:', error);
        }
    },

    manageCookies: function() {
        this.displayBanner(); // Show the cookie banner again
        openManageCookiesContent();
    },

    readCookiePolicy: function() {
        // Navigate to the cookies.html file
        window.location.href = "cookies.html";
    }
};

// Initialize modules
darkMode.checkAndSetDarkModePreference();
MenuManager.initializeMenu();
CookieManager.initializeCookies();

// Inline onclick functions for 'Accept' and 'Deny' buttons
function acceptCookies() {
    CookieManager.acceptCookies();
}

function denyCookies() {
    CookieManager.denyCookies();
}

// Manage Cookies Content functions
function openManageCookiesContent() {
    document.getElementById('manageCookiesContent').style.display = 'block';
}

function closeManageCookiesContent() {
    document.getElementById('manageCookiesContent').style.display = 'none';
}
