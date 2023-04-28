import { useContext, useState, useMemo } from 'react';
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Context } from '../context/context';
import { calcKeys, calcSum } from './burger-constructor.utils';
import { fetchOrderNumber } from '../../utils/api';

const BurgerConstructor = () => {
  const posittions = useContext(Context);
  const bread = useMemo(() => posittions.find((el) => el.type === 'bun'), [posittions])

  const filling = useMemo(
    () =>
    posittions.filter((item) => {
      return item.type !== "bun" && item.type !== "top" && item.type !== "bottom"
      }),
    [posittions]
  );

  const sum = useMemo(() => {
    return calcSum(bread, filling);
  }, [bread, filling]);

  const keysNumbers = useMemo(() => {
    return calcKeys(bread, filling);
  }, [bread, filling]);

  const [orderNumber, setOrderNumber] = useState(null);

  const onCreateOrder = () => {
    return fetchOrderNumber(keysNumbers)
    .then((response) => {
      setOrderNumber(response.order.number);
    })
    .catch((error) => {
      console.log('Error: ', error)
    });
  };

  return (
    <section className={`p-5 mt-10 mb-8 ${style.burger_constructor}`}>
      {!!bread && (
        <div className={`pl-9 ${style.content__extrime}`}>
          <ConstructorElement
            isLocked={true}
            text={bread.name + " (верх)"}
            type="top"
            price={bread.price}
            thumbnail={bread.image}
            count={1}
          />
        </div>

      )}
      <ul className={style.list}>
        {filling.map(function (item) {
          return (
            <li key={item._id} className={`pb-4 ${style.content}`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
          )
        })}
      </ul>
      {!!bread && (
        <div className="pl-9 pb-6">
          <ConstructorElement
            isLocked={true}
            text={bread.name + " (низ)"}
            type="bottom"
            price={bread.price}
            thumbnail={bread.image}
            count={1}
          />
        </div>
      )}
      <div className={style.price} >
        <div className={style.sum}>
          <p className="text text_type_digits-medium">{sum}</p>
          <CurrencyIcon className={style.icon} />
        </div>
        <Button htmlType="button" onClick={onCreateOrder}>Оформить заказ</Button>

      </div>
      {!!orderNumber && <Modal onClose={() => setOrderNumber(null)} ><OrderDetails orderNumber={orderNumber}/></Modal>}
    </section>
  )
}

export default BurgerConstructor;
