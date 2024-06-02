'use strict';

function isValidName(name) {
  return typeof name === 'string' && name.trim().length > 0;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email);
}

function isValidMessage(message) {
  return typeof message === 'string' && message.trim().length > 0;
}

function validateForm(formData) {
  const errors = {};

  if (!isValidName(formData.name)) {
    errors.name = "Please enter a valid name.";
  }

  if (!isValidEmail(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!isValidMessage(formData.message)) {
    errors.message = "Please enter a message.";
  }

  return errors;
}

function displayErrors(errors) {
  const errorSummary = document.getElementById('errorSummary');
  errorSummary.innerHTML = '';

  for (const field in errors) {
    const errorItem = document.createElement('li');
    errorItem.textContent = errors[field];
    errorSummary.appendChild(errorItem);
  }
}
