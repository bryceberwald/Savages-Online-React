import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from './AuthProvider.js'

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();
    return(
        isLoggedIn ? <Outlet/> : <Navigate to="/auth"/>
    )
}

export default ProtectedRoute