//Popup Wrappers
const imagePopup = document.querySelector('.popup__type_image');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
};

function escapePopup(evt) {
    const escapeKEY = 27;
    if (evt.which === escapeKEY) {
      togglePopup(document.querySelector('.popup_opened'));
      document.removeEventListener('keydown', escapePopup);
    }
}

class Card {
    constructor(data, cardTemplateSelector) {
        this._name = data.name;
        this._link = data.link;

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
        const cardImage = this._card.querySelector('.element__image');
        const cardLikeButton = this._card.querySelector('.element__like-button');
        const cardRemoveButton = this._card.querySelector('.element__remove-button');

        cardLikeButton.addEventListener('click', () => {
            cardLikeButton.classList.toggle("element__like-button_clicked");
        })
    
        cardRemoveButton.addEventListener('click', (evt) => {
            evt.target.closest('.element').remove();
        })

        cardImage.addEventListener('click',() => {
            image.src = this._link;
            image.alt = this._name;
            caption.textContent = this._name;
            togglePopup(imagePopup);
            imagePopup.addEventListener('keydown', escapePopup);
        })
    }

    createCard = () => {
        const element = this._getCardTemplate();

        this._card = element;
    
        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
    
        this._addEventListeners();

        return this._card;
    };
}

export {Card};