import { LoadingStatusEnum } from "./CommonTypes";

export type CoursesState = {
  items: Course[];
  purchasedIds: string[];
  currentVideoId: string | null;
  status: LoadingStatusEnum;
  listStatus: LoadingStatusEnum;
  buyStatus: LoadingStatusEnum;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
  thumbnailUrl: string;
};
