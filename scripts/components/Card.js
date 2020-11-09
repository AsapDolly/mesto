import {openPopup, closeByEscapeButton} from '../utils/utils.js';

export default class Card {
    constructor(data, cardSelector) {
        this._cardSelector = cardSelector;
        this._imgUrlValue = data.link;
        this._captionValue = data.name;
        this._element = null;

    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', (evt) => {
            evt.target.classList.toggle('element__like_active');
        });

        this._element.querySelector('.element__trash').addEventListener('click', function (evt) {
            const cardToDelete = evt.target.closest('.element');
            cardToDelete.remove();
        });

        this._element.querySelector('.element__image').addEventListener('click', () => {
            const popupImage = document.querySelector('.popup_image');
            popupImage.querySelector('.popup__img').src = this._imgUrlValue;
            popupImage.querySelector('.popup__img').alt = this._captionValue;
            popupImage.querySelector('.popup__caption').textContent = this._captionValue;
            document.addEventListener('keydown', closeByEscapeButton);
            openPopup(document.querySelector('.popup_image'));
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._imgUrlValue;
        this._element.querySelector('.element__image').alt = this._captionValue;
        this._element.querySelector('.element__caption').textContent = this._captionValue;

        return this._element;
    }
}