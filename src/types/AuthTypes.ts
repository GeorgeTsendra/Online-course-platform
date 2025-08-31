import { LoadingStatusEnum } from "./CommonTypes";

export type User = { id: string; email: string; name: string; token: string };

export type AuthState = {
  user: User | null;
  status: LoadingStatusEnum;
  error?: string;
};
