export default class UserInfo {
    constructor({profileName, profileAbout}) {
        this._profileName = profileName;
        this._profileAbout = profileAbout;
    }

    getUserInfo() {
        return {
            name: this._profileName.textContent,
            about: this._profileAbout.textContent
        };
    }

    setUserInfo(fullName, aboutMe) {
        this._fullName = fullName;
        this._aboutMe = aboutMe;
        this._profileName.textContent = this._fullName;
        this._profileAbout.textContent = this._aboutMe;
    }
}