import { fetchIngredients, fetchOrder } from "../../utils/api";

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
// export const ADD_SELECTED_INGREDIENTS = 'ADD_SELECTED_INGREDIENTS';
export const ADD_ORDER = 'ADD_ORDER_NUMBER';

export const DELETE_SELECTED_FILLING = 'DELETE_SELECTED_FILLING';
export const DELETE_ORDER = 'DELETE_ORDER';
export const UPDATE_DETAIL_INGREDIENT= 'UPDATE_DETAIL_INGREDIENT';
export const DELETE_DETAIL_INGREDIENT = 'DELETE_DETAIL_INGREDIENT';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const UPDATE_SELECTED_FILLINGS = 'UPDATE_SELECTED_FILLINGS';
export const UPDATE_SELECTED_BUNS = 'UPDATE_SELECTED_BUNS';
export const ADD_SELECTED_FILLING = 'ADD_SELECTED_FILLING';

export const addIngredients = (payload) => ({type:ADD_INGREDIENTS, payload});
// export const addSelectedIngredients = (payload) => ({type:ADD_SELECTED_INGREDIENTS, payload});
export const addOrder = (payload) => ({type:ADD_ORDER, payload});
export const deleteSelectedFilling = (id) => ({type:DELETE_SELECTED_FILLING, id});
export const deleteOrder =() => ({type:DELETE_ORDER});
export const updateDetailIngredient=(payload) => ({type:UPDATE_DETAIL_INGREDIENT, payload});
export const deleteDetailIngredient =() => ({type:DELETE_DETAIL_INGREDIENT});
export const updateSelectedFillings =(payload) => ({type: UPDATE_SELECTED_FILLINGS, payload});
export const updateSelectedBuns = (payload) => ({type: UPDATE_SELECTED_BUNS, payload});
export const addSelectedFilling =(payload) => ({type: ADD_SELECTED_FILLING, payload})

export const updateOrder = (keysNumbers) => {
  return function(dispatch)  {
    return fetchOrder(keysNumbers)
    .then(json => {
      dispatch(addOrder(json.order))
    })
    .catch((error) => {
      console.log('Error: ', error)
  })
  }
}

export const updateIngredients = () => {
  return function(dispatch)  {
    return fetchIngredients()
    .then(json => {
      dispatch(addIngredients(json.data));
    })
    .catch((error) => {
        console.log('Error: ', error)
    })
  }
}
