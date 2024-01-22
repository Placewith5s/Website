document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const notFoundMessage = document.getElementById("not-found-message");

    searchBar.addEventListener("input", function () {
        const searchTerm = searchBar.value.toLowerCase();

        // Get all FAQ sections
        const faqSections = document.querySelectorAll("main section");

        let found = false;

        // Loop through each FAQ section and toggle visibility based on the search term
        faqSections.forEach(function (section) {
            const sectionText = section.textContent.toLowerCase();

            if (sectionText.includes(searchTerm)) {
                section.style.display = "block";
                found = true;
            } else {
                section.style.display = "none";
            }
        });

        // Display or hide the "not found" message based on whether any section was found
        notFoundMessage.style.display = found ? "none" : "block";
    });
});
