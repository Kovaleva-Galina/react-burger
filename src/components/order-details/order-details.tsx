import { FC } from 'react';
import { ReactComponent as Graphics } from '../../images/graphics.svg';
import style from './order-details.module.css';

type TOrderDetailsProps = {
  orderNumber: number
}

const OrderDetails: FC<TOrderDetailsProps> = ({ orderNumber }) => {
  return (
    <div className={`mt-5 mb-15 pr-10 pl-10 ${style.order_content}`}>
      <div className={style.statistic}>
        <p className='text text_type_digits-large pb-8'>{orderNumber}</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
        <Graphics className={`mb-15 mt-15 ${style.order_image}`}/>
        <p className='text text_type_main-small pb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-small'>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default OrderDetails;
