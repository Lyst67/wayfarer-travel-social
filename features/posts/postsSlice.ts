import { createSlice } from "@reduxjs/toolkit";
import { createPost, decrementPostLike, deletePost, fetchPosts, incrementPostLike, updatePost, } from "./operations";
import { LatLng } from "react-native-maps";

export interface Post {
  userId: null | string;
  userName: null | string;
  userEmail: null | string;
  userImage?: null | string;
  postImage: null | undefined | string;
  imageName: null | undefined | string;
  postLocation: LatLng | null;
  locationMark: null | string | undefined;
  likesCount: null | number;
  likes: {[uid: string]: boolean}[] | null;
}
// export interface PostItem {
//   [postId: string]: Post;
// }
export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: any;
}
const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const postIds = Object.keys(state.posts);
        const deletedPostId = Object.keys(action.payload)[0];
        const index = postIds.findIndex((item) => item === deletedPostId);
        state.posts.splice(index, 1);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const postIds = Object.keys(state.posts);
        const updatedPostId = Object.keys(action.payload)[0];
        const index = postIds.findIndex((item) => item === updatedPostId);
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(incrementPostLike.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(incrementPostLike.fulfilled, (state, action)=>{
        console.log("Post like updated in reducer", action.payload); 
        state.isLoading = false;
        state.error = null;
        const postIds = Object.keys(state.posts);
        const updatedPostId = Object.keys(action.payload)[0];
        const index = postIds.findIndex((item) => item === updatedPostId);
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(incrementPostLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(decrementPostLike.pending, (state)=>{
        state.isLoading = true;
      })
      .addCase(decrementPostLike.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.error = null;
        const postIds = Object.keys(state.posts);
        const updatedPostId = Object.keys(action.payload)[0];
        const index = postIds.findIndex((item) => item === updatedPostId);
        state.posts.splice(index, 1, action.payload);
      })
      .addCase(decrementPostLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const postsReducer = postsSlice.reducer;
