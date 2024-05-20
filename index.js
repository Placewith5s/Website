'use strict';

const searchInput = document.getElementById('search-input');
const contentArea = document.getElementById('content');

if (!searchInput || !contentArea) {
  console.error('Error: Search input or content not found.');
} else {
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim(); 

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
    });
  });

  // ARIA attributes for search input
  searchInput.setAttribute('aria-label', 'Search for content');
  searchInput.setAttribute('role', 'searchbox');

  // Live region for search results updates
  contentArea.setAttribute('aria-live', 'polite'); 
}
