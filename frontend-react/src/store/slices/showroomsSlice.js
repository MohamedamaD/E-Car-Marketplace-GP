import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

export const fetchShowrooms = createAsyncThunk(
  "showrooms/fetchShowrooms",
  async ({ page, search = "" }, { rejectWithValue, getState }) => {
    try {
      console.log(page, search);
      const { pageSize } = getState().showrooms;
      const response = await api.get(
        `/showrooms?page=${page}&pageSize=${pageSize}&search=${search}`
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchShowroomsAndHandlePagination =
  (page, search) => async (dispatch) => {
    dispatch(setCurrentPage(page));
    await dispatch(fetchShowrooms({ page, search }));
  };

export const fetchShowroom = createAsyncThunk(
  "showrooms/fetchShowroom",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/showrooms/${id}`);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      // dispatch(set);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  showrooms: [],
  currentShowroomCars: [],
  currentShowroom: null,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 12,
  totalPages: 0,
  notFound: false,
};

const showroomsSlice = createSlice({
  name: "showrooms",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowrooms.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.showrooms = action.payload.showrooms;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchShowrooms.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchShowroom.pending, (state) => {
        state.loading = true;
        state.notFound = false;
      })
      .addCase(fetchShowroom.fulfilled, (state, action) => {
        state.loading = false;
        state.notFound = false;
        state.currentShowroom = action.payload.showroom;
        state.currentShowroomCars = action.payload.cars;
      })
      .addCase(fetchShowroom.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.notFound = true;
      });
  },
});

export const { setCurrentPage } = showroomsSlice.actions;
export default showroomsSlice.reducer;
