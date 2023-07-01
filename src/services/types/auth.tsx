import { createContext, useContext, useEffect, ReactNode } from 'react';
import { useSelector, useDispatch } from './hooks';
import { getUser as getUserAction, loginUser, registerUser, updateUser as updateUserAction, logoutUser, codeUser, changePasswordUser } from '../actions/user-profile';
import { TForm, TUser } from './data';

interface IAuthContext {
  user: TUser | null;
  isLoaded: boolean;
  getUser: () => Promise<void>;
  signIn: (form: TForm) => Promise<any>;
  signUp: (form: TForm) => Promise<any>;
  checkingProfile: (email: string) => Promise<any>;
  changePassword: (form: TUser) => Promise<any>;
  signOut: () => Promise<void>;
  updateUser: (form: TForm) => Promise<void>;
}

const AuthContext = createContext<IAuthContext>({
  user: null,
  isLoaded: false,
  getUser: async () => {},
  signIn: async () => {},
  signUp: async () => {},
  checkingProfile: async () => {},
  changePassword: async () => {},
  signOut: async () => {},
  updateUser: async () => {},
});

export interface IProvideAuthProps {
  children?: ReactNode;
}

export const ProvideAuth: React.FC<IProvideAuthProps> = ({ children }) => {
  const auth = useProvideAuth();

  useEffect(() => {
    auth.getUser();
    // prevent refetch user on change auth
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userProfile);
  const { isLoaded } = useSelector((state) => state.userProfile);

  const getUser = async () => {
    dispatch(getUserAction());
  }

  //Вход пользователя после регистрации
  const signUp = async (form: TForm) => {
    return dispatch(registerUser(form))
  };

  //Вход пользователя с помощь логина и пароля
  const signIn = async (form: TForm) => {
    return dispatch(loginUser(form))
  };

  //Запрос на проверочный код
  const checkingProfile = async (email: string) => {
    return dispatch(codeUser(email))
  };

  //Запрос на смену пароля
  const changePassword = async (form: TUser) => {
    return dispatch(changePasswordUser(form));
  };

  //Выход пользователя
  const signOut = async () => {
    await dispatch(logoutUser());
  };

  //Изменение данных пользователя
  const updateUser = async (form: TForm) => {
    dispatch(updateUserAction(form));
  }

  return {
    user,
    isLoaded,
    getUser,
    signIn,
    signUp,
    checkingProfile,
    changePassword,
    signOut,
    updateUser
  };
}
