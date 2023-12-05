document.addEventListener("DOMContentLoaded", function () {
    // Call the function to check and set dark mode preference
    myDarkModeModule.checkAndSetDarkModePreference();
});

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");

    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();

        // Get all FAQ sections
        const faqSections = document.querySelectorAll("main section");

        // Loop through each FAQ section and toggle visibility based on the search term
        faqSections.forEach(function (section) {
            const sectionText = section.textContent.toLowerCase();

            if (sectionText.includes(searchTerm)) {
                section.style.display = "block";
            } else {
                section.style.display = "none";
            }
        });
    });
});
