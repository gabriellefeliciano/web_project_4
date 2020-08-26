export default class API {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    //GET https://around.nomoreparties.co/v1/group-3/users/me
    getUserInfo() {
        return fetch(this._baseUrl + '/users/me', {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
        .catch(err => console.log(err))
    }

    //PATCH https://around.nomoreparties.co/v1/groupId/users/me
    setUserInfo(name, about) {
      return fetch(this._baseUrl + '/users/me', {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          name,
          about
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
      .catch(err => console.log(err))
    }

    //PATCH https://around.nomoreparties.co/v1/groupId/users/me/avatar
    setUserAvatar(avatar) {
      return fetch(this._baseUrl + '/users/me/avatar', {
        headers: this._headers,
        method: 'PATCH',
        body: JSON.stringify({
          avatar
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
      .catch(err => console.log(err))
    }

    //GET https://around.nomoreparties.co/v1/group-3/cards
    getCardList() {
        return fetch(this._baseUrl + '/cards', {
            headers: this._headers
        })
        .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
        .catch(err => console.log(err))
    }

    //POST https://around.nomoreparties.co/v1/group-3/cards
    addCard({name, link}) {
      return fetch(this._baseUrl + '/cards', {
        headers: this._headers,
        method: 'POST',
        body: JSON.stringify({
          name,
          link
        })
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
      .catch(err => console.log(err))
    }

    //DELETE https://around.nomoreparties.co/v1/groupId/cards/cardId
    removeCard(_id) {
      return fetch(this._baseUrl + '/cards/' + _id, {
        headers: this._headers,
        method: 'DELETE'
      })
      .then(res => res.ok ? res.json() : Promise.reject(`Something went wrong: ${res.status}`))
      .catch(err => console.log(err))
    }

    //PUT https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    //DELETE https://around.nomoreparties.co/v1/groupId/cards/likes/cardId
    addCardLike(_id) {
      return fetch(this._baseUrl + '/cards/likes/' + _id, {
        headers: this._headers,
        method: 'PUT'
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status + ' Error: ' + res.statusText))
      .catch(err => console.log(err))
    }

    removeCardLike(_id) {
      return fetch(this._baseUrl + '/cards/likes/' + _id, {
        headers: this._headers,
        method: 'DELETE'
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.status + ' Error: ' + res.statusText))
      .catch(err => console.log(err))
    }
  }
  
  /* const api = new Api({
    baseUrl: 'https://around.nomoreparties.co/v1/group-3',
    headers: {
      authorization: '00dd05f0-5ab4-404d-8531-81f50ae2518e',
      'Content-Type': 'application/json'
    }
  }); */