import { Routes, Route, useLocation } from 'react-router-dom';
import { memo } from "react";
import { Profile } from '../../pages/profile';
import { HomePage } from '../../pages/home';
import { RegisterPage } from '../../pages/register';
import { ResetPasswordPage } from '../../pages/reset-password';
import { LoginPage } from '../../pages/login';
import { IngredientDetailsPage } from '../../pages/ingredients-details';
import { ForgotPasswordPage } from '../../pages/forgot-password';
import { ProtectedRouteElement } from '../protected-route/protected-route';
import { NotFound404 } from '../../pages/not-found';
import IngredientInModal from '../ingredient-in-modal/ingredient-in-modal';
import BurgerInModal from '../burger-in-modal/burger-in-modal';
import { OrderFeedPage } from '../../pages/order-feed';
import OrdersHistory from '../../pages/orders-history';
import OrderInfo from '../../pages/order-info';

const Routing = () => {
  const location = useLocation();
  const { Id } = location.state || {};

  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        {!!Id && <Route path='/ingredients/:id' element={<IngredientInModal/>}/>}
      </Route>
      <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} >
        <Route path="/profile/orders" element={<ProtectedRouteElement element={<OrdersHistory />}/>} >
          {!!Id && <Route path="/profile/orders/:id" element={<ProtectedRouteElement element={<BurgerInModal/>}/>}/>}
        </Route>
      </Route>

      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/feed" element={<OrderFeedPage />} >
        {!!Id && <Route path="/feed/:id" element={<BurgerInModal/>}/>}
      </Route>
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFound404/>}/>
      {!Id && (
        <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
      )}
      {!Id && (
      <Route path="/feed/:id" element={<OrderInfo/>}/>
      )}
      {!Id && (
      <Route path="/profile/orders/:id"  element={<ProtectedRouteElement element={<OrderInfo/>}/>}/>
      )}
    </Routes>
  )
}

export default memo(Routing);






