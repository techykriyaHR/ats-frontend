import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

const PrivateRoute = ({ element }) => {
  return isTokenValid() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;