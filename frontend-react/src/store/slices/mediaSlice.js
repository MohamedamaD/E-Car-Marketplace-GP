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
      setToken(response.data.token);
      dispatch(openMessage(response.data.message, "success"));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage(error.response.data.error, "error"));

      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  banner: [],
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
        state.loading = true;
        state.error = action.error.message;
      });
  },
});
export const {} = mediaSlice.actions;
export default mediaSlice.reducer;
