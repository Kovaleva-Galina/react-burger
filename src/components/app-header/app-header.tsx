import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo, BurgerIcon, ListIcon, ProfileIcon, } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

const AppHeader = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const resetHomePage = () => {
    if (pathname !== '/') {
      navigate('/');
    }
  }

  return (
    <header className={styles.app_header}>
      <div className={styles.items}>
        <Link to='/' className={`pt-4 pr-5 pb-4 pl-5 ${styles.item} ${pathname === '/' ? styles.item_type_current : ''}`}>
          <BurgerIcon type={pathname === '/' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-small">Конструктор</p>
        </Link>
        <Link to='/feed' className={`${styles.item} ${pathname === '/feed' ? styles.item_type_current : ''}`}>
          <ListIcon type={pathname === '/feed' ? 'primary' : 'secondary'} />
          <p className="text text_type_main-small">Лента заказов</p>
        </Link>
      </div>
      <div className={styles.logo} onClick={resetHomePage}>
        <Logo />
      </div>
      <Link to='/profile' className={`pt-4 pr-5 pb-4 pl-5 ${styles.profile} ${pathname === '/profile' ? styles.item_type_current : ''}`}>
        <ProfileIcon type={pathname === '/profile' ? 'primary' : 'secondary'} />
        <p className="text text_type_main-small">Личный кабинет</p>
      </Link>
    </header>
  )
}

export default AppHeader;
