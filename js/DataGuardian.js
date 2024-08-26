(function () {
    "use strict";
    class CookieConsent {
        constructor() {
            this.cookieBanner = document.querySelector("#cookie-banner");
            this.showCookieSettingsButton = document.querySelector("#showCookieSettings");
            this.acceptAllButton = document.querySelector("#acceptAll");
            this.rejectAllButton = document.querySelector("#rejectAll");
            this.savePreferencesButton = document.querySelector("#savePreferences");
            this.closeBannerButton = document.querySelector("#closeBanner");
            this.consentCookieBanner = document.querySelector("#consent-cookie-banner");
            this.manageCookiesLink = document.querySelector("#manageCookies");
            this.essentialCheckbox = document.querySelector("#essentialCheckbox");
            this.performanceCheckbox = document.querySelector("#performanceCheckbox");
            this.functionalityCheckbox = document.querySelector("#functionalityCheckbox");
            if (!this.cookieBanner || !this.showCookieSettingsButton || !this.savePreferencesButton || !this.closeBannerButton || !this.consentCookieBanner || !this.manageCookiesLink) {
                console.error("Error: Missing required cookie elements.");
                return;
            }
            this.addEventListeners();
            this.loadCookiePreferences();
            this.updateBannerVisibility();
        }
        addEventListeners() {
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
        showCookieBanner() {
            this.cookieBanner.style.display = "block";
        }
        hideCookieBanner() {
            this.cookieBanner.style.display = "none";
        }
        hideConsentCookieBanner() {
            this.consentCookieBanner.style.display = "none";
        }
        acceptOrRejectAll(acceptAll) {
            const preferences = { essential: !0, performance: acceptAll, functionality: acceptAll };
            this.setCookies(preferences);
            localStorage.setItem("lastConsentTime", Date.now());
            localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
        }
        saveCookiePreferences() {
            const preferences = { essential: !0, performance: this.performanceCheckbox.checked, functionality: this.functionalityCheckbox.checked };
            try {
                localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
                this.setCookies(preferences);
                this.hideCookieBanner();
            } catch (error) {
                console.error("Error saving cookie preferences:", error.message);
            }
        }
        setCookies(preferences) {
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            for (const [type, value] of Object.entries(preferences)) {
                if (value) {
                    document.cookie = `${type}=true; expires=${expirationDate.toUTCString()}; path=/`;
                } else {
                    document.cookie = `${type}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
                }
            }
        }
        getCookieExpiration(cookieName) {
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
        loadCookiePreferences() {
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
        updateBannerVisibility() {
            const preferences = localStorage.getItem("cookiePreferences");
            if (preferences) {
                this.consentCookieBanner.style.display = "none";
                this.cookieBanner.style.display = "none";
            } else {
                this.consentCookieBanner.style.display = "block";
            }
        }
    }
    document.addEventListener("DOMContentLoaded", () => new CookieConsent());
})();