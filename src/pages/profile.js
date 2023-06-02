import { Input, EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef } from "react";
import styles from './profile.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/auth';

export const Profile = () => {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState(user);
  const [current, setCurrent] = useState('profile');

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
    <div className={`pt-30 pl-10 pr-10 ${styles.profile}`}>
      <div className={`${styles.profile__links}`}>
        <Link
          to='/profile'
          className={`${styles.profile__link} ${current === 'profile' ? styles.link_type_current : ''}`}
          onClick={() => setCurrent('profile')}
        >
          <p className='text text_type_main-medium'>Профиль</p>
        </Link>
        <Link
          to='/profile/orders'
          className={`${styles.profile__link} ${current === 'orders' ? styles.link_type_current : ''}`}
          onClick={() => setCurrent('orders')}
        >
          <p className='text text_type_main-medium'>История заказов</p>
        </Link>
        <Link
          to='/login'
          className={`${styles.profile__link} ${current === 'exit' ? styles.link_type_current : ''}`}
          onClick={() => setCurrent('exit')}
        >
          <p className='text text_type_main-medium'>Выход</p>
        </Link>
        <p className='pt-20 text text_type_main-default text_color_inactive'>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>
      <form className={`${styles.profile__form}`} onSubmit={onSubmit}>
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
          value={form.password ||  ''}
          name='password'
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <div  className={`${styles.profile__buttons}`}>
          <Button htmlType="button" type="secondary" size="large" onClick={resetUpdate}>
            Отмена
          </Button>
          <Button htmlType="submit" type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  )
}
