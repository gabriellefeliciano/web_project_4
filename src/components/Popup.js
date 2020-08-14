export default class Popup {
    constructor(popupSelector) {
        this._popupElement = popupSelector;
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('popup_opened')
        document.addEventListener('keyup', this._handleEscClose)
    }

    close() {
        this._popupElement.classList.remove('popup_opened')
        document.removeEventListener('keyup', this._handleEscClose)
    }

    _handleEscClose(evt) {
        const escapeKEY = 27;
        if (evt.which === escapeKEY) { 
            this.close();
        }
    }

    setEventListeners() {
        this._popupElement.querySelector('.popup__close-button').addEventListener('click', () => {
            this.close();
        })

        this._popupElement.addEventListener('click', (e) => {
            if(!e.target.closest('.popup__container')) {
                this.close();
            }
        })
    }
}

