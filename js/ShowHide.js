( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class ExpandCollapse {
      static activationInfo() {
        console.info("ExpandCollapse activated!");
    }
      constructor() {
        this.expandCollapseButton = document.querySelector("#Show-Hide");
        this.isInitialClick = true;
        if (!this.expandCollapseButton) {
          console.error("Missing required ExpandCollapse elements in the DOM!");
          return;
        }
        if (this.expandCollapseButton) {
          this.expandCollapseButton.addEventListener("click", () => this.toggleElements(), { passive: true });
        } else {
          console.error("Show/Hide button not found.");
        }
        this.toggleElements();
      }
      toggleElements = () => {
        try {
          const hiddenElements = document.querySelectorAll('[id^="step-hidden-from-"]');
          if (!hiddenElements.length) {
            console.error("Initial hidden elements not found.");
            return;
          }
          hiddenElements.forEach((element) => {
            this.toggleElementVisibility(element);
            const stepNumberMatch = element.id.match(/step-hidden-from-(\d+)/);
            if (stepNumberMatch) {
              const stepNumber = stepNumberMatch[1];
              const ariaLabelledByValue = `step${stepNumber}-hidden-heading`;
              if (element.style.display !== "none") {
                element.setAttribute("aria-labelledby", ariaLabelledByValue);
              } else {
                element.removeAttribute("aria-labelledby");
              }
            }
          });
          this.updateTextAndAria();
          this.isInitialClick = false;
        } catch (error) {
          console.error("Error occurred:", error.message);
        }
      };
      toggleElementVisibility = (element) => {
        try {
          if (this.isInitialClick) {
            element.style.display = "block";
            element.removeAttribute("aria-hidden");
          } else {
            element.style.display = element.style.display === "none" ? "block" : "none";
            element.setAttribute("aria-hidden", element.style.display === "none" ? "true" : "false");
          }
        } catch (error) {
          console.error("Error occurred while toggling element visibility:", error.message);
        }
      };
      updateTextAndAria = () => {
        const buttonText = this.expandCollapseButton.textContent === "Show More" ? "Hide More" : "Show More";
        this.expandCollapseButton.textContent = buttonText;
        this.expandCollapseButton.setAttribute("aria-expanded", buttonText === "Hide More" ? "true" : "false");
      };
    }
    const expandCollapseInstance = new ExpandCollapse();
    expandCollapseInstance.expandCollapseButton.removeEventListener("click", expandCollapseInstance);
    ExpandCollapse.activationInfo();
});
})();