'use strict';

try {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            try {
                console.log("Success!");
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            } catch (error) {
                console.error('Error occurred while processing intersection observer entry:', error);
            }
        });
    });

    const animatedElements = document.querySelectorAll('.anim');
    animatedElements.forEach((el) => observer.observe(el));
} catch (error) {
    console.error('Error occurred:', error);
}
