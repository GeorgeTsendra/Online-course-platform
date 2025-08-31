import { memo, useCallback } from "react";
import { Course } from "../../types/CoursesTypes";
import styles from "./CourseCard.module.scss";

type Props = {
  course: Course;
  purchased: boolean;
  onWatch: (course: Course) => void;
  onBuy: (courseId: string) => void;
  buying?: boolean;
};

function CourseCardBase({ course, purchased, onWatch, onBuy, buying }: Props) {
  const handleMediaKeyDown: React.MouseEventHandler<
    HTMLButtonElement | HTMLDivElement
  > = useCallback((e) => {
    e.preventDefault();
    onWatch(course);
  }, []);

  const handleBuyClick: React.MouseEventHandler<HTMLButtonElement> =
    useCallback((e) => {
      e.stopPropagation();
      onBuy(course.id);
    }, []);

  return (
    <article className={styles.card} role="group" aria-label={course.title}>
      <div
        className={styles.media}
        role="button"
        tabIndex={0}
        aria-label={`Play preview: ${course.title}`}
        onClick={handleMediaKeyDown}
        style={
          course.thumbnailUrl
            ? { backgroundImage: `url(${course.thumbnailUrl})` }
            : undefined
        }
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.desc}>{course.description}</p>
        <div className={styles.bottom}>
          <strong className={styles.price}>${course.price.toFixed(2)}</strong>

          {purchased ? (
            <button
              className={styles.watchBtn}
              onClick={handleMediaKeyDown}
              type="button"
            >
              Watch
            </button>
          ) : (
            <button
              className={styles.buyBtn}
              onClick={handleBuyClick}
              disabled={buying}
              type="button"
            >
              {buying ? "Processing…" : "Buy"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

const areEqual = (prev: Props, next: Props) =>
  prev.purchased === next.purchased &&
  prev.buying === next.buying &&
  prev.onWatch === next.onWatch &&
  prev.onBuy === next.onBuy &&
  prev.course.id === next.course.id &&
  prev.course.title === next.course.title &&
  prev.course.description === next.course.description &&
  prev.course.price === next.course.price &&
  prev.course.thumbnailUrl === next.course.thumbnailUrl &&
  prev.course.videoUrl === next.course.videoUrl;

export default memo(CourseCardBase, areEqual);
