'use strict';

const animatedElements = document.querySelectorAll('.anim');

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const showAnimation = debounce(async (element, isVisible) => {
  try {
    if (isVisible) {
      element.classList.add('show');
      element.removeAttribute('aria-hidden');
    } else {
      element.classList.remove('show');
      element.setAttribute('aria-hidden', 'true');
    }
  } catch (error) {
    console.error('Error in showAnimation:', error);
  }
}, 100);

const options = {
  threshold: 0.8,
};

const observeElement = async (el) => {
  try {
    await new Promise((resolve) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          showAnimation(entry.target, entry.isIntersecting);
        });
        resolve();
      });
      observer.observe(el);
    });
    el.setAttribute('role', 'presentation');
  } catch (error) {
    console.error('Error in observeElement:', error);
  }
};

(async () => {
  try {
    for (const el of animatedElements) {
      await observeElement(el);
    }
  } catch (error) {
    console.error('Error in main function:', error);
  }
})();
