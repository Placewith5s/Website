// Function to set the dark theme
function setDarkTheme() {
    document.body.classList.add('dark-theme');
}

// Function to set the light theme
function setLightTheme() {
    document.body.classList.remove('dark-theme');
}

// Check and set the initial theme based on user preference
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkTheme();
} else {
    setLightTheme();
}

// Listen for changes in color scheme preference and adjust the theme accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
        setDarkTheme();
    } else {
        setLightTheme();
    }
});

// Event listener for the menu icon to toggle the display of the drawer
document.getElementById('menuIcon').addEventListener('click', function () {
    let drawer = document.getElementById('drawer');
    drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
});

// Event listener for the drawer to handle clicks on specific links
document.getElementById('drawer').addEventListener('click', function (event) {
    if (event.target.id === 'aboutUsLink') {
        toggleAboutUs();
        document.getElementById('drawer').style.display = 'none';
    }

    if (event.target.id === 'privacyPolicyLink') {
        document.getElementById('drawer').style.display = 'none';
    }
});

// Event listener to check for user consent and display the banner if consent is not given
document.addEventListener("DOMContentLoaded", function () {
    if (!hasConsent()) {
        displayBanner();
    }
});

// Function to check if the user has given consent
function hasConsent() {
    return localStorage.getItem("cookieConsent") === "true";
}

// Function to set user consent
function setConsent() {
    localStorage.setItem("cookieConsent", "true");
}

// Function to display the cookie banner
function displayBanner() {
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "block";
}

// Function to handle the 'Accept' button click, set consent, and hide the cookie banner
function acceptCookies() {
    setConsent();
    setCookiePreferences();
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}

// Function to handle the 'Deny' button click and hide the cookie banner
function denyCookies() {
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}

// Function to set or remove cookies based on user preferences
function setCookiePreferences() {
    setCookiePreference('essentialCheckbox', 'essential');
    setCookiePreference('performanceCheckbox', 'performance');
    setCookiePreference('functionalityCheckbox', 'functionality');
    setCookiePreference('thirdPartyCheckbox', 'thirdParty');
}

// Function to set or remove a specific cookie based on user preference
function setCookiePreference(checkboxId, cookieType) {
    let checkbox = document.getElementById(checkboxId);

    if (checkbox && checkbox.checked) {
        document.cookie = `${cookieType}=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
    } else {
        document.cookie = `${cookieType}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
    }
}
