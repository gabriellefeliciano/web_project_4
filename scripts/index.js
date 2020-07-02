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

//Buttons
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close-button');
const addCardCloseButton = addCardPopup.querySelector('.popup__close-button');

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

const cardTemplate = document.querySelector('.card-template').content.querySelector('.element');
const cardForm = document.querySelector('.popup__type_add-card');
const image = document.querySelector('.popup__image');
const caption = document.querySelector('.popup__caption');

function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
};

const createCard = (data) => {
    const cardElement = cardTemplate.cloneNode(true);

    const cardTitle = cardElement.querySelector('.element__title');
    const cardImage = cardElement.querySelector('.element__image');
    const cardLikeButton = cardElement.querySelector('.element__like-button');
    const cardRemoveButton = cardElement.querySelector('.element__remove-button');

    cardTitle.textContent = data.name;
    cardImage.style.backgroundImage = `url(${data.link})`;

    cardLikeButton.addEventListener('click', () => {
        cardLikeButton.classList.toggle("element__like-button_clicked");
    })

    cardRemoveButton.addEventListener('click', (evt) => {
        evt.target.closest('.element').remove();
    })

    cardImage.addEventListener('click', () => {
        image.src = `${data.link}`;
        image.alt = cardTitle.textContent;
        caption.textContent = cardTitle.textContent;
        togglePopup(imagePopup);
    })

    return cardElement;
}

const elementsList = document.querySelector('.elements__list');

const renderCard = (data) => {
    elementsList.prepend(createCard(data));
}

initialCards.forEach((data) => {
    renderCard(data);
})

//Functions
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