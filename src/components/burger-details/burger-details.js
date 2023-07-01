import { memo } from 'react';
import { useSelector } from 'react-redux';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-details.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { burgerType } from '../../utils/types';

const BurgerDetails = ({ burger }) => {

  const ingredientList = useSelector((state) => state.ingredients.items);

  if (!burger) return null;

  const ingredientsObj = burger.ingredients.reduce((acc, id) => {
    if (acc[id]) {
      acc[id].count += 1;
    } else {
      acc[id] = {
        ingredient: ingredientList.find(({ _id }) => _id === id),
        count: 1,
      }
    }
    return acc;
  }, {});

  const ingredients = Object.values(ingredientsObj);

  const burgerPrice = ingredients.reduce((sum, {count, ingredient}) => {
    return sum + count * ingredient.price;
  }, 0);

  const timeZone = () => {
    if (new Date(burger.createdAt).getTimezoneOffset() < 0) {
      return "i-GMT+" + (new Date(burger.createdAt).getTimezoneOffset() / -60);
    } else {
      return "i-GMT-" + (new Date(burger.createdAt).getTimezoneOffset() / -60);
    }
  }

  const translateStatus = () => {
    if (burger.status === 'done') {
      return 'Выполнен'
    } else if (burger.status === 'created') {
      return 'Создан'
    } else {
      return 'Готовится'
    }
  }

  return (
    <div className={`pt-6`}>
      <p className="text text_type_main-medium">{burger.name}</p>
      <p className={`pb-2 text text_type_main-small ${burger.status === 'done' ? styles.burger_details__text : ''}`}>{translateStatus()}</p>
      <p className="pt-10 pb-2 text text_type_main-medium">Состав:</p>
      <ul className={` ${styles.burger_details__list_ingredients} `}>
        {ingredients.map(({ ingredient, count }, index) => (
          <IngredientItem ingredient={ingredient} key={index} count={count} />
        ))}
      </ul>
      <div className={`pt-10 ${styles.burger_details__about_burger} `}>
        <div className={`text text_type_digits-default ${styles.burger_details__date} `}>
          <FormattedDate
            className='text text_type_main-default text_color_inactive'
            date={new Date(burger.createdAt)}
          />
          <p className="text text_type_main-default text_color_inactive">{timeZone()}</p>
        </div>
        <div className={`pl-10 ${styles.burger_details__price} `}>
          <p className="text text_type_main-medium">{burgerPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default memo(BurgerDetails);

BurgerDetails.propTypes = {
  item: burgerType,
}
