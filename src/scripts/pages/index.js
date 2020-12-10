import '../../pages/index.css';
import Api from '../components/Api.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import {renderLoading} from '../utils/utils.js';

import {
    profileUsernameSelector, profileDescriptionSelector, profileAvatarSelector,
    popupCardDeleteSelector, cardElementTemplateSelector, popupAvatarEditSelector,
    popupImageSelector, popupEditProfileSelector, popupNewPlaceSelector, elementsSelector
} from '../utils/selectors.js';

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
    userNameSelector: profileUsernameSelector,
    userDescriptionSelector: profileDescriptionSelector,
    userPictureSelector: profileAvatarSelector
});

const validateEditProfile = new FormValidator(validateParams, formElementEditProfile);
const validateNewPlace = new FormValidator(validateParams, formElementNewPlace);
const validateAvatarEdit = new FormValidator(validateParams, formElementAvatarEdit);
validateEditProfile.enableValidation();
validateNewPlace.enableValidation();
validateAvatarEdit.enableValidation();

const popupDeleteSubmitClass = new PopupWithSubmit(popupCardDeleteSelector);
popupDeleteSubmitClass.setEventListeners();

function renderCard(item) {
    const card = new Card({
        data: item,
        userId: userInfoClass.getUserInfo().userId,
        handleLikeClick: (cardId, isLiked) => {
            api.setCardLike(cardId, isLiked)
                .then((res) => {
                    card.updateLikeState(res.likes);
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        handleDeleteIconClick: (cardId) => {
            popupDeleteSubmitClass.setSubmitAction(() => {
                api.removeCard(cardId)
                    .then(() => {
                        popupDeleteSubmitClass.close();
                        card.removeCard();
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
            popupDeleteSubmitClass.open();
        },
        handleCardClick: (imgUrlValue, captionValue) => {
            popupImageClass.open(imgUrlValue, captionValue);
        }
    }, cardElementTemplateSelector);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
};

const popupAvatarEditClass = new PopupWithForm({
    handleFormSubmit: (evt, data) => {
        const buttonTitle = evt.submitter.textContent;
        renderLoading(evt, 'Сохраняем...');
        api.updateUserAvatar(data.link)
            .then((res) => {
                userInfoClass.setUserInfo({avatarUrl: data.link});
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAvatarEditClass.close();
                renderLoading(evt, buttonTitle);
            });
    },
    popupSelector: popupAvatarEditSelector
});
popupAvatarEditClass.setEventListeners();

const popupImageClass = new PopupWithImage(popupImageSelector);
popupImageClass.setEventListeners();

const popupEditProfileClass = new PopupWithForm({
    popupSelector: popupEditProfileSelector,
    handleFormSubmit: (evt) => {
        const buttonTitle = evt.submitter.textContent;
        renderLoading(evt, 'Сохраняем...');
        api.updateUserInfo({name: userNameInput.value, about: userProfessionInput.value})
            .then((res) => {
                userInfoClass.setUserInfo({username: res.name, description: res.about});
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditProfileClass.close();
                renderLoading(evt, buttonTitle);
            });
    }
});
popupEditProfileClass.setEventListeners();

const popupNewPlaceClass = new PopupWithForm({
    popupSelector: popupNewPlaceSelector,
    handleFormSubmit: (evt, data) => {
        const buttonTitle = evt.submitter.textContent;
        renderLoading(evt, 'Сохраняем...');
        api.addNewCard(data)
            .then((res) => {
                renderCard(res);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupNewPlaceClass.close();
                renderLoading(evt, buttonTitle);
            });
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

avatarEditButton.addEventListener('click', () => {
    validateAvatarEdit.checkFormInputs();
    popupAvatarEditClass.open();
});

const cardList = new Section({
    renderer: () => {
        api.getInitialCards()
            .then((res) => {
                res.sort((a, b) => {
                    if (a.createdAt > b.createdAt) {
                        return 1;
                    }
                    if (a.createdAt < b.createdAt) {
                        return -1;
                    }
                    return 0;
                });
                res.forEach(item => renderCard(item));
            })
            .catch((err) => {
                console.log(err);
            });
    }
}, elementsSelector);

api.getUserInformation()
    .then((res) => {
        userInfoClass.setUserInfo({
            username: res.name,
            description: res.about,
            userId: res._id,
            avatarUrl: res.avatar
        });
    })
    .then(() => {
        cardList.renderItems();
    })
    .catch((err) => {
        console.log(err);
    });
