import { configureStore } from "@reduxjs/toolkit";
import todoSlice from "../features/TotoSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
  },
});
