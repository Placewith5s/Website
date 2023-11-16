function toggleDarkMode() {
    let policyMain = document.getElementById("policy");
    policyMain.classList.toggle("dark-mode");
}

function handleColorSchemeChange(event) {
    if (event.matches) {
        toggleDarkMode();
    }
}

if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    toggleDarkMode();
}

const colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
colorSchemeMediaQuery.addEventListener("change", handleColorSchemeChange);

window.addEventListener("beforeunload", function () {
    colorSchemeMediaQuery.removeEventListener("change", handleColorSchemeChange);
});

document.addEventListener("DOMContentLoaded", function() {
    if (colorSchemeMediaQuery.matches) {
        toggleDarkMode();
    }
});
