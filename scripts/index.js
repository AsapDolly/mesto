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
const imageElement = popupImage.querySelector('.popup__img');
const cardImageCaption = popupImage.querySelector('.popup__caption');
const addCardButton = document.querySelector('.profile__add-button');
const editProfileButton = document.querySelector('.profile__edit-button');
const userName = document.querySelector('.profile__username');
const userProfession = document.querySelector('.profile__description');
const elementsSection = document.querySelector('.elements');

function openPopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.addEventListener('click', closeOnClickOverlay);
    popupType.classList.add('popup_opened');
}

function closePopup(popupType) {
    const popupOverlay = popupType.querySelector('.popup__overlay');
    popupOverlay.removeEventListener('click', closeOnClickOverlay);
    popupType.classList.remove('popup_opened');
}

function closeOnClickOverlay(evt) {
    const openedPopup = evt.currentTarget.closest('.popup');
    closePopup(openedPopup);
}

function closeByEscapeButton(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_opened');
        closePopup(openedPopup);
        document.removeEventListener('keydown', closeByEscapeButton);
    }
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
        const cardToDelete = trashButton.closest('.element');
        cardToDelete.remove();
    });

    elementImage.addEventListener('click', function (evt) {
        imageElement.src = imgUrlValue;
        imageElement.alt = captionValue;
        cardImageCaption.textContent = captionValue;
        document.addEventListener('keydown', closeByEscapeButton);
        openPopup(popupImage);
    });

    return cardElement;
}

function addCardElement(captionValue, imgUrlValue) {
    const cardElement = createCard(captionValue, imgUrlValue);
    elementsSection.prepend(cardElement);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    userName.textContent = userNameInput.value;
    userProfession.textContent = userProfessionInput.value;
    closePopup(popupEditProfile);
}

function handleNewPlaceFormSubmit(evt) {
    evt.preventDefault();
    if (placeNameInput.value && placeLinkInput.value) {
        addCardElement(placeNameInput.value, placeLinkInput.value);
        closePopup(popupNewPlace);
    }
}

editProfileButton.addEventListener('click', function () {
    userNameInput.value = userName.textContent;
    userProfessionInput.value = userProfession.textContent;
    checkFormInputs(formElementEditProfile, validateParams);
    document.addEventListener('keydown', closeByEscapeButton);
    openPopup(popupEditProfile);
});

addCardButton.addEventListener('click', function () {
    placeNameInput.value = "";
    placeLinkInput.value = "";
    checkFormInputs(formElementNewPlace, validateParams);
    document.addEventListener('keydown', closeByEscapeButton);
    openPopup(popupNewPlace);
});

closePopupNewPlace.addEventListener('click', function () {
    closePopup(popupNewPlace);
});

closePopupImageButton.addEventListener('click', function () {
    closePopup(popupImage);
});

closePopupEditProfile.addEventListener('click', function () {
    closePopup(popupEditProfile);
});

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);

initialCards.forEach(item => addCardElement(item.name, item.link));
