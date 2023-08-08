import { useSelector, useDispatch } from '../services/types/hooks';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { wsConnectionStart as wsStartAll, wsConnectionClose as wsCloseAll } from '../services/actions/ws-all-actions';
import { wsConnectionStart as wsStartOrder, wsConnectionClose as wsCloseOrder } from '../services/actions/ws-orders-actions';

const useBurgerFromParams = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(wsStartAll());
    dispatch(wsStartOrder());
    return () => {
      dispatch(wsCloseAll());
      dispatch(wsCloseOrder());
    }
  }, []);

  const { id } = useParams();
  const { pathname } = useLocation();

  const burgerListAll = useSelector((state) => state.ordersAll.orderList);
  const burgerListOrder = useSelector((state) => state.orders.orderList);

  if (pathname === `/profile/orders/${id}`) {
    return burgerListOrder.find(({ _id }) => _id === id);
  } else if (pathname === `/feed/${id}`) {
    return burgerListAll.find(({ _id }) => _id === id);
  } return null
}
export default (useBurgerFromParams);



