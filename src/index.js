import App from './components/app/app';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/reducers';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
