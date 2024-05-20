'use strict';

const animatedElements = document.querySelectorAll('.anim');

// Debounce function to limit the rate at which a function can fire
const debounce = (func, delay) => {

  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

// Function to show or hide animation based on element visibility
const showAnimation = debounce((element, isVisible) => {

  if (isVisible) {
    element.classList.add('show');
    element.removeAttribute('aria-hidden');
  } else {
    element.classList.remove('show');
    element.setAttribute('aria-hidden', 'true');
  }

}, 100);

// IntersectionObserver options
const options = {
  threshold: 0.7,
};

// Function to observe an element and trigger animation
const observeElement = (el) => {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      showAnimation(entry.target, entry.isIntersecting);

    });

  }, options);
 
  observer.observe(el);
  el.setAttribute('role', 'presentation');
};

// Initialize the observer for each animated element
animatedElements.forEach(observeElement);
