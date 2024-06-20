'use strict';
(function() {
document.addEventListener('DOMContentLoaded', function () {
    function FAQSearch(searchBarId, notFoundMessageId) {
        this.searchBar = document.getElementById(searchBarId);
        this.notFoundMessage = document.getElementById(notFoundMessageId);
        this.notFoundMessage.style.display = "none";
        this.notFoundMessage.setAttribute('aria-hidden', 'true');
        this.searchBar.addEventListener("input", this.debounce(this.searchSections.bind(this), 300));
    }
    FAQSearch.prototype.searchSections = function () {
        try {
            const searchTerm = this.searchBar.value.trim().toLowerCase();
            const faqSections = document.querySelectorAll("main details");
            let found = false;
            faqSections.forEach(section => {
                const sectionText = section.textContent.toLowerCase();
                if (sectionText.includes(searchTerm)) {
                    section.style.display = "block";
                    section.removeAttribute('aria-hidden');
                    found = true;
                } else {
                    section.style.display = "none";
                    section.setAttribute('aria-hidden', 'true');
                }
            });
            this.toggleNotFoundMessage(found);
        } catch (error) {
            console.error('An error occurred while searching sections:', error);
        }
    };
    FAQSearch.prototype.debounce = function (func, delay) {
        let timeoutId;
        return () => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, arguments), delay);
        };
    };
    FAQSearch.prototype.toggleNotFoundMessage = function (found) {
        if (found) {
            this.notFoundMessage.style.display = "none";
            this.notFoundMessage.setAttribute('aria-hidden', 'true');
        } else {
            this.notFoundMessage.style.display = "block";
            this.notFoundMessage.removeAttribute('aria-hidden');
        }
        this.notFoundMessage.setAttribute('aria-live', found ? 'off' : 'polite');
        this.notFoundMessage.setAttribute('role', 'status');
        this.notFoundMessage.setAttribute('aria-relevant', 'additions');
        this.notFoundMessage.setAttribute('aria-atomic', 'true');
    };
    const faqSearch = new FAQSearch("search-bar", "not-found-message"); 
});
})();