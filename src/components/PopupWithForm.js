import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;

        this._popupSelector = popupSelector;

        this._form = this._popupElement.querySelector(".popup__form");

        this._profileName = document.querySelector('.profile__title');
        this._profileAbout = document.querySelector('.profile__subtitle');
        this._fullName = document.querySelector('.popup__field_type_full-name');
        this._aboutMe = document.querySelector('.popup__field_type_about-me');
        
    }

    open() {
        if (this._popupElement.classList.contains('popup__type_edit-profile')) {
            this._fullName.value = this._profileName.textContent;
            this._aboutMe.value = this._profileAbout.textContent;
        }

        super.open();
    }

    close() {
        this._form.reset();
        super.close();
    }

    _getInputValues() {
        this._inputList = this._form.querySelectorAll(".popup__field");
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
      }

    setEventListeners() {
        this._popupElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._popupElement.querySelector('.popup__button').className = "popup__button popup__saving-button";
            this._submitForm(this._getInputValues());
        });
        super.setEventListeners();
    }
}