import { RootState } from "@/app/store";

export const selectName = (state: RootState) => state.user.userName;
export const selectEmail = (state: RootState) => state.user.email;
export const selectUserId = (state: RootState) => state.user.userId;
export const selectUserImage = (state: RootState) => state.user.userImage;
