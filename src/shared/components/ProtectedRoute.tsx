import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';

type ProtectedRouteProps = {
  element: React.ReactElement;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthorized } = useAuth();
  const location = useLocation();

  if (!isAuthorized) {
    return <Navigate to="/auth" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
