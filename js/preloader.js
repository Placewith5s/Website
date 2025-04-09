(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {

		class Stylesheet_Loader {
			static activation_info() {
				console.info("Stylesheet Loader activated!");
			}

			constructor(stylesheets) {
				this.stylesheets = stylesheets;
				this.loaded_styles = {};
				this.total_stylesheets = stylesheets.length;
				this.preloader = document.querySelector("#preloader");
				this.body = document.querySelector("body");

				this.preloader.setAttribute("role", "progressbar");
				this.preloader.setAttribute("aria-valuemin", "0");
				this.preloader.setAttribute("aria-valuemax", this.total_stylesheets);
				this.preloader.setAttribute("aria-valuenow", "0");

				this.body.setAttribute("aria-busy", "true");

				this.link_elements = {};
				this.load_stylesheets();
			}

			load_stylesheets() {
				this.stylesheets.forEach((stylesheet) => {
					const link_element = this.create_style_link_element(stylesheet);
					this.add_listeners(link_element, stylesheet);
					this.link_elements[stylesheet] = link_element;
					document.head.appendChild(link_element);
				});
			}

			create_style_link_element(stylesheet) {
				const link_element = document.createElement("link");
				link_element.rel = "stylesheet";
				link_element.href = stylesheet;
				return link_element;
			}

			add_listeners(link_element, stylesheet) {
				try {
					if (link_element) {
						link_element.addEventListener("load", () => this.handle_load(stylesheet));
						link_element.addEventListener("error", (error) => this.handle_error(stylesheet, error));
					} else {
						console.error(`${stylesheet} link not found`);
						this.remove_preloader();
					}
				} catch (error) {
					console.error(`Error adding listeners for ${stylesheet}:`, error);
					this.remove_preloader();
				}
			}

			handle_load(stylesheet) {
				console.log(`${stylesheet} loaded successfully.`);
				this.loaded_styles[stylesheet] = true;
				const loaded_count = Object.keys(this.loaded_styles).length;
				this.preloader.setAttribute("aria-valuenow", loaded_count);
				this.check_css_loaded();
			}

			handle_error(stylesheet, error) {
				console.error(`Error loading ${stylesheet}:`, error);
				this.remove_preloader();
			}

			check_css_loaded() {
				const all_styles_loaded = this.stylesheets.every((stylesheet) => this.loaded_styles[stylesheet]);
				if (all_styles_loaded) {
					this.remove_preloader();
					this.show_content();
				}
			}

			show_content() {
				if (this.body) {
					this.body.style.display = "block";
					this.body.setAttribute("aria-busy", "false");
					this.preloader.removeAttribute("aria-valuenow");
				}
			}

			remove_preloader() {
				if (this.preloader) {
					this.preloader.remove();
				}
			}
		}

		const stylesheets = ["/css/top-n-bottom.css"];

		const stylesheet_loader = new Stylesheet_Loader(stylesheets);

		stylesheets.forEach((stylesheet) => {
			const link_element = stylesheet_loader.link_elements[stylesheet];
			if (link_element) {
				link_element.removeEventListener("load", () => stylesheet_loader.handle_load(stylesheet));
				link_element.removeEventListener("error", () => stylesheet_loader.handle_error(stylesheet));
			}
		});

		Stylesheet_Loader.activation_info();
	});
})();