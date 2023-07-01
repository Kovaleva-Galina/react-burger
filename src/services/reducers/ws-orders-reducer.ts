import { TOrder } from '../types/data.js';
import {
  TWsOrdersActions,
  WS_CONNECTION_SUCCESS_ORDERS,
  WS_CONNECTION_ERROR_ORDERS,
  WS_CONNECTION_CLOSED_ORDERS,
  WS_GET_ORDER_LIST_ORDERS,
} from '../actions/ws-orders-actions';

export type TInitialStateOrders = {
  wsConnected: boolean,
  orderList: TOrder[] | [],
  error: string | undefined,
}

const initialStateOrders: TInitialStateOrders = {
  wsConnected: false,
  orderList: [],
  error: undefined,
};

export const wsOrdersReducer = (state = initialStateOrders, action: TWsOrdersActions): TInitialStateOrders => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_ORDERS:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR_ORDERS:
      return {
        ...state,
        error: action.error,
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
        orderList: action.orderList,
      };
    default:
      return state;
  }
};
