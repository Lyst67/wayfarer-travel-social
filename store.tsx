import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userReducer } from "./features/user/userSlice";
import { postsReducer } from "./features/posts/postsSlice";
import { commentsReducer } from "./features/comments/commentsSlice";

const authPersistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const postsPersistConfig = {
  key: "posts",
  storage: AsyncStorage,
  whitelist: ["posts"],
};
const commentsPersistConfig = {
  key: "comments",
  storage: AsyncStorage,
  whitelist: ["comments"],
};

const authReducer = persistReducer(authPersistConfig, userReducer);
const userPostsReducer = persistReducer(postsPersistConfig, postsReducer);
const imageCommentsReducer = persistReducer(
  commentsPersistConfig,
  commentsReducer
);

const store = configureStore({
  reducer: {
    posts: userPostsReducer,
    user: authReducer,
    comments: imageCommentsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export default { store, persistor };
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
