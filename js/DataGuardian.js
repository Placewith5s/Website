"use strict";
(function() {
    class CookieConsent {
        constructor() {
            this.consentCookieBanner = document.getElementById("consent-cookie-banner");
            this.cookieBanner = document.getElementById("cookie-banner");
            this.showCookieSettingsButton = document.getElementById("showCookieSettings");
            this.consentButton = document.getElementById("consent");
            this.rejectAllButton = document.getElementById("rejectAll");
            this.savePreferencesButton = document.getElementById("savePreferences");
            this.closeBannerButton = document.getElementById("closeBanner");
            this.manageCookiesLink = document.getElementById("manageCookiesLink");
            this.init();
        }
        init() {
            if (!this.cookieBanner) {
                throw new Error("Cookie banner element not found");
            }
            this.cookieBanner.setAttribute("aria-hidden", "true");
            this.loadUserPreferences();
            this.addEventListeners();
        }
        loadUserPreferences() {
            const userPreferences = JSON.parse(localStorage.getItem("cookiePreferences")) || {};
            if (Object.keys(userPreferences).length > 0 && this.checkCookies(userPreferences)) {
                this.applyUserPreferences(userPreferences);
                this.hideConsentCookieBanner();
            } else {
                this.showConsentCookieBanner();
            }
        }
        checkCookies(preferences) {
            return (
                this.getCookie("essential") === preferences.essential.toString() &&
                this.getCookie("performance") === preferences.performance.toString() &&
                this.getCookie("functionality") === preferences.functionality.toString()
            );
        }
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
            return null;
        }
        addEventListeners() {
            this.showCookieSettingsButton?.addEventListener("click", this.showCookieBanner.bind(this));
            this.consentButton?.addEventListener("click", () => this.acceptOrRejectAllCookies(true));
            this.rejectAllButton?.addEventListener("click", () => this.acceptOrRejectAllCookies(false));
            this.savePreferencesButton?.addEventListener("click", this.saveCookiePreferences.bind(this));
            this.closeBannerButton?.addEventListener("click", this.hideCookieBanner.bind(this));
            this.manageCookiesLink?.addEventListener("click", this.showCookieBanner.bind(this));
        }
        showConsentCookieBanner() {
            if (this.consentCookieBanner) {
                this.consentCookieBanner.style.display = "block";
                this.consentCookieBanner.removeAttribute("aria-hidden");
            }
        }
        hideConsentCookieBanner() {
            if (this.consentCookieBanner) {
                this.consentCookieBanner.style.display = "none";
                this.consentCookieBanner.setAttribute("aria-hidden", "true");
            }
        }
        showCookieBanner(event) {
            event.preventDefault();
            if (this.cookieBanner) {
                this.cookieBanner.style.display = "block";
                this.cookieBanner.removeAttribute("aria-hidden");
            }
            event.stopPropagation();
        }
        hideCookieBanner() {
            if (this.cookieBanner) {
                this.cookieBanner.style.display = "none";
                this.cookieBanner.setAttribute("aria-hidden", "true");
            }
        }
        acceptOrRejectAllCookies(accept) {
            const preferences = { essential: true, performance: accept, functionality: accept };
            this.saveAndApplyPreferences(preferences);
            this.hideConsentCookieBanner();
        }
        saveAndApplyPreferences(preferences) {
            try {
                localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
                this.applyUserPreferences(preferences);
                this.setCookies(preferences);
            } catch (error) {
                console.error("Error while saving preferences:", error);
            }
        }
        applyUserPreferences(preferences) {
            document.getElementById("essentialCheckbox")?.checked = preferences.essential;
            document.getElementById("performanceCheckbox")?.checked = preferences.performance;
            document.getElementById("functionalityCheckbox")?.checked = preferences.functionality;
            this.setCookies(preferences);
        }
        saveCookiePreferences() {
            if (window.getComputedStyle(this.cookieBanner).display === "block") {
                const preferences = {
                    essential: document.getElementById("essentialCheckbox").checked,
                    performance: document.getElementById("performanceCheckbox").checked,
                    functionality: document.getElementById("functionalityCheckbox").checked,
                };
                this.saveAndApplyPreferences(preferences);
                this.hideCookieBanner();
            } else {
                console.log("Cannot save preferences when the cookie banner is hidden.");
            }
        }
        setCookies(preferences) {
            for (const [key, value] of Object.entries(preferences)) {
                this.setCookie(key, value);
            }
        }
        setCookie(cookieName, value) {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            document.cookie = `${cookieName}=${value}; expires=${date.toUTCString()}; path=/`;
        }
    }
    document.addEventListener("DOMContentLoaded", () => new CookieConsent());
})();