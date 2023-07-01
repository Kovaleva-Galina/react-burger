import { fetchIngredients } from "../../utils/api";

export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';

export const getIngredientsRequest = () => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsFailed = () => ({ type: GET_INGREDIENTS_FAILED });
export const getIngredientsSuccess = (payload) => ({ type: GET_INGREDIENTS_SUCCESS, payload });

export function updateIngredients() {
  return function (dispatch) {
    dispatch(getIngredientsRequest());
    return fetchIngredients()
      .then(json => {
        dispatch(getIngredientsSuccess(json.data));
      })
      .catch(() => {
        dispatch(getIngredientsFailed());
      })
  };
}
