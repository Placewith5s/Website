document.addEventListener("DOMContentLoaded", function () {
    const siteKey = '6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe';
    const verificationForm = document.getElementById("verificationForm");
    const home = document.getElementById("Home-Page");

    // Retrieve verification data from cookies
    const verificationData = getVerificationDataFromCookie();

    // Always show the reCAPTCHA v3 badge
    grecaptcha.ready(function () {
        grecaptcha.execute(siteKey, { action: 'show' });
    });

    // Check verification status from cookies
    const currentPage = getCurrentPage();

    // Function to show the content and hide the form
    function showContentAndHideForm(home) {
        const contentSection = document.getElementById(home);
        if (contentSection) {
            contentSection.style.display = "block";
        }
        if (verificationForm) {
            verificationForm.style.display = "none";
        }
    }

    // Function to hide the content and show the form
    function hideContentAndShowForm(home) {
        const contentSection = document.getElementById(home);
        if (contentSection) {
            contentSection.style.display = "none";
        }
        if (verificationForm) {
            verificationForm.style.display = "block";
        }
    }

    // Function to show the form and hide the content
    function showFormAndHideContent(verificationForm) {
        if (verificationForm) {
            verificationForm.style.display = "block";
        }
    }

    // Function to hide the form and show the content
    function hideFormAndShowContent(home) {
        const contentSection = document.getElementById(home);
        if (contentSection) {
            contentSection.style.display = "block";
        }
        if (verificationForm) {
            verificationForm.style.display = "none";
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

    if (verificationData && verificationData.status === "verified" && verificationData.timestamp) {
        const currentTime = new Date().getTime();
        const thirtyMinutesInMillis = 30 * 60 * 1000;

        if (currentTime - verificationData.timestamp >= thirtyMinutesInMillis) {
            // More than 30 minutes have passed since the last verification
            showFormAndHideContent();
        } else {
            // Less than 30 minutes have passed, hide the form and show the content
            hideFormAndShowContent(currentPage);
        }
    } else {
        // User is not verified, hide the content and show the form
        hideContentAndShowForm(currentPage);
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

                    // Show the content and hide the form
                    showContentAndHideForm(currentPage);
                } else {
                    // Handle reCAPTCHA v3 verification failure
                    alert("reCAPTCHA v3 verification failed. Please try again.");

                    // Hide the content and show the form
                    hideContentAndShowForm(currentPage);
                }
            })
            .catch(function (error) {
                console.error("Error during reCAPTCHA execution:", error);
                alert("An error occurred during reCAPTCHA v3 verification. Please try again.");

                // Hide the content and show the form
                hideContentAndShowForm(currentPage);
            });
    });

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

    // Function to get the current page from the URL path
    function getCurrentPage() {
        const pathSegments = window.location.pathname.split('/');
        return pathSegments[pathSegments.length - 1];
    }
});
