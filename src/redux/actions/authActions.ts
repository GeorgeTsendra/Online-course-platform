import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "types/AuthTypes";

export const login = createAsyncThunk<
  User,
  { email: string; password: string }
>("auth/login", async (body, { rejectWithValue }) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return rejectWithValue(await res.json());
  return res.json();
});

export const register = createAsyncThunk<
  User,
  { email: string; password: string; name?: string }
>("auth/register", async (body, { rejectWithValue }) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) return rejectWithValue(await res.json());
  return res.json();
});
