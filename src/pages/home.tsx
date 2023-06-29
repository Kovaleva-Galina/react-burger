import { Outlet } from 'react-router-dom';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import styles from './home.module.css'

export function HomePage() {

  return (
    <main className={`p-10 ${styles.home_menu}`}>
      <Outlet/>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}
