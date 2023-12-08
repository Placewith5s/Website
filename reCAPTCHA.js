async function submitForm() {
    try {
        // Execute reCAPTCHA v3
        const token = await grecaptcha.execute('6LfO8ikpAAAAADnNCtnMo33rJLhbLJwJzBfD0ERe', { action: 'submit' });

        // Include the token in your form data
        const formData = new FormData();
        formData.append('g-recaptcha-response', token);

        // Send a request to verify the token on your server
        const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            const score = data.score;

            if (score >= 0.5) {
                alert("Form processed successfully.");
            } else {
                alert("Suspicious activity detected. Additional verification required.");
            }
        } else {
            alert("reCAPTCHA verification failed. Please try again. Error codes: " + data['error-codes'].join(', '));
        }
    } catch (error) {
        console.error('Error:', error);
        alert("An error occurred during form processing. Please try again later.");
    }
}