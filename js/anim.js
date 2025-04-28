"use strict";
(() => {
	document.addEventListener("DOMContentLoaded", () => {
		const intersection_observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
					try {
						if (entry.isIntersecting) {
							entry.target.classList.add("show")
						} else {
							entry.target.classList.remove("show")
							}
					} catch (err) {
						console.error("IntersectionObserver error:", err)
					}
			});
		});
		document.querySelectorAll(".hide").forEach((element) => intersection_observer.observe(element))
	});
})()