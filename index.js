'use strict';

const searchInput = document.getElementById('search-input');
const contentArea = document.getElementById('content');
const notFoundMessage = document.createElement('p'); 

notFoundMessage.id = 'not-found-message';
notFoundMessage.setAttribute('tabindex', '0'); 
notFoundMessage.textContent = "No results found.";
notFoundMessage.style.display = 'none';
contentArea.appendChild(notFoundMessage);

if (!searchInput || !contentArea) {
    console.error('Error: Search input or content not found.');
} else {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let matchesFound = false;

        const filterableElements = Array.from(contentArea.children).filter(
            element => element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE'
        );

        filterableElements.forEach(element => {
            const elementText = element.textContent.toLowerCase();
            const isMatch = elementText.includes(searchTerm);

            element.style.display = isMatch ? 'block' : 'none';
            element.setAttribute('aria-hidden', !isMatch);
            if (!element.hasAttribute('role')) {
                element.setAttribute('role', 'region');
            }

            if (isMatch) {
                matchesFound = true;
            }
        });

        notFoundMessage.style.display = matchesFound ? 'none' : 'block';
    });

    searchInput.setAttribute('aria-label', 'Search for content');
    searchInput.setAttribute('role', 'searchbox');

    contentArea.setAttribute('aria-live', 'polite'); 
}
