'use strict';

const animatedElements = document.querySelectorAll('.anim');

const debounce = (func, delay) => {

  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
};

const showAnimation = debounce((element, isVisible) => {

  if (isVisible) {
    element.classList.add('show');
    element.removeAttribute('aria-hidden');
  } else {
    element.classList.remove('show');
    element.setAttribute('aria-hidden', 'true');
  }

}, 100);

const options = {
  threshold: 0.7,
};

const observeElement = (el) => {

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      showAnimation(entry.target, entry.isIntersecting);

    });

  }, options);
 
  observer.observe(el);
  el.setAttribute('role', 'presentation');
};

animatedElements.forEach(observeElement);
