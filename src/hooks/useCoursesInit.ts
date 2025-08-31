import { useEffect } from "react";
import { useAppDispatch } from "../redux/hooks";
import { fetchCourses, fetchPurchased } from "../redux/actions/coursesActions";

export function useCoursesInit() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchPurchased());
  }, [dispatch]);
}
