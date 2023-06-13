import { createContext, useContext, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser as getUserAction, loginUser, registerUser, updateUser as updateUserAction, logoutUser, codeUser, changePasswordUser} from './actions/user-profile';

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  useEffect(() => {
    auth.getUser();
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userProfile.user);
  const isLoaded = useSelector((state) => state.userProfile.isLoaded);

  const getUser = async () => {
    dispatch(getUserAction());
  }

  //Вход пользователя после регистрации
  const signUp = async form => {
    return dispatch(registerUser(form))
  };

  //Вход пользователя с помощь логина и пароля
  const signIn = async form => {
    return dispatch(loginUser(form))
  };

  //Запрос на проверочный код
  const checkingProfile = async email => {
    return dispatch(codeUser(email))
  };

  //Запрос на смену пароля
  const changePassword = async form => {
    return dispatch(changePasswordUser(form));
  };

  //Выход пользователя
  const signOut = () => {
    dispatch(logoutUser())
  };

  //Изменение данных пользователя
  const updateUser = async (form) => {
    dispatch(updateUserAction(form));
  }

  return {
    user,
    isUserLoaded: isLoaded,
    getUser,
    signIn,
    signUp,
    checkingProfile,
    changePassword,
    signOut,
    updateUser
  };
}
