import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/authActions";
import { AuthState } from "types/AuthTypes";
import { LoadingStatusEnum } from "../../types/CommonTypes";

const initialState: AuthState = {
  user: null,
  status: LoadingStatusEnum.idle,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(s) {
      s.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
      })
      .addCase(login.fulfilled, (s, a) => {
        s.status = LoadingStatusEnum.idle;
        s.user = a.payload;
      })
      .addCase(login.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
    builder
      .addCase(register.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
      })
      .addCase(register.fulfilled, (s, a) => {
        s.status = LoadingStatusEnum.idle;
        s.user = a.payload;
      })
      .addCase(register.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
