import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import api from "../../utils/axiosInstance";
import { ApiError } from "../../types/AuthTypes";
import axios from "axios";
import { Course } from "../../types/CoursesTypes";

export const fetchPurchased = createAsyncThunk<
  { courseIds: string[] },
  void,
  { state: RootState; rejectValue: ApiError }
>("courses/fetchPurchased", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<{ courseIds: string[] }>("/purchased");
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as ApiError) ?? { message: err.message }
      );
    }
    return rejectWithValue({ message: "Unknown error" });
  }
});

export const purchaseCourse = createAsyncThunk<
  { courseId: string },
  { courseId: string },
  { state: RootState; rejectValue: ApiError }
>("courses/purchase", async ({ courseId }, { rejectWithValue }) => {
  try {
    const { data } = await api.post<{ courseId: string }>("/purchase", {
      courseId,
    });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as ApiError) ?? { message: err.message }
      );
    }
    return rejectWithValue({ message: "Unknown error" });
  }
});

export const fetchCourses = createAsyncThunk<
  { courses: Course[] },
  void,
  { rejectValue: ApiError }
>("courses/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get<Course[] | { courses: Course[] }>(
      "/courses"
    );
    const courses = Array.isArray(data) ? data : data.courses;
    return { courses };
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as ApiError) ?? { message: err.message }
      );
    }
    return rejectWithValue({ message: "Unknown error" });
  }
});
