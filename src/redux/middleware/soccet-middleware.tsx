import { Middleware } from 'redux';
import { getCookie } from "../../utils/utils";
import { updateTokenRequest } from "../../utils/api";
import { RootState } from '../../services/types';

type TActions = {
  wsFinalize: string,
  wsInit: string,
  onOpen: string,
  onError: string,
  wsGetListOrder: string,
  wsGetTotalNumber: string,
  wsGetTotalTodayNumber: string,
  onClose: string,
};

export const socketMiddleware = (wsUrl: string, actions: TActions): Middleware<
  {},
  RootState
> => {
   // prefix 'ALL'/ 'ORDERS'
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
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
        socket.onopen = (event) => {
          dispatch({ type: onOpen, wsConnected: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event) => {
          dispatch({ type: onError, error: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = async (event: MessageEvent) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { orders, total, totalToday, success, message } = parsedData || {};
          if (!success && message === 'Invalid or missing token') {
            await updateTokenRequest();
          }
          dispatch({ type: wsGetListOrder, orderList: orders });
          dispatch({ type: wsGetTotalNumber, total: total });
          dispatch({ type: wsGetTotalTodayNumber, totalToday: totalToday });
        };

        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event) => {
          dispatch({ type: onClose, wsConnected: event });
        };
      }
      next(action);
    };
  };
}
