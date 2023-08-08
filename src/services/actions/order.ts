import { fetchOrder } from "../../utils/api";
import { GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_REQUEST, DELETE_ORDER } from "../constants";
import { AppDispatch, AppThunk } from "../types";


export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly orderNumber: number;
}

export interface IDeleteOrderAction {
  readonly type: typeof DELETE_ORDER;
}

export type TOrderActions =
  | IGetOrderRequestAction
  | IGetOrderFailedAction
  | IGetOrderSuccessAction
  | IDeleteOrderAction;

export const getOrderRequest = (): IGetOrderRequestAction => ({ type: GET_ORDER_REQUEST });
export const getOrderFailed = (): IGetOrderFailedAction => ({ type: GET_ORDER_FAILED });
export const getOrderSuccess = (orderNumber: number): IGetOrderSuccessAction => ({ type: GET_ORDER_SUCCESS, orderNumber });
export const deleteOrder = (): IDeleteOrderAction => ({ type: DELETE_ORDER });

export const updateOrder: AppThunk = (keysNumbers: string[]) => {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderRequest());
    return fetchOrder(keysNumbers)
      .then(json => {
        if (json && json.success) {
          dispatch(getOrderSuccess(json.order.number));
        } else {
          dispatch(getOrderFailed());
        }
      })
      .catch(() => {
        dispatch(getOrderFailed());
      })
  }
}


