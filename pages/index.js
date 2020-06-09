const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const editForm = document.querySelector('.popup__container');

function togglePopup () {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    let fullName = document.querySelector('.popup__full-name');
    let aboutMe = document.querySelector('.popup__about-me');

    profileName.textContent = fullName.value;
    profileAbout.textContent = aboutMe.value;
}

formElement.addEventListener('submit', formSubmitHandler);