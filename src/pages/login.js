import { PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useState } from "react";
import { useSelector } from 'react-redux';
import styles from './login.module.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../redux/auth';

export const LoginPage = () => {
  const userLoginRequest = useSelector((state) => state.userProfile?.userLoginRequest);
  const { signIn, isUserLoaded } = useAuth();
  const [form, setValue] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const onChange = e => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const login = useCallback(
    async e => {
      e.preventDefault();
      try {
        await signIn(form);
        navigate(location.state?.from || '/')
      } catch (e) {
        console.error('errr', e);
      }

    },
    [form, signIn, navigate]
  );


  if (!isUserLoaded) return null;

  return (
    <div className={`pt-30 pb-6 ${styles.login}`}>
      <p className="text text_type_main-medium pb-6">
        Вход
      </p>
      <form className={`${styles.login__form}`} onSubmit={login}>
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
        <Button htmlType="submit" type="primary" size="medium" disabled={userLoginRequest} >
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
