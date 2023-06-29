import { useSelector } from "../services/types/hooks";
import { useParams } from 'react-router-dom';

const useIngredientFromParams = () => {
  const { id } = useParams();
  const { items: ingredientList } = useSelector((state) => state.ingredients);
  const ingredient = ingredientList.find(({ _id }) => _id === id);
  return ingredient;
}

export default (useIngredientFromParams);
