(() => {
    'use strict';
    document.addEventListener("DOMContentLoaded", () => {
        class Slider {
            static activationInfo() {
                console.info("Slider activated!");
            }
            constructor () {
            this.items = document.querySelectorAll('.carousel-item');
            if (!this.items) {
                console.error("Missing required Slider elements!");
                return;
            }
            if (this.items) {
            this.currentIndex = 0;
            this.totalItems = this.items.length;
            }
            this.showNextItem();
            setInterval(this.showNextItem, 3000);
        }
        showNextItem = () => {
            this.items[this.currentIndex].classList.remove('active');
            this.currentIndex = (this.currentIndex + 1) % this.totalItems;
            this.items[this.currentIndex].classList.add('active');
            const inner = document.querySelector('.carousel-inner');
            inner.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        }
    }
    const sliderInstance = new Slider();
    Slider.activationInfo();
});
})();