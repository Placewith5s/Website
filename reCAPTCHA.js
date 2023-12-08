document.addEventListener("DOMContentLoaded", function () {
    const verificationForm = document.getElementById("myForm");
    const mainContent = document.getElementById("main-content");
    const homePageSection = document.getElementById("Home-Page");

    // Always show the reCAPTCHA V3 badge
    grecaptcha.ready(function () {
        grecaptcha.execute('6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe', { action: 'show' });
    });

    // Check verification status from cookies
    const verificationStatus = getCookie("verificationStatus");

    if (!verificationStatus) {
        // Show the reCAPTCHA V3 form only to non-verified users
        mainContent.style.display = "block"; // Display main content
        verificationForm.style.display = "block"; // Display the form
        if (homePageSection) {
            homePageSection.style.display = "none"; // Hide the Home-Page section for unverified users
        }

        verificationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            // Execute reCAPTCHA and get the token
            grecaptcha.execute('6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe', { action: 'submit' })
                .then(function (token) {
                    // For demonstration purposes, log the token to the console
                    console.log("reCAPTCHA Token:", token);

                    // Simulate verification logic
                    const isVerified = token && token.length > 0;

                    if (isVerified) {
                        mainContent.style.display = "none";
                        verificationForm.style.display = "none";
                        if (homePageSection) {
                            homePageSection.style.display = "block"; // Show the Home-Page section for verified users
                        }
                        setCookie("verificationStatus", "verified", 30); // Set a cookie for 30 days
                        alert("Successfully verified!");
                    } else {
                        alert("Verification failed. Please try again.");
                    }
                })
                .catch(function (error) {
                    console.error("Error during reCAPTCHA execution:", error);
                    alert("An error occurred during reCAPTCHA verification. Please try again.");
                });
        });
    } else {
        // Hide the entire content for verified users
        mainContent.style.display = "none";
        if (homePageSection) {
            homePageSection.style.display = "block"; // Show the Home-Page section for verified users
        }
    }
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
