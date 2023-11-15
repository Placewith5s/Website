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

document.getElementById('contact-Us-Link').addEventListener('click', function () {
    document.getElementById('drawer').style.display = 'none';
    document.getElementById('contact-Us-Link').style.display = 'block';
});

// Hide function
document.getElementById('hideAboutUs').addEventListener('click', function () {
    document.getElementById('About-Us').style.display = 'none';
});
