/* function showErrorMessage(input, errorClass, inputErrorClass) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = input.validationMessage;

    error.classList.add(errorClass);
    input.classList.add(inputErrorClass);
};


function hideErrorMessage(input, errorClass, inputErrorClass) {
    const error = document.querySelector("#" + input.id + "-error");
    error.textContent = "";

    error.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
};

function checkInputValidity(input, {errorClass, inputErrorClass}) {
    if(input.validity.valid) {
        hideErrorMessage(input, errorClass, inputErrorClass);
    } else {
        showErrorMessage(input, errorClass, inputErrorClass);
    }
};

function toggleButtonState(inputs, button, {inactiveButtonClass}) {
    const isValid = inputs.every((input) => input.validity.valid);

    if(isValid) {
        button.classList.remove(inactiveButtonClass);  
    } else {
        button.classList.add(inactiveButtonClass);
    }
};

function enableValidation({formSelector, inputSelector, submitButtonSelector, ...rest}) {
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach((form) => {
        form.addEventListener("submit", ((evt) => {
            evt.preventDefault();
        }));

        const inputs = [...form.querySelectorAll(inputSelector)];
        const button = form.querySelector(submitButtonSelector);

        inputs.forEach((input) => {
            input.addEventListener("input", () => {
                checkInputValidity(input, rest);
                toggleButtonState(inputs, button, rest);
            })
        })
    })
};

enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__error_visible"
}); */