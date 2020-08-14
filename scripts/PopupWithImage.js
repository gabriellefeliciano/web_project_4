import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);

        this._image = this._popupElement.querySelector('.popup__image');
        this._name = this._popupElement.querySelector('.popup__caption');        
    }

    open(data) {
        this._image.src = data.link;
        this._image.alt = data.name;
        this._name.textContent = data.name;

        super.open();
    }
}