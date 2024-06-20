'use strict';
(function() {
  document.addEventListener("DOMContentLoaded", function() {
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
      name: "invalid-name",
      email: "invalid-email",
      message: "invalid-message"
    };
    const errors = validator.validateForm(formData);
    displayErrors(errors);
    function displayErrors(errors) {
      console.log(errors, "This page is still in beta!")
    }
  });
})();