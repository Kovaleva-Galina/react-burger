export const WS_CONNECTION_START_ALL = 'WS_CONNECTION_START_ALL';
export const WS_CONNECTION_SUCCESS_ALL = 'WS_CONNECTION_SUCCESS_ALL';
export const WS_CONNECTION_ERROR_ALL = 'WS_CONNECTION_ERROR_ALL';
export const WS_CONNECTION_CLOSED_ALL = 'WS_CONNECTION_CLOSED_ALL';
export const WS_GET_ORDER_LIST_ALL = 'WS_GET_ORDER_LIST_ALL';
export const WS_UPDATE_ORDER_LIST_ALL = 'WS_UPDATE_ORDER_LIST_ALL';
export const WS_UPDATE_TOTAL_NUMBER_ALL = 'WS_UPDATE_TOTAL_NUMBER_ALL';
export const WS_UPDATE_TOTAL_TODAY_NUMBER_ALL = 'WS_UPDATE_TOTAL_TODAY_NUMBER_ALL';
export const WS_CONNECTION_CLOSE_ALL = 'WS_CONNECTION_CLOSE_ALL';

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START_ALL
  };
};
export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS_ALL
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR_ALL
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED_ALL
  };
};

export const wsGetListOrder = listOrder => {
  return {
    type: WS_GET_ORDER_LIST_ALL,
    payload: listOrder
  };
};
export const wsGetTotalNumber = total => {
  return {
    type: WS_UPDATE_TOTAL_NUMBER_ALL,
    payload: total
  };
};
export const wsGetTotalTodayNumber = totalNumber => {
  return {
    type: WS_UPDATE_TOTAL_TODAY_NUMBER_ALL,
    payload: totalNumber
  };
};
export const wsUpdateListOrderAll = listOrder => {
  return {
    type: WS_UPDATE_ORDER_LIST_ALL,
    payload: listOrder
  };
};
export const wsConnectionClose = () => {
  return {
    type: WS_CONNECTION_CLOSE_ALL
  };
};
