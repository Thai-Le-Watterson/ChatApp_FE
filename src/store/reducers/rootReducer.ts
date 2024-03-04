import { combineReducers } from "@reduxjs/toolkit";

import userReducer from "../slices/userSlice";
import conversationsSlice from "../slices/conversationsSlice";
import messagesSlice from "../slices/messagesSlice";

const rootReducer = combineReducers({
  user: userReducer,
  conversations: conversationsSlice,
  messages: messagesSlice,
});

export default rootReducer;
