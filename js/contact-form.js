(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class CharacterCounter {
			static activationInfo() {
				console.info("CharacterCounter activated!");
			}

			constructor(inputElement) {
				this.inputElement = inputElement;
				this.charCountElement = document.querySelector(".char-count");

				if (this.inputElement && this.charCountElement) {
					this.maxCharCount = this.inputElement.getAttribute("maxlength");
					this.charCountElement.textContent = `0/${this.maxCharCount}`;

					this.inputElement.parentNode.appendChild(this.charCountElement);

					this.throttledUpdateCharCount = this.throttle(() => {
						this.updateCharCount();
					}, 100);

					this.inputElement.addEventListener("input", this.throttledUpdateCharCount);
				} else {
					console.error("Missing required CharacterCounter elements!");
				}
			}

			throttle(callback, delay) {
				let isThrottled = false;
				let storedArgs = null;

				const executeLater = () => {
					if (storedArgs === null) {
						isThrottled = false;
					} else {
						callback(...storedArgs);
						storedArgs = null;
						setTimeout(executeLater, delay);
					}
				};

				return (...args) => {
					if (isThrottled) {
						storedArgs = args;
					} else {
						callback(...args);
						isThrottled = true;
						setTimeout(executeLater, delay);
					}
				};
			}

			updateCharCount() {
				const currentLength = this.inputElement.value.length;
				this.maxCharCount = this.inputElement.getAttribute("maxlength");
				this.charCountElement.textContent = `${currentLength}/${this.maxCharCount}`;
			}
		}

		const messageInput = document.querySelector("#message");
		if (messageInput) {
			new CharacterCounter(messageInput);
			CharacterCounter.activationInfo();
		}
	});
})();