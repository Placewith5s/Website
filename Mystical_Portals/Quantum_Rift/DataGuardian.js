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
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.style.display = "none";
        }
    },

    acceptCookies() {
        this.setConsent();
        this.setCookiePreferences();
        this.hideCookieBanner();
    },

    denyCookies() {
        this.hideCookieBanner();
        localStorage.setItem(this.denyCookiesKey, "true");
    },

    setCookiePreferences() {
        const checkboxes = ['essentialCheckbox', 'performanceCheckbox', 'functionalityCheckbox', 'thirdPartyCheckbox'];
        checkboxes.forEach(checkboxId => this.setCookiePreference(checkboxId));
    },

    setCookiePreference(checkboxId) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            const cookieType = checkboxId.replace('Checkbox', '');
            const cookieValue = checkbox.checked ? 'true' : '';
            const expirationDate = new Date(2100, 0, 1).toUTCString();
            document.cookie = `${cookieType}=${cookieValue}; expires=${expirationDate}; path=/; Secure; HttpOnly; SameSite=Lax`;
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
                manageCookiesLink.addEventListener('click', (event) => this.handleInteraction(event));
                manageCookiesLink.addEventListener('touchstart', (event) => this.handleInteraction(event));
            }
        } catch (error) {
            console.error('Error during cookie initialization:', error);
        }
    },

    handleInteraction(event) {
        event.preventDefault();

        const isTouchEvent = event.type === 'touchstart';
        const coordinates = isTouchEvent ? event.touches[0] : { clientX: event.clientX, clientY: event.clientY };

        console.log('Clicked at coordinates:', coordinates);

        this.displayBanner();
    },

    displayBanner() {
        const cookieBanner = document.getElementById("cookie-banner");
        if (cookieBanner) {
            cookieBanner.style.display = "block";
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
    CookieManager.checkDenyOnLoad();
});

CookieManager.initializeCookies();
