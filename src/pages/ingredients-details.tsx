import IngredientDetails from '../components/ingredient-details/ingredient-details'
import styles from './ingredients-details.module.css';
import useIngredientFromParams from '../hooks/use-ingredient-from-params';

export const IngredientDetailsPage = () => {

  const ingredient = useIngredientFromParams();

  return (
    <div className={`pt-30 ${styles.details}`}>
      <p className='text text_type_main-large'>Детали ингредиента</p>
      <IngredientDetails item={ingredient} />
    </div>
  );
}
