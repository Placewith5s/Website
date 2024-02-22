"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const notFoundMessage = document.getElementById("not-found-message");

    searchBar.addEventListener("input", debounce(searchSections, 300));

    function searchSections() {
        const searchTerm = searchBar.value.trim().toLowerCase();
        const faqSections = document.querySelectorAll("main details");

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

    function debounce(func, delay) {
        let timeoutId;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeoutId);
            timeoutId = setTimeout(function () {
                func.apply(context, args);
            }, delay);
        };
    }
});
