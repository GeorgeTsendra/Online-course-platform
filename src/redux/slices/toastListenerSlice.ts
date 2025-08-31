import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../actions/authActions";

type toastListenerStateT = {
  error?: null | string;
  message?: null | string;
};

const initialState: toastListenerStateT = {
  error: null,
  message: null,
};

const toastListenerSlice = createSlice({
  name: "toastListener",
  initialState,
  reducers: {
    cleanToast(s) {
      s.error = null;
      s.message = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.rejected, (s, a) => {
      s.error = a.error.message;
    });
    builder
      .addCase(register.fulfilled, (s) => {
        s.message = "User has been registered successful";
      })
      .addCase(register.rejected, (s, a) => {
        s.error = a.error.message;
      });
  },
});

export const { cleanToast } = toastListenerSlice.actions;
export default toastListenerSlice.reducer;
