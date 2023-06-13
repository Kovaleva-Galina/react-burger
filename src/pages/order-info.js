import { memo } from 'react';
import BurgerDetails from '../components/burger-details/burger-details';
import styles from './order-info.module.css';
import useBurgerFromParams from '../hooks/use-burger-from-params';

const OrderInfo = () => {

  const burger = useBurgerFromParams();

  return (
    !!burger &&
    <section className={`p-6 pt-30 ${styles.order_info} `}>
      <p className={`pb-7 text text_type_digits-default ${styles.order_info}`}>#{burger.number}</p>
      <BurgerDetails burger={burger} />
    </section>
  )
}

export default memo(OrderInfo);
