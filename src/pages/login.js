import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from "react";
import styles from './login.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../services/auth';

export const LoginPage = () => {
  const { signIn, user, isUserLoaded } = useAuth();
  const [form, setValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  let login = useCallback(
    async e => {
      e.preventDefault();
      try {
        await signIn(form);
        navigate('/')
      } catch (e) {
        console.error('errr', e);
      }
    },
    [form, signIn, navigate]
  );

  if (!isUserLoaded) return null;

  if (user) {
    return (
      // Переадресовываем авторизованного пользователя на главную страницу
      <Navigate
        to="/"
        replace
      />
    );
  }

  return (
    <div className={`pt-30 pb-6 ${styles.login}`}>
      <p className="text text_type_main-medium pb-6">
        Вход
      </p>
      <form className={`${styles.login__form}`}>
        <EmailInput
          placeholder="Email"
          value={form.email || ''}
          name={'email'}
          isIcon={false}
          onChange={onChange}
        />
        <PasswordInput
        value={form.password || ''}
        name={'password'}
        extraClass="mb-2"
        onChange={onChange}
        />
        <Button onClick={login} htmlType="button" type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p className="pt-20 text text_type_main-default">
        Вы — новый пользователь?&#160;
        <Link to='/register' className={`${styles.login__link}`}>Зарегистрироваться</Link>
      </p>
      <p className="pt-4 text text_type_main-default">
        Забыли пароль?&#160;
        <Link to='/forgot-password' className={`${styles.login__link}`}>Восстановить пароль</Link>
      </p>

  </div>
  )
}
