import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userRole = localStorage.getItem("role"); // Ambil role dari localStorage
  const location = useLocation();

  // Periksa apakah route adalah route admin
  const isAdminRoute = location.pathname.startsWith("/admin");

  // Jika userRole bukan admin dan mencoba mengakses route admin
  if (isAdminRoute && userRole !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Jika lolos, render children
  return children;
};

export default ProtectedRoute;
