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
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    element.parentNode.insertBefore(errorElement, element.nextSibling);

    errorElement.setAttribute('role', 'alert');
    element.setAttribute('aria-invalid', 'true');
}

function clearErrorMessages() {
    document.addEventListener('DOMContentLoaded', () => {
        const errorMessages = document.querySelectorAll('.error-message');
        if (errorMessages) { 
            errorMessages.forEach(message => message.remove());
        }

        const errorSummary = document.getElementById('error-summary');
        if (errorSummary) { 
            errorSummary.textContent = '';
        }
    });
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

    try {
        const nameInput = document.getElementById('name');
        if (nameInput.value.trim() === '') {
            throw { element: nameInput, message: 'Please enter your name.' };
        }

        const emailInput = document.getElementById('email');
        if (!isValidEmail(emailInput.value)) {
            throw { element: emailInput, message: 'Please enter a valid email address.' };
        }

        const messageInput = document.getElementById('message');
        if (messageInput.value.trim() === '') {
            throw { element: messageInput, message: 'Please enter your message.' };
        }

        const consentCheckbox = document.getElementById('consent');
        if (!consentCheckbox.checked) {
            throw { element: consentCheckbox, message: 'Please agree to the Privacy Policy.' };
        }

        fetch(contactForm.action, {
            method: contactForm.method,
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
    } catch (error) {
        errors.push(error);
        displayErrorSummary(errors);
        showError(error.element, error.message);
    }
});
