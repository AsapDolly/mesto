const popupEditProfile = document.querySelector('.popup_edit-profile');
const formElementEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
const popupUserName = popupEditProfile.querySelector('.popup__input-text_type_username');
const popupDescription = popupEditProfile.querySelector('.popup__input-text_type_description');
const popupNewPlace = document.querySelector('.popup_new-place');
const formElementNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
const popupNameNewPlace = popupNewPlace.querySelector('.popup__input-text_type_name');
const popupLinkNewPlace = popupNewPlace.querySelector('.popup__input-text_type_link');
const popupImage = document.querySelector('.popup_image');
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

function openPopup(popupType) {
    switch(popupType){
        case(popupEditProfile):
            popupUserName.value = userName.textContent;
            popupDescription.value = description.textContent;
            break;
        case(popupNewPlace):
            popupNameNewPlace.value = "";
            popupLinkNewPlace.value = "";
            break;
    }

    const closeButton = popupType.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
        closePopup(popupType);
    });
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

editButton.addEventListener('click', function(){
    openPopup(popupEditProfile);
});

addButton.addEventListener('click', function(){
    openPopup(popupNewPlace);
});

formElementEditProfile.addEventListener('submit', handleProfileFormSubmit);
formElementNewPlace.addEventListener('submit', handleNewPlaceFormSubmit);
initialCards.forEach(item => addCardElement(item.name, item.link));