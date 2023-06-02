import { getUserProfileRequest, updateUserProfileRequest, registerUserProfileRequest, loginUserProfileRequest, logoutUserProfileRequest, codeUserProfileRequest, passwordChangeUserProfileRequest } from "../../utils/api";

//Запрос данных о пользователе
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

export const getUserRequest = () => ({type:GET_USER_REQUEST});
export const getUserFailed = () => ({type:GET_USER_FAILED});
export const getUserSuccess = (payload) => ({type:GET_USER_SUCCESS, payload});

//Обновление данных о пользователе
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';

export const updateUserRequest = () => ({type:UPDATE_USER_REQUEST});
export const updateUserFailed = () => ({type:UPDATE_USER_FAILED});
export const updateUserSuccess = (payload) => ({type:UPDATE_USER_SUCCESS, payload});

//Запрос на регистрацию пользователя
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';

export const registerUserRequest = () => ({type:REGISTER_USER_REQUEST});
export const registerUserFailed = () => ({type:REGISTER_USER_FAILED});
export const registerUserSuccess = (payload) => ({type:REGISTER_USER_SUCCESS, payload});

//Запрос на вход по логину
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';

export const loginUserRequest = () => ({type:LOGIN_USER_REQUEST});
export const loginUserFailed = () => ({type:LOGIN_USER_FAILED});
export const loginUserSuccess = (payload) => ({type:LOGIN_USER_SUCCESS, payload});

//Запрос на выход пользователя
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED';
export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';

export const logoutUserRequest = () => ({type:LOGOUT_USER_REQUEST});
export const logoutUserFailed = () => ({type:LOGOUT_USER_FAILED});
export const logoutUserSuccess = (payload) => ({type:LOGOUT_USER_SUCCESS, payload});

//Запрос кода, если забыл пароль
export const CODE_USER_FAILED = 'CODE_USER_FAILED';
export const CODE_USER_REQUEST = 'CODE_USER_REQUEST';
export const CODE_USER_SUCCESS = 'CODE_USER_SUCCESS';

export const codeUserRequest = () => ({type:CODE_USER_REQUEST});
export const codeUserFailed = () => ({type:CODE_USER_FAILED});
export const codeUserSuccess = (payload) => ({type:CODE_USER_SUCCESS, payload});

//Запрос на смену пароля
export const PASSWORD_CHANGE_USER_FAILED = 'PASSWORD_CHANGE_USER_FAILED';
export const PASSWORD_CHANGE_USER_REQUEST = 'PASSWORD_CHANGE_USER_REQUEST';
export const PASSWORD_CHANGE_USER_SUCCESS = 'PASSWORD_CHANGE_USER_SUCCESS';

export const passwordChangeUserRequest = () => ({type:PASSWORD_CHANGE_USER_REQUEST});
export const passwordChangeUserFailed = () => ({type:PASSWORD_CHANGE_USER_FAILED});
export const passwordChangeUserSuccess = (payload) => ({type:PASSWORD_CHANGE_USER_SUCCESS, payload});

export function getUser() {
  return function(dispatch) {
    dispatch(getUserRequest());
    return getUserProfileRequest()
    .then(json => {
      dispatch(getUserSuccess(json.user));
    })
    .catch(() => {
      dispatch(getUserFailed());
    })
  };
}

export function updateUser(form) {
  return function(dispatch) {
    dispatch(updateUserRequest());
    return updateUserProfileRequest(form)
    .then(json => {
      dispatch(updateUserSuccess(json.user));
    })
    .catch(() => {
      dispatch(updateUserFailed());
    })
  };
}

export function registerUser(form) {
  return function(dispatch) {
    dispatch(registerUserRequest());
    return registerUserProfileRequest(form)
    .then(json => {
      dispatch(registerUserSuccess(json.user));
      return json;
    })
    .catch(() => {
      dispatch(registerUserFailed());
    })
  };
}

export function loginUser(form) {
  return function(dispatch) {
    dispatch(loginUserRequest());
    return loginUserProfileRequest(form)
    .then(json => {
      dispatch(loginUserSuccess(json.user));
    })
    .catch(() => {
      dispatch(loginUserFailed());
    })
  };
}

export function logoutUser(form) {
  return function(dispatch) {
    dispatch(logoutUserRequest());
    return logoutUserProfileRequest(form)
    .then(json => {
      dispatch(logoutUserSuccess(json.user));
    })
    .catch(() => {
      dispatch(logoutUserFailed());
    })
  };
}

export function codeUser(email) {
  return function(dispatch) {
    dispatch(codeUserRequest());
    return codeUserProfileRequest(email)
    .then(json => {
      dispatch(codeUserSuccess());
      return json;
    })
    .catch(() => {
      dispatch(codeUserFailed());
    })
  };
}

export function changePasswordUser(form) {
  return function(dispatch) {
    dispatch(passwordChangeUserRequest());
    return passwordChangeUserProfileRequest(form)
    .then(json => {
      dispatch(passwordChangeUserSuccess());
      return json;
    })
    .catch(() => {
      dispatch(passwordChangeUserFailed());
    })
  };
}
