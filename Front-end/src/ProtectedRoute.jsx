import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("username" && "email");
  if (!token) {
    return <Navigate to="/loginpage" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;