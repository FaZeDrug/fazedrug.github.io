let form_errors = [];

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const errorMessage = document.getElementById("error-message");
    const charErrorMessage = document.getElementById("char-error-message");
    const charCount = document.createElement("p");
    charCount.id = "char-count";
    messageInput.parentNode.insertBefore(charCount, messageInput.nextSibling);

    const maxChars = 500;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const messagePattern = /^[A-Za-z0-9.,!?()'":;_&$%#@*+/-\s]*$/;

    function showError(message, field, fieldName) {
        errorMessage.textContent = message;
        errorMessage.style.opacity = "1";
        field.classList.add("flash-error");
        field.style.border = "2px solid red";

        setTimeout(() => {
            errorMessage.style.opacity = "0";
            field.classList.remove("flash-error");
        }, 2000);

        form_errors.push({ field: fieldName, message: message });
        console.log("Updated form_errors:", form_errors);
    }

    emailInput.addEventListener("input", function () {
        emailInput.setCustomValidity("");

        if (!emailInput.checkValidity()) {
            emailInput.setCustomValidity("Please enter a valid email address.");
        }

        if (!emailPattern.test(emailInput.value)) {
            showError("Enter a valid email (e.g., name@example.com)!", emailInput, "email");
            emailInput.style.border = "2px solid red";
        } else {
            emailInput.style.border = "2px solid green";
        }
    });

    form.addEventListener("submit", function (event) {
        form_errors.length = 0;
        errorMessage.textContent = "";
        let isValid = true;

        if (!nameInput.value.trim()) {
            showError("Name field required", nameInput, "name");
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            showError("Email field required", emailInput, "email");
            isValid = false;
        } else if (!emailPattern.test(emailInput.value)) {
            showError("Enter a valid email (e.g., name@example.com)!", emailInput, "email");
            isValid = false;
        }

        let errorField = document.getElementById("form_errors");
        if (!errorField) {
            errorField = document.createElement("input");
            errorField.type = "hidden";
            errorField.id = "form_errors";
            errorField.name = "form-errors";
            form.appendChild(errorField);
        }
        errorField.value = JSON.stringify(form_errors);

        console.log("Final form_errors before submission:", form_errors);

        if (!isValid) {
            event.preventDefault();
        }
    });

    charCount.textContent = `${maxChars} characters remaining`;
});
