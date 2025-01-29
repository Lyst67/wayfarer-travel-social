import { createSlice } from "@reduxjs/toolkit";

export interface Comment {
  commentText: null | string;
  authorName: null | string;
  authorImage: null | string;
  commentTime: null | string;
}
export interface CommentsState {
  posts: Comment[];
  isLoading: boolean;
  error: string | null | undefined;
}
const initialState: CommentsState = {
  posts: [],
  isLoading: false,
  error: null,
};

const postsSlice = createSlice({
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
        state.posts = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const index = state.posts.findIndex(
          (item) => item.id === action.payload.id
        );
        state.posts.splice(index, 1);
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
        const index = state.posts.findIndex(
          (item) => item.id === action.payload.id
        );
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
