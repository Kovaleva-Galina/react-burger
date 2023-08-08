import { TOrder } from '../types/data';
import {
  TWsAllActions,
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_SUCCESS_ALL,
  WS_CONNECTION_ERROR_ALL,
  WS_GET_ORDER_LIST_ALL,
  WS_UPDATE_TOTAL_NUMBER_ALL,
  WS_UPDATE_TOTAL_TODAY_NUMBER_ALL
} from '../actions/ws-all-actions'

export type TInitialStateAll = {
  wsConnected: boolean,
  orderList: TOrder[] | [],
  error: string | undefined,
  total: number,
  totalToday: number,
}

const initialStateAll: TInitialStateAll = {
  wsConnected: false,
  orderList: [],
  error: undefined,
  total: 0,
  totalToday: 0,
};

export const wsAllReducer = (state = initialStateAll, action: TWsAllActions) : TInitialStateAll => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_ALL:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR_ALL:
      return {
        ...state,
        error: action.error,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED_ALL:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };
    case WS_GET_ORDER_LIST_ALL:
      return {
        ...state,
        orderList: action.orderList,
      };
    case WS_UPDATE_TOTAL_NUMBER_ALL:
      return {
        ...state,
        total: action.total,
      };
    case WS_UPDATE_TOTAL_TODAY_NUMBER_ALL:
      return {
        ...state,
        totalToday: action.totalToday,
      };
    default:
      return state;
  }
};
