const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const popupUserName = popup.querySelector('.popup__input-text_type_username');
const popupDescription = popup.querySelector('.popup__input-text_type_description');
const popupNewPlace = document.querySelector('.popup-new-place');
const closeButtonNewPlace = popupNewPlace.querySelector('.popup-new-place__close');
const formElementNewPlace = popupNewPlace.querySelector('.popup-new-place__form');
const popupNameNewPlace = popupNewPlace.querySelector('.popup-new-place__input-text_type_name');
const popupLinkNewPlace = popupNewPlace.querySelector('.popup-new-place__input-text_type_link');
const addButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup-image');
const imageElement = popupImage.querySelector('.popup-image__img');
const caption = popupImage.querySelector('.popup-image__caption');
const closeButtonImage = popupImage.querySelector('.popup-image__close');
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

function openPopupNewPlace() {
    popupNameNewPlace.value = "";
    popupLinkNewPlace.value = "";
    popupNewPlace.classList.add('popup-new-place_opened');
}

function closePopupNewPlace() {
    popupNewPlace.classList.remove('popup-new-place_opened');
}

function openPopupImage(captionValue, imgUrlValue) {
    imageElement.src = imgUrlValue;
    caption.textContent = captionValue;
    popupImage.classList.add('popup-image_opened');
}

function closePopupImage() {
    popupImage.classList.remove('popup-image_opened');
}

function openPopup() {
    popupUserName.value = userName.textContent;
    popupDescription.value = description.textContent;
    popup.classList.add('popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function addCardElement(captionValue, imgUrlValue) {
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
        openPopupImage(elementCaption.textContent, elementImage.src);
    });

    elementsSection.prepend(cardElement);
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = popupUserName.value;
    description.textContent = popupDescription.value;
    closePopup();
}

function formNewPlaceSubmitHandler(evt) {
    evt.preventDefault();
    if (popupNameNewPlace.value && popupLinkNewPlace.value) {
        addCardElement(popupNameNewPlace.value, popupLinkNewPlace.value);
        closePopupNewPlace();
    }
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
addButton.addEventListener('click', openPopupNewPlace);
closeButtonNewPlace.addEventListener('click', closePopupNewPlace);
formElementNewPlace.addEventListener('submit', formNewPlaceSubmitHandler);
closeButtonImage.addEventListener('click', closePopupImage);
initialCards.forEach(item => addCardElement(item.name, item.link));