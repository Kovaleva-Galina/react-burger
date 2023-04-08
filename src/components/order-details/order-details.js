import graphics from '../../images/graphics.svg';
import style from './order-details.module.css';

const OrderDetails = () => {
  return (
    <div className={`mt-5 mb-15 pr-10 pl-10 ${style.order_content}`}>
      <div className={style.statistic}>
        <p className='text text_type_digits-large pb-8'>034536</p>
        <p className='text text_type_main-medium'>идентификатор заказа</p>
        <img src={graphics} alt='Галочка' className={`mb-15 mt-15 ${style.order_image}`}></img>
        <p className='text text_type_main-small pb-2'>Ваш заказ начали готовить</p>
        <p className='text text_type_main-small'>Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  )
}

export default OrderDetails;
