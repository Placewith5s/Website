"use strict";
document.addEventListener("DOMContentLoaded", function() {
    const consentCookieBanner = document.getElementById("consent-cookie-banner");
    const cookieBanner = document.getElementById("cookie-banner");
    const showCookieSettingsButton = document.getElementById("showCookieSettings");
    const consentButton = document.getElementById("consent");
    const rejectAllButton = document.getElementById("rejectAll");
    const savePreferencesButton = document.getElementById("savePreferences");
    const closeBannerButton = document.getElementById("closeBanner");
    const manageCookiesLink = document.getElementById("manageCookiesLink");

    cookieBanner.setAttribute('aria-hidden', 'true');

    try {
        const userPreferences = JSON.parse(localStorage.getItem("cookiePreferences")) || {};
        if (Object.keys(userPreferences).length > 0) {
            applyUserPreferences(userPreferences);
            hideConsentCookieBanner();
        } else {
            showConsentCookieBanner();
        }
    } catch (error) {
        console.error("Error while loading user preferences:", error);
        showConsentCookieBanner();
    }

    try {
        showCookieSettingsButton.addEventListener("click", showCookieBanner);
        consentButton.addEventListener("click", function() {
            acceptOrRejectAllCookies(true);
        });
        rejectAllButton.addEventListener("click", function() {
            acceptOrRejectAllCookies(false);
        });
        savePreferencesButton.addEventListener("click", saveCookiePreferences);
        closeBannerButton.addEventListener("click", hideCookieBanner);
        manageCookiesLink.addEventListener("click", showCookieBanner);
    } catch (error) {
        console.error("Error while adding event listeners:", error);
    }

    function showConsentCookieBanner() {
        consentCookieBanner.style.display = "block";
        consentCookieBanner.removeAttribute('aria-hidden');
    }

    function hideConsentCookieBanner() {
        consentCookieBanner.style.display = "none";
        consentCookieBanner.setAttribute('aria-hidden', 'true');
    }

    function showCookieBanner(event) {
        event.preventDefault()
        cookieBanner.style.display = "block";
        cookieBanner.removeAttribute('aria-hidden');
        event.stopPropagation();
    }

    function hideCookieBanner() {
        cookieBanner.style.display = "none";
        cookieBanner.setAttribute('aria-hidden', 'true');
    }

    function acceptOrRejectAllCookies(accept) {
        const preferences = {
            essential: true,
            performance: accept,
            functionality: accept,
            thirdParty: accept
        };
        saveAndApplyPreferences(preferences);
        hideConsentCookieBanner();
    }

    function saveAndApplyPreferences(preferences) {
        try {
            localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
            applyUserPreferences(preferences);
        } catch (error) {
            console.error("Error while saving preferences:", error);
        }
    }

    function applyUserPreferences(preferences) {
        document.getElementById("essentialCheckbox").checked = preferences.essential;
        document.getElementById("performanceCheckbox").checked = preferences.performance;
        document.getElementById("functionalityCheckbox").checked = preferences.functionality;
        document.getElementById("thirdPartyCheckbox").checked = preferences.thirdParty;

        setCookie("essential", preferences.essential);
        setCookie("performance", preferences.performance);
        setCookie("functionality", preferences.functionality);
        setCookie("thirdParty", preferences.thirdParty);
    }

    function saveCookiePreferences() {
        const cookieBannerDisplayStyle = window.getComputedStyle(cookieBanner).getPropertyValue('display');
        if (cookieBannerDisplayStyle === 'block') {
            const preferences = {
                essential: document.getElementById("essentialCheckbox").checked,
                performance: document.getElementById("performanceCheckbox").checked,
                functionality: document.getElementById("functionalityCheckbox").checked,
                thirdParty: document.getElementById("thirdPartyCheckbox").checked
            };
            saveAndApplyPreferences(preferences);
            hideCookieBanner();
        } else {
            console.log("Cannot save preferences when the cookie banner is hidden.");
        }
    }

    function setCookie(cookieName, value) {
        document.cookie = `${cookieName}=${value}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    }
});
