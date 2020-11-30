export default class Popup{
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._popupOverlay = this._popupElement.querySelector('.popup__overlay');
        this._popupCloseButton = this._popupElement.querySelector('.popup__close');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    open(){
        this._popupOverlay.addEventListener('click', this.close.bind(this));
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.classList.add('popup_opened');
    }

    close(){
        this._popupOverlay.removeEventListener('click', this.close.bind(this));
        document.removeEventListener('keydown', this._handleEscClose.bind(this));
        this._popupElement.classList.remove('popup_opened');
    }

    setEventListeners(){
        this._popupCloseButton.addEventListener('click', this.close.bind(this));
    }
}