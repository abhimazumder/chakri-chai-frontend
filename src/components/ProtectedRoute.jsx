/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({isAuthenticated, children}) => {
    if(!isAuthenticated){
        return (
            <Navigate to="/"/>
        )
    }
  return children ? children : <Outlet/>;
}

export default ProtectedRoute;