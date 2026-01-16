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
            this.#consent_cookie_banner_dialog = document.querySelector("#consent-cookie-banner-dialog");
            this.#consent_cookie_banner = document.querySelector("#consent-cookie-banner");
            this.#show_cookie_settings_btn = document.querySelector("#show-cookie-settings-btn");
            this.#accept_all_btn = document.querySelector("#accept-all-btn");
            this.#reject_all_btn = document.querySelector("#reject-all-btn");
            this.#cookie_banner_dialog = document.querySelector("#cookie-banner-dialog");
            this.#cookie_banner = document.querySelector("#cookie-banner");
            this.#save_preferences_btn = document.querySelector("#save-preferences-btn");
            this.#close_banner_btn = document.querySelector("#close-banner-btn");
            this.#essential_checkbox = document.querySelector("#essential-checkbox");
            this.#performance_checkbox = document.querySelector("#performance-checkbox");
            this.#functionality_checkbox = document.querySelector("#functionality-checkbox");
            this.#manage_cookies_link = document.querySelector("#manage-cookies-link");
            if (this.#cookie_banner_dialog &&
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
                this.#functionality_checkbox) {
                this.#add_event_listeners();
                this.#update_banner_visibility();
                this.#load_cookie_preferences();
            }
            else {
                throw new Error("Missing required Cookie Consent elements!");
            }
        }
        #add_event_listeners() {
            this.#show_cookie_settings_btn?.addEventListener("click", () => {
                if (this.#consent_cookie_banner_dialog?.open) {
                    this.#hide_consent_cookie_banner();
                }
                this.#show_cookie_banner();
            }, { passive: true });
            this.#accept_all_btn?.addEventListener("click", () => {
                this.#accept_or_reject_all(true);
                this.#hide_consent_cookie_banner();
            }, { passive: true });
            this.#reject_all_btn?.addEventListener("click", () => {
                this.#accept_or_reject_all(false);
                this.#hide_consent_cookie_banner();
            }, { passive: true });
            this.#save_preferences_btn?.addEventListener("click", () => this.#save_cookie_preferences(), { passive: true });
            this.#close_banner_btn?.addEventListener("click", () => this.#hide_cookie_banner(), { passive: true });
            this.#manage_cookies_link?.addEventListener("click", (event) => {
                event.preventDefault();
                this.#show_cookie_banner();
            });
        }
        #check_dialog(dialog) {
            if (!dialog) {
                throw new Error("Invalid dialog element given!");
            }
        }
        #toggle_banner(dialog, show) {
            this.#check_dialog(dialog);
            if (show) {
                if (!dialog.open)
                    dialog.showModal();
            }
            else {
                if (dialog.open)
                    dialog.close();
            }
        }
        #show_consent_cookie_banner() {
            this.#toggle_banner(this.#consent_cookie_banner_dialog, true);
        }
        #show_cookie_banner() {
            this.#toggle_banner(this.#cookie_banner_dialog, true);
        }
        #hide_consent_cookie_banner() {
            this.#toggle_banner(this.#consent_cookie_banner_dialog, false);
        }
        #hide_cookie_banner() {
            this.#toggle_banner(this.#cookie_banner_dialog, false);
        }
        #accept_or_reject_all(accept) {
            const preferences = {
                essential: true,
                performance: accept,
                functionality: accept,
            };
            this.#set_cookies(preferences);
            this.#set_cookie("last_consent_time", Date.now(), 90);
            this.#set_cookie("cookie_preferences", JSON.stringify(preferences), 90);
        }
        #save_cookie_preferences() {
            const preferences = {
                essential: true,
                performance: this.#performance_checkbox?.checked,
                functionality: this.#functionality_checkbox?.checked,
            };
            try {
                this.#set_cookie("cookie_preferences", JSON.stringify(preferences), 90);
                this.#set_cookies(preferences);
                this.#hide_cookie_banner();
            }
            catch (err) {
                throw new Error(`Error saving cookie preferences: ${err}`);
            }
        }
        #set_cookies(preferences) {
            if (!preferences) {
                throw new Error("Invalid preferences given!");
            }
            const expiry_date = new Date();
            expiry_date.setMonth(expiry_date.getMonth() + 3);
            for (const [key, value] of Object.entries(preferences)) {
                this.#set_cookie(key, value, 90);
            }
        }
        #set_cookie(name, value, days) {
            if (!name) {
                throw new Error("Invalid name given!");
            }
            if (!days) {
                throw new Error("Invalid days given!");
            }
            const expiry_date = new Date();
            expiry_date.setDate(expiry_date.getDate() + days);
            document.cookie = `${name}=${value}; expires=${expiry_date.toUTCString()}; path=/; Secure; SameSite=Lax`;
        }
        #get_cookie(name) {
            if (!name) {
                throw new Error("Invalid name given!");
            }
            const cookie_arr = document.cookie.split(";");
            for (let i = 0; i < cookie_arr.length; i++) {
                let cookie = cookie_arr[i].trim();
                if (cookie.indexOf(name + "=") == 0) {
                    return cookie.substring(name.length + 1);
                }
            }
        }
        #load_cookie_preferences() {
            try {
                const preferences = this.#get_cookie("cookie_preferences");
                if (preferences) {
                    const parsed_preferences = JSON.parse(preferences);
                    this.#set_cookies(parsed_preferences);
                    if (this.#performance_checkbox && this.#functionality_checkbox) {
                        this.#performance_checkbox.checked = parsed_preferences.performance;
                        this.#functionality_checkbox.checked = parsed_preferences.functionality;
                    }
                }
                else {
                    this.#show_consent_cookie_banner();
                }
            }
            catch (err) {
                throw new Error(`Error loading cookie preferences: ${err}`);
            }
        }
        #update_banner_visibility() {
            if (this.#get_cookie("cookie_preferences")) {
                this.#hide_consent_cookie_banner();
                this.#hide_cookie_banner();
            }
            else {
                this.#show_consent_cookie_banner();
            }
        }
    }
    new Cookie_Consent();
});
