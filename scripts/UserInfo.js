export default class UserInfo {
    constructor(profileName, profileAbout) {
        this._profileName = profileName;
        this._profileAbout = profileAbout;

        this._fullName = document.querySelector('.popup__field_type_full-name');
        this._aboutMe = document.querySelector('.popup__field_type_about-me');
    }

    getUserInfo() {
        this._userData = {name: this._profileName.textContent,  about:this._profileAbout.textContent};
        return this._userData;
    }

    setUserInfo() {
        this._profileName.textContent = this._fullName.value;
        this._profileAbout.textContent = this._aboutMe.value;
    }
}