import { TOrder } from "../types/data";
export const WS_CONNECTION_START_ALL = 'WS_CONNECTION_START_ALL';
export const WS_CONNECTION_SUCCESS_ALL = 'WS_CONNECTION_SUCCESS_ALL';
export const WS_CONNECTION_ERROR_ALL = 'WS_CONNECTION_ERROR_ALL';
export const WS_CONNECTION_CLOSED_ALL = 'WS_CONNECTION_CLOSED_ALL';
export const WS_GET_ORDER_LIST_ALL = 'WS_GET_ORDER_LIST_ALL';
export const WS_UPDATE_ORDER_LIST_ALL = 'WS_UPDATE_ORDER_LIST_ALL';
export const WS_UPDATE_TOTAL_NUMBER_ALL = 'WS_UPDATE_TOTAL_NUMBER_ALL';
export const WS_UPDATE_TOTAL_TODAY_NUMBER_ALL = 'WS_UPDATE_TOTAL_TODAY_NUMBER_ALL';
export const WS_CONNECTION_CLOSE_ALL = 'WS_CONNECTION_CLOSE_ALL';

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START_ALL;
}
export interface IWsConnectionAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_ALL;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR_ALL;
  readonly error: string | undefined
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED_ALL;
}
export interface IWsGetListOrderAction {
  readonly type: typeof WS_GET_ORDER_LIST_ALL;
  readonly orderList: TOrder[];
}
export interface IWsGetTotalNumberAction {
  readonly type: typeof WS_UPDATE_TOTAL_NUMBER_ALL;
  readonly total: number;
}
export interface IWsGetTotalTodayNumberAction {
  readonly type: typeof WS_UPDATE_TOTAL_TODAY_NUMBER_ALL;
  readonly totalToday: number;
}
export interface IWsUpdateListOrderAll {
  readonly type: typeof WS_UPDATE_ORDER_LIST_ALL;
  readonly orderList: TOrder[];
}
export interface IWsConnectionCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE_ALL;
}

export type TWsAllActions =
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
    type: WS_CONNECTION_START_ALL
  };
};
export const wsConnectionSuccess = (): IWsConnectionAction => {
  return {
    type: WS_CONNECTION_SUCCESS_ALL
  };
};

export const wsConnectionError = (error : string | undefined) : IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR_ALL,
    error
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction=> {
  return {
    type: WS_CONNECTION_CLOSED_ALL
  };
};

export const wsGetListOrder = (orderList : TOrder[]): IWsGetListOrderAction => {
  return {
    type: WS_GET_ORDER_LIST_ALL,
    orderList
  };
};
export const wsGetTotalNumber = (total: number) : IWsGetTotalNumberAction => {
  return {
    type: WS_UPDATE_TOTAL_NUMBER_ALL,
    total
  };
};
export const wsGetTotalTodayNumber = (totalToday: number): IWsGetTotalTodayNumberAction => {
  return {
    type: WS_UPDATE_TOTAL_TODAY_NUMBER_ALL,
    totalToday
  };
};
export const wsUpdateListOrderAll = (orderList: TOrder[]): IWsUpdateListOrderAll => {
  return {
    type: WS_UPDATE_ORDER_LIST_ALL,
    orderList
  };
};
export const wsConnectionClose = (): IWsConnectionCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE_ALL
  };
};
