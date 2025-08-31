import { LoadingStatusEnum } from "./CommonTypes";

export type CoursesState = {
  purchasedIds: string[];
  currentVideoId: string | null;
  status: LoadingStatusEnum;
  error?: string;
};
