import '../../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";

import {
    userNameInput, userProfessionInput, editProfileButton, addCardButton,
    placeNameInput, placeLinkInput, formElementEditProfile, formElementNewPlace,
    avatarEditButton, formElementAvatarEdit
} from '../utils/constants.js';
import {validateParams} from '../utils/options.js';

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'e47080a8-ad11-43f8-864b-82573b975e89',
        'Content-Type': 'application/json'
    }
});

const userInfoClass = new UserInfo({
    userNameSelector: '.profile__username',
    userDescriptionSelector: '.profile__description',
    userPictureSelector: '.profile__avatar'
}, api);
userInfoClass.getInfoFromServer();

const validateEditProfile = new FormValidator(validateParams, formElementEditProfile);
const validateNewPlace = new FormValidator(validateParams, formElementNewPlace);
const validateAvatarEdit = new FormValidator(validateParams, formElementAvatarEdit);
validateEditProfile.enableValidation();
validateNewPlace.enableValidation();
validateAvatarEdit.enableValidation();

const popupDeleteSubmitClass = new PopupWithSubmit({
    handleSubmit:(data)=>{
        api.removeCard(data.cardId)
            .then(()=>{
                popupDeleteSubmitClass.close();
                cardList.renderItems();
            })
            .catch((err) => {
                console.log(err);
            });
    }
},'.popup_card-delete');
popupDeleteSubmitClass.setEventListeners();

function renderCard(item) {
    const card = new Card({
        data: item,
        userId: userInfoClass.getUserId(),
        handleLikeClick:(cardId, isLiked) => {
            api.setCardLike(cardId, isLiked)
                .then((res) => {
                    card.updateLikeState(res.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleDeleteIconClick: (cardId) => {
            popupDeleteSubmitClass.setCardIdForDelete(cardId);
            popupDeleteSubmitClass.open();
        },
        handleCardClick: (imgUrlValue, captionValue) => {
            popupImageClass.open(imgUrlValue, captionValue);
        }
    }, '#card-element-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
};

const popupAvatarEditClass = new PopupWithForm({
    handleFormSubmit:(data) => {
        popupAvatarEditClass.renderLoading(true);
        api.updateUserAvatar(data.link)
            .then((res) => {
                userInfoClass.setNewAvatar(data.link);
                popupAvatarEditClass.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(()=>{
                popupAvatarEditClass.renderLoading(false);
            });
    },
    popupSelector:'.popup_avatar-edit'
});
popupAvatarEditClass.setEventListeners();

const popupImageClass = new PopupWithImage('.popup_image');
popupImageClass.setEventListeners();

const popupEditProfileClass = new PopupWithForm({
    popupSelector: '.popup_edit-profile',
    handleFormSubmit: (data) => {
        popupEditProfileClass.renderLoading(true);
        api.updateUserInfo({name:userNameInput.value, about:userProfessionInput.value})
            .then((res) => {
                userInfoClass.setUserInfo({username:res.name, description:res.about});
                popupEditProfileClass.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfileClass.renderLoading(false);
            });
    }
});
popupEditProfileClass.setEventListeners();

const popupNewPlaceClass = new PopupWithForm({
    popupSelector: '.popup_new-place',
    handleFormSubmit: (data) => {
        popupNewPlaceClass.renderLoading(true);
        api.addNewCard(data)
            .then((res) => {
                renderCard(res);
                popupNewPlaceClass.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupNewPlaceClass.renderLoading(false);
            });
    }
});
popupNewPlaceClass.setEventListeners();

editProfileButton.addEventListener('click', function () {
    const {username, description} = userInfoClass.getUserInfoFromPage();
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

avatarEditButton.addEventListener('click', () => {
    validateAvatarEdit.checkFormInputs();
    popupAvatarEditClass.open();
});

const cardList = new Section({
    api: api,
    renderer: (item) => renderCard(item)
}, '.elements');
cardList.renderItems();
