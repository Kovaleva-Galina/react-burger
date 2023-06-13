import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import styles from './forgot-password.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth';


export const ForgotPasswordPage = () => {
  const codeUserRequest = useSelector((state) => state.userProfile?.codeUserRequest);
  const [email, setEmail] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();

  const onChange = e => {
    setEmail(e.target.value);
  }

  const confirmEmail = useCallback(
    e => {
      e.preventDefault();
      auth.checkingProfile(email).then((data) => {
        if (data) {
          navigate('/reset-password')
        }
      });
    },
    [auth, email, navigate]
  );

  // if (!isUserLoaded) return null;

  if (auth.user) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className={`pt-30 pb-6 ${styles.forgot_password}`}>
      <p className="text text_type_main-medium pb-6">
        Восстановление пароля
      </p>
      <form className={`${styles.forgot_password__form}`} onSubmit={confirmEmail}>
        <EmailInput
          onChange={onChange}
          value={email}
          name={'email'}
          isIcon={false}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={!email.length || codeUserRequest}
        >
        Восстановить
        </Button>
      </form>
      <p className="pt-20 text text_type_main-default">
        Вспомнили пароль?&#160;
        <Link to='/login' className={`${styles.forgot_password__link}`}>Войти</Link>
      </p>
  </div>
  )
}
