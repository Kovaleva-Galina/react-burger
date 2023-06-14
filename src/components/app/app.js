import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { ProvideAuth } from '../../redux/auth';
import Routing from '../routing/routing';
import { useDispatch } from 'react-redux';
import { updateIngredients } from '../../redux/actions/ingredients';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateIngredients());
  }, []);

  return (
    <ProvideAuth>
      <BrowserRouter className={`pt-10 ${styles.app}`} >
        <AppHeader className={styles.app_header} />
        <DndProvider backend={HTML5Backend}>
          <Routing />
        </DndProvider>
      </BrowserRouter>
    </ProvideAuth>
  );
}

export default App;
