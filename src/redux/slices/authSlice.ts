import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "redux/actions/authActions";
import { AuthState } from "types/AuthTypes";
import { LoadingStatusEnum } from "types/CommonTypes";

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
      localStorage.removeItem("auth:user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
        s.error = undefined;
      })
      .addCase(login.fulfilled, (s) => {
        s.status = LoadingStatusEnum.idle;
      })
      .addCase(login.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      })
      .addCase(register.pending, (s) => {
        s.status = LoadingStatusEnum.loading;
      })
      .addCase(register.fulfilled, (s) => {
        s.status = LoadingStatusEnum.idle;
      })
      .addCase(register.rejected, (s) => {
        s.status = LoadingStatusEnum.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
