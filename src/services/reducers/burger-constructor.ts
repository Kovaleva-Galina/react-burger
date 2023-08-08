import { TIngredient } from '../types/data';
import { TBurgerConstructorsActions } from '../actions/burger-constructor';
import {
  DELETE_SELECTED_FILLING,
  UPDATE_SELECTED_FILLINGS,
  UPDATE_SELECTED_BUNS,
  ADD_SELECTED_FILLING,
  DELETE_SELECTED_LIST
} from '../constants';

export type TBurgerConstructorInitialState = {
  selectedFillings: TIngredient[];
  selectedBuns: TIngredient[],
}

export const burgerConstructorInitialState: TBurgerConstructorInitialState = {
  selectedFillings: [],
  selectedBuns: [],
}

export const burgerConstructorReducer = (state = burgerConstructorInitialState, action:TBurgerConstructorsActions): TBurgerConstructorInitialState => {
  switch (action.type) {
    case DELETE_SELECTED_FILLING: {
      return { ...state, selectedFillings: [...state.selectedFillings.slice(0, action.deleteIndex), ...state.selectedFillings.slice(action.deleteIndex + 1)] }
    }
    case UPDATE_SELECTED_FILLINGS: {
      return { ...state, selectedFillings: [...action.selectedFillings] }
    }
    case UPDATE_SELECTED_BUNS: {
      return { ...state, selectedBuns: [action.selectedBun, action.selectedBun] }
    }
    case ADD_SELECTED_FILLING: {
      return { ...state, selectedFillings: [...state.selectedFillings, action.selectedFilling] }
    }
    case DELETE_SELECTED_LIST: {
      return { selectedFillings: [], selectedBuns: [] }
    }
    default:
      return state;
  }
}
