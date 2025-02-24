import {configureStore}from "@reduxjs/toolkit";

import backgroundReducer from "./backgroundSlice";
import portraitReducer from "./portraitSlice";

export const store = configureStore({
  reducer: {
    background: backgroundReducer,
    portrait: portraitReducer,
  },
});

export default store;
