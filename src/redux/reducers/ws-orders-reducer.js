import {
  WS_CONNECTION_SUCCESS_ORDERS,
  WS_CONNECTION_ERROR_ORDERS,
  WS_CONNECTION_CLOSED_ORDERS,
  WS_GET_ORDER_LIST_ORDERS,
} from '../actions/ws-orders-actions.js';

const initialStateOrders = {
  wsConnected: false,
  orderList: [],
  error: undefined,
};

export const wsOrdersReducer = (state = initialStateOrders, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_ORDERS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR_ORDERS:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED_ORDERS:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_ORDER_LIST_ORDERS:
      return {
        ...state,
        orderList: action.payload,
      };
    default:
      return state;
  }
};
