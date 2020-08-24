import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import API from "./components/API.js";
import "./styles/index.css";

//API

const api = new API({
    baseUrl: "https://around.nomoreparties.co/v1/group-3",
    headers: {
      authorization: "00dd05f0-5ab4-404d-8531-81f50ae2518e",
      "Content-Type": "application/json"
    }
});

//Form Validation
const defaultConfig = {
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__error_visible"
};

const editAvatarPopupSelector = document.querySelector('.popup__type_edit-avatar');
const addCardPopupSelector = document.querySelector('.popup__type_add-card');
const editProfilePopupSelector = document.querySelector('.popup__type_edit-profile');

const editAvatarForm = editAvatarPopupSelector.querySelector(".popup__form");
const editProfileForm = editProfilePopupSelector.querySelector(".popup__form");
const addCardForm = addCardPopupSelector.querySelector(".popup__form");

const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);
const editAvatarValidation = new FormValidator(defaultConfig, editAvatarForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();
editAvatarValidation.enableValidation();

//Profile Variables
const profileAvatar = document.querySelector('.avatar');
const editAvatarButton = document.querySelector('.profile__edit-button_avatar');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const editProfileButton = document.querySelector('.profile__edit-button');
const formSaving = document.querySelector('.popup__button_saving');

const profile = new UserInfo({profileName, profileAbout});

api.getUserInfo()
    .then(res => {
      profileAvatar.src = res.avatar;  
      profile.setUserInfo(res.name, res.about)
    })

//Editing Profile Avatar
function submitEditAvatarForm({avatar}) {
    profileAvatar.src = avatar;
    api.setUserAvatar(avatar);
}

const newAvatarPopup = new PopupWithForm(editAvatarPopupSelector, submitEditAvatarForm);

newAvatarPopup.setEventListeners();

editAvatarButton.addEventListener('click', () => {
    newAvatarPopup.open();
})

//Editing Profile Description
function submitEditProfileForm({fullName, aboutMe}) {
    profile.setUserInfo(fullName, aboutMe);
    api.setUserInfo(fullName, aboutMe)
};

const newProfilePopup = new PopupWithForm(editProfilePopupSelector, submitEditProfileForm);

editProfileButton.addEventListener("click", () => {
    newProfilePopup.open();
    
    const user = profile.getUserInfo();
    profileName.value = user.name;
    profileAbout.value = user.about;
});

newProfilePopup.setEventListeners();

//Card Variables
const elementsList = document.querySelector('.elements__list');
const elementsListSelector = '.elements__list';
const cardTemplateSelector = '.card-template';
const imagePopupSelector = document.querySelector('.popup__type_image');
const addCardButton = document.querySelector('.profile__add-button');
const deleteCardPopupSelector = document.querySelector('.popup__type_delete-card');

api.getUserInfo()
    .then(res => {
        //console.log(res);
        const userID = res._id;
        api.getCardList()
            .then(res => {
                //console.log(res);
                const renderCard = (res) => {
                    const newImagePopup = new PopupWithImage(imagePopupSelector);
                    newImagePopup.setEventListeners();

                    function submitDeleteCardForm() {
                        //console.log(res);
                        //renderLoading(true);
                        api.removeCard(newDeleteCardPopup._cardID)
                        card.deleteCard();
                        //renderLoading(false);
                        newDeleteCardPopup.close();
                    }

                    const newDeleteCardPopup = new PopupWithForm(deleteCardPopupSelector, submitDeleteCardForm);
                    newDeleteCardPopup.setEventListeners();

                    const handleCardClick = (data) => {
                        newImagePopup.open(data);
                    };

                    const handleDeleteClick = (cardID) => {
                        newDeleteCardPopup.open();
                        newDeleteCardPopup._cardID = cardID;
                    };

                    const handleAddCardLike = (cardID) => {
                        api.addCardLike(cardID);
                    }
                    
                    const handleRemoveCardLike = (cardID) => {
                        api.removeCardLike(cardID);
                    } 

                    const card = new Card(res, userID, cardTemplateSelector, handleCardClick, handleDeleteClick, handleAddCardLike, handleRemoveCardLike);
                
                    elementsList.prepend(card.createCard(res));
                };

                const cardList = new Section({items: res, renderer: renderCard}, elementsListSelector);

                cardList.renderItems();

                function submitCardForm (data) {
                    renderLoading(true);
                    api.addCard(data)
                    .then(res => {
                        renderCard(res);
                        renderLoading(false);
                        newCard.close();
                    })
                }

                const newCard = new PopupWithForm(addCardPopupSelector, submitCardForm); 

                addCardButton.addEventListener('click', () => {
                    newCard.open();
                });

                newCard.setEventListeners();
            });
})

function renderLoading(isLoading) {
    if(isLoading) {
        formSaving.textContent = "Saving...";
    } else {
        formSaving.textContent = formSaving.textContent.slice(0,-9);
    }
}

// Image Popup
/* const newImagePopup = new PopupWithImage(imagePopupSelector);

newImagePopup.setEventListeners(); */


/*api.getCardList()
    .then(res => {
      const cardList = new Section({
          items: res,
          renderer: renderCard
      }, elementsListSelector);

      cardList.renderItems();
});

const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleAddCardLike, handleRemoveCardLike);

    elementsList.prepend(card.createCard());
}*/

// Image Card Handler
/*const handleCardClick = (element) => {
    newImagePopup.open(element);
};*/


//Remove Card Handler
/* function submitDeleteCardForm() {
    api.removeCard(newDeleteCardPopup._cardID)
    deleteCardPopupSelector._element.remove();
    deleteCardPopupSelector._element = null;
} */

/*const newDeleteCardPopup = new PopupWithForm(deleteCardPopupSelector, submitDeleteCardForm);

newDeleteCardPopup.setEventListeners();*/

/*const handleDeleteClick = (cardID, element) => {
        newDeleteCardPopup.open();
        newDeleteCardPopup._cardID = cardID;
        newDeleteCardPopup._element = element;
}; */

/* const handleAddCardLike = (cardID) => {
    api.addCardLike(cardID);
}

const handleRemoveCardLike = (cardID) => {
    api.removeCardLike(cardID);
} */

//Add Card
/* addCardButton.addEventListener('click', () => {
    newCard.open();
}); */

//const newCard = new PopupWithForm(addCardPopupSelector, submitCardForm); 

/*function submitCardForm (data) {
    api.addCard(data);
    renderCard(data);
}*/

//newCard.setEventListeners();


/* const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanois National Park",
        link: "https://code.s3.yandex.net/web-code/vanois.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
]; */

/* const cardList = new Section({
    items: initialCards,
    renderer: renderCard
}, elementsListSelector); */

//cardList.renderItems();
