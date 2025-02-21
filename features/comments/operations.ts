import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { Comment } from "./commentsSlice";
import {getDatabase, set, ref, child, get, onChildAdded, onChildRemoved, update, onChildChanged} from "@react-native-firebase/database";

const db = getDatabase()

export const fetchComments = createAsyncThunk<Comment[], undefined>(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try {
      const refDb = ref(db)
      const snapshot = get(child(refDb, "/comments"));
      if ((await snapshot).exists()) {
        const data = await (await snapshot).val();
        return data as Comment[];
      } else { return []}
    } catch (error) {
      console.error("Error fetching comments:", error);
      return rejectWithValue(error);
    }
  }
);

export const createComment = createAsyncThunk<
  Comment,
  { commentData: Comment }
>("comments/addComment", async ({ commentData }, { rejectWithValue }) => {
  try {
    const newCommentId = nanoid()
    const commentRef = ref(db, `comments/` + newCommentId);
    await set(commentRef, {
      commentId: commentData.commentId,
      commentedPostId: commentData.commentedPostId,
      commentedImage: commentData.commentedImage,
      commentedImageAuthorId: commentData.commentedImageAuthorId,
      commentAuthorId: commentData.commentAuthorId,
      commentText: commentData.commentText,
      authorName: commentData.authorName,
      authorImage: commentData.authorImage,
      commentTime: commentData.commentTime,
    });
    const newCommentData: Comment[] = [];
    const commentsRef = ref(db, "/comments")
       onChildAdded(commentsRef, (snapshot) => {
         const newComment = snapshot.val();
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
    const commentData = ref(db, `/comments/${commentId}`);
    await commentData.remove();
    const removedCommentData: Comment[] = [];
    const commentsRef = ref(db, "comments")
    onChildRemoved(commentsRef, (snapshot) => {
      const removedComment = snapshot.val();
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
    const userComment = ref(db, `/comments/${commentId}`);
    await update(userComment, {
      commentId: commentData.commentId,
      commentedPostId: commentData.commentedPostId,
      commentedImage: commentData.commentedImage,
      commentedImageAuthorId: commentData.commentedImageAuthorId,
      commentAuthorId: commentData.commentAuthorId,
      commentText: commentData.commentText,
      authorName: commentData.authorName,
      authorImage: commentData.authorName,
      commentTime: commentData.commentTime,
    });
    const commentsRef = ref(db, "comments")
    const updatedCommentSnapshot = get(child(commentsRef, `/comments/${commentId}`));
    const updatedComment = (await updatedCommentSnapshot).val();
    return updatedComment;
  } catch (error) {
    return rejectWithValue(error);
  }
});
