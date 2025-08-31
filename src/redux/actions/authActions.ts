import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  Credentials,
  User,
  ApiError,
  RegisterBody,
} from "../../types/AuthTypes";
import { setToken } from "../../utils/auth";
import axios from "axios";
import api from "../../utils/axiosInstance";

export const login = createAsyncThunk<
  User,
  Credentials,
  { rejectValue: ApiError }
>("auth/login", async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post<User & { token?: string }>("/login", body, {
      headers: { "Content-Type": "application/json" },
    });

    if (data.token) setToken(data.token);

    return data as User;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      return rejectWithValue(
        (err.response?.data as ApiError) ?? { message: err.message }
      );
    }
    return rejectWithValue({ message: "Unknown error" });
  }
});

export const register = createAsyncThunk<
  User,
  RegisterBody,
  { rejectValue: ApiError }
>("auth/register", async (body, { rejectWithValue }) => {
  try {
    const { data } = await api.post<User>("/register", body, {
      headers: { "Content-Type": "application/json" },
    });

    if (data.token) setToken(data.token);
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
