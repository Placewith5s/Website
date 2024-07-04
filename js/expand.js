'use strict';
(function() {
const expandCollapseButton = document.getElementById('Expand-Collapse-Button');
expandCollapseButton.addEventListener('click', toggleElements, {passive: true});
let isInitialClick = true;
function toggleElements() {
    try {
        const HiddenElements = document.querySelectorAll('[id^="step-hidden-from-"]');
        if (!HiddenElements.length) {
            console.error('Initial hidden elements not found.');
            return;
        }
        HiddenElements.forEach(element => {
            toggleElementVisibility(element, isInitialClick);
        });
        updateTextAndAria();
        isInitialClick = false;
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}
function toggleElementVisibility(element, isInitialClick) {
    try {
        if (isInitialClick) {
            element.style.display = 'block';
            element.removeAttribute('aria-hidden');
        } else {
            if (element.style.display === 'none') {
                element.style.display = 'block';
                element.removeAttribute('aria-hidden');
            } else {
                element.style.display = 'none';
                element.setAttribute('aria-hidden', 'true');
            }
        }
    } catch (error) {
        console.error('Error occurred while toggling element visibility:', error.message);
    }
}
function updateTextAndAria() {
    const buttonText = expandCollapseButton.textContent === 'Expand' ? 'Collapse' : 'Expand';
    expandCollapseButton.textContent = buttonText;
    
    const ariaExpandedValue = buttonText === 'Collapse' ? 'true' : 'false';
    expandCollapseButton.setAttribute('aria-expanded', ariaExpandedValue);
}
})();