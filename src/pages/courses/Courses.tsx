import { useNavigate } from "react-router-dom";
import { clearToken } from "../../utils/auth";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout } from "../../redux/slices/authSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchCourses,
  fetchPurchased,
  purchaseCourse,
} from "../../redux/actions/coursesActions";
import { RootState } from "../../redux/store";
import CourseGrid from "../../components/CourseGrid/CourseGrid";
import VideoModal from "../../components/VideoModal/VideoModal";
import { LoadingStatusEnum } from "../../types/CommonTypes";
import { Course } from "../../types/CoursesTypes";

export default function Courses() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { items, purchasedIds, status, currentVideoId } = useAppSelector(
    (s: RootState) => s.courses
  );

  const [selected, setSelected] = useState<Course | null>(null);

  const onLogout = useCallback(() => {
    dispatch(logout());
    clearToken();
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchPurchased());
  }, [dispatch]);

  const loading = status === LoadingStatusEnum.loading;

  const handleWatch = (course: Course) => setSelected(course);

  const handleBuy = (courseId: string) => {
    dispatch(purchaseCourse({ courseId }));
  };

  const buyingId = useMemo(() => currentVideoId ?? null, [currentVideoId]);

  return (
    <main style={{ padding: 24 }}>
      <header
        style={{
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Courses</h1>
          <p style={{ margin: "4px 0 0 0", color: "#666" }}>
            Protected page (only visible when logged in).
          </p>
        </div>
        <button onClick={onLogout}>Logout</button>
      </header>

      <CourseGrid
        courses={items}
        purchasedIds={purchasedIds}
        onWatch={handleWatch}
        onBuy={handleBuy}
        buyingId={buyingId}
        loading={loading}
      />

      <VideoModal
        open={!!selected}
        videoUrl={selected?.videoUrl}
        title={selected?.title}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
