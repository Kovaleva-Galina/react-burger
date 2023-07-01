import {
  WS_CONNECTION_CLOSED_ALL,
  WS_CONNECTION_SUCCESS_ALL,
  WS_CONNECTION_ERROR_ALL,
  WS_GET_ORDER_LIST_ALL,
  WS_UPDATE_TOTAL_NUMBER_ALL,
  WS_UPDATE_TOTAL_TODAY_NUMBER_ALL
} from '../actions/ws-all-actions'

const initialStateAll = {
  wsConnected: false,
  orderList: [],
  error: undefined,
  total: 0,
  totalToday: 0,
};

export const wsAllReducer = (state = initialStateAll, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_ALL:
      return {
        ...state,
        wsConnected: true
      };
    case WS_CONNECTION_ERROR_ALL:
      return {
        ...state,
        error: action.payload,
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
        orderList: action.payload,
      };
    case WS_UPDATE_TOTAL_NUMBER_ALL:
      return {
        ...state,
        total: action.payload,
      };
    case WS_UPDATE_TOTAL_TODAY_NUMBER_ALL:
      return {
        ...state,
        totalToday: action.payload,
      };
    default:
      return state;
  }
};
