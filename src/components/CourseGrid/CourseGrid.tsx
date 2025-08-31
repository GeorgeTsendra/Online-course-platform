import CourseCard from "../CourseCard/CourseCard";
import { Course } from "../../types/CoursesTypes";
import styles from "./CourseGrid.module.scss";

type Props = {
  courses: Course[];
  purchasedIds: string[];
  onWatch: (course: Course) => void;
  onBuy: (courseId: string) => void;
  buyingId?: string | null;
  loading?: boolean;
  error?: string;
};

export default function CourseGrid({
  courses,
  purchasedIds,
  onWatch,
  onBuy,
  buyingId,
  loading,
  error,
}: Props) {
  if (loading) {
    return <p style={{ padding: 24 }}>Loading courses…</p>;
  }
  if (error) {
    return (
      <p style={{ padding: 24, color: "crimson" }}>
        Failed to load courses: {error}
      </p>
    );
  }
  if (!courses.length) {
    return <p style={{ padding: 24 }}>No courses yet.</p>;
  }

  return (
    <section className={styles.grid}>
      {courses.map((c) => (
        <CourseCard
          key={c.id}
          course={c}
          purchased={purchasedIds.includes(c.id)}
          onWatch={onWatch}
          onBuy={onBuy}
          buying={buyingId === c.id}
        />
      ))}
    </section>
  );
}
