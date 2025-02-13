import { createAsyncThunk } from "@reduxjs/toolkit";
import { Post, PostItem } from "./postsSlice";
import db from "@react-native-firebase/database";

export const fetchPosts = createAsyncThunk<PostItem[], undefined>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = db().ref("/posts").once("value");
      const data = (await snapshot).val();
      return data as PostItem[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<
  PostItem,
  { postId: any; postData: Post }
>("posts/addPost", async ({ postId, postData }, { rejectWithValue }) => {
  try {
    const usersPosts = db().ref(`/posts/${postId}`);
    await usersPosts.set({
      userId: postData.userId,
      userName: postData.userName,
      userEmail: postData.userEmail,
      userImage: postData.userImage,
      postImage: postData.postImage,
      imageName: postData.imageName,
      postLocation: postData.postLocation,
      locationMark: postData.locationMark,
      likesCount: postData.likesCount,
      commentsCount: postData.commentsCount,
    });
    const newPostData: PostItem[] = [];
    usersPosts.on("child_added", function (data) {
      const newPost = data.val();
      newPostData.push(newPost);
    });
    return newPostData[0] as PostItem;
    // const userPost = db().ref(`/posts/${postId}`);
    // const userPostDataSnapshot = await userPost.once("value");
    // const userPostData = userPostDataSnapshot.val();
    // return userPostData as PostItem;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  PostItem,
  string,
  { rejectValue: any }
>("posts/delete", async (postId, thunkAPI) => {
  try {
    const postData = db().ref(`/posts/${postId}`);
    await postData.remove();
    const removedPostData: PostItem[] = [];
    postData.on("child_removed", function (data) {
      const removedPost = data.val();
      removedPostData.push(removedPost);
    });
    return removedPostData[0] as PostItem;
    // return postId;
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
