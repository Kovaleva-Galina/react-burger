import {
  UPDATE_DETAILS_INGREDIENT,
  DELETE_DETAILS_INGREDIENT,
} from '../actions/detail-ingredient';

export const DetailsInitialState = {
  detailIngredient: null,
}

export const detailsIngredientReducer = (state = DetailsInitialState, action) => {
  switch (action.type) {
    case UPDATE_DETAILS_INGREDIENT: {
      return { ...state, detailIngredient: action.payload }
    }
    case DELETE_DETAILS_INGREDIENT: {
      return {...state, detailIngredient: null}
    }
    default:
      return state;
  }
}
