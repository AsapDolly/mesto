import Popup from './Popup.js';
import {popupCaption, popupImg} from "../utils/constants.js";

export default class PopupWithImage extends Popup{

    open(imgUrlValue, captionValue){
        popupImg.src = imgUrlValue;
        popupImg.alt = captionValue;
        popupCaption.textContent = captionValue;
        super.open();
    }

}