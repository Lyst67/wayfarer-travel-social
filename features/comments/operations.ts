import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "@react-native-firebase/database";
import { Comment } from "./commentsSlice";

export const fetchComments = createAsyncThunk<Comment[], undefined>(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const snapshot = db().ref("/comments").once("value");
      const data = (await snapshot).val();
      return data as Comment[];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk<
  Comment,
  { commentData: Comment }
>("comments/addComment", async ({ commentData }, { rejectWithValue }) => {
  try {
    const usersComments = db().ref(`/comments`);
    await usersComments.set({
      commentedPostId: commentData.commentedPostId,
      commentedImage: commentData.commentedImage,
      commentId: commentData.commentId,
      commentText: commentData.commentText,
      authorName: commentData.authorName,
      authorImage: commentData.authorName,
      commentTime: commentData.commentTime,
    });
    const newCommentData: Comment[] = [];
    usersComments.on("child_added", function (data) {
      const newComment = data.val();
      newCommentData.push(newComment);
    });
    return newCommentData[0] as Comment;
  } catch (error: any) {
    return rejectWithValue(error);
  }
});

export const deleteComment = createAsyncThunk<
  Comment,
  string,
  { rejectValue: any }
>("comments/delete", async (commentId, thunkAPI) => {
  try {
    const commentData = db().ref(`/comments/${commentId}`);
    await commentData.remove();
    const removedCommentData: Comment[] = [];
    commentData.on("child_removed", function (data) {
      const removedComment = data.val();
      removedCommentData.push(removedComment);
    });
    return removedCommentData[0] as Comment;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updateComment = createAsyncThunk<
  Comment,
  { commentId: string; commentData: Comment }
>("posts/update", async ({ commentId, commentData }, { rejectWithValue }) => {
  try {
    const userComment = db().ref(`/posts/${commentId}`);
    await userComment.update(commentData);

    const updatedCommentSnapshot = await userComment.once("value");
    const updatedComment = updatedCommentSnapshot.val();
    return updatedComment;
  } catch (error) {
    return rejectWithValue(error);
  }
});
