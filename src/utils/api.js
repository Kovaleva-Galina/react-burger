import { getCookie, setCookie } from "./utils";
export const BASE_URL = 'https://norma.nomoreparties.space/api';

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then(err => Promise.reject(err));
};

export const fetchOrder = (keysNumbers) => {
  return fetch((`${BASE_URL}/orders`), {
    method: 'POST',
    body: JSON.stringify({
      ingredients: keysNumbers,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('access-token')
    },
  })
  .then(checkResponse)
}

export const fetchIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse)
}

export const loginUserProfileRequest = async form => {
  return fetch((`${BASE_URL}/auth/login`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
  .then((data) => {
    const { accessToken, refreshToken } = data;
    if (accessToken) {
      setCookie('access-token', accessToken.split('Bearer ')[1]);
      setCookie('refresh-token', refreshToken);
      return data;
    } else {
      return Promise.reject(`Access token не найден`);
    }
  })
};

export const registerUserProfileRequest = async form => {
  return await fetch((`${BASE_URL}/auth/register`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then(checkResponse)
  .then((data) => {
    const { accessToken, refreshToken } = data;
    if (accessToken) {
      setCookie('access-token', accessToken.split('Bearer ')[1]);
      setCookie('refresh-token', refreshToken);
      return data;
    } else {
      return Promise.reject(`Access token не найден`);
    }
  })
};

export const codeUserProfileRequest = async email => {
  return fetch((`${BASE_URL}/password-reset`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email' : email
    })
  })
};

export const updateTokenRequest = async () => {
  return await fetch((`${BASE_URL}/auth/token`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": getCookie('refresh-token')
    })
  })
  .then(checkResponse)
  .then((data) => {
    const { accessToken, refreshToken } = data;
    if (accessToken) {
      setCookie('access-token', accessToken.split('Bearer ')[1]);
      setCookie('refresh-token', refreshToken);
    } else {
      return Promise.reject(`Access token не найден`);
    }
  })
};

//Запрос на получение данный о пользователе
export const getUserProfileRequest = async form => {
  return fetch((`${BASE_URL}/auth/user`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('access-token')
    },
    body: JSON.stringify(form),
  })
  .then(async (res) => {
    if (res.ok) {
      return res.json();
    } else if  (res.status === 403) {
      await  updateTokenRequest();
      return getUserProfileRequest();
      // обновляю токен. отправляю запрос на сервер /token. Получаю новый accessToken, сохраняю новый accessToken в кукии
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  });
}

export const passwordChangeUserProfileRequest = async form => {
  return fetch((`${BASE_URL}/password-reset/reset`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  });
};

export const logoutUserProfileRequest = async form => {
  return await fetch((`${BASE_URL}/auth/logout`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": getCookie('refresh-token')
    })
  })
  .then(checkResponse)
};

//Обновление данных пользователя
export const updateUserProfileRequest = async form =>
  await fetch((`${BASE_URL}/auth/user`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('access-token')
    },
    body: JSON.stringify(form),
  })
  .then(checkResponse)
