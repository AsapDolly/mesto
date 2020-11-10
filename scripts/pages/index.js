import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import {openPopup, closeByEscapeButton, closePopup} from '../utils/utils.js';
import {initialCards} from '../utils/initial-сards.js';
import {validateParams} from '../utils/options.js';

const popupEditProfile = document.querySelector('.popup_edit-profile');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const userNameInput = popupEditProfile.querySelector('.popup__input-text_type_username');
const userProfessionInput = popupEditProfile.querySelector('.popup__input-text_type_description');
const popupNewPlace = document.querySelector('.popup_new-place');
const closePopupNewPlace = popupNewPlace.querySelector('.popup__close_new-place');
const formElementNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
const placeNameInput = popupNewPlace.querySelector('.popup__input-text_type_name');
const placeLinkInput = popupNewPlace.querySelector('.popup__input-text_type_link');
const popupImage = document.querySelector('.popup_image');
const closePopupImageButton = popupImage.querySelector('.popup__close_image');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__username');
const userProfession = document.querySelector('.profile__description');
const elementsSection = document.querySelector('.elements');

const validateEditProfile = new FormValidator(validateParams, formElementEditProfile);
const validateNewPlace = new FormValidator(validateParams, formElementNewPlace);
validateEditProfile.enableValidation();
validateNewPlace.enableValidation();

function addCardElement(data) {
    const card = new Card(data, '#card-element-template');
    const cardElement = card.generateCard();
    elementsSection.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
    userName.textContent = userNameInput.value;
    userProfession.textContent = userProfessionInput.value;
    closePopup(popupEditProfile);
}

function handleNewPlaceFormSubmit(evt) {
    if (placeNameInput.value && placeLinkInput.value) {
        addCardElement({name: placeNameInput.value, link: placeLinkInput.value});
        closePopup(popupNewPlace);
    }
}

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

closePopupNewPlace.addEventListener('click', function () {
    closePopup(popupNewPlace);
});

closePopupImageButton.addEventListener('click', function () {
    closePopup(popupImage);
});

closePopupEditProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

editProfileButton.addEventListener('click', function () {
    userNameInput.value = userName.textContent;
    userProfessionInput.value = userProfession.textContent;
    validateEditProfile.checkFormInputs();
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function () {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    validateNewPlace.checkFormInputs();
    openPopup(popupNewPlace);
});

initialCards.forEach(addCardElement);