import { memo, useRef, FC } from 'react';
import { useDrag, useDrop } from "react-dnd";
import style from './filling.module.css';
import { DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types/data';

type TFillingProps = {
  item: TIngredient,
  onDelete?: (index: number) => void,
  type?: string,
  onDrop?: (item: TIngredient, index: number) => void,
  index: number,
}

const Filling: FC<TFillingProps> = ({ item, onDelete, type = 'filling-item' , onDrop, index}) => {

  const ref = useRef(null);

  const [, dragRef] = useDrag({
    type,
    item,
  });

  const [, dropRef] = useDrop({
    accept: type,
    drop(item: TIngredient) {
      onDrop?.(item, index);
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
        thumbnail={item.image}
        handleClose = {() => {onDelete?.(index)}}
      />
  </li>
  )
}

export default memo(Filling);
