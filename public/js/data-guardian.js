(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Cookie_Consent {
			static activation_info() {
				console.info("Cookie Consent activated!");
			}

			constructor() {
				this.cookie_banner_dialog = document.querySelector("#cookie-banner-dialog");
				this.cookie_banner = document.querySelector("#cookie-banner");
				this.show_cookie_settings_button = document.querySelector("#show-cookie-settings-btn");
				this.accept_all_button = document.querySelector("#accept-all-btn");
				this.reject_all_button = document.querySelector("#reject-all-btn");
				this.save_preferences_button = document.querySelector("#save-preferences-btn");
				this.close_banner_button = document.querySelector("#close-banner-btn");
				this.consent_cookie_banner_dialog = document.querySelector("#consent-cookie-banner-dialog");
				this.consent_cookie_banner = document.querySelector("#consent-cookie-banner");
				this.manage_cookies_link = document.querySelector("#manage-cookies-link");
				this.essential_checkbox = document.querySelector("#essential-checkbox");
				this.performance_checkbox = document.querySelector("#performance-checkbox");
				this.functionality_checkbox = document.querySelector("#functionality-checkbox");

				if (
					this.cookie_banner &&
					this.show_cookie_settings_button &&
					this.save_preferences_button &&
					this.close_banner_button &&
					this.consent_cookie_banner &&
					this.manage_cookies_link
				) {
					this.add_event_listeners();
				} else {
					console.error("Missing required CookieConsent elements!");
				}
			}

			add_event_listeners() {
				this.show_cookie_settings_button.addEventListener(
					"click",
					() => {
						if (this.consent_cookie_banner_dialog.open) {
							this.hide_consent_cookie_banner();
						}
						this.show_cookie_banner();
					},
					{ passive: true }
				)				

				this.accept_all_button.addEventListener(
					"click",
					() => {
						this.accept_or_reject_all(true);
						this.hide_consent_cookie_banner();
					},
					{ passive: true }
				)

				this.reject_all_button.addEventListener(
					"click",
					() => {
						this.accept_or_reject_all(false);
						this.hide_consent_cookie_banner();
					},
					{ passive: true }
				)

				this.save_preferences_button.addEventListener(
					"click",
					() => this.save_cookie_preferences(),
					{ passive: true }
				)

				this.close_banner_button.addEventListener(
					"click",
					() => this.hide_cookie_banner(),
					{ passive: true }
				)

				this.manage_cookies_link.addEventListener("click", (event) => {
					event.preventDefault();
					this.show_cookie_banner();
				})
			}

			toggle_banner(dialog, show) {
				if (!(dialog instanceof HTMLDialogElement)) {
					console.error("Element is not a dialog!");
					return;
				}
				if (show) {
					if (!dialog.open) dialog.showModal();
				} else {
					if (dialog.open) dialog.close();
				}
			}
			
			show_cookie_banner() {
				this.toggle_banner(this.cookie_banner_dialog, true);
			}
			
			hide_cookie_banner() {
				this.toggle_banner(this.cookie_banner_dialog, false);
			}
			
			hide_consent_cookie_banner() {
				this.toggle_banner(this.consent_cookie_banner_dialog, false);
			}
			
			show_consent_cookie_banner() {
				this.toggle_banner(this.consent_cookie_banner_dialog, true);
			}			

			accept_or_reject_all(accept) {
				const preferences = {
					essential: true,
					performance: accept,
					functionality: accept,
				};
				this.set_cookies(preferences);
				this.set_cookie("lastConsentTime", Date.now(), 90);
				this.set_cookie("cookiePreferences", JSON.stringify(preferences), 90);
			}

			save_cookie_preferences() {
				const preferences = {
					essential: true,
					performance: this.performance_checkbox.checked,
					functionality: this.functionality_checkbox.checked,
				}
				try {
					this.set_cookie("cookiePreferences", JSON.stringify(preferences), 90);
					this.set_cookies(preferences);
					this.hide_cookie_banner();
				} catch (err) {
					console.error("Error saving cookie preferences:", err);
				}
			}

			set_cookies(preferences) {
				const expiry_date = new Date();
				expiry_date.setMonth(expiry_date.getMonth() + 3);

				for (const [key, value] of Object.entries(preferences)) {
					this.set_cookie(key, value, 90); // 90 days expiration
				}
			}

			set_cookie(name, value, days) {
				const expiry_date = new Date();
				expiry_date.setDate(expiry_date.getDate() + days);
				document.cookie = `${name}=${value}; expires=${expiry_date.toUTCString()}; path=/; Secure; SameSite=Lax`;
			}

			get_cookie(name) {
				const cookieArr = document.cookie.split(";");
				for (let i = 0; i < cookieArr.length; i++) {
					let cookie = cookieArr[i].trim();
					if (cookie.indexOf(name + "=") == 0) {
						return cookie.substring(name.length + 1);
					}
				}
				return null;
			}

			load_cookie_preferences() {
				try {
					const preferences = this.get_cookie("cookiePreferences");
					if (preferences) {
						const parsedPreferences = JSON.parse(preferences);
						this.set_cookies(parsedPreferences);
						this.performance_checkbox.checked = parsedPreferences.performance;
						this.functionality_checkbox.checked = parsedPreferences.functionality;
					} else {
						this.show_consent_cookie_banner();
					}
				} catch (err) {
					console.error("Error loading cookie preferences:", err);
				}
			}			

			update_banner_visibility() {
				if (this.get_cookie("cookiePreferences")) {
					this.hide_consent_cookie_banner();
					this.hide_cookie_banner();
				} else {
					this.show_consent_cookie_banner();
				}
			}			
		}

		const cookie_consent = new Cookie_Consent();
		cookie_consent.update_banner_visibility();
		cookie_consent.load_cookie_preferences();
		Cookie_Consent.activation_info();
	});
})();
