// About us function
function toggleAboutUs() {
    let aboutUsSection = document.getElementById("About-Us");
    if (aboutUsSection.style.display === "none" || aboutUsSection.style.display === "") {
        aboutUsSection.style.display = "block";
    } else {
        aboutUsSection.style.display = "none";
    }
}

// Dark mode and Light mode
function setDarkTheme() {
    document.body.classList.add('dark-theme');
}

function setLightTheme() {
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
    let drawer = document.getElementById('drawer');
    drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('aboutUsLink').addEventListener('click', function () {
    document.getElementById('drawer').style.display = 'none';
    document.getElementById('About-Us').style.display = 'block';
});

document.getElementById('privacyPolicyLink').addEventListener('click', function () {
    document.getElementById('drawer').style.display = 'none';
});

// Hide function
document.addEventListener('DOMContentLoaded', function () {
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
    if (!hasConsent()) {
        displayBanner();
    }
});

function hasConsent() {
    return localStorage.getItem("cookieConsent") === "true";
}

function setConsent() {
    localStorage.setItem("cookieConsent", "true");
}

function displayBanner() {
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "block";
}

function acceptCookies() {
    setConsent();
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}

function denyCookies() {
    let cookieBanner = document.getElementById("cookie-banner");
    cookieBanner.style.display = "none";
}
