export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const fetchOrder = (keysNumbers) => {
  return fetch((`${BASE_URL}/orders`), {
    method: 'POST',
    body: JSON.stringify({
      ingredients: keysNumbers
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(checkResponse)
}

export const fetchIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse)
}
