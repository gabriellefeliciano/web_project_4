export default class Card {
    constructor(data, userID, cardTemplateSelector, handleCardClick, handleDeleteClick, handleAddCardLike, handleRemoveCardLike) {
        this._name = data.name;
        this._link = data.link;
        this._ownerID = data.owner._id;
        this._cardID = data._id;
        this._likesNumber = data.likes.length;
        this._userID = userID;

        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleAddCardLike = handleAddCardLike;
        this._handleRemoveCardLike = handleRemoveCardLike;

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
        this._cardLikeButton = this._card.querySelector('.element__like-button');
        this._cardImage = this._card.querySelector('.element__image');
        this._cardRemoveButton = this._card.querySelector('.element__remove-button');

        if (this._userID !== this._ownerID) {
            this._cardRemoveButton.remove();
            this._cardRemoveButton = null;
        } else {
            this._cardRemoveButton.addEventListener('click', () => this._handleDeleteClick(this._cardID, this._card));
        } 

        this._cardLikeButton.addEventListener('click', () => {
            if (!this._cardLikeButton.classList.contains('element__like-button_clicked')) {
                this._handleAddCardLike(this._cardID);
                this._handleLikeButton(this._cardLikeButton);
            } else {
                this._handleRemoveCardLike(this._cardID);
                this._handleLikeButton(this._cardLikeButton);
            }
        })

        this._cardImage.addEventListener('click', () => this._handleCardClick({name: this._name, link: this._link}));

    }

    _handleLikeButton(likeButton) {
        likeButton.classList.toggle('element__like-button_clicked');
    };

    deleteCard() {
        if(this._userID === this._ownerID) {
        this._card.remove();
        this._card = null;
        }
    };

    createCard() {
        const element = this._getCardTemplate();
        this._card = element;

        this._card.querySelector('.element__title').textContent = this._name;
        this._card.querySelector('.element__image').style.backgroundImage = `url(${this._link})`;
        this._card.querySelector('.element__likes-number').textContent = this._likesNumber;
    
        this._addEventListeners();
        return this._card;
    };
}