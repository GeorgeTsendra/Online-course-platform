import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../utils/auth";

export default function PublicRoute() {
  const token = getToken();
  const location = useLocation();

  if (token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
