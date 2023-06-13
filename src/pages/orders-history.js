import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './orders-history.module.css';
import OrderList from '../components/order-list/order-list';

const OrdersHistory = () => {
  const orderBurgers = useSelector((state) => state.orders?.orderList);

  if (orderBurgers) {
    return (
      <section className={`pt-10 ${styles.orders_history}`}>
        <Outlet />
        <OrderList orderBurgers={orderBurgers} />
      </section>
    )
  } return null
}

export default memo(OrdersHistory);
