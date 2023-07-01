import { useEffect, } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { ProvideAuth } from '../../services/types/auth';
import Routing from '../routing/routing';
import { useDispatch } from '../../services/types/hooks';
import { updateIngredients } from '../../services/actions/ingredients';


const App =  ()  => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateIngredients());
  }, []);

  return (
    <ProvideAuth>
      <BrowserRouter >
        <AppHeader />
        <DndProvider backend={HTML5Backend}>
          <Routing />
        </DndProvider>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
