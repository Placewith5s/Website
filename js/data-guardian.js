( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class CookieConsent {
        static activationInfo() {
            console.info("CookieConsent activated!");
        }
        constructor() {
            this.cookieBanner = document.querySelector("#cookie-banner");
            this.showCookieSettingsButton = document.querySelector("#show-cookie-settings-btn");
            this.acceptAllButton = document.querySelector("#accept-all-btn");
            this.rejectAllButton = document.querySelector("#reject-all-btn");
            this.savePreferencesButton = document.querySelector("#save-preferences-btn");
            this.closeBannerButton = document.querySelector("#close-banner-btn");
            this.consentCookieBanner = document.querySelector("#consent-cookie-banner");
            this.manageCookiesLink = document.querySelector("#manage-cookies-link");
            this.essentialCheckbox = document.querySelector("#essential-checkbox");
            this.performanceCheckbox = document.querySelector("#performance-checkbox");
            this.functionalityCheckbox = document.querySelector("#functionality-checkbox");
            if (!this.cookieBanner || !this.showCookieSettingsButton || !this.savePreferencesButton || !this.closeBannerButton || !this.consentCookieBanner || !this.manageCookiesLink) {
                console.error("Missing required CookieConsent elements!");
                return;
            }
            this.addEventListeners();
        }
        addEventListeners = () => {
            this.showCookieSettingsButton.addEventListener(
                "click",
                () => {
                    if (this.cookieBanner.style.display === "block") {
                        this.hideCookieBanner();
                    } else {
                        this.showCookieBanner();
                    }
                },
                { passive: true }
            );
            this.acceptAllButton.addEventListener(
                "click",
                () => {
                    this.acceptOrRejectAll(!0);
                    this.hideConsentCookieBanner();
                },
                { passive: true }
            );
            this.rejectAllButton.addEventListener(
                "click",
                () => {
                    this.acceptOrRejectAll(!1);
                    this.hideConsentCookieBanner();
                },
                { passive: true }
            );
            this.savePreferencesButton.addEventListener("click", () => this.saveCookiePreferences(), { passive: true });
            this.closeBannerButton.addEventListener("click", () => this.hideCookieBanner(), { passive: true });
            this.manageCookiesLink.addEventListener("click", (event) => {
                event.preventDefault();
                this.showCookieBanner();
            });
        }
        showCookieBanner = () => {
            this.cookieBanner.style.display = "block";
        }
        hideCookieBanner = () => {
            this.cookieBanner.style.display = "none";
        }
        hideConsentCookieBanner = () => {
            this.consentCookieBanner.style.display = "none";
        }
        acceptOrRejectAll = (acceptAll) => {
            const preferences = { essential: !0, performance: acceptAll, functionality: acceptAll };
            this.setCookies(preferences);
            localStorage.setItem("lastConsentTime", Date.now());
            localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        }
        saveCookiePreferences = () => {
            const preferences = { essential: !0, performance: this.performanceCheckbox.checked, functionality: this.functionalityCheckbox.checked };
            try {
                localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
                this.setCookies(preferences);
                this.hideCookieBanner();
            } catch (error) {
                console.error("Error saving cookie preferences:", error.message);
            }
        }
        setCookies = (preferences) => {
            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 3);
            for (const [type, value] of Object.entries(preferences)) {
                if (value) {
                    document.cookie = `${type}=true; expires=${expirationDate.toUTCString()}; path=/`;
                } else {
                    document.cookie = `${type}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            }
        }
        getCookieExpiration = (cookieName) => {
            const cookies = document.cookie.split(";");
            for (const cookie of cookies) {
                const trimmedCookie = cookie.trim();
                if (!trimmedCookie) continue;
                const [name, value] = trimmedCookie.split("=");
                if (name === cookieName && value) {
                    const expirationParts = value.split(";");
                    for (const part of expirationParts) {
                        const [partName, partValue] = part.trim().split("=");
                        if (partName === "expires") {
                            return new Date(partValue).getTime();
                        }
                    }
                }
            }
            return null;
        }
        loadCookiePreferences = () => {
            try {
                const preferences = JSON.parse(localStorage.getItem("cookiePreferences"));
                if (preferences) {
                    this.setCookies(preferences);
                    this.performanceCheckbox.checked = preferences.performance;
                    this.functionalityCheckbox.checked = preferences.functionality;
                } else {
                    this.consentCookieBanner.style.display = "block";
                }
            } catch (error) {
                console.error("Error loading cookie preferences:", error.message);
            }
        }
        updateBannerVisibility = () => {
            const preferences = localStorage.getItem("cookiePreferences");
            if (preferences) {
                this.consentCookieBanner.style.display = "none";
                this.cookieBanner.style.display = "none";
            } else {
                this.consentCookieBanner.style.display = "block";
            }
        }
    }
    const cookieConsentInstance = new CookieConsent();
    cookieConsentInstance.showCookieSettingsButton.removeEventListener("click", cookieConsentInstance.addEventListeners());
    cookieConsentInstance.acceptAllButton.removeEventListener("click", cookieConsentInstance.addEventListeners());
    cookieConsentInstance.rejectAllButton.removeEventListener("click", cookieConsentInstance.addEventListeners());
    cookieConsentInstance.savePreferencesButton.removeEventListener("click", cookieConsentInstance.addEventListeners());
    cookieConsentInstance.closeBannerButton.removeEventListener("click", cookieConsentInstance.addEventListeners());
    cookieConsentInstance.manageCookiesLink.removeEventListener("click", cookieConsentInstance.addEventListeners());
    CookieConsent.activationInfo();
});
})();