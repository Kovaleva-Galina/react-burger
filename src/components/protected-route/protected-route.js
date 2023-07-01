import { useAuth } from '../../redux/auth';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

export const ProtectedRouteElement = ({ element }) => {
  const location = useLocation();
  const { isUserLoaded, user } = useAuth();

  if (!isUserLoaded) {
    return null;
  }

  return user ? element : <Navigate to="/login" state={{ from: location.pathname }} />;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
}


