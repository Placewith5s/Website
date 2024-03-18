'use strict';

const expandCollapseButton = document.getElementById('Expand-Collapse-Button');
expandCollapseButton.addEventListener('click', toggleElements);

function toggleElements() {
    const initialHiddenElement = document.getElementById('step-hidden-from-5');

    if (initialHiddenElement) {
        const isHidden = initialHiddenElement.style.display === 'none';

        for (let i = 5; i <= 12; i++) {
            toggleElementVisibility(`step-hidden-from-${i}`, isHidden);
        }

        const buttonText = isHidden ? 'Expand' : 'Collapse';
        updateButton(expandCollapseButton, buttonText, !isHidden);
    }
}

function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
        if (isVisible) {
            element.removeAttribute('aria-hidden');
        } else {
            element.setAttribute('aria-hidden', 'true');
        }
    }
}

function updateButton(button, text, isExpanded) {
    button.innerText = text;
    button.setAttribute('aria-expanded', isExpanded);
}
