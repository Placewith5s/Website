document.addEventListener("DOMContentLoaded", function () {
    // Check if the verification status, last verification time, and submission flag are stored
    const verificationStatus = localStorage.getItem("verificationStatus");
    const lastVerificationTime = localStorage.getItem("lastVerificationTime");
    const submittedFlag = sessionStorage.getItem("formSubmitted");

    // Check if the user has successfully verified and is within the 30-minute re-verification window
    const isVerified = verificationStatus === "verified" && lastVerificationTime;
    const isWithinReverificationWindow = isVerified ? isWithin30MinuteReverificationWindow(lastVerificationTime) : false;

    if (isVerified && isWithinReverificationWindow) {
        // If already verified and within the 30-minute re-verification window, show the site content
        document.getElementById("content5").style.display = "block";
        document.getElementById("main-content").style.display = "none"; // Hide the form
        document.getElementById("cookie-banner").style.display = "none"; // Hide the cookie banner
        if (!submittedFlag) {
            alert("Successfully verified! You are still within the 30-minute re-verification window.");
            sessionStorage.setItem("formSubmitted", "true");
        }
    } else {
        // If not verified or re-verification window has expired, hide the site content and show the form
        document.getElementById("content5").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.getElementById("cookie-banner").style.display = "none"; // Hide the cookie banner
    }

    // Attach submit event listener to the form
    document.getElementById("myForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting normally

        // Execute reCAPTCHA and get the token
        grecaptcha.execute('6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe', { action: 'submit' })
            .then(function (token) {
                // For demonstration purposes, log the token to the console
                console.log("reCAPTCHA Token:", token);

                // Send the token to your server for verification
                // For simplicity, we'll consider it verified regardless of the score
                if (token && token.length > 0) {
                    // If verification is successful, show the site content and hide the form
                    document.getElementById("content5").style.display = "block";
                    document.getElementById("main-content").style.display = "none";
                    localStorage.setItem("verificationStatus", "verified");
                    localStorage.setItem("lastVerificationTime", new Date().getTime().toString()); // Store the current time
                    alert("Successfully verified! You are within the 30-minute re-verification window.");
                    sessionStorage.setItem("formSubmitted", "true");
                } else {
                    // If verification fails, you can handle it accordingly
                    alert("reCAPTCHA verification failed. Please try again.");
                }
            })
            .catch(function (error) {
                console.error("Error during reCAPTCHA execution:", error);
                alert("An error occurred during reCAPTCHA verification. Please try again.");
            });
    });
});

// Function to check if the current time is within the 30-minute re-verification window
function isWithin30MinuteReverificationWindow(lastVerificationTime) {
    const currentTime = new Date().getTime();
    const timeDifference = currentTime - parseInt(lastVerificationTime);
    return timeDifference < 30 * 60 * 1000;
}
