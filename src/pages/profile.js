import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Outlet } from 'react-router-dom';
import { useState, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../redux/auth';

export const Profile = () => {

  const { pathname } = useLocation();

  const userUpdateRequest = useSelector((state) => state.userProfile?.userUpdateRequest);
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState(user);

  const [errorName, setErrorName] = useState(false);
  const inputRef = useRef(null);

  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0)
  }
  const onChange = e => {
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));
  }

  const onBlurName = e => {
    if (e.target.value) {
      setErrorName(false)
    } else {
      setErrorName(true)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    updateUser(form);
  }

  const resetUpdate = (e) => {
    e.preventDefault();
    setForm(user);
  }

  return (
    <div className={`pl-10 pr-10 ${styles.profile}`}>
      <div className={`pt-30 ${styles.profile__links}`}>
        <Link
          to='/profile'
          className={`${styles.profile__link} ${pathname === '/profile' ? styles.link_type_current : ''}`}
        >
          <p className='text text_type_main-medium'>Профиль</p>
        </Link>
        <Link
          to='/profile/orders'
          className={`${styles.profile__link} ${pathname === '/profile/orders' ? styles.link_type_current : ''}`}
        >
          <p className='text text_type_main-medium'>История заказов</p>
        </Link>
        <Link
          to='/exit'
          className={`${styles.profile__link} ${pathname === '/exit' ? styles.link_type_current : ''}`}
        >
          <p className='text text_type_main-medium'>Выход</p>
        </Link>
        <p className='pt-20 text text_type_main-default text_color_inactive'>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>
      {pathname === '/profile'
        ? (
          <form className={`pt-30 ${styles.profile__form}`} onSubmit={onSubmit}>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={onChange}
              onBlur={onBlurName}
              icon={'EditIcon'}
              value={form.name}
              name={'name'}
              error={errorName}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <EmailInput
              onChange={onChange}
              value={form.email}
              name="email"
              icon="EditIcon"
            />
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={onChange}
              icon={'EditIcon'}
              value={form.password || ''}
              name='password'
              error={false}
              ref={inputRef}
              onIconClick={onIconClick}
              errorText={'Ошибка'}
              size={'default'}
              extraClass="ml-1"
            />
            <div className={`${styles.profile__buttons}`}>
              <Button htmlType="button" type="secondary" size="large" onClick={resetUpdate} disabled={form.name === user.name && form.email === user.email && form.password === user.password}>
                Отмена
              </Button>
              <Button htmlType="submit" type="primary" size="medium" disabled={userUpdateRequest || (form.name === user.name && form.email === user.email && form.password === user.password)} >
                Сохранить
              </Button>
            </div>
          </form>
        ) : (
          <Outlet />
        )
      }
    </div>
  )
}
