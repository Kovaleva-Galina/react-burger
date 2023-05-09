import { fetchOrder } from "../../utils/api";

export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const DELETE_ORDER = 'DELETE_ORDER';

export const getOrderRequest = () => ({type:GET_ORDER_REQUEST});
export const getOrderFailed = () => ({type:GET_ORDER_FAILED});
export const getOrderSuccess = (payload) => ({type:GET_ORDER_SUCCESS, payload});
export const deleteOrder =() => ({type:DELETE_ORDER});

export const updateOrder = (keysNumbers) => {
  return function(dispatch)  {
    dispatch(getOrderRequest());
    return fetchOrder(keysNumbers)
    .then(json => {
      if (json && json.success) {
        dispatch(getOrderSuccess(json.order));
      } else {
        dispatch(getOrderFailed());
      }
    })
    .catch(() => {
      dispatch(getOrderFailed());
    })
  }
}
