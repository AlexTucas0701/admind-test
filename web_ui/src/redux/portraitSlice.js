import {createSlice, createAsyncThunk}from "@reduxjs/toolkit";
import axios from "axios";
import API from "../constants/api";
import VARS from "../constants/var";

export const removeBackground = createAsyncThunk("portrait/removeBackground", async (portraitFile) => {
  const formData = new FormData();
  formData.append("portrait", portraitFile);
  const response = await axios.post(
    API.PORTRAIT_UPLOAD_AND_BACKGROUND_REMOVE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
});

export const removeBackgroundStream = createAsyncThunk("portrait/removeBackground", async (portraitFile, {dispatch}) => {
  const formData = new FormData();
  formData.append("portrait", portraitFile);
  const response = await axios.post(API.PORTRAIT_UPLOAD, formData, {headers: {"Content-Type": "multipart/form-data"}});
  const eventSource = new EventSource(API.PORTRAIT_BACKGROUND_REMOVE_STREAM);
  eventSource.onmessage = (event) => {
    dispatch(portraitSlice.actions.setBackgroundRemoveStatus(JSON.parse(event.data)));
  };
  eventSource.onerror = (e) => {
    console.error(e);
    eventSource.close();
  };
  dispatch(portraitSlice.actions.setBackgroundRemoveStatus(response.data));
});

export const merge = createAsyncThunk("portrait/merge", async (background_image_id) => {
  const response = await axios.get(`${API.MERGE_BACKGROUND_AND_PORTRAIT}?background_image_id=${background_image_id}`);
  return response.data;
});

const initialState = {
  bg_remove_status: null,
  bg_removed_portrait: null,
  merged_portrait: null,
};

const portraitSlice = createSlice({
  name: "portrait",
  initialState,
  reducers: {
    clearMergedPortrait: (state) => {
      state.merged_portrait = null;
    },
    clearPortrait: (state) => {
      state.bg_removed_portrait = null;
      state.bg_remove_status = VARS.UPLOAD_AND_PROCESS_THE_PORTRAIT;
      state.merged_portrait = null;
    },
    setBackgroundRemoveStatus: (state, action) => {
      const payload = action.payload;
      state.bg_remove_status = payload.status;
      state.bg_removed_portrait = payload.bg_removed_portrait;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeBackground.pending, (state) => {
      })
      .addCase(removeBackground.fulfilled, (state, action) => {
        // state.bg_removed_portrait = action.payload.bg_removed_portrait;
      })
      .addCase(removeBackground.rejected, (state, action) => {})
      .addCase(merge.pending, (state) => {
      })
      .addCase(merge.fulfilled, (state, action) => {
        state.merged_portrait = API.MERGED_PORTRAIT;
      })
      .addCase(merge.rejected, (state, action) => {});
  },
});

export const {
  clearMergedPortrait,
  clearPortrait,
} = portraitSlice.actions;

export default portraitSlice.reducer;
