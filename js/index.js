( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        class Search {
            static activationInfo() {
                console.info("Search activated!");
            }
            constructor() {
                this.searchBar = document.querySelector("#search-bar");
                this.notFoundMessage = document.querySelector("#not-found-message");
                if (!this.searchBar || !this.notFoundMessage) {
                    console.error("Missing required Search elements!");
                    return;
                }
                if (this.searchBar || this.notFoundMessage) {
                    this.notFoundMessage.setAttribute("aria-hidden", "true");
                    this.searchBar.addEventListener("input", this.debounce(this.searchSections, 300), { passive: true });
                }
                this.searchSections();
            }
            searchSections = () => {
                try {
                    const searchTerm = this.searchBar.value.trim().toLowerCase();
                    const Sections = document.querySelectorAll(".search-section");
                    let matchesFound = !1;
                    Sections.forEach((section) => {
                        const sectionText = section.textContent.toLowerCase();
                        const isMatch = sectionText.includes(searchTerm);
                        section.style.display = isMatch ? "block" : "none";
                        section.setAttribute("aria-hidden", !isMatch);
                        matchesFound ||= isMatch;
                    });
                    this.toggleNotFoundMessage(!matchesFound);
                } catch (error) {
                    console.error("An error occurred while searching sections:", error);
                }
            };
            debounce = (func, delay) => {
                let timer = null;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, args); 
                }, delay);
                };
            };
            toggleNotFoundMessage = (shouldShow) => {
                this.notFoundMessage.style.display = shouldShow ? "block" : "none";
                this.notFoundMessage.setAttribute("aria-hidden", !shouldShow);
                this.notFoundMessage.setAttribute("aria-live", shouldShow ? "polite" : "off");
                this.notFoundMessage.setAttribute("role", "status");
                this.notFoundMessage.setAttribute("aria-relevant", "additions");
                this.notFoundMessage.setAttribute("aria-atomic", "true");
            };
        }
        const searchInstance = new Search();
        Search.activationInfo();
    });
})();