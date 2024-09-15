(() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
        class AnimatedElement {
            static activationInfo() {
                console.info("AnimatedElement activated!");
            }
            constructor(element, options = {}) {
                if (!element) {
                    throw new Error("Element is required to initialize AnimatedElement");
                }
                this.element = element;
                this.isVisible = false;
                this.options = {
                    appearThreshold: options.appearThreshold || 0.5,
                    disappearThreshold: options.disappearThreshold || 1,
                    debounceDelay: options.debounceDelay || 100
                };
                this.appearObserver = null;
                this.disappearObserver = null;
                this.animatedElements = document.querySelectorAll(".anim");
                this.showAnimation = (isVisible) => {
                    if (isVisible !== this.isVisible) {
                        this.isVisible = isVisible;
                        this.element.classList.toggle("show", isVisible);
                        this.element.setAttribute("aria-hidden", isVisible ? null : "true");
                    }
                };
                this.init();
            }
            init = () => {
                this.element.setAttribute("role", "presentation");
                this.debouncedShowAnimation = this.debounce(this.showAnimation, this.options.debounceDelay);
                this.createObservers();
            }
            createObservers = () => {
                this.appearObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                this.debouncedShowAnimation(true);
                            }
                        });
                    },
                    { threshold: this.options.appearThreshold }
                );
                this.disappearObserver = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            if (!entry.isIntersecting) {
                                this.debouncedShowAnimation(false);
                            }
                        });
                    },
                    { threshold: this.options.disappearThreshold }
                );
                this.appearObserver.observe(this.element);
                this.disappearObserver.observe(this.element);
            }
            debounce = (func, delay) => {
                let timer;
                return (...args) => {
                    clearTimeout(timer);
                    timer = setTimeout(() => {
                        func.apply(this, args);
                    }, delay);
                };
            }
        }
        animatedElements.forEach((el) => new AnimatedElement(el));
        AnimatedElement.activationInfo();
    });
})();