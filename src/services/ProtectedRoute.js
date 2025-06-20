// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userType = localStorage.getItem("UserType"); // Get user type from localStorage

  if (allowedRoles.includes(userType)) {
    return children; // Render the component if the user type is allowed
  } else {
    return <Navigate to="/" />; // Redirect to the login page if access is denied
  }
};

export default ProtectedRoute;
