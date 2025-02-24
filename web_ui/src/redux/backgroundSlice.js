import {createSlice, createAsyncThunk}from "@reduxjs/toolkit";
import axios from "axios";
import API from "../constants/api";

export const fetchBackgrounds = createAsyncThunk("background/fetchBackgrounds", async () => {
  const response = await axios.get(API.LIST_BACKGROUND);
  return response.data
});

const initialState = {
  background: {},
  backgrounds: [],
};

const backgroundSlice = createSlice({
  name: "background",
  initialState,
  reducers: {
    chooseBackground: (state, action) => {
      state.background = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBackgrounds.pending, (state) => {
      })
      .addCase(fetchBackgrounds.fulfilled, (state, action) => {
        state.backgrounds = action.payload.backgrounds;
      })
      .addCase(fetchBackgrounds.rejected, (state, action) => {});
  },
});

export const {
  chooseBackground,
} = backgroundSlice.actions;

export default backgroundSlice.reducer;
