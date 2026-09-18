import { Navigate, Outlet } from "react-router-dom";
import { haySesionActiva } from "./auth";

export default function ProtectedRoute() {
  if (!haySesionActiva()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}