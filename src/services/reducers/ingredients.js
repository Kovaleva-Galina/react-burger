import { ADD_INGREDIENTS,
  ADD_SELECTED_INGREDIENTS,
  ADD_ORDER,
  DELETE_SELECTED_INGREDIENT,
  DELETE_ORDER,
  DETAIL_INGREDIENT,
  DELETE_ONE_INGREDIENT,
  CHANGE_LIST_SELECTED_INGREDIENTS,
  CHANGE_BUN_IN_SELECTED,
  ADD_ONE_INGREDIENT
} from '../actions/ingredients';

export const initialState = {
  items: [],
  selected: [],
  order: null,
  oneIngredient: null,
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
    case ADD_SELECTED_INGREDIENTS: {
      return {...state, selected: [...action.payload]}
    }
    case DELETE_SELECTED_INGREDIENT: {
      return { ...state, selected: state.selected.filter(selected => selected._id !== action.id)};
    }
    case DETAIL_INGREDIENT: {
      return { ...state, oneIngredient: { ...action.payload } }
    }
    case DELETE_ONE_INGREDIENT: {
      return {...state, oneIngredient: null}
    }
    case CHANGE_LIST_SELECTED_INGREDIENTS: {
      return {...state, selected: [...action.payload]}
    }
    case CHANGE_BUN_IN_SELECTED : {
      return {...state, selected: [action.payload, ...state.selected.filter(selected => selected.type !== 'bun')]}
    }
    case ADD_ONE_INGREDIENT : {
      return {...state, selected: [...state.selected, action.payload]}
    }
    default:
      return state;
  }
}
