export default class Card {
    constructor({data,handleCardClick}, cardSelector) {
        this._cardSelector = cardSelector;
        this._imgUrlValue = data.link;
        this._captionValue = data.name;
        this._element = null;
        this._handleCardClick = handleCardClick;
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
            this._handleCardClick(this._imgUrlValue, this._captionValue);
        });
    }

    generateCard() {
        this._element = this._getTemplate();
        const elementImage = this._element.querySelector('.element__image');
        this._setEventListeners();

        elementImage.src = this._imgUrlValue;
        elementImage.alt = this._captionValue;
        this._element.querySelector('.element__caption').textContent = this._captionValue;

        return this._element;
    }
}