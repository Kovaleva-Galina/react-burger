import { memo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useDrag } from "react-dnd";
import style from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';

const Ingredient = ({ ingredient, onClick = () => { }, type }) => {
  const count = useSelector((state) => state.ingredients.selected).filter(item =>
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
        <CurrencyIcon className={style.icon} />
      </div>
      <p className="text text_type_main-default">{ingredient.name}</p>
    </li>
  )
}


export default memo(Ingredient);

Ingredient.propTypes = {
  type: PropTypes.string,
  item: ingredientType,
  onClick: PropTypes.func,
}
