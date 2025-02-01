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

const authPersistConfig = {
  key: "user",
  storage: AsyncStorage,
};
const postsPersistConfig = {
  key: "posts",
  storage: AsyncStorage,
  whitelist: ["posts"],
};

const authReducer = persistReducer(authPersistConfig, userReducer);
const userPostsReducer = persistReducer(postsPersistConfig, postsReducer);

const store = configureStore({
  reducer: { posts: userPostsReducer, user: authReducer },
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
