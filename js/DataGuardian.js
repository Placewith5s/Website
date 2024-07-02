"use strict";

(function () {
    class CookieConsent {
        constructor() {
            this.cookieBanner = document.getElementById("cookie-banner");
            this.showCookieSettingsButton = document.getElementById("showCookieSettings");
            this.acceptAllButton = document.getElementById("acceptAll");
            this.rejectAllButton = document.getElementById("rejectAll");
            this.savePreferencesButton = document.getElementById("savePreferences");
            this.closeBannerButton = document.getElementById("closeBanner");
            this.consentCookieBanner = document.getElementById("consent-cookie-banner");

            if (!this.cookieBanner || !this.showCookieSettingsButton || !this.savePreferencesButton || !this.closeBannerButton || !this.consentCookieBanner) {
                console.error("Error: Missing required cookie banner elements.");
                return; 
            }

            this.addEventListeners();
            this.updateBannerVisibility(); 
        }

        addEventListeners() {
            this.showCookieSettingsButton.addEventListener("click", () => {
                if (this.cookieBanner.style.display === "block") {
                    this.hideCookieBanner();
                } else {
                    this.showCookieBanner();
                }
            });
            this.acceptAllButton.addEventListener("click", () => {
                this.acceptOrRejectAll(true);
                this.hideConsentCookieBanner();
            });
            this.rejectAllButton.addEventListener("click", () => {
                this.acceptOrRejectAll(false);
                this.hideConsentCookieBanner();
            });
            this.savePreferencesButton.addEventListener("click", () => this.saveCookiePreferences());
            this.closeBannerButton.addEventListener("click", () => this.hideCookieBanner());
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
            const preferences = {
                essential: true,
                performance: acceptAll,
                functionality: acceptAll
            };
            this.setCookies(preferences);
            localStorage.setItem("lastConsentTime", Date.now()); 
        }

        saveCookiePreferences() {
            const preferences = {
                essential: true, 
                performance: document.getElementById("performanceCheckbox").checked,
                functionality: document.getElementById("functionalityCheckbox").checked
            };
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
            const cookies = document.cookie.split(';');
            for (const cookie of cookies) {
                const [name, value] = cookie.trim().split('=');
                if (name === cookieName) {
                    const expirationParts = value.split(';')[1].trim().split('=')[1];
                    return new Date(expirationParts).getTime();
                }
            }
            return null; 
        }

        updateBannerVisibility() {
            const cookieExpiration = this.getCookieExpiration("essential");
            const oneYearAgo = Date.now() - (365 * 24 * 60 * 60 * 1000);

            if (!cookieExpiration || cookieExpiration < oneYearAgo) {
                this.consentCookieBanner.style.display = "block";
                this.cookieBanner.style.display = "none"; 
            } else {
                this.consentCookieBanner.style.display = "none";
            }
        }
    }

    document.addEventListener("DOMContentLoaded", () => new CookieConsent());
})();