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


const Routing = () => {
  const location = useLocation();
  const { ingredientId } = location.state || {};
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        {!!ingredientId && <Route path='/ingredients/:id' element={<IngredientInModal />}/>}
      </Route>
      <Route path="/profile" element={<ProtectedRouteElement element={<Profile />}/>} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="*" element={<NotFound404/>}/>
      {!ingredientId && (
        <Route path="/ingredients/:id" element={<IngredientDetailsPage/>}/>
      )}
    </Routes>
  )
}

export default memo(Routing);
