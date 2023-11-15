// Toggle between dark mode and light mode
function toggleDarkMode() {
    let contactMain = document.getElementById("contact");
    contactMain.classList.toggle("dark-mode");
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkMode();
}
