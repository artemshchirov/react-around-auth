class Api {
  constructor({ baseUrl, headers }) {
    this._address = baseUrl;
    this._token = headers.authorization;
  }

  _handleResponse = (response) => {
    return response.ok
      ? response.json()
      : Promise.reject(`Error: ${response.status}`);
  };

  setToken(jwt) {
    this._token = jwt;
  }

  setAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._token}`,
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
        authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${this._token}`,
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
        authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  addItem({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${this._token}`,
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
        authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(cardId, isLikeActive) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: `${isLikeActive ? 'PUT' : 'DELETE'}`,
      headers: {
        authorization: `Bearer ${this._token}`,
      },
    }).then(this._handleResponse);
  }
}

const api = new Api({
  baseUrl: 'https://around.backend.nomoredomains.sbs',
  headers: {
    authorization: localStorage.getItem('jwt'),
    'Content-Type': 'application/json',
  },
});

export default api;
