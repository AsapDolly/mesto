import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup{

    constructor({handleSubmit}, popupSelector) {
        super(popupSelector);
        this._formPopup = this._popupElement.querySelector('.popup__form');
        this._handleSubmit = handleSubmit;
        this._cardId = null;
    }

    setCardIdForDelete(cardId){
        this._cardId = cardId;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit({cardId: this._cardId});
        });
    }

}