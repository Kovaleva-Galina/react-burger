import { getCookie } from "../../utils/utils";
import { updateTokenRequest } from "../../utils/api";

export const socketMiddleware = (wsUrl, actions) => { // prefix 'ALL'/ 'ORDERS'
  return store => {
    let socket = null;

    return next => action => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsFinalize, onOpen, onError, wsGetListOrder, wsGetTotalNumber, wsGetTotalTodayNumber, onClose } = actions;

      if (type === wsFinalize && socket) {
        socket.close(1000, 'reason');
        socket = null;
      }

      if (type === wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${getCookie('access-token')}`);
      }
      if (socket) {
        // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = async event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { orders, total, totalToday, success, message } = parsedData || {};
          if (!success && message === 'Invalid or missing token') {
            await updateTokenRequest();
          }
          dispatch({ type: wsGetListOrder, payload: orders });
          dispatch({ type: wsGetTotalNumber, payload: total });
          dispatch({ type: wsGetTotalTodayNumber, payload: totalToday });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }
      next(action);
    };
  };
}
