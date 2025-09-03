(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Slider {
			static activation_info() {
				console.info("Slider activated!");
			}

			constructor() {
				this.items = document.querySelectorAll(".carousel-item");

				if (this.items.length) {
					this.current_index = 0;
					this.total_items = this.items.length;

					this.show_next_item();
					setInterval(() => this.show_next_item(), 5000);
				} else {
					console.error("Missing required Slider elements!");
				}
			}

			show_next_item() {
				this.items[this.current_index].classList.remove("active");

				this.current_index = (this.current_index + 1) % this.total_items;

				this.items[this.current_index].classList.add("active");

				document.querySelector(".carousel-inner").style.transform = `translateX(-${100 * this.current_index}%)`;
			}
		}

		new Slider();

		Slider.activation_info();
	});
})();