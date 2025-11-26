"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const intersection_observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // handle intersection
            try {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
                else {
                    entry.target.classList.remove("show");
                }
            }
            catch (err) {
                console.error("IntersectionObserver error:", err);
            }
        });
    });
    const hides = document.querySelectorAll(".hide");
    if (hides) {
        hides.forEach((element) => intersection_observer.observe(element));
    }
});
