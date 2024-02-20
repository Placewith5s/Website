'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const body = document.querySelector('body');
    const styleLink = createStyleLinkElement('style.css');
    const tnStyleLink = createStyleLinkElement('topnbottom.css');

    const handleLoad = (filename) => {
        console.log(`${filename} loaded successfully.`);
        loadedStyles[filename] = true;
        checkCSSLoaded();
    };

    const handleError = (filename, error) => {
        console.error(`Error loading ${filename}.css:`, error);
        removePreloader();
    };

    const checkCSSLoaded = () => {
        if (loadedStyles['style.css'] && loadedStyles['topnbottom.css']) {
            removePreloader();
            showContent();
        }
    };

    const showContent = () => {
        body.style.display = 'block';
    };

    const loadedStyles = {
        'style.css': false,
        'topnbottom.css': false
    };

    const addListeners = (element, filename) => {
        try {
            if (element) {
                element.addEventListener('load', () => handleLoad(filename));
                element.addEventListener('error', (error) => handleError(filename, error));
            } else {
                console.error(`${filename} link not found`);
                removePreloader();
            }
        } catch (error) {
            console.error(`Error adding listeners for ${filename}:`, error);
            removePreloader();
        }
    };

    const removePreloader = () => {
        if (preloader) {
            preloader.remove();
        }
    };

    if (body) {
        body.style.display = 'none';
    }

    document.head.appendChild(styleLink);
    document.head.appendChild(tnStyleLink);

    function createStyleLinkElement(href) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        return link;
    }

    addListeners(styleLink, 'style.css');
    addListeners(tnStyleLink, 'topnbottom.css');
});
