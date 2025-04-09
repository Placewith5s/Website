(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {
		const intersection_observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				debounce(() => {
					try {
						if (entry.isIntersecting) {
							if (!entry.target.classList.contains("show")) {
								entry.target.classList.add("show");
							}
						} else {
							if (entry.target.classList.contains("show")) {
								entry.target.classList.remove("show");
							}
						}
					} catch (error) {
						console.error(`${error} failed:`, error);
					}
				}, 150);
			});
		});

		const debounce = (callback, delay) => {
			let timeout_id = null;
			return (...args) => {
				clearTimeout(timeout_id);
				timeout_id = setTimeout(() => {
					callback.apply(this, args);
				}, delay);
			};
		};

		document.querySelectorAll(".hide").forEach((element) => intersection_observer.observe(element));
	});

})();