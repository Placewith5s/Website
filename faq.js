document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("search-bar");
    const notFoundMessage = document.getElementById("not-found-message");

    notFoundMessage.style.display = "none";
    notFoundMessage.setAttribute('aria-hidden', 'true');

    searchBar.addEventListener("input", debounce(searchSections, 300));

    function searchSections() {
        try {
            const searchTerm = searchBar.value.trim().toLowerCase();
            const faqSections = document.querySelectorAll("main details");

            let found = false;

            faqSections.forEach(function (section) {
                const sectionText = section.textContent.toLowerCase();

                if (sectionText.includes(searchTerm)) {
                    section.style.display = "block";
                    section.removeAttribute('aria-hidden')
                    found = true;
                } else {
                    section.style.display = "none";
                    section.setAttribute('aria-hidden', 'true')
                }
            });

            if (found) {
                notFoundMessage.style.display = "none";
                notFoundMessage.setAttribute('aria-hidden', 'true');
                notFoundMessage.setAttribute('aria-live', 'off');
                notFoundMessage.setAttribute('role', 'status');
                notFoundMessage.setAttribute('aria-relevant', 'additions');
                notFoundMessage.setAttribute('aria-atomic', 'true');
            } else {
                notFoundMessage.style.display = "block";
                notFoundMessage.removeAttribute('aria-hidden');
                notFoundMessage.setAttribute('aria-live', 'polite');
                notFoundMessage.setAttribute('role', 'status');
                notFoundMessage.setAttribute('aria-relevant', 'additions');
                notFoundMessage.setAttribute('aria-atomic', 'true');
            }
        } catch (error) {
            console.error('An error occurred while searching sections:', error);
        }
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
