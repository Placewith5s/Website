// verification.js

document.addEventListener("DOMContentLoaded", function () {
    const siteKey = '6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe';
    const verificationForm = document.getElementById("verificationForm");
    const homePageSection = document.getElementById("Home-Page");

    // Always show the reCAPTCHA v3 badge
    grecaptcha.ready(function () {
        grecaptcha.execute(siteKey, { action: 'show' });
    });

    // Check verification status from cookies
    const verificationData = getVerificationDataFromCookie(); // Use a separate function to get verification data

    if (verificationData && verificationData.status === "verified" && verificationData.timestamp) {
        const currentTime = new Date().getTime();
        const thirtyMinutesInMillis = 30 * 60 * 1000;

        if (currentTime - verificationData.timestamp >= thirtyMinutesInMillis) {
            // More than 30 minutes have passed since the last verification
            showFormAndHideHomePage();
        } else {
            // Less than 30 minutes have passed, hide the form and show the Home-Page
            hideFormAndShowHomePage();
        }
    } else {
        // User is not verified, hide the Home-Page and show the form
        hideHomePageAndShowForm();
    }

    verificationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        // Execute and get the reCAPTCHA token
        grecaptcha.execute(siteKey, { action: 'submit' })
            .then(function (token) {
                // For demonstration purposes, log the reCAPTCHA token to the console
                console.log("reCAPTCHA Token:", token);

                // Simulate verification logic
                const isVerified = token && token.length > 0;

                if (isVerified) {
                    // Handle successful reCAPTCHA v3 verification
                    alert("Successfully verified with reCAPTCHA v3!");

                    // Set a new verification timestamp in the cookie
                    const newVerificationData = {
                        status: "verified",
                        timestamp: new Date().getTime()
                    };
                    setVerificationDataCookie(newVerificationData);

                    // Show the Home-Page and hide the form
                    showHomePageAndHideForm();
                } else {
                    // Handle reCAPTCHA v3 verification failure
                    alert("reCAPTCHA v3 verification failed. Please try again.");

                    // Hide the Home-Page and show the form
                    hideHomePageAndShowForm();
                }
            })
            .catch(function (error) {
                console.error("Error during reCAPTCHA execution:", error);
                alert("An error occurred during reCAPTCHA v3 verification. Please try again.");

                // Hide the Home-Page and show the form
                hideHomePageAndShowForm();
            });
    });

    // Function to show the Home-Page and hide the form
    function showHomePageAndHideForm() {
        if (homePageSection) {
            homePageSection.style.display = "block";
        }
        if (verificationForm) {
            verificationForm.style.display = "none";
        }
    }

    // Function to hide the Home-Page and show the form
    function hideHomePageAndShowForm() {
        if (homePageSection) {
            homePageSection.style.display = "none";
        }
        if (verificationForm) {
            verificationForm.style.display = "block";
        }
    }

    // Function to show the form and hide the Home-Page
    function showFormAndHideHomePage() {
        if (homePageSection) {
            homePageSection.style.display = "none";
        }
        if (verificationForm) {
            verificationForm.style.display = "block";
        }
    }

    // Function to set a cookie with verification data
    function setVerificationDataCookie(verificationData) {
        setCookie("verificationData", JSON.stringify(verificationData), 30); // Set a cookie for 30 days
    }

    // Function to get verification data from the cookie
    function getVerificationDataFromCookie() {
        const verificationData = getCookie("verificationData");
        return verificationData ? JSON.parse(verificationData) : null;
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    // Function to get a cookie value by name
    function getCookie(name) {
        const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
        return match ? match[1] : null;
    }
});
