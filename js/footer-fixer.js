( () => {
'use strict';
document.addEventListener("DOMContentLoaded", () => {
    class footerFixer {
        static activationInfo() {
            console.info("footerFixer activated!");
        }
        constructor () {
            this.year = document.querySelector("#year");
            if (!this.year) {
                console.error("Missing required footerFixer elements in the DOM!");
                return;
            }
            if (this.year) {
                this.variable;
                this.variable_final;
            }
            else {
                console.error("!");
            }
            this.func();
        }
        func = () => {
            this.variable = new Date();
            this.variable_final = this.variable.getFullYear();
            this.year.textContent = this.variable_final;
        }
    }
    const footerFixerInstance = new footerFixer();
    footerFixer.activationInfo();
});
})();