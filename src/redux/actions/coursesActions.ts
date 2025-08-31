import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import api from "../../utils/axiosInstance";
import { ApiError } from "../../types/AuthTypes";
import axios from "axios";

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
