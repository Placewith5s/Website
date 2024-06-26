'use strict';
(function() {
function SearchFilter(searchInputId, contentAreaId) {
    this.searchInput = document.getElementById(searchInputId);
    this.contentArea = document.getElementById(contentAreaId);
    this.notFoundMessage = null; 
    this.filterableElements = [];
    this.initialize = () => {
        if (!this.searchInput || !this.contentArea) {
            console.error('Error: Search input or content area not found.');
            return;
        }
        this.createNotFoundMessage();
        this.setupSearchFiltering();
    };
    this.createNotFoundMessage = () => {
        this.notFoundMessage = document.createElement('p');
        this.notFoundMessage.id = 'not-found-message';
        this.notFoundMessage.textContent = "No search results found.";
        this.notFoundMessage.style.display = 'none';
        this.contentArea.appendChild(this.notFoundMessage);
    };
    this.setupSearchFiltering = () => {
        this.searchInput.addEventListener('input', this.filterContent.bind(this));
        this.contentArea.setAttribute('aria-live', 'polite');
        this.filterableElements = Array.from(this.contentArea.children).filter(
            element => !['SCRIPT', 'STYLE'].includes(element.tagName)
        );
    };
    this.filterContent = () => {
        const searchTerm = this.searchInput.value.toLowerCase().trim();
        let matchesFound = false;
        this.filterableElements.forEach(element => {
            const elementText = element.textContent.toLowerCase();
            const isMatch = elementText.includes(searchTerm);
            element.style.display = isMatch ? 'block' : 'none';
            element.setAttribute('aria-hidden', !isMatch);
            if (!element.hasAttribute('role')) {
                element.setAttribute('role', 'region');
            }
            matchesFound = matchesFound || isMatch;
        });
        this.notFoundMessage.style.display = matchesFound ? 'none' : 'block';
    };
    this.initialize();
}
const searchFilter = new SearchFilter('search-input', 'content'); 
})();