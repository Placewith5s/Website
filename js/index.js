'use strict';
(function() {
document.addEventListener('DOMContentLoaded', () => {
  class Search {
    constructor(searchBarId, notFoundMessageId) {
      this.searchBar = document.getElementById(searchBarId);
      this.notFoundMessage = document.getElementById(notFoundMessageId);
      this.notFoundMessage.style.display = "none";
      this.notFoundMessage.setAttribute('aria-hidden', 'true');
      this.searchBar.addEventListener("input", this.debounce(this.searchSections, 300), { passive: true });
      if (!this.searchBar || !this.notFoundMessage) {
        console.error("Error: Missing required search elements.");
        return; 
    }
    }
    searchSections = () => {
      try {
        const searchTerm = this.searchBar.value.trim().toLowerCase();
        const Sections = document.querySelectorAll(".search-section .step details");
        let matchesFound = false;
        Sections.forEach(section => {
          const sectionText = section.textContent.toLowerCase();
          const isMatch = sectionText.includes(searchTerm);
          section.style.display = isMatch ? "block" : "none";
          section.setAttribute('aria-hidden', !isMatch);
          matchesFound ||= isMatch;
        });
        this.toggleNotFoundMessage(!matchesFound);
      } catch (error) {
        console.error('An error occurred while searching sections:', error);
      }
    };
    debounce = (func, delay) => {
      let timeoutId;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.call(this), delay); 
      };
    };
    toggleNotFoundMessage = (shouldShow) => {
        this.notFoundMessage.style.display = shouldShow ? "block" : "none";
        this.notFoundMessage.setAttribute('aria-hidden', !shouldShow);
        this.notFoundMessage.setAttribute('aria-live', shouldShow ? 'polite' : 'off');
        this.notFoundMessage.setAttribute('role', 'status'); 
        this.notFoundMessage.setAttribute('aria-relevant', 'additions');
        this.notFoundMessage.setAttribute('aria-atomic', 'true');
    };
  }
  const search = new Search("search-bar", "not-found-message");
});
})();