"use strict";

document.getElementById('Expand-Collapse-Button').addEventListener('click', toggleElements);

function toggleElements() {
    const initialHiddenElement = document.getElementById('step-hidden-from-5');

    if (initialHiddenElement) {
        const isHidden = window.getComputedStyle(initialHiddenElement).display === 'none';

        for (let i = 5; i <= 12; i++) {
            toggleElementVisibility(`step-hidden-from-${i}`, isHidden);
        }

        const buttonText = isHidden ? 'Expand' : 'Collapse';
        updateButtonText('Expand-Collapse-Button', buttonText);
    }
}

function toggleElementVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = isVisible ? 'block' : 'none';
    }
}

function updateButtonText(buttonId, text) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.innerText = text;
    }
}
