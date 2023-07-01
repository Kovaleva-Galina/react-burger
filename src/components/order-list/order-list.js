import { memo } from 'react';
import PropTypes from 'prop-types';
import styles from './order-list.module.css';
import { Link } from 'react-router-dom';
import CardOrder from '../card-order/card-order';
import { burgerType } from '../../utils/types';

const OrderList = ({ orderBurgers }) => {
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

OrderList.prototype = {
  orderBurgers: PropTypes.arrayOf(burgerType).isRequired
}

