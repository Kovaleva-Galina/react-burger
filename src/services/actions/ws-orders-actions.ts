import { TOrder } from "../types/data";
export const WS_CONNECTION_START_ORDERS = 'WS_CONNECTION_START_ORDERS';
export const WS_CONNECTION_SUCCESS_ORDERS = 'WS_CONNECTION_SUCCESS_ORDERS';
export const WS_CONNECTION_ERROR_ORDERS = 'WS_CONNECTION_ERROR_ORDERS';
export const WS_CONNECTION_CLOSED_ORDERS = 'WS_CONNECTION_CLOSED_ORDERS';
export const WS_GET_ORDER_LIST_ORDERS = 'WS_GET_ORDER_LIST_ORDERS';
export const WS_UPDATE_ORDER_LIST_ORDERS = 'WS_UPDATE_ORDER_LIST_ORDERS';
export const WS_UPDATE_TOTAL_NUMBER_ORDERS = 'WS_UPDATE_TOTAL_NUMBER_ORDERS';
export const WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS = 'WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS';
export const WS_CONNECTION_CLOSE_ORDERS = 'WS_CONNECTION_CLOSE_ORDERS';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START_ORDERS;
}
export interface IWsConnectionAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ORDERS;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_ORDERS;
  readonly error?: string
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ORDERS;
}
export interface IWsGetListOrderAction {
  readonly type: typeof WS_GET_ORDER_LIST_ORDERS;
  readonly orderList: TOrder[];
}
export interface IWsGetTotalNumberAction {
  readonly type: typeof WS_UPDATE_TOTAL_NUMBER_ORDERS;
  readonly total: number;
}
export interface IWsGetTotalTodayNumberAction {
  readonly type: typeof WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS;
  readonly totalToday: number;
}
export interface IWsUpdateListOrderAll {
  readonly type: typeof WS_UPDATE_ORDER_LIST_ORDERS;
  readonly orderList: TOrder[];
}
export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE_ORDERS;
}

export type TWsOrdersActions =
  | IWsConnectionStartAction
| IWsConnectionAction
| IWsConnectionErrorAction
| IWsConnectionClosedAction
| IWsGetListOrderAction
| IWsGetTotalNumberAction
| IWsGetTotalTodayNumberAction
| IWsUpdateListOrderAll
| IWsConnectionCloseAction;

export const wsConnectionStart = (): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START_ORDERS
  };
};

export const wsConnectionSuccess = (): IWsConnectionAction => {
  return {
    type: WS_CONNECTION_SUCCESS_ORDERS
  };
};

export const wsConnectionError = (error: string): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR_ORDERS,
    error: error
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED_ORDERS
  };
};

export const wsGetListOrder = (listOrder: TOrder[]): IWsGetListOrderAction => {
  return {
    type: WS_GET_ORDER_LIST_ORDERS,
    orderList: listOrder
  };
};
export const wsGetTotalNumber = (total: number): IWsGetTotalNumberAction => {
  return {
    type: WS_UPDATE_TOTAL_NUMBER_ORDERS,
    total: total
  };
};
export const wsGetTotalTodayNumberAll = (totalNumber : number) : IWsGetTotalTodayNumberAction => {
  return {
    type: WS_UPDATE_TOTAL_TODAY_NUMBER_ORDERS,
    totalToday: totalNumber
  };
};
export const wsUpdateListOrderAll = (listOrder: TOrder[]): IWsUpdateListOrderAll => {
  return {
    type: WS_UPDATE_ORDER_LIST_ORDERS,
    orderList: listOrder
  };
};
export const wsConnectionClose = () : IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE_ORDERS
  };
};
