import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { useCallback } from "react";

export default function Courses() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
    clearToken();
    navigate("/login", { replace: true });
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Courses</h1>
      <p>Protected page (only visible when logged in).</p>
      <button onClick={onLogout}>Logout</button>
    </main>
  );
}
