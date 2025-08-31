import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CoursesState } from "types/CoursesTypes";
import { LoadingStatusEnum } from "types/CommonTypes";
import { fetchPurchased, purchaseCourse } from "redux/actions/coursesActions";

const initialState: CoursesState = {
  purchasedIds: [],
  currentVideoId: null,
  status: LoadingStatusEnum.idle,
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
      .addCase(fetchPurchased.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
        s.error = undefined;
      })
      .addCase(fetchPurchased.fulfilled, (s) => {
        s.status = LoadingStatusEnum.idle;
      })
      .addCase(fetchPurchased.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      })

      .addCase(purchaseCourse.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
        s.error = undefined;
      })
      .addCase(purchaseCourse.fulfilled, (s) => {
        s.status = LoadingStatusEnum.idle;
      })
      .addCase(purchaseCourse.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
  },
});

export const { setCurrentVideo } = coursesSlice.actions;
export default coursesSlice.reducer;
