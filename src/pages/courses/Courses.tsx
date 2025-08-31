import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { useCallback, useEffect } from "react";
import {
  fetchCourses,
  fetchPurchased,
} from "../../redux/actions/coursesActions";

export default function Courses() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logout());
    clearToken();
    navigate("/login", { replace: true });
  }, []);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchPurchased());
  }, [dispatch]);

  return (
    <main style={{ padding: 24 }}>
      <h1>Courses</h1>
      <p>Protected page (only visible when logged in).</p>
      <button onClick={onLogout}>Logout</button>
    </main>
  );
}
