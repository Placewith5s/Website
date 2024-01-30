"use strict";
document.getElementById('Expand-Collapse-Button').addEventListener('click', toggleElements);

function toggleElements() {
    const firstElement = document.getElementById('step-hidden-from-5');

    if (firstElement) {
        const isHidden = window.getComputedStyle(firstElement).display === 'none';

        for (let i = 5; i <= 12; i++) {
            const element = document.getElementById(`step-hidden-from-${i}`);
            if (element) {
                element.style.display = isHidden ? 'block' : 'none';
            }
        }

        const button = document.getElementById('Expand-Collapse-Button');
        button.innerText = isHidden ? 'Expand' : 'Collapse';
    }
}
