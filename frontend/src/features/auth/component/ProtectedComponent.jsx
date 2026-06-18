import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const ProtectedComponent = ({ children, role}) => {
  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.auth.loading);
  if (loading) {
    return <div>loading...</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default ProtectedComponent;
