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
                manageCookiesLink.addEventListener('click', handleInteraction);
                manageCookiesLink.addEventListener('touchstart', handleInteraction);

                function handleInteraction(event) {
                    event.preventDefault();

                    // Use coordinates if needed
                    const isTouchEvent = event.type === 'touchstart';
                    const coordinates = isTouchEvent ? event.touches[0] : { clientX: event.clientX, clientY: event.clientY };

                    console.log('Clicked at coordinates:', coordinates);

                    // Now you can use coordinates for any specific purpose
                    CookieManager.displayBanner();
                    CookieManager.manageCookies();
                }
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

CookieManager.initializeCookies();
