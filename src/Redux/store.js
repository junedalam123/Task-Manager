// store.js
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./ThemeSlice/index";
import allTaskReducer from "./TaskbarSlice/index";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    AllTask: allTaskReducer,
  },
});

export default store;
