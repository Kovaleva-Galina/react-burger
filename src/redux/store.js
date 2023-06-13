import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { rootReducer } from './reducers'
import { socketMiddleware } from './middleware/soccet-middleware'

const wsUrll = 'wss://norma.nomoreparties.space/orders/all';
const wsUrl2 = 'wss://norma.nomoreparties.space/orders';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrll, 'ALL'), socketMiddleware(wsUrl2, 'ORDERS'))));

