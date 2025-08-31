import { LoadingStatusEnum } from "./CommonTypes";

export type User = { id: string; email: string; name: string; token: string };

export type AuthState = {
  user: User | null;
  status: LoadingStatusEnum;
  error?: string;
};

export type Credentials = { email: string; password: string };
export type RegisterBody = { email: string; password: string; name?: string };
export type ApiError = { message?: string; [k: string]: unknown };
