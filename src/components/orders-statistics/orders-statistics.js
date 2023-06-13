import { memo } from 'react';
import { useSelector } from 'react-redux';
import styles from './order-statistics.module.css';
import PropTypes from 'prop-types';

const OrdersStatistics = ({ numbersReady, numberProcessing }) => {

  const totalNumber = useSelector((state) => state.ordersAll?.total);
  const totalTodayNumber = useSelector((state) => state.ordersAll?.totalToday);

  return (
    <section className={`${styles.order_statistics} `}>
      <div className={`${styles.order_statistics__statuses} `}>
        <div className={`${styles.order_statistics__status}`}>
          <p className="text text_type_main-medium pb-6">Готовы:</p>
          <ul className={`${styles.order_statistics__list}`}>
            {numbersReady.map((number) => (
              <li className={`${styles.order_statistics__ready}`} key={number}>
                <p className="text text_type_main-medium">{number}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={`pr-2 ${styles.order_statistics__status} `}>
          <p className="text text_type_main-medium pb-6">В работе:</p>
          <ul className={`${styles.order_statistics__list}`}>
            {numberProcessing.map((number) => (
              <li className={`${styles.order_statistics__processing}`} key={number}>
                <p className="text text_type_main-medium">{number}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="pt-15 text text_type_main-medium">Выполнено за все время:</p>
      <p className="text text_type_digits-large">{totalNumber}</p>
      <p className="pt-15 text text_type_main-medium">Выполнено за сегодня:</p>
      <p className="text text_type_digits-large">{totalTodayNumber}</p>
    </section>
  )
}

export default memo(OrdersStatistics);

OrdersStatistics.propTypes = {
  numbersReady: PropTypes.arrayOf(PropTypes.number),
  numberProcessing: PropTypes.arrayOf(PropTypes.number),
}
