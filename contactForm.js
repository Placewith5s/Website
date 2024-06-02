'use strict';

const contactForm = document.getElementById('contact-form');
const errorSummary = document.getElementById('error-summary');

contactForm.setAttribute('aria-labelledby', 'contact-form-title');
document.getElementById('name').setAttribute('aria-label', 'Name');
document.getElementById('email').setAttribute('aria-label', 'Email');
document.getElementById('message').setAttribute('aria-label', 'Message');
document.getElementById('consent').setAttribute('aria-describedby', 'consent-description');

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(element, message) {
    const existingError = element.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.textContent = message;
        return;
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);

    errorElement.setAttribute('role', 'alert');
    element.setAttribute('aria-invalid', 'true');
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(message => message.remove());

    if (errorSummary) {
        errorSummary.textContent = '';
    }

    const formElements = contactForm.querySelectorAll('input, textarea');
    formElements.forEach(element => element.removeAttribute('aria-invalid'));
}

function displayErrorSummary(errors) {
    errorSummary.textContent = 'There were errors in your submission:';
    const errorList = document.createElement('ul');
    errors.forEach(error => {
        const listItem = document.createElement('li');
        listItem.textContent = error.message;
        errorList.appendChild(listItem);
    });
    errorSummary.appendChild(errorList);

    errorSummary.setAttribute('role', 'alert');
    errorSummary.setAttribute('aria-live', 'assertive');
    contactForm.setAttribute('aria-describedby', 'error-summary');
}

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrorMessages(); 

    const errors = [];

    const nameInput = document.getElementById('name');
    if (nameInput.value.trim() === '') {
        errors.push({ element: nameInput, message: 'Please enter your name.' });
    }

    const emailInput = document.getElementById('email');
    if (!isValidEmail(emailInput.value)) {
        errors.push({ element: emailInput, message: 'Please enter a valid email address.' });
    }

    const messageInput = document.getElementById('message');
    if (messageInput.value.trim() === '') {
        errors.push({ element: messageInput, message: 'Please enter your message.' });
    }

    const consentCheckbox = document.getElementById('consent');
    if (!consentCheckbox.checked) {
        errors.push({ element: consentCheckbox, message: 'Please agree to the Privacy Policy.' });
    }

    if (errors.length > 0) {
        displayErrorSummary(errors);
        errors.forEach(showError);
    } else {
        fetch("https://formspree.io/f/mnqekdoq", {
            method: "POST",
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Thank you for your message!");
                contactForm.reset();
            } else {
                response.json().then(data => {
                    console.error("Formspree Error:", data);
                    displayErrorSummary([{message: "Form submission failed. Please try again."}]); 
                });
            }
        }).catch(error => {
            console.error("Error:", error);
            displayErrorSummary([{message: "An error occurred. Please try again later."}]); 
        });
    }
});
