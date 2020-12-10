import Popup from './Popup.js';

export default class PopupWithSubmit extends Popup{

    constructor(popupSelector) {
        super(popupSelector);
        this._formPopup = this._popupElement.querySelector('.popup__form');
        this._handleSubmit = null;
    }

    setSubmitAction(submitAction) {
        this._handleSubmit = submitAction;
    }

    setEventListeners(){
        super.setEventListeners();
        this._formPopup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit();
        });
    }

}