import { RootState } from "@/store";

export const selectComments = (state: RootState) => state.comments.comments;
export const selectedCommentedImage = (state: RootState) =>
  state.comments.commentedImage;
export const selectedCommentsCount = (state: RootState) =>
  state.comments.commentsCount;
