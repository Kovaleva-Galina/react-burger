import { fetchIngredients } from "../../utils/api";
import { TIngredient } from "../types/data";
import { AppDispatch, AppThunk } from '../types'
import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS } from "../constants";

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly items: TIngredient[];
}

export type TIngredientsActions =
  | IGetIngredientsRequestAction
| IGetIngredientsFailedAction
| IGetIngredientsSuccessAction;

export const getIngredientsRequest = (): IGetIngredientsRequestAction => ({ type: GET_INGREDIENTS_REQUEST });
export const getIngredientsFailed = (): IGetIngredientsFailedAction => ({ type: GET_INGREDIENTS_FAILED });
export const getIngredientsSuccess = (items: TIngredient[]) : IGetIngredientsSuccessAction => ({ type: GET_INGREDIENTS_SUCCESS, items });

export const updateIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
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
