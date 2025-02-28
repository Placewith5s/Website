(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		class Slider {
			static activationInfo() {
				console.info("Slider activated!");
			}

			constructor() {
				this.items = document.querySelectorAll(".carousel-item");

				if (this.items.length) {
					this.currentIndex = 0;
					this.totalItems = this.items.length;

					this.showNextItem();
					setInterval(this.showNextItem, 3000);
				} else {
					console.error("Missing required Slider elements!");
				}
			}

			showNextItem = () => {
				this.items[this.currentIndex].classList.remove("active");

				this.currentIndex = (this.currentIndex + 1) % this.totalItems;

				this.items[this.currentIndex].classList.add("active");

				document.querySelector(".carousel-inner").style.transform = `translateX(-${100 * this.currentIndex}%)`;
			};
		}

		new Slider();

		Slider.activationInfo();
	});
})();