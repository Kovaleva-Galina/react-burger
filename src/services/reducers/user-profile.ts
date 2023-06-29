import { TUser } from '../types/data';
import { TUserActions } from '../actions/user-profile';
import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,

  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILED,

  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,

  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,

  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,

  CODE_USER_REQUEST,
  CODE_USER_SUCCESS,
  CODE_USER_FAILED,

  PASSWORD_CHANGE_USER_FAILED,
  PASSWORD_CHANGE_USER_SUCCESS,
  PASSWORD_CHANGE_USER_REQUEST
} from '../constants';

export type TUserProfileState = {
  user: TUser | null,
  isLoaded: boolean,

  userRequest: boolean,
  userFailed: boolean,

  userUpdateRequest: boolean,
  userUpdateFailed: boolean,

  userRegisterRequest: boolean,
  userRegisterFailed: boolean,

  userLoginRequest: boolean,
  userLoginFailed: boolean,

  logoutUserRequest: boolean,
  logoutUserFailed: boolean,

  codeUserRequest: boolean,
  codeUserFailed: boolean,

  passwordChangeUserRequest: boolean,
  passwordChangeUserFailed: boolean,
};

export const userProfileState: TUserProfileState = {
  user: null,
  isLoaded: false,

  userRequest: false,
  userFailed: false,

  userUpdateRequest: false,
  userUpdateFailed: false,

  userRegisterRequest: false,
  userRegisterFailed: false,

  userLoginRequest: false,
  userLoginFailed: false,

  logoutUserRequest: false,
  logoutUserFailed: false,

  codeUserRequest: false,
  codeUserFailed: false,

  passwordChangeUserRequest: false,
  passwordChangeUserFailed: false,
}

export const userProfileReducer = (state = userProfileState, action: TUserActions): TUserProfileState => {
  switch (action.type) {
    case GET_USER_REQUEST: {
      return { ...state, userRequest: true };
    }
    case GET_USER_SUCCESS: {
      return { ...state, userFailed: false, user: action.user, userRequest: false, isLoaded: true };
    }
    case GET_USER_FAILED: {
      return { ...state, userFailed: true, userRequest: false, isLoaded: true };
    }
    case UPDATE_USER_REQUEST: {
      return { ...state, userUpdateRequest: true };
    }
    case UPDATE_USER_SUCCESS: {
      return { ...state, userUpdateFailed: false, user: action.user, userUpdateRequest: false, isLoaded: true };
    }
    case UPDATE_USER_FAILED: {
      return { ...state, userUpdateFailed: true };
    }
    case REGISTER_USER_REQUEST: {
      return { ...state, userRegisterRequest: true };
    }
    case REGISTER_USER_SUCCESS: {
      return { ...state, userRegisterFailed: false, user: action.user, userRegisterRequest: false, isLoaded: true };
    }
    case REGISTER_USER_FAILED: {
      return { ...state, userRegisterFailed: true };
    }
    case LOGIN_USER_REQUEST: {
      return { ...state, userLoginRequest: true };
    }
    case LOGIN_USER_SUCCESS: {
      return { ...state, userLoginFailed: false, user: action.user, userLoginRequest: false, isLoaded: true };
    }
    case LOGIN_USER_FAILED: {
      return { ...state, userLoginFailed: true };
    }
    case LOGOUT_USER_REQUEST: {
      return { ...state, logoutUserRequest: true };
    }
    case LOGOUT_USER_SUCCESS: {
      return { ...state, logoutUserFailed: false, user: null, logoutUserRequest: false };
    }
    case LOGOUT_USER_FAILED: {
      return { ...state, logoutUserFailed: true };
    }
    case CODE_USER_REQUEST: {
      return { ...state, codeUserRequest: true };
    }
    case CODE_USER_SUCCESS: {
      return { ...state, codeUserFailed: false, codeUserRequest: false };
    }
    case CODE_USER_FAILED: {
      return { ...state, codeUserFailed: true };
    }
    case PASSWORD_CHANGE_USER_REQUEST: {
      return { ...state, passwordChangeUserRequest: true };
    }
    case PASSWORD_CHANGE_USER_SUCCESS: {
      return { ...state, passwordChangeUserFailed: false, passwordChangeUserRequest: false, user: action.user, isLoaded: true };
    }
    case PASSWORD_CHANGE_USER_FAILED: {
      return { ...state, passwordChangeUserFailed: true };
    }
    default:
      return state;
  }
}
