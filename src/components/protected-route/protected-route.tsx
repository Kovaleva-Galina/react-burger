import { ReactElement, FC } from 'react'
import { useAuth } from "../../services/types/auth";
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement: FC<{ element?: ReactElement | null }> = ({ element }) => {
  const location = useLocation();
  const { isLoaded, user } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (user) {
    return element || null;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} />;
}
