import React from 'react';// импорт библиотеки
import style from './App.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [posittions, setComponents] = React.useState([]);

  React.useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
      .then((post) => {
        setComponents(post.data);
      })
      .catch((error) => {
        console.log('Error: ', error)
      });
  }, []);



  return (
    <div className={`p-10 ${style.App}`} >
      <AppHeader className={style.Appheader} />
      <div className={`p-10 ${style.Appmenu}`}>
        <BurgerIngredients posittions={posittions} />
        <BurgerConstructor posittions={posittions} />
      </div>
    </div>
  );
}

export default App;
