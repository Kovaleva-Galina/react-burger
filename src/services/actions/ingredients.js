import { fetchIngredients, fetchOrder } from "../../utils/api";

export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const ADD_SELECTED_INGREDIENTS = 'ADD_SELECTED_INGREDIENTS';
export const ADD_ORDER = 'ADD_ORDER_NUMBER';

export const DELETE_SELECTED_INGREDIENT = 'DELETE_SELECTED_INGREDIENT';
export const DELETE_ORDER = 'DELETE_ORDER';
export const DETAIL_INGREDIENT= 'DETAIL_INGREDIENT';
export const DELETE_ONE_INGREDIENT = 'DELETE_ONE_INGREDIENT';
export const ADD_SELECTED_INGREDIENT = 'ADD_SELECTED_INGREDIENT';
export const CHANGE_LIST_SELECTED_INGREDIENTS = 'CHANGE_LIST_SELECTED_INGREDIENTS';
export const CHANGE_BUN_IN_SELECTED = 'CHANGE_BUN_IN_SELECTED';
export const ADD_ONE_INGREDIENT = 'ADD_ONE_INGREDIENT';

export const addIngredients = (payload) => ({type:ADD_INGREDIENTS, payload});
export const addSelectedIngredients = (payload) => ({type:ADD_SELECTED_INGREDIENTS, payload});
export const addOrder = (payload) => ({type:ADD_ORDER, payload});
export const deleteSelectedIngredient = (id) => ({type:DELETE_SELECTED_INGREDIENT, id});
export const deleteOrder =() => ({type:DELETE_ORDER});
export const detailIngredient=(payload) => ({type:DETAIL_INGREDIENT, payload});
export const deleteOneIngredient =() => ({type:DELETE_ONE_INGREDIENT});
export const changeListSelectedIngredient =(payload) => ({type: CHANGE_LIST_SELECTED_INGREDIENTS, payload});
export const changeBunInSelected = (payload) => ({type: CHANGE_BUN_IN_SELECTED, payload});
export const addOneIngredient =(payload) => ({type: ADD_ONE_INGREDIENT, payload})

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
      dispatch(addSelectedIngredients(json.data.reduce((acc, item) => {
        if (!acc.find((elem) => elem.type === 'bun')) {
          return acc.concat(item);
        }if (item.type !== 'bun') {
          return acc.concat(item);
        }
        return acc;
      }, [])))
    })
    .catch((error) => {
        console.log('Error: ', error)
    })
  }
}
