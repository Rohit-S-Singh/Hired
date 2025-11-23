import React from "react";
import { useGlobalContext } from "./GlobalContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useGlobalContext();

  // Show spinner while loading token verification
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Redirect if not logged in
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // Render the protected page
  return children;
};

export default ProtectedRoute;
