function toggleAboutUs() {
    var aboutUsSection = document.getElementById("About-Us");
    if (aboutUsSection.style.display === "none" || aboutUsSection.style.display === "") {
        aboutUsSection.style.display = "block";
    } else {
        aboutUsSection.style.display = "none";
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

document.getElementById('menuIcon').addEventListener('click', function() {
    var drawer = document.getElementById('drawer');
    drawer.style.display = (drawer.style.display === 'block') ? 'none' : 'block';
});

document.getElementById('aboutUsLink').addEventListener('click', function() {
    document.getElementById('drawer').style.display = 'none';
    document.getElementById('About-Us').style.display = 'block';
});

document.getElementById('hideAboutUs').addEventListener('click', function() {
    document.getElementById('About-Us').style.display = 'none';
});

document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            const target = this.getAttribute('href').substring(1);
            const section = document.getElementById(target.replace(/-/g, ' '));
            if (section) {
                event.preventDefault();
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
