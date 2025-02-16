import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedRoute({ children }) {
  const { LoginToken } = useContext(UserContext);

  return LoginToken ? children : <Navigate to="/login" />;
}



