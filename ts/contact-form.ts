document.addEventListener("DOMContentLoaded", () => {
    class Character_Counter {
        #text_area_element;
        #main: HTMLElement | null;
        #char_count_element: HTMLSpanElement | null;
        #max_char_count: string | null;
        #throttled_upd_char_count;

        constructor(text_area_element: HTMLTextAreaElement) {
            this.#text_area_element = text_area_element;
            this.#main = document.querySelector('main');

            if (!this.#main) {
                throw new Error("No main element!");
            }

            this.#char_count_element = this.#main.querySelector('.char-count');

            if (this.#text_area_element && this.#char_count_element) {
                this.#max_char_count = this.#text_area_element.getAttribute('maxlength');
                this.#handle_invalid_char_count(0);
                this.#text_area_element?.parentNode?.appendChild(this.#char_count_element);

                this.#throttled_upd_char_count = this.#throttle(() => {
                    this.#upd_char_count();
                }, 100);

                this.#text_area_element.addEventListener("input", this.#throttled_upd_char_count);
            }
            else {
                throw new Error("Missing required Character Counter elements!");
            }
        }


        #throttle(callback, delay: number) {
            let is_throttled: boolean = false;

            let stored_args = null;

            const execute_later = () => {
                if (stored_args === null) {
                    is_throttled = false;
                }
                else {
                    callback(...stored_args);
                    stored_args = null;
                    setTimeout(execute_later, delay);
                }
            };

            return (...args) => {
                if (is_throttled) {
                    stored_args = args;
                }
                else {
                    callback(...args);
                    is_throttled = true;
                    setTimeout(execute_later, delay);
                }
            };
        }

        #handle_invalid_char_count(current_length: number): void {
            if (this.#char_count_element) {
                if ((current_length === null || isNaN(current_length) || current_length < 0)) {
                    this.#char_count_element.textContent = `Error/${this.#max_char_count}`;
                    throw new Error("Invalid current length!");
                }

                this.#char_count_element.textContent = `${current_length}/${this.#max_char_count}`;
            }
        }

        #upd_char_count(): void {
            const current_length: number = this.#text_area_element?.value?.length;
            this.#handle_invalid_char_count(current_length);
        }
    }

    const message_input: HTMLTextAreaElement | null = document.querySelector('#message');

    if (!message_input) {
        throw new Error("No message input!");
    }

    new Character_Counter(message_input);
});
