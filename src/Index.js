import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "./styles/index.css";

const defaultConfig = {
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__error_visible"
};

const elementsList = document.querySelector('.elements__list');

const renderCard = (data) => {
    const card = new Card(data, cardTemplateSelector, handleCardClick);

    elementsList.prepend(card.createCard());
}

//Profile Popup Variables
const editProfilePopup = document.querySelector('.popup__type_edit-profile');
const editProfileForm = editProfilePopup.querySelector(".popup__form");
const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const profile = new UserInfo(profileName, profileAbout);

//Add Card Popup Variables
const addCardPopup = document.querySelector('.popup__type_add-card');
const addCardForm = addCardPopup.querySelector(".popup__form");
const addButton = document.querySelector('.profile__add-button');

// Add Card Handler
const handleCardClick = (element) => {
    popupWithImage.open(element);
};

addButton.addEventListener('click', () => {
    newCard.open();
});

//Form Validation
const editProfileValidation = new FormValidator(defaultConfig, editProfileForm);
const addCardValidation = new FormValidator(defaultConfig, addCardForm);

//Profile Popup
const newProfile = new PopupWithForm(editProfilePopup, (data) => {
    profile.setUserInfo(data);
});

editButton.addEventListener("click", () => {
    newProfile.open();
    
    const user = profile.getUserInfo();
    profileName.value = user.name;
    profileAbout.value = user.about;
});

newProfile.setEventListeners();

editProfileValidation.enableValidation();

//Add Card Popup
const newCard = new PopupWithForm(addCardPopup, submitCardForm); 

function submitCardForm (data) {
    renderCard(data);
}

newCard.setEventListeners();

addCardValidation.enableValidation();

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

const elementsListSelector = '.elements__list';
const cardTemplateSelector = '.card-template';

const cardList = new Section({
    items: initialCards,
    renderer: renderCard
}, elementsListSelector);

cardList.renderItems();

//Image Popup
const imagePopup = document.querySelector('.popup__type_image');

const popupWithImage = new PopupWithImage(imagePopup);

popupWithImage.setEventListeners();
