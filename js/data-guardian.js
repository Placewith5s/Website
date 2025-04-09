(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Cookie_Consent {
			static activation_info() {
				console.info("Cookie Consent activated!");
			}

			constructor() {
				this.cookie_banner = document.querySelector("#cookie-banner");
				this.show_cookie_settings_button = document.querySelector("#show-cookie-settings-btn");
				this.accept_all_button = document.querySelector("#accept-all-btn");
				this.reject_all_button = document.querySelector("#reject-all-btn");
				this.save_preferences_button = document.querySelector("#save-preferences-btn");
				this.close_banner_button = document.querySelector("#close-banner-btn");
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
						this.cookie_banner.style.display === "block"
							? this.hide_cookie_banner()
							: this.show_cookie_banner();
					},
					{ passive: true }
				);

				this.accept_all_button.addEventListener(
					"click",
					() => {
						this.accept_or_reject_all(true);
						this.hide_consent_cookie_banner();
					},
					{ passive: true }
				);

				this.reject_all_button.addEventListener(
					"click",
					() => {
						this.accept_or_reject_all(false);
						this.hide_consent_cookie_banner();
					},
					{ passive: true }
				);

				this.save_preferences_button.addEventListener(
					"click",
					() => this.save_cookie_preferences(),
					{ passive: true }
				);

				this.close_banner_button.addEventListener(
					"click",
					() => this.hide_cookie_banner(),
					{ passive: true }
				);

				this.manage_cookies_link.addEventListener("click", (event) => {
					event.preventDefault();
					this.show_cookie_banner();
				});
			}

			toggle_banner(element, show) {
				element.style.display = show ? "block" : "none";
			}

			show_cookie_banner() {
				this.toggle_banner(this.cookie_banner, true);
			}

			hide_cookie_banner() {
				this.toggle_banner(this.cookie_banner, false);
			}

			hide_consent_cookie_banner() {
				this.toggle_banner(this.consent_cookie_banner, false);
			}

			accept_or_reject_all(accept) {
				const preferences = {
					essential: true,
					performance: accept,
					functionality: accept,
				};
				this.set_cookies(preferences);
				localStorage.setItem("lastConsentTime", Date.now());
				localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
			}

			save_cookie_preferences() {
				const preferences = {
					essential: true,
					performance: this.performance_checkbox.checked,
					functionality: this.functionality_checkbox.checked,
				};
				try {
					localStorage.setItem("cookiePreferences", JSON.stringify(preferences));
					this.set_cookies(preferences);
					this.hide_cookie_banner();
				} catch (error) {
					console.error("Error saving cookie preferences:", error.message);
				}
			}

			set_cookies(preferences) {
				const expiry_date = new Date();
				expiry_date.setMonth(expiry_date.getMonth() + 3);

				for (const [key, value] of Object.entries(preferences)) {
					document.cookie = value
						? `${key}=true; expires=${expiry_date.toUTCString()}; path=/`
						: `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
				}
			}

			get_cookie_expiration(cookie_name) {
				const cookies = document.cookie.split(";");
				for (const cookie of cookies) {
					const trimmed = cookie.trim();
					if (!trimmed) continue;

					const [name, value] = trimmed.split("=");
					if (name === cookie_name && value) {
						const attributes = value.split(";");
						for (const attr of attributes) {
							const [attr_name, attr_value] = attr.trim().split("=");
							if (attr_name === "expires")
								return new Date(attr_value).getTime();
						}
					}
				}
				return null;
			}

			load_cookie_preferences() {
				try {
					const preferences = JSON.parse(
						localStorage.getItem("cookiePreferences")
					);
					if (preferences) {
						this.set_cookies(preferences);
						this.performance_checkbox.checked = preferences.performance;
						this.functionality_checkbox.checked = preferences.functionality;
					} else {
						this.consent_cookie_banner.style.display = "block";
					}
				} catch (error) {
					console.error("Error loading cookie preferences:", error.message);
				}
			}

			update_banner_visibility() {
				if (localStorage.getItem("cookiePreferences")) {
					this.consent_cookie_banner.style.display = "none";
					this.cookie_banner.style.display = "none";
				} else {
					this.consent_cookie_banner.style.display = "block";
				}
			}
		}

		const cookie_consent = new Cookie_Consent();
		cookie_consent.update_banner_visibility();
		cookie_consent.load_cookie_preferences();
		cookie_consent.get_cookie_expiration();
		Cookie_Consent.activation_info();
	});
})();