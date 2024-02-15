import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { UserStateSlice, User } from "../../interfaces";

// Define the initial state using that type
const initialState: UserStateSlice = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserStateSlice>) => {
      return action.payload;
    },
    logout: (state) => {
      return {
        user: null,
        token: null,
      };
    },
  },
});

export const { login, logout } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
