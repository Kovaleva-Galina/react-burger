import {
  GET_ORDER_SUCCESS,
  GET_ORDER_REQUEST,
  GET_ORDER_FAILED,
  DELETE_ORDER,
} from '../actions/order';

export const orderInitialState = {
  orderNumber: null,
  orderNumberRequest: false,
  orderNumberFailed: false,
}

export const orderNumberReducer = (state = orderInitialState, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderNumberRequest: true,
        orderNumberFailed: false,
      };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, orderNumberFailed: false, orderNumberRequest: false, orderNumber: action.payload };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderNumberFailed: true, orderNumberRequest: false };
    }
    case DELETE_ORDER: {
      return { ...state, orderNumber: null }
    }
    default:
      return state;
  }
}
