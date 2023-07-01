import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useIngredientFromParams = () => {
  const { id } = useParams();
  const ingredientList = useSelector((state) => state.ingredients.items);
  const ingredient = ingredientList.find(({ _id }) => _id === id);
  return ingredient;
}

export default (useIngredientFromParams);
