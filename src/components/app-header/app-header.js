import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  const [current, setCurrent] = React.useState('build')

  const togglePage = (newCurrent) => (e) => {
    e.stopPropagation();
    // Вызов функции для изменения состояния
    setCurrent(newCurrent);
  };

  return (
    <header className={styles.appheader}>
      <div className={styles.items}>
        <div className={`pt-4 pr-5 pb-4 pl-5 ${styles.item} ${current === 'build' ? styles.item_type_current : ''}`} onClick={togglePage('build')}>
          <BurgerIcon type={current === 'build' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-small">Конструктор</p>
        </div>
        <div className={`${styles.item} ${current === 'orders' ? styles.item_type_current : ''}`} onClick={togglePage('orders')}>
          <ListIcon type={current === 'orders' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-small">Лента заказов</p>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={`pt-4 pr-5 pb-4 pl-5 ${styles.profile} ${current === 'profile' ? styles.item_type_current : ''}`} onClick={togglePage('profile')}>
        <ProfileIcon type={current === 'profile' ? 'primary' : 'secondary'} />
        <p className="text text_type_main-small">Личный кабинет</p>
      </div>
    </header>
  )
}

export default AppHeader;
