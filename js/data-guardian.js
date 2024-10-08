(()=>{"use strict";document.addEventListener("DOMContentLoaded",(()=>{class e{static activationInfo(){console.info("CookieConsent activated!")}constructor(){this.cookieBanner=document.querySelector("#cookie-banner"),this.showCookieSettingsButton=document.querySelector("#show-cookie-settings-btn"),this.acceptAllButton=document.querySelector("#accept-all-btn"),this.rejectAllButton=document.querySelector("#reject-all-btn"),this.savePreferencesButton=document.querySelector("#save-preferences-btn"),this.closeBannerButton=document.querySelector("#close-banner-btn"),this.consentCookieBanner=document.querySelector("#consent-cookie-banner"),this.manageCookiesLink=document.querySelector("#manage-cookies-link"),this.essentialCheckbox=document.querySelector("#essential-checkbox"),this.performanceCheckbox=document.querySelector("#performance-checkbox"),this.functionalityCheckbox=document.querySelector("#functionality-checkbox"),this.cookieBanner&&this.showCookieSettingsButton&&this.savePreferencesButton&&this.closeBannerButton&&this.consentCookieBanner&&this.manageCookiesLink?this.addEventListeners():console.error("Missing required CookieConsent elements!")}addEventListeners=()=>{this.showCookieSettingsButton.addEventListener("click",(()=>{"block"===this.cookieBanner.style.display?this.hideCookieBanner():this.showCookieBanner()}),{passive:!0}),this.acceptAllButton.addEventListener("click",(()=>{this.acceptOrRejectAll(!0),this.hideConsentCookieBanner()}),{passive:!0}),this.rejectAllButton.addEventListener("click",(()=>{this.acceptOrRejectAll(!1),this.hideConsentCookieBanner()}),{passive:!0}),this.savePreferencesButton.addEventListener("click",(()=>this.saveCookiePreferences()),{passive:!0}),this.closeBannerButton.addEventListener("click",(()=>this.hideCookieBanner()),{passive:!0}),this.manageCookiesLink.addEventListener("click",(e=>{e.preventDefault(),this.showCookieBanner()}))};toggleBanner=(e,t)=>{e.style.display=t?"block":"none"};showCookieBanner=()=>{this.toggleBanner(this.cookieBanner,!0)};hideCookieBanner=()=>{this.toggleBanner(this.cookieBanner,!1)};hideConsentCookieBanner=()=>{this.toggleBanner(this.consentCookieBanner,!1)};acceptOrRejectAll=e=>{const t={essential:!0,performance:e,functionality:e};this.setCookies(t),localStorage.setItem("lastConsentTime",Date.now()),localStorage.setItem("cookiePreferences",JSON.stringify(t))};saveCookiePreferences=()=>{const e={essential:!0,performance:this.performanceCheckbox.checked,functionality:this.functionalityCheckbox.checked};try{localStorage.setItem("cookiePreferences",JSON.stringify(e)),this.setCookies(e),this.hideCookieBanner()}catch(e){console.error("Error saving cookie preferences:",e.message)}};setCookies=e=>{const t=new Date;t.setMonth(t.getMonth()+3);for(const[o,n]of Object.entries(e))document.cookie=n?`${o}=true; expires=${t.toUTCString()}; path=/`:`${o}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`};getCookieExpiration=e=>{const t=document.cookie.split(";");for(const o of t){const t=o.trim();if(!t)continue;const[n,i]=t.split("=");if(n===e&&i){const e=i.split(";");for(const t of e){const[e,o]=t.trim().split("=");if("expires"===e)return new Date(o).getTime()}}}return null};loadCookiePreferences=()=>{try{const e=JSON.parse(localStorage.getItem("cookiePreferences"));e?(this.setCookies(e),this.performanceCheckbox.checked=e.performance,this.functionalityCheckbox.checked=e.functionality):this.consentCookieBanner.style.display="block"}catch(e){console.error("Error loading cookie preferences:",e.message)}};updateBannerVisibility=()=>{localStorage.getItem("cookiePreferences")?(this.consentCookieBanner.style.display="none",this.cookieBanner.style.display="none"):this.consentCookieBanner.style.display="block"}}const t=new e;t.updateBannerVisibility(),t.loadCookiePreferences(),t.getCookieExpiration(),e.activationInfo()}))})();