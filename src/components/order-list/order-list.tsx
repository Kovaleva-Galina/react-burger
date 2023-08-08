import { memo, FC } from 'react';
import styles from './order-list.module.css';
import { TOrder } from '../../services/types/data';
import { Link } from 'react-router-dom';
import CardOrder from '../card-order/card-order';

type TOrderListProps = {
  orderBurgers: TOrder[],
}

const OrderList: FC<TOrderListProps>= ({ orderBurgers }) => {
  return (
    <ul className={`pr-2 ${styles.order_list} `}>
      {orderBurgers.reverse().map((burger) => (
        <Link className={`${styles.order_list__link}`} to={`${burger._id}`} key={burger.number} state={{ Id: burger._id }} >
          <CardOrder
            burger={burger}
            key={burger.number}
          />
        </Link>
      ))}
    </ul>
  )
}

export default memo(OrderList);
