'use strict';
(function() {
    class AnimatedElement {
        constructor(element, options = {}) {
            this.element = element;
            this.isVisible = false;
            this.options = {
                threshold: options.threshold || 1,
                debounceDelay: options.debounceDelay || 100,
            };
            this.observer = null;
            this.showAnimation = (isVisible) => { 
                if (isVisible !== this.isVisible) {
                    this.isVisible = isVisible;
                    this.element.classList.toggle('show', isVisible);
                    this.element.setAttribute('aria-hidden', isVisible ? null : 'true');
                }
            };
            this.initialize();
        }
        initialize() {
            this.element.setAttribute('role', 'presentation'); 
            this.debouncedShowAnimation = this.debounce(this.showAnimation, this.options.debounceDelay); 
            this.createObserver();
        }
        createObserver() {
            this.observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    this.debouncedShowAnimation(entry.isIntersecting);
                });
            }, this.options);
            this.observer.observe(this.element);
        }
        debounce(func, delay) {
            let timeoutId;
            return (...args) => {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => func(...args), delay);
            };
        }
    }
    const animatedElements = document.querySelectorAll('.anim');
    animatedElements.forEach(el => new AnimatedElement(el));
})();