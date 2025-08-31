import { useCallback, useState } from "react";
import { Course } from "../types/CoursesTypes";

export function useVideoModal() {
  const [selected, setSelected] = useState<Course | null>(null);
  const open = useCallback((course: Course) => setSelected(course), []);
  const close = useCallback(() => setSelected(null), []);
  return { selected, isOpen: !!selected, open, close };
}
