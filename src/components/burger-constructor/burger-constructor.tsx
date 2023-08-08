import { useMemo, useRef } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks';
import { useDrop } from "react-dnd";
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Filling from '../filling/filling';
import Modal from '../modal/modal';
import { calcKeys, calcSum } from './burger-constructor.utils';
import { deleteOrder, updateOrder } from '../../services/actions/order';
import { deleteSelectedFillings, updateSelectedFillings, updateSelectedBuns, addSelectedFillings, deleteSelectedList } from '../../services/actions/burger-constructor';
import { useAuth } from '../../services/types/auth';
import { useNavigate } from 'react-router-dom';
import { TIngredient } from '../../services/types/data';

const BurgerConstructor = () => {

  const {user} = useAuth();
  const navigate = useNavigate();

  const refDropZone = useRef(null);
  const onDropHandlerBun = (item: TIngredient) => {
    dispatch(updateSelectedBuns(item));
  }

  const onDropHandlerFilling = (item: TIngredient) => {
    dispatch(addSelectedFillings(item));
  }

  const [, dropFillingsRef] = useDrop({
    accept: "filling",
    drop(item: TIngredient) {
      onDropHandlerFilling(item);
    },
  });

  const [, dropBunsRef] = useDrop({
    accept: "bun",
    drop(item:TIngredient) {
      onDropHandlerBun(item);
    },
  });

  dropBunsRef(dropFillingsRef(refDropZone));

  const selectedBuns = useSelector((state) => state.burgerConstructor.selectedBuns);
  const selectedFillings = useSelector((state) => state.burgerConstructor.selectedFillings);
  const orderNumber = useSelector((state) => state.orderNumber.orderNumber);
  const orderNumberRequest = useSelector((state) => state.orderNumber?.orderNumberRequest);

  const dispatch = useDispatch();

  const onDelete = (index: number) => {
    dispatch(deleteSelectedFillings(index));
  };

  const sum = useMemo(() => {
    return calcSum([...selectedBuns, ...selectedFillings]);
  }, [selectedBuns, selectedFillings]);

  const handleCloseModal = () => {
    dispatch(deleteSelectedList());
    dispatch(deleteOrder());
  }

  const onCreateOrder = () => {
    if (!user) {
      navigate('/login')
    }
    dispatch(updateOrder(calcKeys([selectedBuns[0], ...selectedFillings, selectedBuns[1]])));
  };

  const onDropFilling = (dragItem: TIngredient, dropIndex: number) => {
    const newPositions = [...selectedFillings];
    const currentIndex = newPositions.indexOf(dragItem);
    newPositions.splice(currentIndex, 1);
    newPositions.splice(dropIndex, 0, dragItem);
    dispatch(updateSelectedFillings(newPositions));
  }

  return (
    <section className={`p-5 mt-10 ${style.burger_constructor}`}>
      <ul className={style.positions_list} ref={refDropZone}>
        {!!selectedBuns[0] && (
          <li className={`pl-9 pb-4 ${style.content__extrime}`} >
            <ConstructorElement
              isLocked={true}
              text={selectedBuns[0].name + " (верх)"}
              type="top"
              price={selectedBuns[0].price}
              thumbnail={selectedBuns[0].image}
            />
          </li>
        )}
        <ul className={`pt-4 ${style.list}`}>
          {selectedFillings.map((item: TIngredient, index: number) => (
            <Filling
              index={index}
              onDelete={onDelete}
              item={item}
              onDrop={onDropFilling}
              key={index}
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
          <CurrencyIcon type="primary"/>
        </div>
        <Button htmlType="button" onClick={onCreateOrder} disabled={!selectedFillings.length || !selectedBuns.length || orderNumberRequest} >Оформить заказ</Button>
      </div>
      {!!orderNumber && <Modal onClose={handleCloseModal} header=''><OrderDetails orderNumber={orderNumber} /></Modal>}
    </section>
  )
}
export default BurgerConstructor;
