// Components/ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../pages/AUTH/GlobalContext";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useGlobalContext();

  if (loading) return null; // or loader

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
