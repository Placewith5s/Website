const CookieManager = {
    consentKey: "cookieConsent",
    denyCookiesKey: "denyCookies",

    hasConsent() {
        return localStorage.getItem(this.consentKey) === "true";
    },

    setConsent() {
        localStorage.setItem(this.consentKey, "true");
    },

    hideCookieBanner() {
        try {
            const cookieBanner = document.getElementById("cookie-banner");
            if (cookieBanner) {
                cookieBanner.style.display = "none";
            }
        } catch (error) {
            console.error('Error hiding cookie banner:', error);
        }
    },

    acceptCookies() {
        try {
            this.setConsent();
            this.setCookiePreferences();
            this.hideCookieBanner();
        } catch (error) {
            console.error('Error accepting cookies:', error);
        }
    },

    denyCookies() {
        try {
            this.hideCookieBanner();
            localStorage.setItem(this.denyCookiesKey, "true");
        } catch (error) {
            console.error('Error denying cookies:', error);
        }
    },

    setCookiePreferences() {
        try {
            const checkboxes = ['essentialCheckbox', 'performanceCheckbox', 'functionalityCheckbox', 'thirdPartyCheckbox'];
            checkboxes.forEach(checkboxId => this.setCookiePreference(checkboxId));
        } catch (error) {
            console.error('Error setting cookie preferences:', error);
        }
    },

    setCookiePreference(checkboxId) {
        try {
            const checkbox = document.getElementById(checkboxId);
            if (checkbox) {
                const cookieType = checkboxId.replace('Checkbox', '');

                if (cookieType === 'essential') {
                    this.setupEssentialCheckbox(checkbox);
                }

                const updateCookie = () => {
                    const cookieValue = checkbox.checked ? 'true' : '';
                    const expirationDate = new Date(2100, 0, 1).toUTCString();
                    document.cookie = `${cookieType}=${cookieValue}; expires=${expirationDate}; path=/; Secure; HttpOnly; SameSite=Lax`;
                };

                checkbox.addEventListener('change', updateCookie);
            }
        } catch (error) {
            console.error('Error setting cookie preference:', error);
        }
    },

    setupEssentialCheckbox(checkbox) {
        try {
            checkbox.checked = true;
            checkbox.addEventListener('change', () => {
                checkbox.checked = true;
            });
            checkbox.addEventListener('click', () => {
                checkbox.checked = true;
            });
        } catch (error) {
            console.error('Error setting up essential checkbox:', error);
        }
    },

    checkDenyOnLoad() {
        try {
            if (localStorage.getItem(this.denyCookiesKey) === "true") {
                this.denyCookies();
            } else {
                this.hasConsent() ? this.setCookiePreferences() : null;
            }
        } catch (error) {
            console.error('Error checking consent on page load:', error);
        }
    },

    initializeCookies() {
        try {
            document.addEventListener("DOMContentLoaded", () => {
                this.checkDenyOnLoad();
            });

            const manageCookiesLink = document.getElementById('manageCookiesLink');
            if (manageCookiesLink) {
                manageCookiesLink.removeAttribute('href');

                manageCookiesLink.addEventListener('click', (event) => this.handleInteraction(event), { passive: true });
                manageCookiesLink.addEventListener('touchstart', (event) => this.handleInteraction(event), { passive: true });
            }
        } catch (error) {
            console.error('Error during cookie initialization:', error);
        }
    },

    handleInteraction(event) {
        try {
            event.stopPropagation();

            const isTouchEvent = event.type === 'touchstart';
            const coordinates = isTouchEvent ? event.touches[0] : { clientX: event.clientX, clientY: event.clientY };

            console.log('Clicked at coordinates:', coordinates);

            this.displayBanner();
        } catch (error) {
            console.error('Error handling user interaction:', error);
        }
    },

    displayBanner() {
        try {
            const cookieBanner = document.getElementById("cookie-banner");
            if (cookieBanner) {
                cookieBanner.style.display = "block";
            }
        } catch (error) {
            console.error('Error displaying cookie banner:', error);
        }
    },
};

function acceptCookies() {
    CookieManager.acceptCookies();
}

function denyCookies() {
    CookieManager.denyCookies();
}

document.addEventListener("DOMContentLoaded", () => {
    CookieManager.initializeCookies();
});
