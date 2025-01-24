import { createSlice } from "@reduxjs/toolkit";

export interface User {
  userName: null | string;
  userImage: null | string;
  email: null | string;
  userId: null | string;
}
const initialState: User = {
  userName: null,
  userImage: null,
  email: null,
  userId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userImage = action.payload.userimage;
      state.userId = action.payload.userId;
    },
    login: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userImage = action.payload.userimage;
      state.userId = action.payload.userId;
    },
    refresh: (state, action) => {
      state.email = action.payload.email;
      state.userName = action.payload.userName;
      state.userImage = action.payload.userimage;
      state.userId = action.payload.userId;
    },
    logOut: (state) => {
      state.email = null;
      state.userName = null;
      state.userImage = null;
      state.userId = null;
    },
  },
});
export const { register, login, refresh, logOut } = userSlice.actions;
export const userReducer = userSlice.reducer;
