( () => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
    class SummaryElement {
        static activationInfo() {
            console.info("SummaryElement activated!");
        }
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
const summaryElementInstance = new SummaryElement();
SummaryElement.activationInfo();
});
})();