'use strict';
(function() {
  class ExpandCollapse {
    constructor(buttonId = 'Expand-Collapse-Button') {
      this.expandCollapseButton = document.getElementById(buttonId);
      this.isInitialClick = true;

      if (this.expandCollapseButton) {
        this.expandCollapseButton.addEventListener('click', this.toggleElements.bind(this), { passive: true });
      } else {
        console.error('Expand/Collapse button not found.');
      }
    }
    toggleElements = () => {
      try {
        const hiddenElements = document.querySelectorAll('[id^="step-hidden-from-"]');
        if (!hiddenElements.length) {
          console.error('Initial hidden elements not found.');
          return;
        }
        hiddenElements.forEach(element => {
          this.toggleElementVisibility(element);
          const stepNumberMatch = element.id.match(/step-hidden-from-(\d+)/);
          if (stepNumberMatch) {
            const stepNumber = stepNumberMatch[1];
            const ariaLabelledByValue = `step${stepNumber}-hidden-heading`;
            if (element.style.display !== 'none') {
              element.setAttribute('aria-labelledby', ariaLabelledByValue);
            } else {
              element.removeAttribute('aria-labelledby');
            }
          }
        });
        this.updateTextAndAria();
        this.isInitialClick = false;
      } catch (error) {
        console.error('Error occurred:', error.message);
      }
    };
    toggleElementVisibility = (element) => {
      try {
        if (this.isInitialClick) {
          element.style.display = 'block';
          element.removeAttribute('aria-hidden');
        } else {
          element.style.display = element.style.display === 'none' ? 'block' : 'none';
          element.ariaHidden = element.style.display === 'none' ? 'true' : null; 
        }
      } catch (error) {
        console.error('Error occurred while toggling element visibility:', error.message);
      }
    };
    updateTextAndAria = () => {
      const buttonText = this.expandCollapseButton.textContent === 'Show More' ? 'Hide More' : 'Show More';
      this.expandCollapseButton.textContent = buttonText;
      this.expandCollapseButton.setAttribute('aria-expanded', buttonText === 'Hide More' ? 'true' : 'false');
    };
  }
  new ExpandCollapse(); 
})(); 