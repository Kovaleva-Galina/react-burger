import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import {  useDispatch } from 'react-redux';
import BurgerIngredients from '../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../components/burger-constructor/burger-constructor';
import { updateIngredients } from '../services/actions/ingredients';
import styles from './home.module.css'

export function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateIngredients());
  },[]);
  return (
    <main className={`p-10 ${styles.home_menu}`}>
      <Outlet/>
      <BurgerIngredients />
      <BurgerConstructor />
    </main>
  );
}
