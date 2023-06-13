import { useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

const useBurgerFromParams = () => {
  const { id } = useParams();
  const { pathname } = useLocation();

  const burgerListAll = useSelector((state) => state.ordersAll.orderList);
  const burgerListOrder = useSelector((state) => state.orders.orderList);

  if (pathname === `/profile/orders/${id}`) {
    return burgerListOrder.find(({_id}) => _id === id);
  } else if (pathname === `/feed/${id}`) {
    return burgerListAll.find(({_id}) => _id === id);
  } return null
}
export default (useBurgerFromParams);



