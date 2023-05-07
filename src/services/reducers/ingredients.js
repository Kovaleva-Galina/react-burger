import { ADD_INGREDIENTS,
  // ADD_SELECTED_INGREDIENTS,
  ADD_ORDER,
  DELETE_SELECTED_FILLING,
  DELETE_ORDER,
  UPDATE_DETAIL_INGREDIENT,
  DELETE_DETAIL_INGREDIENT,
  UPDATE_SELECTED_FILLINGS,
  UPDATE_SELECTED_BUNS,
  ADD_SELECTED_FILLING
} from '../actions/ingredients';

export const initialState = {
  items: [],
  selectedFillings: [],
  selectedBuns: [],
  order: null,
  detailIngredient: null,
}

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER: {
      return {...state, order: { ...action.payload }}
    }
    case DELETE_ORDER: {
      return {...state, order: null}
    }
    case ADD_INGREDIENTS: {
      return {...state, items: [...action.payload]}
    }
    // case ADD_SELECTED_INGREDIENTS: {
    //   return {...state, selected: [...action.payload]}
    // }
    case DELETE_SELECTED_FILLING: {
      return { ...state, selectedFillings: state.selectedFillings.filter(selected => selected._id !== action.id)};
    }
    case UPDATE_DETAIL_INGREDIENT: {
      return { ...state, detailIngredient: { ...action.payload } }
    }
    case DELETE_DETAIL_INGREDIENT: {
      return {...state, detailIngredient: null}
    }
    case UPDATE_SELECTED_FILLINGS: {
      return {...state, selectedFillings: [...action.payload]}
    }
    case UPDATE_SELECTED_BUNS : {
      return {...state, selectedBuns: [action.payload, action.payload]}
    }
    case ADD_SELECTED_FILLING : {
      return {...state, selectedFillings: [...state.selectedFillings, action.payload]}
    }
    default:
      return state;
  }
}
