import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ permission, children }) {
  const user = useSelector(state => state.userReducer.user);
 
  if (!user || !user.permissions || !user.permissions.includes(permission)) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
