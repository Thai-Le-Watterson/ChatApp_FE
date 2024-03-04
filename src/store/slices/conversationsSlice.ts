import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type {
  ConversationStateSlice,
  ConversationType,
} from "../../interfaces";

// Define the initial state using that type
const initialState: ConversationType[] = [];

export const conversationsSlice = createSlice({
  name: "conversations",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadConversations: (state, action: PayloadAction<ConversationType[]>) => {
      return action.payload;
    },
  },
});

export const { loadConversations } = conversationsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectConversation = (state: RootState) => state.conversations;

export default conversationsSlice.reducer;
