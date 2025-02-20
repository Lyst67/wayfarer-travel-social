import { RootState } from "@/store";

export const selectUserPosts = (state: RootState) => Object.entries(state.posts.posts);
export const selectIsLoading = (state: RootState) => state.posts.isLoading;
export const selectError = (state: RootState) => state.posts.error;
