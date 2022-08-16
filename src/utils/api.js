class Api {
  constructor({ baseUrl, headers }) {
    this._address = baseUrl;
    this._token = headers.authorization;
  }

  _handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Ошибка, код: ${response.status}`);
  };

  setAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._handleResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  addItem({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._handleResponse);
  }

  deleteItem(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLikeActive) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${isLikeActive ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-35',
  headers: {
    authorization: 'e3cd37b0-56ab-40c1-b26c-66c00d48e156',
    'Content-Type': 'application/json',
  },
});

export default api;
