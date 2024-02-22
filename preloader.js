'use strict';

class StylesheetLoader {
    constructor(stylesheets) {
        this.stylesheets = stylesheets;
        this.loadedStyles = {};
        this.preloader = document.getElementById('preloader');
        this.body = document.querySelector('body');
        this.loadStylesheets();
    }

    loadStylesheets() {
        this.stylesheets.forEach(stylesheet => {
            const link = this.createStyleLinkElement(stylesheet);
            this.addListeners(link, stylesheet);
            document.head.appendChild(link);
        });
    }

    createStyleLinkElement(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        return link;
    }

    addListeners(element, filename) {
        try {
            if (element) {
                element.addEventListener('load', () => this.handleLoad(filename));
                element.addEventListener('error', (error) => this.handleError(filename, error));
            } else {
                console.error(`${filename} link not found`);
                this.removePreloader();
            }
        } catch (error) {
            console.error(`Error adding listeners for ${filename}:`, error);
            this.removePreloader();
        }
    }

    handleLoad(filename) {
        console.log(`${filename} loaded successfully.`);
        this.loadedStyles[filename] = true;
        this.checkCSSLoaded();
    }

    handleError(filename, error) {
        console.error(`Error loading ${filename}.css:`, error);
        this.removePreloader();
    }

    checkCSSLoaded() {
        const allStylesLoaded = this.stylesheets.every(stylesheet => this.loadedStyles[stylesheet]);
        if (allStylesLoaded) {
            this.removePreloader();
            this.showContent();
        }
    }

    showContent() {
        if (this.body) {
            this.body.style.display = 'block';
        }
    }

    removePreloader() {
        if (this.preloader) {
            this.preloader.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const stylesheets = ['style.css', 'topnbottom.css'];
    new StylesheetLoader(stylesheets);
});
