import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { Post } from "./postsSlice";
import { getDatabase, set, ref, child, get, onChildAdded, onChildRemoved, update, onChildChanged} from "@react-native-firebase/database";

const db = getDatabase();

export const fetchPosts = createAsyncThunk<Post[], undefined>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const refDb = ref(db)
      const snapshot = get(child(refDb, "/posts"));
      if ((await snapshot).exists()) {
        const data = await (await snapshot).val()
        return data as Post[]
      } else {return []}
    } catch (error) {
      console.error("Error fetching posts:", error);
      return rejectWithValue(error);
    }
  }
);

export const createPost = createAsyncThunk<
  Post,
  { postData: Post }
>("posts/addPost", async ({ postData }, { rejectWithValue }) => {
  try {
    const postId = nanoid()
    const postRef = ref(db, "posts/" + postId);
    set(postRef, {
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
    const newPostData: Post[] = [];
    const postsRef = db.ref("/posts")
    onChildAdded(postsRef, (snapshot) => {
      const newPost = snapshot.val();
      newPostData.push(newPost);
    });
    return newPostData[0] as Post;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const deletePost = createAsyncThunk<
  Post,
  string,
  { rejectValue: any }
>("posts/delete", async (postId, thunkAPI) => {
  try {
    const postRef = ref(db, `/posts/${postId}`);
    await postRef.remove();
    const removedPostData: Post[] = [];
    const postsRef = db.ref("/posts")
    onChildRemoved(postsRef, (snapshot) => {
      const removedPost = snapshot.val();
      removedPostData.push(removedPost);
    });
    return removedPostData[0] as Post;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const updatePost = createAsyncThunk<
  Post,
  { postId: string, postData: Post }
>("posts/update", async ( { postId, postData }, { rejectWithValue }) => {
  try {
    const userPostRef = ref(db, `/posts/${postId}`);
    await update(userPostRef, {
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

    const changedPostData: Post[] = [];
    const postsRef = db.ref("/posts")
    onChildChanged(postsRef, function (snapshot) {
      const changedPost = snapshot.val();
      changedPostData.push(changedPost);
    });
    return changedPostData[0] as Post;
  } catch (error) {
    return rejectWithValue(error);
  }
});
