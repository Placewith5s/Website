"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const intersection_observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            try {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
                else {
                    entry.target.classList.remove("show");
                }
            }
            catch (err) {
                throw new Error(`IntersectionObserver entry: ${err}`);
            }
        });
    });
    const hides = document.querySelectorAll(".hide");
    const check_hides = () => {
        if (hides.length === 0) {
            throw new Error("No hide element!");
        }
    };
    check_hides();
    hides.forEach((element) => intersection_observer.observe(element));
});
