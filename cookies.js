function setDarkMode() {
    document.documentElement.setAttribute('data-theme', 'dark');
}

function setLightMode() {
    document.documentElement.removeAttribute('data-theme');
}

function toggleDarkMode() {
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDarkMode) {
        setLightMode();
    } else {
        setDarkMode();
    }
}

document.addEventListener("DOMContentLoaded", function () {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setDarkMode();
    }

    setTimeout(function () {
        toggleDarkMode();
    }, 5000);
});
