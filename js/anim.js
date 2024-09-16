(() => {
    'use strict';
    document.addEventListener("DOMContentLoaded", () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                debounce (() => {
                try {
                if (entry.isIntersecting) {
                    if (!entry.target.classList.contains('show')) {
                        entry.target.classList.add('show');
                    }
                }
                else {
                    if (entry.target.classList.contains('show')) {
                    entry.target.classList.remove('show');
                    }
                }
            } 
            catch (err) {
                console.error("Anim.js failed:", err);
            }
            }, 150);
            });
        });
        const debounce = (func, delay) => {
            let timer = null;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args); 
            }, delay);
            };
        };
        const hiddenElements = document.querySelectorAll(".hide");
        hiddenElements.forEach((el) => observer.observe(el));
});
})();