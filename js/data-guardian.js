(() => {
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

				if (this.cookieBanner && this.showCookieSettingsButton && this.savePreferencesButton && this.closeBannerButton && this.consentCookieBanner && this.manageCookiesLink) {
					this.addEventListeners();
				} else {
					console.error("Missing required CookieConsent elements!");
				}
			}

			addEventListeners() {
				this.showCookieSettingsButton.addEventListener("click", () => {
					this.cookieBanner.style.display === "block" ? this.hideCookieBanner() : this.showCookieBanner();
				}, {
					passive: true
				});

				this.acceptAllButton.addEventListener("click", () => {
					this.acceptOrRejectAll(true);
					this.hideConsentCookieBanner();
				}, {
					passive: true
				});

				this.rejectAllButton.addEventListener("click", () => {
					this.acceptOrRejectAll(false);
					this.hideConsentCookieBanner();
				}, {
					passive: true
				});

				this.savePreferencesButton.addEventListener("click", () => this.saveCookiePreferences(), {
					passive: true
				});
				this.closeBannerButton.addEventListener("click", () => this.hideCookieBanner(), {
					passive: true
				});

				this.manageCookiesLink.addEventListener("click", (event) => {
					event.preventDefault();
					this.showCookieBanner();
				});
			}

			toggleBanner(element, show) {
				element.style.display = show ? "block" : "none";
			}

			showCookieBanner() {
				this.toggleBanner(this.cookieBanner, true);
			}

			hideCookieBanner() {
				this.toggleBanner(this.cookieBanner, false);
			}

			hideConsentCookieBanner() {
				this.toggleBanner(this.consentCookieBanner, false);
			}

			acceptOrRejectAll(accept) {
				const preferences = {
					essential: true,
					performance: accept,
					functionality: accept
				};
				this.setCookies(preferences);
				localStorage.setItem("lastConsentTime", Date.now());
				localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
			}

			saveCookiePreferences() {
				const preferences = {
					essential: true,
					performance: this.performanceCheckbox.checked,
					functionality: this.functionalityCheckbox.checked
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
				const expiryDate = new Date();
				expiryDate.setMonth(expiryDate.getMonth() + 3);

				for (const [key, value] of Object.entries(preferences)) {
					document.cookie = value ? `${key}=true; expires=${expiryDate.toUTCString()}; path=/` : `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
				}
			}

			getCookieExpiration(cookieName) {
				const cookies = document.cookie.split(";");
				for (const cookie of cookies) {
					const trimmed = cookie.trim();
					if (!trimmed) continue;

					const [name, value] = trimmed.split("=");
					if (name === cookieName && value) {
						const attributes = value.split(";");
						for (const attr of attributes) {
							const [attrName, attrValue] = attr.trim().split("=");
							if (attrName === "expires") return new Date(attrValue).getTime();
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
				if (localStorage.getItem("cookiePreferences")) {
					this.consentCookieBanner.style.display = "none";
					this.cookieBanner.style.display = "none";
				} else {
					this.consentCookieBanner.style.display = "block";
				}
			}
		}

		const cookieConsent = new CookieConsent();
		cookieConsent.updateBannerVisibility();
		cookieConsent.loadCookiePreferences();
		cookieConsent.getCookieExpiration();
		CookieConsent.activationInfo();
	});
})();