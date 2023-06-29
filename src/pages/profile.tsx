import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useRef, ChangeEvent } from "react";
import { useSelector } from '../services/types/hooks';
import styles from './profile.module.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../services/types/auth';
import { setCookie } from '../utils/utils';
import { TForm } from '../services/types/data';
import { useDispatch } from '../services/types/hooks';
import { logoutUser } from '../services/actions/user-profile';

export const Profile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUpdateRequest = useSelector((state) => state.userProfile?.userUpdateRequest);
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState<TForm>({
    name: `${user?.email}`,
    email: `${user?.email}`,
    password: ''
  });
  const [current, setCurrent] = useState('profile');
  const {pathname} = useLocation();

  const [errorName, setErrorName] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const onIconClick = () => {
      setTimeout(() => inputRef.current?.focus(), 0)
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setForm((oldForm) => ({ ...oldForm, [e.target.name]: e.target.value }));
  }

  const onBlurName = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value) {
      setErrorName(false)
    } else {
      setErrorName(true)
    }
  }

  const onSubmit = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    updateUser({
      name: form?.name,
      email: form?.email,
      password: form?.password,
    });
  }

  const resetUpdate = (e: ChangeEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setForm({
      name: `${user?.email}`,
      email: `${user?.email}`,
      password: ''
    });
  }

  const onLogout = async () => {
    await dispatch(logoutUser());
    setCookie('access-token', '');
    setCookie('refresh-token', '');
    navigate('/login');
  }

  return (
    <div className={`pl-10 pr-10 ${styles.profile}`}>
      <div className={`pt-30 ${styles.profile__links}`}>
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
        <Button htmlType="button" type="primary" size="medium" className={`${styles.profile__link} ${current === 'exit' ? styles.link_type_current : ''}`} onClick={onLogout}>
          <p className='text text_type_main-medium'>Выход</p>
        </Button>
        <p className='pt-20 text text_type_main-default text_color_inactive'>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>

    {pathname === '/profile'
    ? (
      <form className={`pt-30 ${styles.profile__form}`} onSubmit={() => onSubmit}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={onChange}
          onBlur={() => onBlurName}
          icon={'EditIcon'}
          value={`${form.name}`}
          name={'name'}
          error={errorName}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'email'}
          placeholder={'email'}
          onChange={onChange}
          icon={'EditIcon'}
          value={`${form.email}`}
          name='email'
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={onChange}
          icon={'EditIcon'}
          value={`${form.password}` ||  ''}
          name='password'
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={'Ошибка'}
          size={'default'}
          extraClass="ml-1"
        />
        {!!user &&
          <div  className={`${styles.profile__buttons}`}>
            <Button htmlType="button" type="secondary" size="large" onClick={() => resetUpdate} disabled={ form.name === user.name && form.email === user.email}>
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium" disabled={ userUpdateRequest || (form.name === user.name && form.email === user.email)} >
              Сохранить
            </Button>
          </div>
        }
      </form>
    ) : (
      <Outlet/>
    )
  }
    </div>
  )
}
