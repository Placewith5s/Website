(() => {
	"use strict";
	document.addEventListener("DOMContentLoaded", () => {
		class Stylesheet_Loader {
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

			// function for loading the stylesheets
			load_stylesheets() {
				this.stylesheets.forEach((stylesheet) => {
					const link_element = this.create_style_link_element(stylesheet);
					this.add_listeners(link_element, stylesheet);
					this.link_elements[stylesheet] = link_element;
					document.head.appendChild(link_element);
				});
			}

			// function to create a stylesheet link element
			create_style_link_element(stylesheet) {
				const link_element = document.createElement("link");
				link_element.rel = "stylesheet";
				link_element.href = stylesheet;
				return link_element;
			}

			// function for adding event listeners
			add_listeners(link_element, stylesheet) {
				// attempt to add event listeners
				try {
					// check for the stylesheet link elements to handle loads and errors
					if (link_element) {
						link_element.addEventListener("load", () => this.handle_load(stylesheet));
						link_element.addEventListener("error", (err) => this.handle_error(stylesheet, err));
					} else {
						this.remove_preloader();
						throw new Error(`${stylesheet} link not found!`);
					}
				} catch (err) {
					this.remove_preloader();
					throw new Error(`Error adding listeners for ${stylesheet}:`, err);
				}
			}

			// function to handle and load the stylesheets
			handle_load(stylesheet) {
				this.loaded_styles[stylesheet] = true;
				const loaded_count = Object.keys(this.loaded_styles).length;
				this.preloader.setAttribute("aria-valuenow", loaded_count);
				this.check_css_loaded();
			}

			// function to assist in handling stylesheet loader errors
			handle_error(stylesheet, err) {
				this.remove_preloader();
				throw new Error(`Error loading ${stylesheet}:`, err);
			}

			// function to check whether the CSS files loaded
			check_css_loaded() {
				const all_styles_loaded = this.stylesheets.every((stylesheet) => this.loaded_styles[stylesheet]);
				// check whether the CSS files loaded to remove the preloader and show the body content
				if (all_styles_loaded) {
					this.remove_preloader();
					this.show_content();
				}
			}

			// function to show the body content
			show_content() {
				// check for body tag to handle its display, aria-busy, and aria-valuenow
				if (this.body) {
					this.body.style.display = "block";
					this.body.setAttribute("aria-busy", "false");
					this.preloader.removeAttribute("aria-valuenow");
				}
			}

			// function to assist in removing the preloader
			remove_preloader() {
				// check and handle whether the preloader exists
				if (this.preloader) {
					this.preloader.remove();
				} else {
					throw new Error("Could not remove the preloader!");
				}
			}
		}

		const stylesheets = ["/public/css/top-n-bottom.css"];

		// call the stylesheet loader constructor
		const stylesheet_loader = new Stylesheet_Loader(stylesheets);

		stylesheets.forEach((stylesheet) => {
			const link_element = stylesheet_loader.link_elements[stylesheet];
			if (link_element) {
				link_element.removeEventListener("load", () => stylesheet_loader.handle_load(stylesheet));
				link_element.removeEventListener("error", () => stylesheet_loader.handle_error(stylesheet))
			}
		});
	});
})();