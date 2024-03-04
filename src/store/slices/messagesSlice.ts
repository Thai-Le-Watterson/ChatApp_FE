import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Message } from "../../interfaces";

// Define the initial state using that type
const initialState: Message[] = [];

export const messagesSlice = createSlice({
  name: "messages",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadMessages: (state, action: PayloadAction<Message[]>) => {
      return action.payload;
    },
    addMessage: (state, action: PayloadAction<Message>) => {
      console.log(action.payload);
      const stateUse = current(state);
      if (stateUse[0]?.createdAt === action.payload.createdAt)
        return [...stateUse];
      return [action.payload, ...stateUse];
    },
  },
});

export const { loadMessages, addMessage } = messagesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectMessages = (state: RootState) => state.messages;

export default messagesSlice.reducer;
