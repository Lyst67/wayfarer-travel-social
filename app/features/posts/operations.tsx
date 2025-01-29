import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PostItem } from "./postsSlice";
import db from "@react-native-firebase/database";

export const fetchPosts = createAsyncThunk<PostItem[], undefined>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = await db().ref("/users").once("value");
      const data = await snapshot.val();
      console.log(data);
      return data as PostItem[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addPost = createAsyncThunk<
  PostItem,
  { postId: string; postData: Post }
>("posts/addPost", async ({ postId, postData }, { rejectWithValue }) => {
  try {
    const userPost = db().ref(`/posts/${postId}`);
    await userPost.set({
      postData,
    });
    const userPostDataSnapshot = await userPost.once("value");
    const userPostData = userPostDataSnapshot.val();
    return userPostData as PostItem;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  string,
  string,
  { rejectValue: any }
>("posts/delete", async (postId, thunkAPI) => {
  try {
    const data = db().ref(`/posts/${postId}`);
    await data.remove();
    return postId;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk<
  PostItem,
  { postId: string; postData: Post }
>("posts/update", async ({ postId, postData }, { rejectWithValue }) => {
  try {
    const userPost = db().ref(`/posts/${postId}`);
    await userPost.update(postData);

    const updatedPostSnapshot = await userPost.once("value");
    const updatedPost = updatedPostSnapshot.val();
    return { [postId]: updatedPost };
  } catch (error) {
    return rejectWithValue(error);
  }
});
