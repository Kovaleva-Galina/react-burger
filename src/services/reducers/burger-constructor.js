import {
  DELETE_SELECTED_FILLING,
  UPDATE_SELECTED_FILLINGS,
  UPDATE_SELECTED_BUNS,
  ADD_SELECTED_FILLING,
  DELETE_SELECTED_LIST
} from '../actions/burger-constructor'

export const burgerConstructorinitialState = {
  selectedFillings: [],
  selectedBuns: [],
}

export const burgerConstructorReducer = (state = burgerConstructorinitialState, action) => {
  switch (action.type) {
    case DELETE_SELECTED_FILLING: {
      return { ...state, selectedFillings: [...state.selectedFillings.slice(0, action.payload), ...state.selectedFillings.slice(action.payload + 1)]}
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
    case DELETE_SELECTED_LIST : {
      return { selectedFillings: [], selectedBuns: [] }
    }
    default:
      return state;
  }
}
