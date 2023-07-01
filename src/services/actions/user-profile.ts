import { AppThunk, AppDispatch } from "../types";
import { TUser, TForm } from "../types/data";
import {
  getUserProfileRequest,
  updateUserProfileRequest,
  registerUserProfileRequest,
  loginUserProfileRequest,
  logoutUserProfileRequest,
  codeUserProfileRequest,
  passwordChangeUserProfileRequest
} from "../../utils/api";

import {
  GET_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_FAILED,
  UPDATE_USER_FAILED,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  REGISTER_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  CODE_USER_FAILED,
  CODE_USER_REQUEST,
  CODE_USER_SUCCESS,
  PASSWORD_CHANGE_USER_FAILED,
  PASSWORD_CHANGE_USER_REQUEST,
  PASSWORD_CHANGE_USER_SUCCESS,
} from "../constants";

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_FAILED;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS;
  readonly user: TUser;
}

//Запрос данных о пользователе
export const getUserRequest = (): IGetUserRequestAction => ({ type: GET_USER_REQUEST });
export const getUserFailed = (): IGetUserFailedAction => ({ type: GET_USER_FAILED });
export const getUserSuccess = (user: TUser): IGetUserSuccessAction => ({ type: GET_USER_SUCCESS, user });


export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_REQUEST;
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly user: TUser;
}

//Обновление данных о пользователе
export const updateUserRequest = (): IUpdateUserRequestAction => ({ type: UPDATE_USER_REQUEST });
export const updateUserFailed = (): IUpdateUserFailedAction => ({ type: UPDATE_USER_FAILED });
export const updateUserSuccess = (user: TUser): IUpdateUserSuccessAction => ({ type: UPDATE_USER_SUCCESS, user });

export interface IRegisterUserRequestAction {
  readonly type: typeof REGISTER_USER_REQUEST;
}

export interface IRegisterUserFailedFailedAction {
  readonly type: typeof REGISTER_USER_FAILED;
}

export interface IRegisterUserSuccessAction {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly user: TUser;
}

//Запрос на регистрацию пользователя
export const registerUserRequest = (): IRegisterUserRequestAction => ({ type: REGISTER_USER_REQUEST });
export const registerUserFailed = (): IRegisterUserFailedFailedAction => ({ type: REGISTER_USER_FAILED });
export const registerUserSuccess = (user: TUser): IRegisterUserSuccessAction => ({ type: REGISTER_USER_SUCCESS, user });

export interface ILoginUserRequestAction {
  readonly type: typeof LOGIN_USER_REQUEST;
}

export interface ILoginUserFailedAction {
  readonly type: typeof LOGIN_USER_FAILED;
}

export interface ILoginUserSuccessAction {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly user: TUser;
}

//Запрос на вход по логину
export const loginUserRequest = (): ILoginUserRequestAction => ({ type: LOGIN_USER_REQUEST });
export const loginUserFailed = (): ILoginUserFailedAction => ({ type: LOGIN_USER_FAILED });
export const loginUserSuccess = (user: TUser): ILoginUserSuccessAction => ({ type: LOGIN_USER_SUCCESS, user });

export interface ILogoutUserRequestAction {
  readonly type: typeof LOGOUT_USER_REQUEST;
}

export interface ILogoutUserFailedAction {
  readonly type: typeof LOGOUT_USER_FAILED;
}

export interface ILogoutUserSuccessAction {
  readonly type: typeof LOGOUT_USER_SUCCESS;
}

//Запрос на выход пользователя
export const logoutUserRequest = (): ILogoutUserRequestAction => ({ type: LOGOUT_USER_REQUEST });
export const logoutUserFailed = (): ILogoutUserFailedAction => ({ type: LOGOUT_USER_FAILED });
export const logoutUserSuccess = (): ILogoutUserSuccessAction => ({ type: LOGOUT_USER_SUCCESS });

export interface ICodeUserRequestAction {
  readonly type: typeof CODE_USER_REQUEST;
}

