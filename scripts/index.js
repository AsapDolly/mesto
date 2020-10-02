let popup = document.querySelector('.popup');
let closeButton = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');
let popupUserName = popup.querySelector('.popup__input-text_type_username');
let popupDescription = popup.querySelector('.popup__input-text_type_description');
let editButton = document.querySelector('.profile__edit-button');
let userName = document.querySelector('.profile__username');
let description = document.querySelector('.profile__description');

function openPopup() {
    popupUserName.value = userName.textContent;
    popupDescription.value = description.textContent;
    popup.classList.add('popup_opened');
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = popupUserName.value;
    description.textContent = popupDescription.value;
    closePopup();
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);