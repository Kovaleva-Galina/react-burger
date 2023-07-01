import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import { rootReducer } from './reducers'
import { socketMiddleware } from './middleware/soccet-middleware'
import {
  WS_CONNECTION_CLOSE_ALL,
  WS_CONNECTION_START_ALL,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_SUCCESS_ALL,
  WS_CONNECTION_ERROR_ALL,
  WS_GET_ORDER_LIST_ALL,
  WS_UPDATE_TOTAL_NUMBER_ALL,
  WS_UPDATE_TOTAL_TODAY_NUMBER_ALL,

} from './actions/ws-all-actions';
import {
  WS_CONNECTION_START_ORDERS,
  WS_CONNECTION_CLOSE_ORDERS,
  WS_CONNECTION_SUCCESS_ORDERS,
  WS_CONNECTION_ERROR_ORDERS,
  WS_GET_ORDER_LIST_ORDERS,
  WS_UPDATE_TOTAL_NUMBER_ORDERS,
  WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS,
  WS_CONNECTION_CLOSED_ORDERS
} from './actions/ws-orders-actions';

const wsUrll = 'wss://norma.nomoreparties.space/orders/all';
const wsUrl2 = 'wss://norma.nomoreparties.space/orders';

const wsActionsAll = {
  wsFinalize: WS_CONNECTION_CLOSE_ALL,
  wsInit: WS_CONNECTION_START_ALL,
  onOpen: WS_CONNECTION_SUCCESS_ALL,
  onError: WS_CONNECTION_ERROR_ALL,
  wsGetListOrder: WS_GET_ORDER_LIST_ALL,
  wsGetTotalNumber: WS_UPDATE_TOTAL_NUMBER_ALL,
  wsGetTotalTodayNumber: WS_UPDATE_TOTAL_TODAY_NUMBER_ALL,
  onClose: WS_CONNECTION_CLOSED_ALL,
};

const wsActionsOrders = {
  wsFinalize: WS_CONNECTION_CLOSE_ORDERS,
  wsInit: WS_CONNECTION_START_ORDERS,
  onOpen: WS_CONNECTION_SUCCESS_ORDERS,
  onError: WS_CONNECTION_ERROR_ORDERS,
  wsGetListOrder: WS_GET_ORDER_LIST_ORDERS,
  wsGetTotalNumber: WS_UPDATE_TOTAL_NUMBER_ORDERS,
  wsGetTotalTodayNumber: WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS,
  onClose: WS_CONNECTION_CLOSED_ORDERS,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsUrll, wsActionsAll),
      socketMiddleware(wsUrl2, wsActionsOrders)
    )
  )
);

