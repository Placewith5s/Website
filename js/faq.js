"use strict";
class SummaryElement {
  constructor() {
    this.element = document.querySelector("summary");
    this.element.setAttribute("aria-expanded", "false");
    document.addEventListener("click", (event) => {
      const target = event.target;
      if (target.tagName === "SUMMARY") {
        const isExpanded = target.getAttribute("aria-expanded") === "true";
        target.setAttribute("aria-expanded", !isExpanded);
      }
    }, { passive: true });
  }
}
const summary = new SummaryElement();