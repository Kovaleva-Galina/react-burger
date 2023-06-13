import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST
} from '../actions/ingredients';

export const ingredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const ingredientsReducer = (state = ingredientsInitialState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.payload, itemsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default:
      return state;
  }
}
