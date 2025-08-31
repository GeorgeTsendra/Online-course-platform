import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useMemo } from "react";
import { purchaseCourse } from "../../redux/actions/coursesActions";
import { RootState } from "../../redux/store";
import CourseGrid from "../../components/CourseGrid/CourseGrid";
import VideoModal from "../../components/VideoModal/VideoModal";
import { LoadingStatusEnum } from "../../types/CommonTypes";
import { Course } from "../../types/CoursesTypes";
import { useCoursesInit } from "../../hooks/useCoursesInit";
import { useLogout } from "../../hooks/useLogout";
import { useVideoModal } from "../../hooks/useVideoModal";
import styles from "./Courses.module.scss";

export default function Courses() {
  const onLogout = useLogout();
  useCoursesInit();

  const { selected, open, close } = useVideoModal();

  const dispatch = useAppDispatch();

  const { items, purchasedIds, status, currentVideoId } = useAppSelector(
    (s: RootState) => s.courses
  );

  const loading = status === LoadingStatusEnum.loading;

  const handleWatch = useCallback((course: Course) => open(course), [open]);

  const handleBuy = (courseId: string) => {
    dispatch(purchaseCourse({ courseId }));
  };

  const buyingId = useMemo(() => currentVideoId ?? null, [currentVideoId]);

  return (
    <main style={{ padding: 24 }}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Courses</h1>
          <p className={styles.subtitle}>
            Protected page (only visible when logged in).
          </p>
        </div>
        <button className={styles.logoutBtn} onClick={onLogout}>
          Logout
        </button>
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
        onClose={close}
      />
    </main>
  );
}
