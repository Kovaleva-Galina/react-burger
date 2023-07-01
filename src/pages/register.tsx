import { Input, PasswordInput, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useRef, useState, ChangeEvent, FormEvent } from "react";
import { useSelector } from '../services/types/hooks';
import styles from './register.module.css';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../services/types/auth';

export const RegisterPage = () => {
  const userRegisterRequest = useSelector((state) => state.userProfile?.userRegisterRequest);
  const { user, signUp, isLoaded } = useAuth();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  let register = useCallback(
    (e: FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      signUp(form).then((data) => {
        if (data) {
          navigate('/')
        }
      });
    },
    [user, form, signUp, navigate]
  );

  const onIconClick = () => {
    setTimeout(() => inputRef.current?.focus(), 0)
  }

  const onChange =(e: ChangeEvent<HTMLInputElement>) : void=> {
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));
  }

  if (!isLoaded) return null;

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
    <div className={`pt-30 pb-6 ${styles.register}`}>
      <p className="text text_type_main-medium pb-6">
        Регистрация
      </p>
      <form className={`${styles.register__form}`} onSubmit={register}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          icon={undefined}
          value={form.name}
          name={'name'}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <EmailInput
          onChange={onChange}
          value={form.email}
          name={'email'}
          isIcon={false}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={'password'}
          extraClass="mb-2"
        />
        <Button htmlType="submit" type="primary" size="medium" disabled={!form.email.length || !form.name.length || !form.password.length || userRegisterRequest}>
          Зарегистрироваться
        </Button>
      </form>
      <p className="pt-20 text text_type_main-default">
        Уже зарегистрированы?&#160;
        <Link to='/login' className={`${styles.register__link}`}>Войти</Link>
      </p>
    </div>
  )
}
