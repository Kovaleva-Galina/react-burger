import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import style from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { updateIngredients } from '../../services/actions/ingredients';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateIngredients());
  });

  return (
    <div className={`p-10 ${style.app}`} >
      <AppHeader className={style.app_header} />
      <DndProvider backend={HTML5Backend}>
        <main className={`p-10 ${style.app_menu}`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </main>
      </DndProvider>
    </div>
  );
}

export default App;
