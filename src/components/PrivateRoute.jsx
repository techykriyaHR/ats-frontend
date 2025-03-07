import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ element }) => {
  const token = Cookies.get("token");
  console.log("Token:", token); // Debugging log

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Current time in seconds
      if (decodedToken.exp < currentTime) {
        console.log("Token expired"); // Debugging log
        return <Navigate to="/login" />;
      }
      return element;
    } catch (error) {
      console.error("Invalid token:", error); // Debugging log
      return <Navigate to="/login" />;
    }
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;