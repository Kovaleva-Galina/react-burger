import { createContext, useContext, useState, useEffect } from 'react';
import { loginRequest, registrationRequest, passwordСonfirmation, codeRequest, getUserRequest, updateUserRequest, exitRequest } from '../utils/api';

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
  const [isUserLoaded, setUserLoaded] = useState(false);
  const [user, setUser] = useState(null);

  const getUser = async () => {
    return await getUserRequest()
    .then(data => {
      if (data.success) {
        setUser({ ...data.user, name: data.user.name, email: data.user.email  });
      }
      return data;
    })
    .finally(() => {
      setUserLoaded(true);
    })
  }

  //Вход пользователя после регистрации
  const signUp = async form => {
    return registrationRequest(form)
    .then(data => {
      setUser({ ...data.user, name: data.user.name, email: data.user.email });
      return data;
    });
  };

  //Вход пользователя с помощь логина и пароля
  const signIn = async form => {
    return loginRequest(form)
    .then(data => {
      setUser({ ...data.user, email: data.user.email, name: data.user.name });
      return data.success;
    });
  };

  //Проверка наличия пользователя по e-mail
  const checkingProfile = async email => {
    return codeRequest(email)
      .then(res => {
        return res.json();
      });
  };

  //Восстановление пароля
  const changePassword = async form => {
    return passwordСonfirmation(form)
      .then(res => {
        return res.json();
      });
  };

  //Выход пользователя
  const signOut = cb => {
    return exitRequest()
      .then(data => {
        setUser(null);
        return data;
      });
    };

  //Изменение данных пользователя
  const updateUser = async (form) => {
    return updateUserRequest(form)
    .then(data => {
      setUser({ ...data.user, name: data.user.name, email: data.user.email });
      return data;
    });
  }

  return {
    user,
    isUserLoaded,
    getUser,
    signIn,
    signUp,
    checkingProfile,
    changePassword,
    signOut,
    updateUser
  };
}
