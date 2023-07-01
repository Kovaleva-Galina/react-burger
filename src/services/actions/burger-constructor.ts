import { TIngredient } from '../types/data';
import {
  DELETE_SELECTED_FILLING,
  UPDATE_SELECTED_FILLINGS,
  UPDATE_SELECTED_BUNS,
  ADD_SELECTED_FILLING,
  DELETE_SELECTED_LIST,
} from '../constants';

export interface IDeleteSelectedFillings {
  readonly type: typeof DELETE_SELECTED_FILLING;
  readonly deleteIndex: number;
}

export interface IUpdateSelectedFillings {
  readonly type: typeof UPDATE_SELECTED_FILLINGS;
  readonly selectedFillings: TIngredient[];
}

export interface IUpdateSelectedBuns {
  readonly type: typeof UPDATE_SELECTED_BUNS;
  readonly selectedBun: TIngredient;
}

export interface IAddSelectedFillings {
  readonly type: typeof ADD_SELECTED_FILLING;
  readonly selectedFilling: TIngredient;
}

export interface IDeleteSelectedList {
  readonly type: typeof DELETE_SELECTED_LIST;
}

export type TBurgerConstructorsActions =
  | IDeleteSelectedFillings
| IUpdateSelectedFillings
| IUpdateSelectedBuns
| IAddSelectedFillings
| IDeleteSelectedList;

export const deleteSelectedFillings = (
  deleteIndex: number,
): IDeleteSelectedFillings => ({
  type: DELETE_SELECTED_FILLING,
  deleteIndex
});

export const updateSelectedFillings = (
  selectedFillings: TIngredient[]
): IUpdateSelectedFillings => ({
  type: UPDATE_SELECTED_FILLINGS,
  selectedFillings
});

export const updateSelectedBuns = (
  selectedBun: TIngredient
): IUpdateSelectedBuns => ({
  type: UPDATE_SELECTED_BUNS,
  selectedBun
});

export const addSelectedFillings = (
  selectedFilling: TIngredient
): IAddSelectedFillings => ({
  type: ADD_SELECTED_FILLING,
  selectedFilling
});

export const deleteSelectedList = (): IDeleteSelectedList => ({
  type: DELETE_SELECTED_LIST
});
