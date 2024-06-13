'use strict';
(function() {
function FormValidator() {
  this.isValidName = function (name) {
    return typeof name === 'string' && name.trim().length > 0;
  };
  this.isValidEmail = function (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return typeof email === 'string' && emailRegex.test(email);
  };
  this.isValidMessage = function (message) {
    return typeof message === 'string' && message.trim().length > 0;
  };
  this.validateForm = function (formData) {
    const errors = {};
    if (!this.isValidName(formData.name)) {
      errors.name = "Please enter a valid name.";
    }
    if (!this.isValidEmail(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (!this.isValidMessage(formData.message)) {
      errors.message = "Please enter a message.";
    }
    return errors;
  };
}
const validator = new FormValidator();
const formData = {
  name: "John Doe",
  email: "invalid-email",
  message: "Hello there!"
};
const errors = validator.validateForm(formData);
displayErrors(errors);
function displayErrors(errors) {
  const errorSummary = document.getElementById('errorSummary');
  errorSummary.innerHTML = '';
  for (const field in errors) {
    const errorItem = document.createElement('li');
    errorItem.textContent = errors[field];
    errorSummary.appendChild(errorItem);
  }
}
})();