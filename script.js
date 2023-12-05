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
    toggleDrawer: function () {
        const drawer = document.getElementById('drawer');
        drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
    },

    // Handle clicks on links within the drawer
    handleDrawerClick: function (event) {
        const drawer = document.getElementById('drawer');

        if (event.target.id === 'aboutUsLink') {
            // Assuming toggleAboutUs is defined elsewhere
            toggleAboutUs(); // Make sure this function is defined
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

const CookieManager = {
    consentKey: "cookieConsent",

    // Check if the user has given consent for cookies
    hasConsent: function () {
        return localStorage.getItem(this.consentKey) === "true";
    },

    // Set user consent for cookies
    setConsent: function () {
        localStorage.setItem(this.consentKey, "true");
    },

    // Display the cookie banner
    displayBanner: function () {
        const cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "block";
    },

    // Save user preferences for cookies based on checkbox selection
    saveCookiePreferences: function () {
        const checkboxElements = document.querySelectorAll('.cookieCheckbox');
        const selectedPreferences = [];

        checkboxElements.forEach((checkbox) => {
            if (checkbox.checked) {
                selectedPreferences.push(checkbox.id.replace('Checkbox', ''));
            }
        });

        // Save the selected preferences in localStorage or perform other actions as needed
        localStorage.setItem(this.consentKey, JSON.stringify(selectedPreferences));

        // Close the cookie banner after saving preferences
        this.closeCookieBanner();
    },

    // Close the cookie banner
    closeCookieBanner: function () {
        const cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "none";
    },

    // Accept cookies and update preferences
    acceptCookies: function () {
        this.saveCookiePreferences();
    },

    // Deny cookies
    denyCookies: function () {
        const cookieBanner = document.getElementById("cookie-banner");
        cookieBanner.style.display = "none";

        // Save the deny action in local storage
        localStorage.setItem("denyCookies", "true");
    },

    // Set cookie preferences based on saved preferences
    setCookiePreferences: function () {
        const savedPreferencesJSON = localStorage.getItem(this.consentKey);

        if (savedPreferencesJSON) {
            const savedPreferences = JSON.parse(savedPreferencesJSON);

            savedPreferences.forEach((preference) => {
                const checkboxId = preference + 'Checkbox';
                const checkbox = document.getElementById(checkboxId);

                if (checkbox) {
                    checkbox.checked = true;
                }
            });
        }
    },

    // Check deny action on page load and take appropriate actions
    checkDenyOnLoad: function () {
        try {
            if (localStorage.getItem("denyCookies") === "true") {
                this.denyCookies();
            } else {
                this.hasConsent() ? this.setCookiePreferences() : this.displayBanner();
            }
        } catch (error) {
            console.error('An error occurred while checking consent on page load:', error);
        }
    },

    // Initialize cookie-related functionalities
    initializeCookies: function () {
        try {
            document.addEventListener("DOMContentLoaded", () => {
                this.checkDenyOnLoad();
            });

        } catch (error) {
            console.error('An error occurred during cookie initialization:', error);
        }
    },
};

// Navigate to the cookies.html file
CookieManager.readCookiePolicy = function () {
    window.location.href = "cookies.html";
};

// Show cookie banner and open manage cookies content
CookieManager.manageCookies = function () {
    this.displayBanner();
    openManageCookiesContent();
};

})();


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

// Check deny action on page load
document.addEventListener("DOMContentLoaded", () => {
    CookieManager.checkDenyOnLoad();
});
