import { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Filling from '../filling/filling';
import Modal from '../modal/modal';
import { calcKeys, calcSum } from './burger-constructor.utils';
import { deleteSelectedFilling, deleteOrder, updateOrder, updateSelectedFillings, updateSelectedBuns, addSelectedFilling } from '../../services/actions/ingredients';

const BurgerConstructor = () => {
  const refDropZone = useRef();
  const onDropHandlerBun =(item) => {
    dispatch(updateSelectedBuns(item));
  }

  const onDropHandlerFilling =(item) => {
    dispatch(addSelectedFilling(item));
  }

  const [, dropFillingsRef] = useDrop({
    accept: "filling",
    drop(item) {
        onDropHandlerFilling(item);
    },
  });

  const [, dropBunsRef] = useDrop({
    accept: "bun",
    drop(item) {
      onDropHandlerBun(item);
    },
  });

  dropBunsRef(dropFillingsRef(refDropZone));

  const selectedBuns = useSelector((state) => state.ingredients.selectedBuns);
  const selectedFillings = useSelector((state) => state.ingredients.selectedFillings);
  const orderNumber = useSelector((state) => state.ingredients.order?.number);
  const dispatch = useDispatch();

  const onDelete = (item) => {
    dispatch(deleteSelectedFilling(item._id));
  };

  const sum = useMemo(() => {
    return calcSum([...selectedBuns, ...selectedFillings]);
  }, [selectedBuns, selectedFillings]);

  const handleCloseModal = () => {
    dispatch(deleteOrder())
  }

  const onCreateOrder = () => {
    dispatch(updateOrder(calcKeys([...selectedBuns, ...selectedFillings])));
  };

  const onDropFilling = (dragItem, dropIndex) => {
    const newPositions = [...selectedFillings];
    const currentIndex = newPositions.indexOf(dragItem);
    newPositions.splice(currentIndex, 1);
    newPositions.splice(dropIndex, 0, dragItem);
    dispatch(updateSelectedFillings(newPositions));
  }

  return (
    <section className={`p-5 mt-10 mb-8 ${style.burger_constructor}`}>
      <ul  className={style.positions_list} ref={refDropZone}>
        {!!selectedBuns[0] && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`}>
            <ConstructorElement
              isLocked={true}
              text={selectedBuns[0].name + " (верх)"}
              type="top"
              price={selectedBuns[0].price}
              thumbnail={selectedBuns[0].image}
            />
        </li>
        )}
        {/* {!!selectedBuns[0] && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`} ref={dropBunTopRef}>
            <ConstructorElement
              isLocked={true}
              text={selectedBuns[0].name + " (верх)"}
              type="top"
              price={selectedBuns[0].price}
              thumbnail={selectedBuns[0].image}
            />
        </li>
        )} */}
        <ul className={`pt-4 ${style.list}`}>
          {selectedFillings.map((item, index) => (
            <Filling
              index={index}
              onDelete={onDelete}
              item={item}
              key={index}
              onDrop={onDropFilling}
            />
          ))}
        </ul>
        {!!selectedBuns[1] && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`}>
            <ConstructorElement
              isLocked={true}
              text={selectedBuns[1].name + " (низ)"}
              type="bottom"
              price={selectedBuns[1].price}
              thumbnail={selectedBuns[1].image}
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
