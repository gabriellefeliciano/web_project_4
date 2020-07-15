import {FormValidator} from "./formValidator.js";
import {Card} from "./card.js";

const defaultConfig = {
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__error_visible"
};

//Profile Popup
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const fullName = document.querySelector('.popup__field_type_full-name');
const aboutMe = document.querySelector('.popup__field_type_about-me');

//Popup Wrappers
const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const addCardPopup = document.querySelector('.popup__type_add-card');
const imagePopup = document.querySelector('.popup__type_image');
const editForm = document.querySelector('.popup__container');
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

editProfileValidation.enableValidation();
addCardValidation.enableValidation();

//Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addCardCloseButton = addCardPopup.querySelector('.popup__close-button');
const imageCloseButton = imagePopup.querySelector('.popup__close-button');

//Add Card Popup
const initialCards = [
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
];

const cardTemplateSelector = '.card-template';
const cardForm = document.querySelector('.popup__type_add-card');

const elementsList = document.querySelector('.elements__list');

const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector);
    
    elementsList.prepend(card.createCard());
}

initialCards.forEach((data) => {
    renderCard(data);
})

//Functions
function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
};

editButton.addEventListener('click', () => {
    fullName.value = profileName.textContent;
    aboutMe.value = profileAbout.textContent;
    
    togglePopup(editProfilePopup);
    document.addEventListener('keydown', escapePopup);
});

editProfileCloseButton.addEventListener('click', () => {
    togglePopup(editProfilePopup);
});

addButton.addEventListener('click', () => {
    togglePopup(addCardPopup);
    document.addEventListener('keydown', escapePopup);
});

addCardCloseButton.addEventListener('click', () => {
    togglePopup(addCardPopup);
});

imageCloseButton.addEventListener('click', () => {
    togglePopup(imagePopup);
});

function escapePopup(evt) {
    const escapeKEY = 27;
    if (evt.which === escapeKEY) {
      togglePopup(document.querySelector('.popup_opened'));
      document.removeEventListener('keydown', escapePopup);
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = fullName.value;
    profileAbout.textContent = aboutMe.value;

    togglePopup(editProfilePopup);
}

editForm.addEventListener('submit', formSubmitHandler);

function submitCardForm (evt) {
    evt.preventDefault ();
  
    const data = {
      name: cardForm.querySelector('.popup__field_type_title').value,
      link: cardForm.querySelector('.popup__field_type_image-link').value
    };
  
    renderCard(data);
  
    togglePopup(addCardPopup);
}

cardForm.addEventListener('submit', submitCardForm);

window.addEventListener('click', (evt) => {
    if (evt.target == editProfilePopup) {
      togglePopup(editProfilePopup);
    } else if (evt.target == addCardPopup) {
      togglePopup(addCardPopup);
    } else if (evt.target == imagePopup) {
      togglePopup (imagePopup);
    }
});