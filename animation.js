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
    this.showAnimation = this.showAnimation.bind(this);
    this.initialize();
  }
  initialize() {
    this.element.setAttribute('role', 'presentation'); 
    this.debouncedShowAnimation = this.debounce(this.showAnimation, this.options.debounceDelay);
    this.createObserver();
  }
  createObserver() {
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.options);
    this.observer.observe(this.element);
  }
  handleIntersection(entries) {
    entries.forEach((entry) => {
      this.debouncedShowAnimation(entry.isIntersecting);
    });
  }
  showAnimation(isVisible) {
    if (isVisible !== this.isVisible) {
      this.isVisible = isVisible; 
      this.element.classList.toggle('show', isVisible);
      this.element.setAttribute('aria-hidden', isVisible ? null : 'true'); 
    }
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