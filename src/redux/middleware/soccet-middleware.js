import { getCookie } from "../../utils/utils";

export const socketMiddleware = (wsUrl, prefix) => { // prefix 'ALL'/ 'ORDERS'
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch, getState } = store;
      const { type, payload } = action;

      if (type === `WS_CONNECTION_START_${prefix}`) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${getCookie('access-token')}`);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: `WS_CONNECTION_SUCCESS_${prefix}`, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: `WS_CONNECTION_ERROR_${prefix}`, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: `WS_GET_ORDER_LIST_${prefix}`, payload: JSON.parse(data).orders });
          dispatch({ type: `WS_UPDATE_TOTAL_NUMBER_${prefix}`, payload: JSON.parse(data).total });
          dispatch({ type: `WS_UPDATE_TOTAL_TODAY_NUMBER_${prefix}`, payload: JSON.parse(data).totalToday });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: `WS_CONNECTION_CLOSED_${prefix}`, payload: event });
        };
      }
      next(action);
    };
  };
}
