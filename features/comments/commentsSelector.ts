import { RootState } from "@/store";

export const selectComments = (state: RootState) => state.comments.comments;
export const selectCommentsIsLoading = (state: RootState) => state.comments.isLoading;
export const selectCommentsError = (state: RootState) => state.comments.error;

