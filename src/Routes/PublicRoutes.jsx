import React from "react";
import {  Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuthContext } from "../context/AuthContext";

 function PublicRoutes({ elemen }) {
  // const navigate = useNavigate();
  const {isAuthenticated}=useAuthContext();
  const token = Cookies.get("token");
  
  if (isAuthenticated) {
    return <Navigate to="/homePage" />;
  }else{
    return (
       <Outlet />
    );
  }
  
}
export default PublicRoutes;