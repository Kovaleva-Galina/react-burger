import { memo } from 'react';
import PropTypes from 'prop-types';
import style from './ingredient.module.css';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Ingredient = ({ item, onClick = () => { } }) => {
  return (
    <li className={style.content} onClick={() => onClick(item)}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={item.image} alt={item.name} />
      <div className={style.price}>
        <p className="text text_type_digits-default pb-1 pt-1">{item.price}</p>
        <CurrencyIcon className={style.icon} />
      </div>
      <p className="text text_type_main-default">{item.name}</p>
    </li>
  )
}


export default memo(Ingredient);

Ingredient.propTypes = {
  item: PropTypes.shape({
    image: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  }),
  onClick: PropTypes.func,
}
