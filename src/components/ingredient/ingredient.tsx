import { memo, FC } from 'react';
import { useSelector } from '../../services/types/hooks';
import { useDrag } from "react-dnd";
import style from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/data';

type TIngredientProps = {
  ingredient: TIngredient,
  onClick: (ingredient : TIngredient) => void,
  type: string
}

const Ingredient: FC<TIngredientProps> = ({ ingredient, onClick, type }) => {
  const selected = useSelector((state) => {
    return type === 'bun'
      ? state.burgerConstructor.selectedBuns
      : state.burgerConstructor.selectedFillings;
  })
  const count = selected.filter(item =>
    item._id === ingredient._id
  )
  const [, dragRef] = useDrag({
    type,
    item: ingredient,
  });

  return (
    <li className={style.content} onClick={() => onClick(ingredient)} ref={dragRef}>
      {!!count.length &&<Counter count={count.length} size="default" extraClass="m-1" />}
      <img src={ingredient.image} alt={ingredient.name} />
      <div className={style.price}>
        <p className="text text_type_digits-default pb-1 pt-1">{ingredient.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}

export default memo(Ingredient);
