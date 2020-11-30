export const popupImage = document.querySelector('.popup_image');
export const popupImg = popupImage.querySelector('.popup__img');
export const popupCaption = popupImage.querySelector('.popup__caption');
export const userName = document.querySelector('.profile__username');
export const userProfession = document.querySelector('.profile__description');
export const popupEditProfile = document.querySelector('.popup_edit-profile');
export const userNameInput = popupEditProfile.querySelector('.popup__input-text_type_username');
export const userProfessionInput = popupEditProfile.querySelector('.popup__input-text_type_description');
export const formElementEditProfile = popupEditProfile.querySelector('.popup__form_edit-profile');
export const popupNewPlace = document.querySelector('.popup_new-place');
export const formElementNewPlace = popupNewPlace.querySelector('.popup__form_new-place');
export const placeNameInput = popupNewPlace.querySelector('.popup__input-text_type_name');
export const placeLinkInput = popupNewPlace.querySelector('.popup__input-text_type_link');
export const addCardButton = document.querySelector('.profile__add-button');
export const editProfileButton = document.querySelector('.profile__edit-button');

export const initialCards = [
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