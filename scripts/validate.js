const validateParams = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const showInputError = (formElement, inputElement, errorMessage, validateParams) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(validateParams.inputErrorClass);
    errorElement.classList.add(validateParams.errorClass);
    errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, validateParams) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(validateParams.inputErrorClass);
    errorElement.classList.remove(validateParams.errorClass);
    errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validateParams) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validateParams);
    } else {
        hideInputError(formElement, inputElement, validateParams);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, validateParams) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(validateParams.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(validateParams.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

const setEventListeners = (formElement, validateParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validateParams.inputSelector));
    const buttonElement = formElement.querySelector(validateParams.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validateParams);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, validateParams);
            toggleButtonState(inputList, buttonElement, validateParams);
        });
    });
};

const checkFormInputs = (formElement, validateParams) => {
    const inputList = Array.from(formElement.querySelectorAll(validateParams.inputSelector));
    const buttonElement = formElement.querySelector(validateParams.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validateParams);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validateParams);
    });
}

const enableValidation = (validateParams) => {
    const formList = Array.from(document.querySelectorAll(validateParams.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, validateParams);
    });
};

enableValidation(validateParams);
