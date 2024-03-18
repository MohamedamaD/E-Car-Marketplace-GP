import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { formDataApi } from "../../services/api";
import { getToken, setToken } from "../../utils";
import { openMessage } from "./messageSlice";

export const createBanner = createAsyncThunk(
  "media/createBanner",
  async (formData, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await formDataApi.post("/media/banner", formData, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch(openMessage(response.data.message, "success"));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage(error.response.data.message, "error"));

      return rejectWithValue(error.response.data);
    }
  }
);

export const getTrendingBanners = createAsyncThunk(
  "media/getTrendingBanners",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await formDataApi.get("/media/latest-banners");
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage(error.response.data.message, "error"));

      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  banners: [],
  loading: false,
  error: null,
  success: null,
};

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBanner.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
        state.error = action.payload.message || action.error.message;
      })

      .addCase(getTrendingBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrendingBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
      })
      .addCase(getTrendingBanners.rejected, (state, action) => {
        state.loading = false;
      });
  },
});
export const {} = mediaSlice.actions;
export default mediaSlice.reducer;
