/* jshint esversion: 8 */
(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Slider {
			static activation_info() {
				console.info("Slider activated!");
			}

			constructor() {
				this.items = document.querySelectorAll(".carousel-item");

				if (this.items.length) {
					this.current_index = 0;

					this.upd_carousel_title_desc();
					this.show_next_item();
					setInterval(() => this.show_next_item(), 5000);
				} else {
					console.error("Missing required Slider elements!");
				}
			}

			show_next_item() {
				this.total_items = this.items.length;

				this.items[this.current_index].classList.remove("active");

				this.current_index = (this.current_index + 1) % this.total_items;

				this.items[this.current_index].classList.add("active");

				document.querySelector(".carousel-inner").style.transform = `translateX(-${100 * this.current_index}%)`;
			}

			async upd_carousel_title_desc() {
				try {
				const optimize_windows_pc_url = "/public/guides/optimize-windows-pc.html";
				const troubleshoot_windows_pc_url = "/public/guides/troubleshoot-windows-pc.html";

				const response_optimize_windows_pc_url = await fetch(optimize_windows_pc_url);
				const response_troubleshoot_windows_pc_url = await fetch(troubleshoot_windows_pc_url);

				const optimize_windows_pc_url_html_text = await response_optimize_windows_pc_url.text();
				const troubleshoot_windows_pc_url_html_text = await response_troubleshoot_windows_pc_url.text();

				const parser = new DOMParser();
				const doc_optimize_windows_pc_url = parser.parseFromString(optimize_windows_pc_url_html_text, "text/html");
				const doc_troubleshoot_windows_pc_url = parser.parseFromString(troubleshoot_windows_pc_url_html_text, "text/html");

				const optimize_windows_pc_title = doc_optimize_windows_pc_url.querySelector('meta[name="title"]').getAttribute('content');
				const troubleshoot_windows_pc_title = doc_troubleshoot_windows_pc_url.querySelector('meta[name="title"]').getAttribute('content');
				const optimize_windows_pc_description = doc_optimize_windows_pc_url.querySelector('meta[name="description"]').getAttribute('content');
				const troubleshoot_windows_pc_description = doc_troubleshoot_windows_pc_url.querySelector('meta[name="description"]').getAttribute('content');

				if (!optimize_windows_pc_title || !troubleshoot_windows_pc_title || !optimize_windows_pc_description || !troubleshoot_windows_pc_description) {
					console.warn("No title or description found!");
				}

				this.items.forEach(item => {
					Array.from(item.children).forEach(child => {
					switch (child.id) {	
						case "optimize-windows-pc-carousel-title":
							child.textContent = optimize_windows_pc_title || "Loading...";
							break;
						case "troubleshoot-windows-pc-carousel-title":
							child.textContent = troubleshoot_windows_pc_title || "Loading...";
							break;
						case "optimize-windows-pc-carousel-description":
							child.textContent = optimize_windows_pc_description || "Loading...";
							break;
						case "troubleshoot-windows-pc-carousel-description":
							child.textContent = troubleshoot_windows_pc_description || "Loading...";
							break;
						default:
							break;
					}
					});
				});
				} catch (err) {
					console.error("Error during carousel update:", err);
				}
			}
		}

		new Slider();

		Slider.activation_info();
	});
})();