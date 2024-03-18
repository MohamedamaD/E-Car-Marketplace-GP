import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../services/api";
import { getToken } from "../../utils";
import { openMessage } from "./messageSlice";

export const createShowroom = createAsyncThunk(
  "showroomOwner/createShowroom",
  async (payload, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await formDataApi.post(
        `/showroom-owner/showrooms/`,
        payload,
        {
          headers: { "x-auth-token": token },
        }
      );

      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getShowrooms = createAsyncThunk(
  "showroomOwner/getShowrooms",
  async ({ page = 1, total }, { rejectWithValue, getState }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const { pageSize } = getState().showroomOwner;
      const response = await api.get(
        `/showroom-owner/showrooms?page=${page}&pageSize=${pageSize}&total=${total}`,
        { headers: { "x-auth-token": token } }
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
export const editShowrooms = createAsyncThunk(
  "showroomOwner/editShowrooms",
  async ({ payload, id }, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const response = await api.put(
        `/showroom-owner/showrooms/${id}`,
        payload,
        {
          headers: { "x-auth-token": token },
        }
      );

      dispatch(openMessage(response.data.message, "success"));
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const deleteShowroom = createAsyncThunk(
  "showroomOwner/deleteShowroom",
  async (id, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const response = await api.delete(`/showroom-owner/showroom/${id}`, {
        headers: { "x-auth-token": token },
      });
      dispatch(openMessage("car deleted successfully", "success"));
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const getShowroomById = createAsyncThunk(
  "showroomOwner/getShowroomById",
  async (id, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }
    try {
      const response = await api.get(`/showroom-owner/showrooms/${id}`, {
        headers: { "x-auth-token": token },
      });

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
export const updateShowroomImage = createAsyncThunk(
  "showroomOwner/updateShowroomImage",
  async ({ id, payload }, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }
    console.log(id, payload);
    try {
      const response = await formDataApi.put(
        `/showroom-owner/showrooms/${id}/image`,
        payload,
        {
          headers: { "x-auth-token": token },
        }
      );

      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
export const addCarToShowroom = createAsyncThunk(
  "showroomOwner/addCarToShowroom",
  async (payload, { rejectWithValue, dispatch }) => {
    const token = getToken();

    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await formDataApi.post(
        `/showroom-owner/add-car/`,
        payload,
        {
          headers: { "x-auth-token": token },
        }
      );

      dispatch(openMessage(response.data.message, "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserShowroomsAndHandlePagination =
  (page, total = false) =>
  async (dispatch) => {
    dispatch(setCurrentPage(page));

    await dispatch(getShowrooms({ page, total }));
  };

const initialState = {
  loading: false,
  userShowrooms: [],
  showroom: null,
  currentPage: 1,
  pageSize: 12,
  totalPages: 0,
};

const showroomOwnerSlice = createSlice({
  name: "showroomOwner",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createShowroom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(createShowroom.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(createShowroom.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(getShowroomById.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShowroomById.fulfilled, (state, action) => {
        state.loading = false;
        state.showroom = action.payload.showroom;
        console.log(action);
      })
      .addCase(getShowroomById.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(getShowrooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getShowrooms.fulfilled, (state, action) => {
        state.loading = false;
        state.userShowrooms = action.payload.showrooms;
        state.totalPages = action.payload.totalPages;
        console.log(action);
      })
      .addCase(getShowrooms.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(deleteShowroom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteShowroom.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(deleteShowroom.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(editShowrooms.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(editShowrooms.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(editShowrooms.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(updateShowroomImage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateShowroomImage.fulfilled, (state, action) => {
        state.loading = false;
        state.showroom = action.payload.showroom;
        console.log(action);
      })
      .addCase(updateShowroomImage.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })

      .addCase(addCarToShowroom.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addCarToShowroom.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(addCarToShowroom.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      });
  },
});

export const { setCurrentPage } = showroomOwnerSlice.actions;
export default showroomOwnerSlice.reducer;
