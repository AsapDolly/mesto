const popupEditProfile = document.querySelector('.popup_edit-profile');
const closePopupEditProfile = popupEditProfile.querySelector('.popup__close_edit-profile');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupUserName = popupEditProfile.querySelector('.popup__input-text_type_username');
const popupDescription = popupEditProfile.querySelector('.popup__input-text_type_description');
const popupNewPlace = document.querySelector('.popup_new-place');
const closePopupNewPlace = popupNewPlace.querySelector('.popup__close_new-place');
const formElementNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
const popupNameNewPlace = popupNewPlace.querySelector('.popup__input-text_type_name');
const popupLinkNewPlace = popupNewPlace.querySelector('.popup__input-text_type_link');
const popupImage = document.querySelector('.popup_image');
const closePopupImage = popupImage.querySelector('.popup__close_image');
const imageElement = popupImage.querySelector('.popup__img');
const caption = popupImage.querySelector('.popup__caption');
const addButton = document.querySelector('.profile__add-button');
const editButton = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__username');
const description = document.querySelector('.profile__description');
const elementsSection = document.querySelector('.elements');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const checkFormInputs = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
}

const setOverlayEventListeners = () => {
    const popupOverlay = Array.from(document.querySelectorAll('.popup__overlay'));

    popupOverlay.forEach((popupElement) => {
        popupElement.addEventListener('click', (evt) => {
            const thisPopup = popupElement.closest('.popup');
            closePopup(thisPopup);
        })
    });
};

const closeOpenedPopup = () => {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
};

function openPopup(popupType) {
    popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
    popupType.classList.remove('popup_opened');
}

function createCard(captionValue, imgUrlValue) {
    const cardTemplate = document.querySelector('#card-element-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const elementImage = cardElement.querySelector('.element__image');
    const elementCaption = cardElement.querySelector('.element__caption');
    const likeButton = cardElement.querySelector('.element__like');
    const trashButton = cardElement.querySelector('.element__trash');

    elementImage.src = imgUrlValue;
    elementImage.alt = captionValue;
    elementCaption.textContent = captionValue;

    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });

    trashButton.addEventListener('click', function (evt) {
        const thisCard = trashButton.closest('.element');
        thisCard.remove();
    });

    elementImage.addEventListener('click', function (evt) {
        imageElement.src = imgUrlValue;
        caption.textContent = captionValue;
        openPopup(popupImage);
    });

    return cardElement;
}

function addCardElement(captionValue, imgUrlValue) {
    let cardElement = createCard(captionValue, imgUrlValue);
    elementsSection.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = popupUserName.value;
    description.textContent = popupDescription.value;
    closePopup(popupEditProfile);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    if (popupNameNewPlace.value && popupLinkNewPlace.value) {
        addCardElement(popupNameNewPlace.value, popupLinkNewPlace.value);
        closePopup(popupNewPlace);
    }
}

editButton.addEventListener('click', function () {
    popupUserName.value = userName.textContent;
    popupDescription.value = description.textContent;
    checkFormInputs(formElementEditProfile);
    openPopup(popupEditProfile);
});

addButton.addEventListener('click', function () {
    popupNameNewPlace.value = "";
    popupLinkNewPlace.value = "";
    checkFormInputs(formElementNewPlace);
    openPopup(popupNewPlace);
});

closePopupNewPlace.addEventListener('click', function () {
    closePopup(popupNewPlace);
});

closePopupImage.addEventListener('click', function () {
    closePopup(popupImage);
});

closePopupEditProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeOpenedPopup();
    }
});
initialCards.forEach(item => addCardElement(item.name, item.link));
setOverlayEventListeners();
