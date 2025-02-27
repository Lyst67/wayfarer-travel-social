import { createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import { Post } from "./postsSlice";
import { getDatabase, set, ref, child, get, onChildAdded, onChildRemoved, update, onChildChanged, runTransaction} from "@react-native-firebase/database";

const db = getDatabase();

export const fetchPosts = createAsyncThunk<Post[], undefined>(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const refDb = ref(db)
      const snapshot = await get(child(refDb, "/posts"));
      if ((snapshot).exists()) {
        const data = await (snapshot).val()
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
      likes: postData.likes,
    });

    const changedPostData: Post[] = [];
    const postsRef = ref( db, "/posts")
    onChildChanged(postsRef, function (snapshot) {
      const changedPost = snapshot.val();
      changedPostData.push(changedPost);
    });
    return changedPostData[0] as Post;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const incrementPostLike = createAsyncThunk<  
  Post,  
  { postId: string; uid: string },  
  { rejectValue: any }  
>(  
  "posts/increaseLikeCount",  
  async ({ postId, uid }, thunkAPI) => {  
    console.log("Thunk initiated for post:", postId, "by user:", uid); 
    try {  
      // const updates: any = {};  
      // updates[`posts/${postId}/likes/${uid}`] = true;   
      // updates[`posts/${postId}/likesCount`] = increment(1);  
      // await update(ref(db), updates);
       
await update(ref(db, `/posts/${postId}/likes/${uid}`), { liked: true }); 
const countRef = ref(db, `/posts/${postId}/likesCount`);  
await runTransaction(countRef, (currentCount) => {  
  return (currentCount || 0) + 1;  
});
      const snapshot = await get(child(ref(db), `/posts/${postId}`));    
      if (snapshot.exists()) {  
        return snapshot.val() as Post;  
      } else {  
        return thunkAPI.rejectWithValue(new Error('Post not found'));  
      }  
    } catch (error: any) {  
      console.error("Error during the thunk execution:", error);  
      return thunkAPI.rejectWithValue(error.message || 'An error occurred');  
    }  
  }  
);   

export const decrementPostLike = createAsyncThunk<
Post, {postId: string, uid: string}, { rejectValue: any }
>("posts/reduceLikeCount", async ( {postId, uid}, thunkAPI) => {
  try { 
    await update(ref(db, `/posts/${postId}/likes/${uid}`), { liked: false }); 
// await update(ref(db, `/posts/${postId}`), {likesCount: -1}); 
const countRef = ref(db, `/posts/${postId}/likesCount`);  
await runTransaction(countRef, (currentCount) => {  
  return (currentCount || 0) - 1;  
});

const snapshot = await get(child(ref(db), `/posts/${postId}`))
if (snapshot.exists()) {
  return await snapshot.val() as Post 
} else {  
  return thunkAPI.rejectWithValue(new Error('Post not found'));  
} 
  }
  catch (error) {
   return thunkAPI.rejectWithValue(error)
  }
} ) 