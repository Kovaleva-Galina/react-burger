import { TIngredient } from '../types/data';
import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  GET_INGREDIENTS_REQUEST
} from '../constants';
import { TIngredientsActions } from '../actions/ingredients';

export type TIngredientsInitialState = {
  items: TIngredient[],
  itemsRequest: boolean,
  itemsFailed: boolean,
};

export const ingredientsInitialState: TIngredientsInitialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, itemsFailed: false, items: action.items, itemsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    default:
      return state;
  }
}
