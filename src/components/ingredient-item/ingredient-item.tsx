import { FC, memo } from 'react';
import styles from './ingredient-item.module.css';
import { TIngredient } from '../../services/types/data';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TIngredientProps = {
  ingredient: TIngredient,
  count: number,
}

const IngredientItem: FC<TIngredientProps>= ({ ingredient, count}) => {
  return (
    <li className={`pr-6 ${styles.ingredient_item}`}>
      <div className={`${styles.ingredient_item__image_wrapper} `}>
        <img className={`${styles.ingredient_item__image} `} src={ingredient.image} alt={ingredient.name} />
      </div>
      <p className={`text text_type_main-small ${styles.ingredient_item__text} `}>{ingredient.name}</p>
         <div className={styles.ingredient_item__price}>
          <p className="text text_type_digits-default">{count}x{ingredient.price}</p>
          <CurrencyIcon type= 'primary'/>
       </div>
    </li>
  )
}

export default memo(IngredientItem);
