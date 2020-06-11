const popup = document.querySelector('.popup');
const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const profileName = document.querySelector('.profile__title');
const profileAbout = document.querySelector('.profile__subtitle');
const editForm = document.querySelector('.popup__container');
const fullName = document.querySelector('.popup__field_type_full-name');
const aboutMe = document.querySelector('.popup__field_type_about-me');

function togglePopup () {
    popup.classList.toggle('popup_opened');
}

editButton.addEventListener("click", togglePopup);
closeButton.addEventListener("click", togglePopup);

function formSubmitHandler (evt) {
    evt.preventDefault();

    profileName.textContent = fullName.value;
    profileAbout.textContent = aboutMe.value;

    togglePopup();
}

editForm.addEventListener('submit', formSubmitHandler);
