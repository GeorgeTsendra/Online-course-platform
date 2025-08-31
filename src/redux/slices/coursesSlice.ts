import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoursesState } from "types/CoursesTypes";
import { LoadingStatusEnum } from "../../types/CommonTypes";
import {
  fetchPurchased,
  purchaseCourse,
  fetchCourses,
} from "../actions/coursesActions";

const initialState: CoursesState = {
  items: [],
  purchasedIds: [],
  currentVideoId: null,
  status: LoadingStatusEnum.idle,
  listStatus: LoadingStatusEnum.idle,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCurrentVideo(state, action: PayloadAction<string | null>) {
      state.currentVideoId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (s) => {
        s.listStatus = LoadingStatusEnum.loading;
      })
      .addCase(fetchCourses.fulfilled, (s, { payload }) => {
        s.listStatus = LoadingStatusEnum.idle;
        s.items = payload.courses ?? [];
      })
      .addCase(fetchCourses.rejected, (s) => {
        s.listStatus = LoadingStatusEnum.error;
      });
    builder
      .addCase(purchaseCourse.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
      })
      .addCase(purchaseCourse.fulfilled, (s, { payload }) => {
        s.status = LoadingStatusEnum.idle;
        const id = payload.courseId;
        if (id && !s.purchasedIds.includes(id)) s.purchasedIds.push(id);
      })
      .addCase(purchaseCourse.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
    builder
      .addCase(fetchPurchased.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
      })
      .addCase(fetchPurchased.fulfilled, (s, a) => {
        s.status = LoadingStatusEnum.idle;
        s.purchasedIds = a.payload.courseIds ?? [];
      })
      .addCase(fetchPurchased.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
  },
});

export const { setCurrentVideo } = coursesSlice.actions;
export default coursesSlice.reducer;
