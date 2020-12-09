import Popup from './Popup.js';

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formPopup = this._popupElement.querySelector('.popup__form');
        this._button = this._formPopup.querySelector('.popup__button');
        this._buttonSourceText = this._button.textContent;
    }

    _getInputValues(){
        this._inputList = this._popupElement.querySelectorAll('.popup__input');

        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);

        return this._formValues;
    }

    renderLoading(isLoading){
        if (isLoading){
            this._button.textContent = "Сохраняем...";
        } else{
            this._button.textContent = this._buttonSourceText;
        }
    }

    close(){
        this._formPopup.reset();
        super.close();
    }

    setEventListeners(){
        super.setEventListeners();
        this._formPopup.addEventListener('submit', () => this._handleFormSubmit(this._getInputValues()));
    }
}