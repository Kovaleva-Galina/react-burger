import { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from "react-dnd";
import style from './filling.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientType } from '../../utils/types';

const Filling = ({ item, onDelete = () => {}, type = 'filling-item' , onDrop = () => {}, index }) => {
  const ref = useRef(null);
  const [, dragRef] = useDrag({
    type,
    item,
  });

  const [, dropRef] = useDrop({
    accept: type,
    drop(item) {
      onDrop(item, index);
    },
  });
  dragRef(dropRef(ref));

  return (
    <li
      className={`pb-4 ${style.content}`}
      ref={ref}
    >
    <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        _id={item._id}
        thumbnail={item.image}
        handleClose = {() => {onDelete(index)}}
      />
  </li>
  )
}

export default memo(Filling);

Filling.propTypes = {
  type: PropTypes.string,
  item: ingredientType,
  onDelete: PropTypes.func,
  onDrop: PropTypes.func,
  index: PropTypes.number,
}
