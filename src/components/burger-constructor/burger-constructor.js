import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Filling from '../filling/filling';
import Modal from '../modal/modal';
import { calcKeys, calcSum } from './burger-constructor.utils';
import { deleteSelectedIngredient, deleteOrder, updateOrder, changeListSelectedIngredient, changeBunInSelected, addOneIngredient } from '../../services/actions/ingredients';

const BurgerConstructor = () => {
  const onDropHandlerBun =(item) => {
    dispatch(changeBunInSelected(item));
  }

  const onDropHandlerFilling =(item) => {
    dispatch(addOneIngredient(item));
  }

  const [, dropBunTopRef] = useDrop({
    accept: "bun",
    drop(itemId) {
      onDropHandlerBun(itemId);
    },
  });

  const [, dropBunBottomRef] = useDrop({
    accept: "bun",
    drop(item) {
        onDropHandlerBun(item);
    },
  });

  const [, dropFillingsRef] = useDrop({
    accept: "ingredient",
    drop(item) {
        onDropHandlerFilling(item);
    },
  });

  const positions = useSelector((state) => state.ingredients.selected);
  const orderNumber = useSelector((state) => state.ingredients.order?.number);
  const dispatch = useDispatch();

  const onDelete = (item) => {
    dispatch(deleteSelectedIngredient(item._id));
  };

  const sum = useMemo(() => {
    return calcSum(positions);
  }, [positions]);

  const keysNumbers = useMemo(() => {
    return calcKeys(positions);
  }, [positions]);

  const handleCloseModal = () => {
    dispatch(deleteOrder())
  }

  const onCreateOrder = () => {
    dispatch(updateOrder(keysNumbers));
  };

  const onDropFilling = (dragItem, dropIndex) => {
    const newPositions = [...positions];
    const currentIndex = newPositions.indexOf(dragItem);
    newPositions.splice(currentIndex, 1);
    newPositions.splice(dropIndex, 0, dragItem);
    dispatch(changeListSelectedIngredient(newPositions));
  }

  const bun = useMemo(() => positions.find((item) => item.type === 'bun'), [positions]);
  const fillings = useMemo(() => positions.filter((item) => item.type !== 'bun'), [positions]);

  return (
    <section className={`p-5 mt-10 mb-8 ${style.burger_constructor}`}>
      <ul>
        {!!bun && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`} ref={dropBunTopRef}>
            <ConstructorElement
              isLocked={true}
              text={bun.name + " (верх)"}
              type="top"
              price={bun.price}
              thumbnail={bun.image}
            />
        </li>
        )}
        <ul className={`pt-4 ${style.list}`} ref={dropFillingsRef}>
          {fillings.map((item, index) => (
            <Filling
              index={index + 1}
              onDelete={onDelete}
              item={item}
              key={index}
              onDrop={onDropFilling}
            />
          ))}
        </ul>
        {!!bun && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`} ref={dropBunBottomRef}>
            <ConstructorElement
              isLocked={true}
              text={bun.name + " (низ)"}
              type="bottom"
              price={bun.price}
              thumbnail={bun.image}
            />
          </li>
        )}
      </ul>
      <div className={style.price} >
         <div className={style.sum}>
           <p className="text text_type_digits-medium">{sum}</p>
           <CurrencyIcon className={style.icon} />
         </div>
         <Button htmlType="button" onClick={onCreateOrder}>Оформить заказ</Button>
       </div>
       {!!orderNumber && <Modal onClose={handleCloseModal} ><OrderDetails orderNumber={orderNumber}/></Modal>}
    </section>
  )
}
export default BurgerConstructor;
