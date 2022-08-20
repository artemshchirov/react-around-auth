export const baseUrl = 'https://around.backend.nomoredomains.sbs';
const authorization = localStorage.getItem('jwt');

const handleResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`код ${response.status}`);
};

export const register = (email, password) => {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleResponse);
};

export const authorize = (email, password) => {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      authorization,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(handleResponse);
};

export const getContent = (jwt) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${jwt}`,
      'Content-Type': 'application/json',
    },
  }).then(handleResponse);
};
