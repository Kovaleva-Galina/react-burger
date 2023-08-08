import { UPDATE_DETAILS_INGREDIENT, DELETE_DETAILS_INGREDIENT } from "../constants";
import { TIngredient } from "../types/data";

export interface IUpdateDetailsIngredient {
  readonly type: typeof UPDATE_DETAILS_INGREDIENT;
  readonly ingredient: TIngredient | null;
}

export interface IDeleteDetailsIngredient {
  readonly type: typeof DELETE_DETAILS_INGREDIENT;
}

export type TDetailIngredientActions =
  | IUpdateDetailsIngredient
| IDeleteDetailsIngredient;

export const updateDetailsIngredient = (
  ingredient: TIngredient
): IUpdateDetailsIngredient => ({
  type: UPDATE_DETAILS_INGREDIENT,
  ingredient
});

export const deleteDetailsIngredient = (): IDeleteDetailsIngredient => ({
  type: DELETE_DETAILS_INGREDIENT
});
