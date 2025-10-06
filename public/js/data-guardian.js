(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Cookie_Consent {
			#cookie_banner_dialog;
			#cookie_banner;
			#show_cookie_settings_btn;
			#accept_all_btn;
			#reject_all_btn;
			#save_preferences_btn;
			#close_banner_btn;
			#consent_cookie_banner_dialog;
			#consent_cookie_banner;
			#manage_cookies_link;
			#essential_checkbox;
			#performance_checkbox;
			#functionality_checkbox;
			constructor() {
				this.#cookie_banner_dialog = document.querySelector("#cookie-banner-dialog");
				this.#cookie_banner = document.querySelector("#cookie-banner");
				this.#show_cookie_settings_btn = document.querySelector("#show-cookie-settings-btn");
				this.#accept_all_btn = document.querySelector("#accept-all-btn");
				this.#reject_all_btn = document.querySelector("#reject-all-btn");
				this.#save_preferences_btn = document.querySelector("#save-preferences-btn");
				this.#close_banner_btn = document.querySelector("#close-banner-btn");
				this.#consent_cookie_banner_dialog = document.querySelector("#consent-cookie-banner-dialog");
				this.#consent_cookie_banner = document.querySelector("#consent-cookie-banner");
				this.#manage_cookies_link = document.querySelector("#manage-cookies-link");
				this.#essential_checkbox = document.querySelector("#essential-checkbox");
				this.#performance_checkbox = document.querySelector("#performance-checkbox");
				this.#functionality_checkbox = document.querySelector("#functionality-checkbox");

				// check cookie consent items' existance to handle adding their event listeners
				if (
					this.#cookie_banner_dialog &&
					this.#cookie_banner &&
					this.#show_cookie_settings_btn &&
					this.#accept_all_btn &&
					this.#reject_all_btn &&
					this.#save_preferences_btn &&
					this.#close_banner_btn &&
					this.#consent_cookie_banner_dialog &&
					this.#consent_cookie_banner &&
					this.#manage_cookies_link &&
					this.#essential_checkbox &&
					this.#performance_checkbox &&
					this.#functionality_checkbox
				) {
					this.#add_event_listeners();
					this.#update_banner_visibility();
					this.#load_cookie_preferences();
				} else {
					console.error("Missing required Cookie Consent elements!");
				}
			}

			// function to add event listeners for cookie consent items
			#add_event_listeners() {
				// add a passive event listener for the show cookie settings button
				this.#show_cookie_settings_btn.addEventListener(
					"click",
					() => {
						if (this.#consent_cookie_banner_dialog.open) {
							this.#hide_consent_cookie_banner();
						}
						this.#show_cookie_banner();
					},
					{ passive: true }
				)				

				// add a passive event listener for the accept all button
				this.#accept_all_btn.addEventListener(
					"click",
					() => {
						this.#accept_or_reject_all(true);
						this.#hide_consent_cookie_banner();
					},
					{ passive: true }
				)

				// add a passive event listener for the reject all button
				this.#reject_all_btn.addEventListener(
					"click",
					() => {
						this.#accept_or_reject_all(false);
						this.#hide_consent_cookie_banner();
					},
					{ passive: true }
				)

				// add a passive event listener for the save preferences button
				this.#save_preferences_btn.addEventListener(
					"click",
					() => this.#save_cookie_preferences(),
					{ passive: true }
				)

				// add a passive event listener for the cookie banner button
				this.#close_banner_btn.addEventListener(
					"click",
					() => this.#hide_cookie_banner(),
					{ passive: true }
				)

				// add an event listener for the manage cookies link
				this.#manage_cookies_link.addEventListener("click", (event) => {
					event.preventDefault(); // prevent refresh behavior
					this.#show_cookie_banner();
					}
				)
			}

			// function to toggle each cookie banner
			#toggle_banner(dialog, show) {
				if (!(dialog instanceof HTMLDialogElement)) {
					throw new Error("Element is not a dialog!");
				}
				// check and handle the dialogs
				if (show) {
					if (!dialog.open) dialog.showModal();
				} else {
					if (dialog.open) dialog.close();
				}
			}

			// function to assist in showing the consent cookie banner
			#show_consent_cookie_banner() {
				this.#toggle_banner(this.#consent_cookie_banner_dialog, true);
			}
			
			// function to assist in showing the cookie banner
			#show_cookie_banner() {
				this.#toggle_banner(this.#cookie_banner_dialog, true);
			}

			// function to assist in hiding the consent cookie banner
			#hide_consent_cookie_banner() {
				this.#toggle_banner(this.#consent_cookie_banner_dialog, false);
			}
			
			// function to assist in hiding the cookie banner
			#hide_cookie_banner() {
				this.#toggle_banner(this.#cookie_banner_dialog, false);
			}

			// function to handle accept or reject button click
			#accept_or_reject_all(accept) {
				// handle preferences
				const preferences = {
					essential: true,
					performance: accept,
					functionality: accept,
				};
				// handle adding new cookies
				this.#set_cookies(preferences);
				this.#set_cookie("lastConsentTime", Date.now(), 90);
				this.#set_cookie("cookiePreferences", JSON.stringify(preferences), 90);
			}

			// function to handle saving the cookie preferences
			#save_cookie_preferences() {
				// handle preferences
				const preferences = {
					essential: true,
					performance: this.#performance_checkbox.checked,
					functionality: this.#functionality_checkbox.checked,
				}
				// attempt to handle adding new cookies
				try {
					this.#set_cookie("cookiePreferences", JSON.stringify(preferences), 90);
					this.#set_cookies(preferences);
					this.#hide_cookie_banner();
				} catch (err) {
					throw new Error("Error saving cookie preferences:", err);
				}
			}

			// function to handle adding cookies
			#set_cookies(preferences) {
				// add an expire date
				const expiry_date = new Date();
				expiry_date.setMonth(expiry_date.getMonth() + 3);

				// add the cookies
				for (const [key, value] of Object.entries(preferences)) {
					this.#set_cookie(key, value, 90); // 90 days expiration
				}
			}

			// function to assist in adding a cookie
			#set_cookie(name, value, days) {
				// add an expiry date
				const expiry_date = new Date();
				expiry_date.setDate(expiry_date.getDate() + days);

				// add the cookie
				document.cookie = `${name}=${value}; expires=${expiry_date.toUTCString()}; path=/; Secure; SameSite=Lax`;
			}

			// function to assist in getting a cookie
			#get_cookie(name) {
				const cookie_arr = document.cookie.split(";");
				for (let i = 0; i < cookie_arr.length; i++) {
					let cookie = cookie_arr[i].trim();
					if (cookie.indexOf(name + "=") == 0) {
						return cookie.substring(name.length + 1);
					}
				}
				return null;
			}

			// function to handle loading the cookie preferences
			#load_cookie_preferences() {
				// attempt to handle loading the cookie preferences
				try {
					const preferences = this.#get_cookie("cookiePreferences");
					// check and handle whether cookie preferences exist
					if (preferences) {
						const parsed_preferences = JSON.parse(preferences);
						this.#set_cookies(parsed_preferences);
						this.#performance_checkbox.checked = parsed_preferences.performance;
						this.#functionality_checkbox.checked = parsed_preferences.functionality;
					} else {
						this.#show_consent_cookie_banner();
					}
				} catch (err) {
					throw new Error("Error loading cookie preferences:", err);
				}
			}			

			// function to handle and update banner visibility
			#update_banner_visibility() {
				// check and handle whether cookie preferences exist
				if (this.#get_cookie("cookiePreferences")) {
					this.#hide_consent_cookie_banner();
					this.#hide_cookie_banner();
				} else {
					this.#show_consent_cookie_banner();
				}
			}			
		}

		// call the cookie consent constructor
		new Cookie_Consent();
	});
})();