import { Outlet } from 'react-router-dom';
import styles from './order-feed.module.css';
import OrdersStatistics from '../components/orders-statistics/orders-statistics';
import { useSelector } from 'react-redux';
import OrderList from '../components/order-list/order-list';

export function OrderFeedPage() {
  const orderBurgers = useSelector((state) => state.ordersAll?.orderList || null);
  let numbersReady = [];
  let numberProcessing = []

  orderBurgers.forEach((burger) => {
    if (burger.status === 'done') {
      return numbersReady = [...numbersReady, burger.number]
    }
    return numberProcessing = [...numberProcessing, burger.number]
  })

  return (
    <section className={`p-10 ${styles.order_feed}`}>
      <p className="pb-5 text text_type_main-large" >Лента заказов</p>
      <Outlet />
      <div className={`${styles.order_feed__info}`} >
        <OrderList orderBurgers={orderBurgers} />
        <OrdersStatistics numbersReady={numbersReady} numberProcessing={numberProcessing} />
      </div>
    </section>
  );
}
