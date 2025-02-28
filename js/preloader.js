(() => {
	"use strict";

	document.addEventListener("DOMContentLoaded", () => {

		class StylesheetLoader {
			static activationInfo() {
				console.info("StylesheetLoader activated!");
			}

			constructor(stylesheets) {
				this.stylesheets = stylesheets;
				this.loadedStyles = {};
				this.totalStylesheets = stylesheets.length;
				this.preloader = document.querySelector("#preloader");
				this.body = document.querySelector("body");

				this.preloader.setAttribute("role", "progressbar");
				this.preloader.setAttribute("aria-valuemin", "0");
				this.preloader.setAttribute("aria-valuemax", this.totalStylesheets);
				this.preloader.setAttribute("aria-valuenow", "0");

				this.body.setAttribute("aria-busy", "true");

				this.linkElements = {};
				this.loadStylesheets();
			}

			loadStylesheets() {
				this.stylesheets.forEach((stylesheet) => {
					const linkElement = this.createStyleLinkElement(stylesheet);
					this.addListeners(linkElement, stylesheet);
					this.linkElements[stylesheet] = linkElement;
					document.head.appendChild(linkElement);
				});
			}

			createStyleLinkElement(stylesheet) {
				const linkElement = document.createElement("link");
				linkElement.rel = "stylesheet";
				linkElement.href = stylesheet;
				return linkElement;
			}

			addListeners(linkElement, stylesheet) {
				try {
					if (linkElement) {
						linkElement.addEventListener("load", () => this.handleLoad(stylesheet));
						linkElement.addEventListener("error", (error) => this.handleError(stylesheet, error));
					} else {
						console.error(`${stylesheet} link not found`);
						this.removePreloader();
					}
				} catch (error) {
					console.error(`Error adding listeners for ${stylesheet}:`, error);
					this.removePreloader();
				}
			}

			handleLoad(stylesheet) {
				console.log(`${stylesheet} loaded successfully.`);
				this.loadedStyles[stylesheet] = true;
				const loadedCount = Object.keys(this.loadedStyles).length;
				this.preloader.setAttribute("aria-valuenow", loadedCount);
				this.checkCSSLoaded();
			}

			handleError(stylesheet, error) {
				console.error(`Error loading ${stylesheet}:`, error);
				this.removePreloader();
			}

			checkCSSLoaded() {
				const allStylesLoaded = this.stylesheets.every((stylesheet) => this.loadedStyles[stylesheet]);
				if (allStylesLoaded) {
					this.removePreloader();
					this.showContent();
				}
			}

			showContent() {
				if (this.body) {
					this.body.style.display = "block";
					this.body.setAttribute("aria-busy", "false");
					this.preloader.removeAttribute("aria-valuenow");
				}
			}

			removePreloader() {
				if (this.preloader) {
					this.preloader.remove();
				}
			}
		}

		const stylesheets = ["/css/top-n-bottom.css"];

		const stylesheetLoader = new StylesheetLoader(stylesheets);

		stylesheets.forEach((stylesheet) => {
			const linkElement = stylesheetLoader.linkElements[stylesheet];
			if (linkElement) {
				linkElement.removeEventListener("load", () => stylesheetLoader.handleLoad(stylesheet));
				linkElement.removeEventListener("error", () => stylesheetLoader.handleError(stylesheet));
			}
		});

		StylesheetLoader.activationInfo();
	});
})();