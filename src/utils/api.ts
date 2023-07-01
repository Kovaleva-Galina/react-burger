import { TUser, TForm, TOrder, TIngredient } from "../services/types/data";
import { getCookie, setCookie } from "./utils";
export const BASE_URL = 'https://norma.nomoreparties.space/api';

type TServerResponse<T> = {
  success: boolean;
} & T;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TOrderResponse = TServerResponse<{
  order: TOrder;
}>;

type TLoginUserProfileResponse = TServerResponse<{
  user: TUser;
  refreshToken: string;
  accessToken: string;
}>

type TRegisterUserProfileResponse = TServerResponse<{
  user: TUser;
  refreshToken: string;
  accessToken: string;
}>

type TCodeUserProfileResponse = TServerResponse<{}>;

type TUpdateTokenResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TGetUserProfileResponse = TServerResponse<{
  user: TUser;
}>

type TPasswordChangeUserProfileResponse = TServerResponse<{
  message: string;
}>

type TLogoutUserProfileResponse = TServerResponse<{}>;

type TUpdateUserProfileRequestResponse = TServerResponse<{
  user: TUser;
}>

const checkResponse = <T>(res : Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err: string) => Promise.reject(err));
};

export const fetchOrder = (keysNumbers: string[]) => {
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
  .then((res) => checkResponse<TOrderResponse>(res))
}

export const fetchIngredients = () => {
  return fetch(`${BASE_URL}/ingredients`).then((res) => checkResponse<TIngredientsResponse>(res))
}

export const loginUserProfileRequest = async (form: TForm) => {
  return fetch((`${BASE_URL}/auth/login`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then((res) => checkResponse<TLoginUserProfileResponse>(res))
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

export const registerUserProfileRequest = async (form: TForm) => {
  return await fetch((`${BASE_URL}/auth/register`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then((res) => checkResponse<TRegisterUserProfileResponse>(res))
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

export const codeUserProfileRequest = async (email: string) => {
  return fetch((`${BASE_URL}/password-reset`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'email' : email
    })
  })
  .then((res) => checkResponse<TCodeUserProfileResponse>(res))
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
  .then((res) => checkResponse<TUpdateTokenResponse>(res))
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
export const getUserProfileRequest = async (): Promise<TGetUserProfileResponse> => {
  return fetch((`${BASE_URL}/auth/user`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('access-token')
    },
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

export const passwordChangeUserProfileRequest = async (form: TForm) => {
  return fetch((`${BASE_URL}/password-reset/reset`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form)
  })
  .then((res) => checkResponse<TPasswordChangeUserProfileResponse>(res))
};

export const logoutUserProfileRequest = async () => {
  return await fetch((`${BASE_URL}/auth/logout`),  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "token": getCookie('refresh-token')
    })
  })
  .then((res) => checkResponse<TLogoutUserProfileResponse>(res))
};

//Обновление данных пользователя
export const updateUserProfileRequest = async (form: TForm) =>
  await fetch((`${BASE_URL}/auth/user`), {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + getCookie('access-token')
    },
    body: JSON.stringify(form),
  })
  .then((res) => checkResponse<TUpdateUserProfileRequestResponse>(res))
