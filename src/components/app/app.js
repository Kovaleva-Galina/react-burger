import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';

import { ProvideAuth } from '../../services/auth';

import { updateIngredients } from '../../services/actions/ingredients';
import Routing from '../routing/routing';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateIngredients());
  },[]);

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
