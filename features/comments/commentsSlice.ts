import { createSlice } from "@reduxjs/toolkit";
import {
  createComment,
  deleteComment,
  fetchComments,
  updateComment,
} from "./operations";

export interface Comment {
  commentId: null | string;
  commentText: null | string;
  authorName: null | string;
  authorImage: null | string;
  commentTime: null | string;
}
export interface Comments {
  comments: Comment[];
  isLoading: boolean;
  error: any;
}
const initialState: Comments = {
  comments: [],
  isLoading: false,
  error: null,
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.comments.findIndex(
          (item) => item.commentId === action.payload.commentId
        );
        state.comments.splice(index, 1);
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.comments.findIndex(
          (item) => item.commentId === action.payload.commentId
        );
        state.comments.splice(index, 1, action.payload);
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export default commentsSlice.reducer;
