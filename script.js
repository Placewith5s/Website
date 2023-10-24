function toggleAboutUs() {
    var aboutUsSection = document.getElementById('About-Us');
    if (aboutUsSection.style.display === 'none' || aboutUsSection.style.display === '') {
        aboutUsSection.style.display = 'block';
    } else {
        aboutUsSection.style.display = 'none';
    }
}

function setDarkTheme() {
    
    document.body.classList.add('dark-theme');
}

function setLightTheme() {
    
    document.body.classList.remove('dark-theme');
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    setDarkTheme();
} else {
    setLightTheme();
}