import { React, useState, useEffect} from 'react';// импорт библиотеки
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { Context } from '../context/context';
import { fetchIngredients } from '../../utils/api';

function App() {
  const [posittions, setComponents] = useState([]);

  useEffect(() => {
      fetchIngredients()
      .then((post) => {
        setComponents(post.data);
      })
      .catch((error) => {
        console.log('Error: ', error)
      });
  }, []);


  return (
    <Context.Provider value={posittions} className={`p-10 ${style.app}`} >
        <AppHeader className={style.app_header} />
        <main className={`p-10 ${style.app_menu}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
    </Context.Provider>
  );
}

export default App;
