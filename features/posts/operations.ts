import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PostItem } from "./postsSlice";
import db from "@react-native-firebase/database";

export const fetchPosts = createAsyncThunk<PostItem[], undefined>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = db().ref("/posts").once("value");
      const data = (await snapshot).val();
      // console.log("Data:", data as PostItem[]);
      return data as PostItem[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<
  PostItem,
  { userId: any; postId: any; postData: Post }
>(
  "posts/addPost",
  async ({ userId, postId, postData }, { rejectWithValue }) => {
    try {
      const usersPosts = db().ref(`/posts/${userId}/${postId}`);
      await usersPosts.set({
        userName: postData.userName,
        postImage: postData.postImage,
        imageName: postData.imageName,
        postLocation: postData.postLocation,
        likesCount: postData.likesCount,
        commentsCount: postData.commentsCount,
      });
      const userPost = db().ref(`/posts/${postId}`);
      const userPostDataSnapshot = await userPost.once("value");
      const userPostData = userPostDataSnapshot.val();
      return userPostData as PostItem;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

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
