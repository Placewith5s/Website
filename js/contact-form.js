(() => {
    'use strict';
    document.addEventListener("DOMContentLoaded", () => {
        class CharacterCounter {
            static activationInfo() {
                console.info("CharacterCounter activated!");
            }
            constructor(inputElement) {
                this.inputElement = inputElement;
                this.charCountElement = document.querySelector(".char-count");
                if (!this.inputElement || !this.charCountElement) {
                    console.error("Missing required CharacterCounter elements!");
                    return;
                }
                this.maxCharCount = this.inputElement.getAttribute("maxlength");
                this.charCountElement.textContent = `0/${this.maxCharCount}`;
                this.inputElement.parentNode.appendChild(this.charCountElement);
                this.throttledUpdateCharCount = this.throttle(() => {
                    this.updateCharCount();
                }, 100);
                this.inputElement.addEventListener("input", this.throttledUpdateCharCount);
            }
            throttle = (callback, delay) => {
                let shouldWait = false;
                let waitingArgs = null;
                const timeOutFunc = () => {
                    if (waitingArgs === null) {
                        shouldWait = false;
                    } else {
                        callback(...waitingArgs);
                        waitingArgs = null;
                        setTimeout(timeOutFunc, delay);
                    }
                }
                return (...args) => {
                    if (shouldWait) {
                        waitingArgs = args;
                        return;
                    }
                    callback(...args);
                    shouldWait = true;
                    setTimeout(timeOutFunc, delay);
                }
            }
            updateCharCount = () => {
                const currentCharCount = this.inputElement.value.length;
                this.maxCharCount = this.inputElement.getAttribute("maxlength");
                this.charCountElement.textContent = `${currentCharCount}/${this.maxCharCount}`;
            }
        }
        const inputElement = document.querySelector("#message");
        if (inputElement) {
            new CharacterCounter(inputElement);
            CharacterCounter.activationInfo();
        }
    });
})();