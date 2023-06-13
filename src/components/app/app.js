import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter } from 'react-router-dom';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { ProvideAuth } from '../../redux/auth';
import Routing from '../routing/routing';
import { useDispatch } from 'react-redux';
import { WS_CONNECTION_START_ALL } from '../../redux/actions/ws-all-actions';
import { updateIngredients } from '../../redux/actions/ingredients';
import { WS_CONNECTION_START_ORDERS } from '../../redux/actions/ws-orders-actions';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START_ALL });
    dispatch({ type: WS_CONNECTION_START_ORDERS });
  }, []);

  useEffect(() => {
    dispatch(updateIngredients());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
