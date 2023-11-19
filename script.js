// About us function
function toggleAboutUs() {
    // Get the About Us section element
    let aboutUsSection = document.getElementById("About-Us");

    // Toggle the display of the About Us section
    if (aboutUsSection.style.display === "none" || aboutUsSection.style.display === "") {
        aboutUsSection.style.display = "block";
    } else {
        aboutUsSection.style.display = "none";
    }
}

// Dark mode and Light mode functions
function setDarkTheme() {
    // Add the 'dark-theme' class to the body
    document.body.classList.add('dark-theme');
}

function setLightTheme() {
    // Remove the 'dark-theme' class from the body
    document.body.classList.remove('dark-theme');
}

// Check if dark mode is preferred and set the theme accordingly
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkTheme();
} else {
    setLightTheme();
}

// Menu icon function
document.getElementById('menuIcon').addEventListener('click', function () {
    // Toggle the display of the drawer when the menu icon is clicked
    let drawer = document.getElementById('drawer');
    drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
});

// Event listener for the drawer
document.getElementById('drawer').addEventListener('click', function (event) {
    // Check if the clicked element is the 'About Us' link
    if (event.target.id === 'aboutUsLink') {
        toggleAboutUs();
        document.getElementById('drawer').style.display = 'none';
    }

    // Check if the clicked element is the 'Privacy Policy' link
    if (event.target.id === 'privacyPolicyLink') {
        document.getElementById('drawer').style.display = 'none';
    }
});


// Hide function
document.addEventListener('DOMContentLoaded', function () {
    // Event listener for the 'Hide' button in the 'About Us' section
    let hideAboutUsButton = document.getElementById('hideAboutUs');
    let aboutUsSection = document.getElementById('About-Us');

    if (hideAboutUsButton && aboutUsSection) {
        hideAboutUsButton.addEventListener('click', function () {
            aboutUsSection.style.display = 'none';
        });
    }
});

// Cookies
document.addEventListener("DOMContentLoaded", function () {
    // Check for user consent and display the banner if consent is not given
    if (!hasConsent()) {
        displayBanner();
    }
});

function hasConsent() {
    // Check if the user has given consent by checking the 'cookieConsent' localStorage item
    return localStorage.getItem("cookieConsent") === "true";
}

function setConsent() {
    // Set user consent by updating the 'cookieConsent' localStorage item to 'true'
    localStorage.setItem("cookieConsent", "true");
}

function displayBanner() {
    // Display the cookie banner
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "block";
}

function acceptCookies() {
    // Set user consent and hide the cookie banner when 'Accept' button is clicked
    setConsent();
    setCookiePreferences();
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}

function denyCookies() {
    // Hide the cookie banner when 'Deny' button is clicked
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}

function setCookiePreferences() {
    // Set or remove cookies based on the user's preferences
    setCookiePreference('essentialCheckbox', 'essential');
    setCookiePreference('performanceCheckbox', 'performance');
    setCookiePreference('functionalityCheckbox', 'functionality');
    setCookiePreference('thirdPartyCheckbox', 'thirdParty');
}

function setCookiePreference(checkboxId, cookieType) {
    // Set or remove cookies based on the user's preference
    let checkbox = document.getElementById(checkboxId);

    if (checkbox && checkbox.checked) {
        // Set the cookie based on the cookieType
        // Replace the following line with your actual code for setting cookies
        document.cookie = `${cookieType}=true; expires=Thu, 01 Jan 2030 00:00:00 UTC; path=/`;
        console.log(`Setting ${cookieType} cookie.`);
    } else {
        // Remove the cookie based on the cookieType
        // Replace the following line with your actual code for removing cookies
        document.cookie = `${cookieType}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        console.log(`Removing ${cookieType} cookie.`);
    }
}

