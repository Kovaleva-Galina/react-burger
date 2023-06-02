import { useAuth } from '../../services/auth';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

export const ProtectedRouteElement = ({ element }) => {
  let { getUser, ...auth } = useAuth();
  const [isUserLoaded, setUserLoaded] = useState(false);

  const init = async () => {
    await getUser().finally(() => {
      setUserLoaded(true);
    });
  }

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return auth.user ? element : <Navigate to="/login" replace/>;
}

ProtectedRouteElement.propTypes = {
  element: PropTypes.element,
}


