import { RootState } from "@/app/store";

export const selectUserNames = (state: RootState) => state.posts.posts;
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
