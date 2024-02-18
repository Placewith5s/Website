'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const styleLink = document.getElementById('style-link');
    const tnStyleLink = document.getElementById('tn-style-link');

    let styleLoaded = false;
    let tnStyleLoaded = false;

    const removePreloader = () => {
        if (preloader) {
            preloader.remove();
        }
    };

    const checkCSSLoaded = () => {
        if (styleLoaded && tnStyleLoaded) {
            removePreloader();
        }
    };

    if (styleLink) {
        styleLink.addEventListener('load', () => {
            styleLoaded = true;
            checkCSSLoaded();
        });

        styleLink.addEventListener('error', (error) => {
            console.error('Error loading style.css:', error);
            removePreloader();
        });
    } else {
        removePreloader();
    }

    if (tnStyleLink) {
        tnStyleLink.addEventListener('load', () => {
            tnStyleLoaded = true;
            checkCSSLoaded();
        });

        tnStyleLink.addEventListener('error', (error) => {
            console.error('Error loading top.css:', error);
            removePreloader();
        });
    } else {
        removePreloader();
    }
});