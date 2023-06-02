import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../services/reducers';
import styles from './app.module.css';
import AppHeader from '../app-header/app-header';
import { ProvideAuth } from '../../services/auth';
import Routing from '../routing/routing';

function App() {
  return (
    <Provider store={store}>
      <ProvideAuth>
        <BrowserRouter className={`pt-10 ${styles.app}`} >
          <AppHeader className={styles.app_header} />
          <DndProvider backend={HTML5Backend}>
            <Routing />
          </DndProvider>
        </BrowserRouter>
      </ProvideAuth>
    </Provider>
  );
}

export default App;
