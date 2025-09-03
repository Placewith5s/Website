(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Character_Counter {
			static activation_info() {
				console.info("Character Counter activated!");
			}

			constructor(input_element) {
				this.input_element = input_element;
				this.char_count_element = document.querySelector(".char-count");

				if (this.input_element && this.char_count_element) {
					this.max_char_count = this.input_element.getAttribute("maxlength");
					this.char_count_element.textContent = `0/${this.max_char_count}`;

					this.input_element.parentNode.appendChild(this.char_count_element);

					this.throttled_update_char_count = this.throttle(() => {
						this.update_char_count();
					}, 100);

					this.input_element.addEventListener("input", this.throttled_update_char_count);
				} else {
					console.error("Missing required CharacterCounter elements!");
				}
			}

			throttle(callback, delay) {
				let is_throttled = false;
				let stored_args = null;

				const execute_later = () => {
					if (stored_args === null) {
						is_throttled = false;
					} else {
						callback(...stored_args);
						stored_args = null;
						setTimeout(execute_later, delay);
					}
				}

				return (...args) => {
					if (is_throttled) {
						stored_args = args;
					} else {
						callback(...args);
						is_throttled = true;
						setTimeout(execute_later, delay);
					}
				}
			}

			update_char_count() {
				const current_length = this.input_element.value.length;
				this.max_char_count = this.input_element.getAttribute("maxlength");
				this.char_count_element.textContent = `${current_length}/${this.max_char_count}`;
			}
		}

		const message_input = document.querySelector("#message");
		if (message_input) {
			new Character_Counter(message_input);
			Character_Counter.activation_info();
		}
	});
})();