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
            this.preloader.setAttribute("role", "progressbar");
            this.preloader.setAttribute("aria-valuemin", "0");
            this.preloader.setAttribute("aria-valuemax", this.totalStylesheets);
            this.preloader.setAttribute("aria-valuenow", "0");
            this.body = document.querySelector("body");
            this.body.setAttribute("aria-busy", "true");
            this.linkElements = {};
            this.loadStylesheets();
        }
        loadStylesheets = () => {
            this.stylesheets.forEach((stylesheet) => {
                const link = this.createStyleLinkElement(stylesheet);
                this.addListeners(link, stylesheet);
                this.linkElements[stylesheet] = link;
                document.head.appendChild(link);
            });
        }
        createStyleLinkElement = (href) => {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = href;
            return link;
        }
        addListeners = (element, filename) => {
            try {
                if (element) {
                    element.addEventListener("load", () => this.handleLoad(filename));
                    element.addEventListener("error", (error) => this.handleError(filename, error));
                } else {
                    console.error(`${filename} link not found`);
                    this.removePreloader();
                }
            } catch (error) {
                console.error(`Error adding listeners for ${filename}:`, error);
                this.removePreloader();
            }
        }
        handleLoad = (filename) => {
            console.log(`${filename} loaded successfully.`);
            this.loadedStyles[filename] = true;
            const loadedCount = Object.keys(this.loadedStyles).length;
            this.preloader.setAttribute("aria-valuenow", loadedCount);
            this.checkCSSLoaded();
        }
        handleError = (filename, error) => {
            console.error(`Error loading ${filename}:`, error);
            this.removePreloader();
        }
        checkCSSLoaded = () => {
            const allStylesLoaded = this.stylesheets.every((stylesheet) => this.loadedStyles[stylesheet]);
            if (allStylesLoaded) {
                this.removePreloader();
                this.showContent();
            }
        }
        showContent = () => {
            if (this.body) {
                this.body.style.display = "block";
                this.body.setAttribute("aria-busy", "false");
                this.preloader.removeAttribute("aria-valuenow");
            }
        }
        removePreloader = () => {
            if (this.preloader) {
                this.preloader.remove();
            }
        }
    }
    const stylesheets = ["/css/top-n-bottom.css"];
    const stylesheetLoaderInstance = new StylesheetLoader(stylesheets);
    stylesheets.forEach((stylesheet) => {
        const link = stylesheetLoaderInstance.linkElements[stylesheet];
        if (link) {
            link.removeEventListener("load", () => stylesheetLoaderInstance.handleLoad(stylesheet));
            link.removeEventListener("error", () => stylesheetLoaderInstance.handleError(stylesheet));
        }
    });
    StylesheetLoader.activationInfo();
});