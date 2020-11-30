import '../../pages/index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

import {initialCards, userNameInput, userProfessionInput, editProfileButton, addCardButton,
    placeNameInput, placeLinkInput, formElementEditProfile, formElementNewPlace} from '../utils/constants.js';
import {validateParams} from '../utils/options.js';

const userInfoClass = new UserInfo({
    userNameSelector: '.profile__username',
    userDescriptionSelector: '.profile__description'
});

const validateEditProfile = new FormValidator(validateParams, formElementEditProfile);
const validateNewPlace = new FormValidator(validateParams, formElementNewPlace);
validateEditProfile.enableValidation();
validateNewPlace.enableValidation();

function renderCard(item){
    const card = new Card({
        data: item,
        handleCardClick: (imgUrlValue, captionValue) => {
            popupImageClass.open(imgUrlValue, captionValue);
        }
    }, '#card-element-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
};

const popupImageClass = new PopupWithImage('.popup_image');
popupImageClass.setEventListeners();

const popupEditProfileClass = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    handleFormSubmit: (data) => {
        userInfoClass.setUserInfo(data);
        popupEditProfileClass.close();
    }
});
popupEditProfileClass.setEventListeners();

const popupNewPlaceClass = new PopupWithForm({
    popupSelector: '.popup_new-place',
    handleFormSubmit: (data) => {
        renderCard(data);
        popupNewPlaceClass.close();
    }
});
popupNewPlaceClass.setEventListeners();

editProfileButton.addEventListener('click', function () {
    const {username, description} = userInfoClass.getUserInfo();
    userNameInput.value = username;
    userProfessionInput.value = description;
    validateEditProfile.checkFormInputs();
    popupEditProfileClass.open();
});

addCardButton.addEventListener('click', function () {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    validateNewPlace.checkFormInputs();
    popupNewPlaceClass.open();
});

const cardList = new Section({
    items: initialCards,
    renderer: (item) => renderCard(item)
}, '.elements');
cardList.renderItems();
