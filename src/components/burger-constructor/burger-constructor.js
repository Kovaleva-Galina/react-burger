import { useContext, useState } from 'react';
import style from './burger-constructor.module.css';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { Context } from '../context/context';

const calcKeys = (bread, filling) => {
  let keysNumbers = [];

  if (bread) {
    keysNumbers.push(bread._id);
  }

  filling.forEach((item) => {
    keysNumbers.push(item._id);
  })
  return keysNumbers;
}

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

const BurgerConstructor = () => {
  const posittions = useContext(Context);
  const bread = posittions.find((el) => el.type === 'bun');
  const filling = posittions.filter((item) => {
    return item.type !== "bun" && item.type !== "top" && item.type !== "bottom"
  });
  const sum = calcSum(bread, filling);
  const keysNumbers = calcKeys(bread, filling)
  const [modalActive, setModalActive] = useState(null);

  const [orderNumber, setOrderDetails] = useState(null);

  const generateOrderNumber = () => {
    return fetch('https://norma.nomoreparties.space/api/orders', {
      method: 'POST',
      body: JSON.stringify({
        ingredients: keysNumbers
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) 
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
  })
      .then((response) => {
        setOrderDetails(response.order.number);
      })
      .catch((error) => {
        console.log('Error: ', error)
      });
  };

  const onCreateOrder = () => {
    generateOrderNumber().then(() => {
      setModalActive(true);
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
      {!!modalActive && <Modal onClose={() => setModalActive(false)} ><OrderDetails orderNumber={orderNumber}/></Modal>}
    </section>
  )
}

export default BurgerConstructor;