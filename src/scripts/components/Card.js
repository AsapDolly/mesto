export default class Card {
    constructor({data, userId, handleLikeClick, handleDeleteIconClick, handleCardClick}, cardSelector) {
        this._cardSelector = cardSelector;
        this._imgUrlValue = data.link;
        this._captionValue = data.name;
        this._cardId = data._id;
        this._likes = data.likes;
        this._owner = data.owner;
        this._userId = userId;
        this._handleLikeClick = handleLikeClick;
        this._handleDeleteIconClick = handleDeleteIconClick;
        this._handleCardClick = handleCardClick;
        this._element = null;
        this._isLiked = false;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardElement;
    }

    _setEventListeners() {
        const elementLike = this._element.querySelector('.element__like');
        elementLike.addEventListener('click', () => {
            this._handleLikeClick(this._cardId, this._isLiked);
        });

        const elementTrash = this._element.querySelector('.element__trash');

        if (elementTrash) {
            elementTrash.addEventListener('click', () => this._handleDeleteIconClick(this._cardId));
        }

        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._imgUrlValue, this._captionValue);
        });
    }

    updateLikeState(likesArray) {
        this._element.querySelector('.element__like-count').textContent = likesArray.length;
        this._isLiked = likesArray.some((item) => {
            return item._id === this._userId;
        });

        const elementLike = this._element.querySelector('.element__like');

        this._isLiked ? elementLike.classList.add('element__like_active') :
            elementLike.classList.remove('element__like_active');

    }

    removeCard(){
        this._element.remove();
    }

    generateCard() {
        this._element = this._getTemplate();
        this.updateLikeState(this._likes);

        if (this._userId !== this._owner._id) {
            this._element.querySelector('.element__trash').remove();
        }

        this._setEventListeners();

        const elementImage = this._element.querySelector('.element__image');
        elementImage.src = this._imgUrlValue;
        elementImage.alt = this._captionValue;
        this._element.querySelector('.element__caption').textContent = this._captionValue;

        return this._element;
    }


}