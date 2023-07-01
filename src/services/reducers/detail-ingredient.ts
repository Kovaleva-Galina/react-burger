import { TIngredient } from '../types/data';
import { TDetailIngredientActions } from '../actions/detail-ingredient';

import {
  UPDATE_DETAILS_INGREDIENT,
  DELETE_DETAILS_INGREDIENT,
} from '../constants';

export type TDetailsInitialState = {
  detailIngredient: TIngredient | null,
}

export const detailsInitialState: TDetailsInitialState = {
  detailIngredient: null,
}

export const detailsIngredientReducer = (state = detailsInitialState, action: TDetailIngredientActions): TDetailsInitialState => {
  switch (action.type) {
    case UPDATE_DETAILS_INGREDIENT: {
      return { ...state, detailIngredient: action.ingredient };
    }
    case DELETE_DETAILS_INGREDIENT: {
      return { ...state, detailIngredient: null };
    }
    default:
      return state;
  }
}
