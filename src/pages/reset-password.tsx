import { PasswordInput, Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useCallback, useRef, useState, ChangeEvent, FormEvent } from "react";
import styles from './reset-password.module.css';
import { useSelector } from '../services/types/hooks';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../services/types/auth';

export const ResetPasswordPage = () => {
  const { user, isLoaded } = useAuth();
  const auth = useAuth();
  const [form, setForm] = useState({ password: "", token: '', name: '', email: ''  });
  const passwordChangeUserRequest = useSelector((state) => state.userProfile?.passwordChangeUserRequest);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = (e: ChangeEvent<HTMLInputElement>) => {
    setTimeout(() => inputRef.current?.focus(), 0)
    alert('Icon Click Callback')
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));
  }

  const passwordReset = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      auth.changePassword(form).then((data) => {
        if (data) {
          navigate('/login')
        }
      });
    },
    [auth, form, navigate]
  );

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
    <div className={`pt-30 pb-6 ${styles.reset_password}`}>
      <p className="text text_type_main-medium pb-6">
        Восстановление пароля
      </p>
      <form className={`${styles.reset_password__form}`} onSubmit={passwordReset}>
        <PasswordInput
          value={form.password || ''}
          name={'password'}
          extraClass="mb-2"
          placeholder={'Введите новый пароль'}
          onChange={onChange}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={onChange}
          icon={undefined}
          value={form.token || ''}
          name={'token'}
          error={false}
          ref={inputRef}
          onIconClick={() => onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          disabled={passwordChangeUserRequest}
        >
          Сохранить
        </Button>
      </form>
      <p className="pt-20 text text_type_main-default">
        Вспомнили пароль?&#160;
        <Link to='/login' className={`${styles.reset_password__link}`}>Войти</Link>
      </p>
    </div>
  )
}
