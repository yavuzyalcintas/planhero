import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../utilities/authProvider";

const ProtectedRoutes: React.FC = () => {
  const user = useAuth();

  console.log("ProtectedRoutes", user);

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
