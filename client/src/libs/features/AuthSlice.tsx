import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "types/User";

interface AuthState {
  user: IUser | null;
  isAuth: boolean;
}

const initialState = {
  user: null,
  isAuth: false,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<IUser>) {
      state.isAuth = true;
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
