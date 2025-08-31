import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { clearToken } from "../utils/auth";

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(() => {
    dispatch(logout());
    clearToken();
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);
}
