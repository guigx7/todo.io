import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export function ProtectedRoute() {
  const { token } = useContext(AuthContext);
  const jwt = token || localStorage.getItem("jwtToken");

  if (!jwt) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
