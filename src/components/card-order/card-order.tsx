import { memo, useMemo, FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useLocation } from 'react-router-dom';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './card-order.module.css';
import IngredientPreview from '../ingredient-preview/ingredient-preview';
import { TIngredient, TOrder } from '../../services/types/data';

type TCardOrderProps = {
  burger: TOrder,
}

const CardOrder:FC<TCardOrderProps> = ({ burger }) => {

  const { pathname } = useLocation();

  const ingredientList = useSelector((state) => state.ingredients.items);

  const ingredients = useMemo(() => {
    return burger.ingredients.map((id) => ingredientList.find(({ _id }) => _id === id)).filter((d) => !!d) as TIngredient[];
  }, [burger]);

  const burgerPrice = useMemo(() => ingredients.reduce((sum, ingredient) => sum + (ingredient?.price || 0), 0), [ingredients]);

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
    <li className={`p-6 ${styles.card_order} `} key={burger.number}>
      <div className={`pb-4 ${styles.card_order__ID} `}>
        <p className="text text_type_digits-default">#{burger.number}</p>
        <div className={`text text_type_digits-default ${styles.card_order__date} `}>
          <FormattedDate
            className='text text_type_main-default text_color_inactive'
            date={new Date(burger.createdAt)}
          />
          <p className="text text_type_main-default text_color_inactive">{timeZone()}</p>
        </div>
      </div>
      <p className="text text_type_main-medium">
        {burger.name}
      </p>
      {pathname === '/profile/orders'
        ? (
          <p className={`text text_type_main-small ${burger.status === 'done' ? styles.card_order__text : ''}`}>{translateStatus()}</p>
        ) : (
          null
        )
      }
      <div className={`${styles.card_order__about_burger} `}>
        <ul className={`pt-4 pl-10 ${styles.card_order__list_ingredients} `}>
          {ingredients.map((ingredient, index, ingredients) => (
            <IngredientPreview ingredient={ingredient} key={index} index={index} count={ingredients.length - 3} />
          ))}
        </ul>
        <div className={`pl-10 ${styles.card_order__price} `}>
          <p className="text text_type_digits-default">{burgerPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
  )
}

export default memo(CardOrder);
