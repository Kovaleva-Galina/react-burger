export const baseUrl = 'https://norma.nomoreparties.space/api';

export const fetchOrder = (keysNumbers) => {
    return fetch((`${baseUrl}/orders`), {
      method: 'POST',
      body: JSON.stringify({
        ingredients: keysNumbers
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
}

export const fetchIngredients = () => {
  return fetch(`${baseUrl}/ingredients`)
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
}
