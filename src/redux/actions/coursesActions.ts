import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export const fetchPurchased = createAsyncThunk<
  { courseIds: string[] },
  void,
  { state: RootState }
>("courses/fetchPurchased", async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.user?.token;
  const res = await fetch("/api/purchased", {
    headers: { Authorization: `Bearer ${token ?? ""}` },
  });
  if (!res.ok) return rejectWithValue(await res.json());
  return res.json();
});

export const purchaseCourse = createAsyncThunk<
  { courseId: string },
  { courseId: string },
  { state: RootState }
>("courses/purchase", async ({ courseId }, { getState, rejectWithValue }) => {
  const token = getState().auth.user?.token;
  const res = await fetch("/api/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ?? ""}`,
    },
    body: JSON.stringify({ courseId }),
  });
  if (!res.ok) return rejectWithValue(await res.json());
  return res.json();
});
