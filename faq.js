"use strict";
document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const notFoundMessage = document.getElementById("not-found-message");

    let timeoutId;

    searchBar.addEventListener("input", function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(searchSections, 300); // Delay execution to improve performance
    });

    function searchSections() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        const faqSections = document.querySelectorAll("main dl");

        let found = false;

        faqSections.forEach(function (section) {
            const sectionText = section.textContent.toLowerCase();

            if (sectionText.includes(searchTerm)) {
                section.style.display = "block";
                found = true;
            } else {
                section.style.display = "none";
            }
        });

        notFoundMessage.style.display = found ? "none" : "block";
    }
});
