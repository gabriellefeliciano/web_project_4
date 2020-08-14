export default class Card {
    constructor(data, cardTemplateSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._handleCardClick = handleCardClick;
        this._cardTemplateSelector = cardTemplateSelector;
    }

    _getCardTemplate() {
        const cardTemplate = document
            .querySelector(this._cardTemplateSelector)
            .content
            .querySelector('.element')
            .cloneNode(true);

        return cardTemplate;
    }

    _addEventListeners() {
        this._card.querySelector('.element__like-button')
        .addEventListener('click', () => this._handleLikeButton()); 

        this._card.querySelector('.element__remove-button')
        .addEventListener('click', () => this._handleRemoveButton());

        this._card.querySelector('.element__image')
        .addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));

    }

    _handleLikeButton() {
        this._card.querySelector('.element__like-button').
        classList.toggle('element__like-button_clicked');
    };

    _handleRemoveButton() {
        this._card.remove();
        this._card = null;
    };

    _handleEscPopup(evt) {
        evt.preventDefault();

        if (evt.which = 27) {
            this._card.classList.remove('popup_opened');
            document.removeEventListener('keyup', this._handleEscPopup);
        }
    }

    createCard() {
        const element = this._getCardTemplate();
        this._card = element;

        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
    
        this._addEventListeners();
        return this._card;
    };
}