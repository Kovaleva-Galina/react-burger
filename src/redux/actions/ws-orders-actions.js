export const WS_CONNECTION_START_ORDERS = 'WS_CONNECTION_START_ORDERS';
export const WS_CONNECTION_SUCCESS_ORDERS = 'WS_CONNECTION_SUCCESS_ORDERS';
export const WS_CONNECTION_ERROR_ORDERS = 'WS_CONNECTION_ERROR_ORDERS';
export const WS_CONNECTION_CLOSED_ORDERS = 'WS_CONNECTION_CLOSED_ORDERS';
export const WS_GET_ORDER_LIST_ORDERS = 'WS_GET_ORDER_LIST_ORDERS';
export const WS_UPDATE_ORDER_LIST_ORDERS = 'WS_UPDATE_ORDER_LIST_ORDERS';
export const WS_UPDATE_TOTAL_NUMBER_ORDERS = 'WS_UPDATE_TOTAL_NUMBER_ORDERS';
export const WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS = 'WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS';
export const WS_CONNECTION_CLOSE_ORDERS = 'WS_CONNECTION_CLOSE_ORDERS';

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START_ORDERS
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS_ORDERS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR_ORDERS
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED_ORDERS
  };
};

export const wsGetListOrder = listOrder => {
  return {
    type: WS_GET_ORDER_LIST_ORDERS,
    payload: listOrder
  };
};
export const wsGetTotalNumber = total => {
  return {
    type: WS_UPDATE_TOTAL_NUMBER_ORDERS,
    payload: total
  };
};
export const wsGetTotalTodayNumberAll = totalNumber => {
  return {
    type: WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS,
    payload: totalNumber
  };
};
export const wsUpdateListOrderAll = listOrder => {
  return {
    type: WS_UPDATE_ORDER_LIST_ORDERS,
    payload: listOrder
  };
};
export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSE_ORDERS
  };
};
