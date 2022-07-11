export const baseUrl = "https://auth.nomoreparties.co";
const authorization = "e3cd37b0-56ab-40c1-b26c-66c00d48e156";

const handleResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка, код: ${response.status}`);
};

export const register = (password, email) => {
  console.log("register email, password:", email, password);
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      email,
    }),
  }).then(handleResponse);
};

