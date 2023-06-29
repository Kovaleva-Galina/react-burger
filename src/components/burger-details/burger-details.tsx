import { memo, FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-details.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { TOrder, TIngredientWithCount, TIngredientWithCountRequired } from '../../services/types/data';

type TBurgerProps = {
  burger: TOrder | null | undefined,
}

type TAcc = {
  [id: string]: TIngredientWithCount
}

const BurgerDetails: FC<TBurgerProps> = ({ burger }) => {

  const { items: ingredientList } = useSelector((state) => state.ingredients);
  if (!burger) return null;

  const ingredientsObj = burger.ingredients.reduce((acc: TAcc , id: string) => {
    if (acc[id]) {
      acc[id].count += 1;
    } else {
      acc[id]= {
        count: 1,
        ingredient: ingredientList.find(({ _id }) => _id === id),
      }
    }
    return acc;
  }, {} as TAcc);
  const ingredients = Object.values(ingredientsObj).filter(({ ingredient }) => !!ingredient) as TIngredientWithCountRequired[];

  const burgerPrice = ingredients.reduce((sum: number, {count, ingredient}: TIngredientWithCountRequired) => {
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
