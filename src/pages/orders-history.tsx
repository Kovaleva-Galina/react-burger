import { memo, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from '../services/types/hooks';
import styles from './orders-history.module.css';
import OrderList from '../components/order-list/order-list';
import { wsConnectionStart, wsConnectionClose } from '../services/actions/ws-orders-actions';

const OrdersHistory = () => {
  const dispatch = useDispatch();
  const orderBurgers = useSelector((state) => state.orders?.orderList);

  useEffect(() => {
    dispatch(wsConnectionStart())
    return () => {
      dispatch(wsConnectionClose())
    }
  }, []);


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