export interface ICodeUserFailedAction {
  readonly type: typeof CODE_USER_FAILED;
}

export interface ICodeUserSuccessAction {
  readonly type: typeof CODE_USER_SUCCESS;
}

//Запрос кода, если забыл пароль
export const codeUserRequest = (): ICodeUserRequestAction => ({ type: CODE_USER_REQUEST });
export const codeUserFailed = (): ICodeUserFailedAction => ({ type: CODE_USER_FAILED });
export const codeUserSuccess = (): ICodeUserSuccessAction => ({ type: CODE_USER_SUCCESS });

export interface IPasswordChangeUserRequestAction {
  readonly type: typeof PASSWORD_CHANGE_USER_REQUEST;
}

export interface IPasswordChangeUserFailedAction {
  readonly type: typeof PASSWORD_CHANGE_USER_FAILED;
}

export interface IPasswordChangeUserSuccessAction {
  readonly type: typeof PASSWORD_CHANGE_USER_SUCCESS;
}

//Запрос на смену пароля
export const passwordChangeUserRequest = (): IPasswordChangeUserRequestAction => ({ type: PASSWORD_CHANGE_USER_REQUEST });
export const passwordChangeUserFailed = (): IPasswordChangeUserFailedAction => ({ type: PASSWORD_CHANGE_USER_FAILED });
export const passwordChangeUserSuccess = (): IPasswordChangeUserSuccessAction => ({ type: PASSWORD_CHANGE_USER_SUCCESS });

export type TUserActions =
  | IGetUserRequestAction
  | IGetUserFailedAction
  | IGetUserSuccessAction
  | IUpdateUserRequestAction
  | IUpdateUserFailedAction
  | IUpdateUserSuccessAction
  | IRegisterUserRequestAction
  | IRegisterUserFailedFailedAction
  | IRegisterUserSuccessAction
  | ILoginUserRequestAction
  | ILoginUserFailedAction
  | ILoginUserSuccessAction
  | ILogoutUserRequestAction
  | ILogoutUserFailedAction
  | ILogoutUserSuccessAction
  | ICodeUserRequestAction
  | ICodeUserFailedAction
  | ICodeUserSuccessAction
  | IPasswordChangeUserRequestAction
  | IPasswordChangeUserFailedAction
  | IPasswordChangeUserSuccessAction;

export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(getUserRequest());
    return getUserProfileRequest()
      .then((json) => {
        dispatch(getUserSuccess(json.user));
      })
      .catch(() => {
        dispatch(getUserFailed());
      })
  };
}

export const updateUser: AppThunk = (form: TForm) => {
  return function (dispatch: AppDispatch) {
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

export const registerUser: AppThunk = (form: TForm) => {
  return function (dispatch: AppDispatch) {
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

export const loginUser: AppThunk = (form: TForm) => {
  return function (dispatch) {
    dispatch(loginUserRequest());
    return loginUserProfileRequest(form)
      .then(json => {
        dispatch(loginUserSuccess(json.user));
      })
      .catch((e) => {
        dispatch(loginUserFailed());
        throw e;
      })
  };
}

export const logoutUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch(logoutUserRequest());
    return logoutUserProfileRequest()
      .then(() => {
        dispatch(logoutUserSuccess());
      })
      .catch(() => {
        dispatch(logoutUserFailed());
      })
  };
}

export const codeUser: AppThunk = (email: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(codeUserRequest());
    return codeUserProfileRequest(email)
      .then(() => {
        dispatch(codeUserSuccess());
      })
      .catch(() => {
        dispatch(codeUserFailed());
      })
  };
}

export const changePasswordUser: AppThunk = (form: TForm) => (dispatch: AppDispatch) => {
  dispatch(passwordChangeUserRequest());
  return passwordChangeUserProfileRequest(form)
    .then(() => {
      dispatch(passwordChangeUserSuccess());
    })
    .catch(() => {
      dispatch(passwordChangeUserFailed());
    })
};

