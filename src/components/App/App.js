import React from 'react';// импорт библиотеки
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';

function App() {
  const [posittions, setComponents] = React.useState([]);

  React.useEffect(() => {
    fetch('https://norma.nomoreparties.space/api/ingredients')
    .then(res => {
      if (res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
      .then((post) => {
        setComponents(post.data);
      })
      .catch((error) => {
        console.log('Error: ', error)
      });
  }, []);



  return (
    <main className={`p-10 ${style.app}`} >
      <AppHeader className={style.app_header} />
      <div className={`p-10 ${style.app_menu}`}>
        <BurgerIngredients posittions={posittions} />
        <BurgerConstructor posittions={posittions} />
      </div>
    </main>
  );
}

export default App;
