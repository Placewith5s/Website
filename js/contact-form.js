"use strict";
document.addEventListener("DOMContentLoaded", () => {
	class Character_Counter {
		#input_element;
		#main;
		#char_count_element;
		constructor(input_element) {
			this.#input_element = input_element;

			// get the main element
			this.#main = document.querySelector('main');
			// get the character count element
			this.#char_count_element = this.#main.querySelector('.char-count');

			if (this.#input_element && this.#char_count_element) {
				this.max_char_count = this.#input_element.getAttribute('maxlength');
				this.#handle_invalid(0);

				this.#input_element.parentNode.appendChild(this.#char_count_element);

				// throttle the character count update function
				this.throttled_update_char_count = this.#throttle(() => {
					this.#update_char_count();
				}, 100);

				// add a throttled input event listener
				this.#input_element.addEventListener("input", this.throttled_update_char_count);
			// handle invalid character counter elements
			} else {
				console.error("Missing required Character Counter elements!");
			}
		}

		// function to assist in throttle
		#throttle(callback, delay) {
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

		// function to handle invalid character count
		#handle_invalid(current_length) {
			if (current_length == null || isNaN(current_length)) {
				console.error("Invalid current length!");
				this.#char_count_element.textContent = `Error/${this.max_char_count}`;
				return;
			}

			this.#char_count_element.textContent = `${current_length}/${this.max_char_count}`;
		}

		// function to update the character count
		#update_char_count() {
			const current_length = this.#input_element.value.length;
			this.#handle_invalid(current_length);
		}
	}

	// get the message input
	const message_input = document.querySelector('#message');
	
	if (message_input) {
		// call the character counter constructor
		new Character_Counter(message_input);
	}
});