import React from 'react';
import PropTypes from 'prop-types';
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { ingredientType } from '../../utils/types';

const calcSum = (bread, filling) => {
  let sum = 0;

  if (bread) {
    sum = bread.price * 2;
  }

  filling.forEach((item) => {
    sum += item.price;
  })
  return sum;
}

const BurgerConstructor = ({ posittions }) => {
  const bread = posittions.find((el) => el.type === 'bun');
  const filling = posittions.filter((item) => {
    return item.type !== "bun" && item.type !== "top" && item.type !== "bottom"
  });
  const sum = calcSum(bread, filling);

  const [modalActive, setModalActive] = React.useState(null);
  return (
    <section className={`p-5 mt-10 mb-8 ${style.burger_constructor}`}>
      {!!bread && (
        <div className="pl-9">
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
            <li className={`pb-4 ${style.content}`} key={item._id}>
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
        <Button htmlType="button" onClick={() => setModalActive(true)}>Оформить заказ</Button>

      </div>
      {!!modalActive && <Modal onClose={() => setModalActive(false)}><OrderDetails /></Modal>}
    </section>
  )
}

export default BurgerConstructor;

BurgerConstructor.propTypes = {
  posittions: PropTypes.arrayOf(
    ingredientType,
  )
}
