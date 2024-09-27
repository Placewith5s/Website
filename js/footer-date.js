( () => {
    'use strict';
    document.addEventListener("DOMContentLoaded", () => {
        class FooterDate {
            static activationInfo() {
                console.info("FooterDate activated!");
            }
            constructor () {
                this.year = document.querySelector("#year");
                if (!this.year) {
                    console.error("Missing required FooterDate elements!");
                    return;
                }
                if (this.year) {
                    this.variable = null;
                    this.variable_final = null;
                }
                this.func();
            }
            func = () => {
                this.variable = new Date();
                this.variable_final = this.variable.getFullYear();
                this.year.textContent = this.variable_final;
            }
        }
        const footerDateInstance = new FooterDate();
        FooterDate.activationInfo();
});
})();