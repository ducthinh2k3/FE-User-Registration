import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux"
import {getIsAuth} from "../../src/redux/selector"

const ProtectedRoute = () => {
  const isAuth = useSelector(getIsAuth)
  console.log(isAuth)
  if(isAuth){
    return <Outlet />
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;