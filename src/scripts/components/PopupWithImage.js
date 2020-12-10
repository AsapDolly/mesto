import Popup from './Popup.js';

export default class PopupWithImage extends Popup{

    constructor(popupSelector) {
        super(popupSelector);
        this._popupImg = this._popupElement.querySelector('.popup__img');
        this._popupCaption = this._popupElement.querySelector('.popup__caption');
    }

    open(imgUrlValue, captionValue){
        this._popupImg.src = imgUrlValue;
        this._popupImg.alt = captionValue;
        this._popupCaption.textContent = captionValue;
        super.open();
    }

}