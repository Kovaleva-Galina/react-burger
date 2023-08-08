import { TIngredient } from "../../services/types/data";

export const calcKeys = (positions:TIngredient[]) => {
  return positions.reduce((acc : string[], item: TIngredient) => {
    return [...acc, item._id]
  }, []);
}

export const calcSum = (positions: TIngredient[]) => {
  return positions.reduce((acc: number, item: TIngredient) => {
    return acc + item.price;
  }, 0);
}
