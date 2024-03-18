import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { formDataApi } from "../../services/api";
import { getToken } from "../../utils";
import { openMessage } from "./messageSlice";

const initialState = {
  loading: false,
  cars: [],
  car: null,
  status: "idle",
  pageSize: 12,
  currentPage: 1,
  totalPages: 0,
};

export const getCars = createAsyncThunk(
  "cars/getCars",
  async (
    { page, sortBy, make, transmission, minPrice, maxPrice },
    { rejectWithValue, dispatch, getState }
  ) => {
    try {
      const { pageSize } = getState().cars;
      const response = await api.get("/cars", {
        params: {
          page,
          pageSize,
          sortBy,
          make,
          transmission,
          minPrice,
          maxPrice,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage("network error", "error"));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCarsAndHandlePagination =
  (page, sortBy, make, transmission, minPrice, maxPrice) =>
  async (dispatch) => {
    dispatch(setCurrentPage(page));
    await dispatch(
      getCars({ page, sortBy, make, transmission, minPrice, maxPrice })
    );
  };

export const sellCar = createAsyncThunk(
  "cars/sellCar",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await formDataApi.post(`/seller/sell`, payload, {
        headers: { "x-auth-token": token },
      });

      dispatch(openMessage("car is successfully sell", "success"));

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage("missing data", "error"));
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPersonalCars = createAsyncThunk(
  "cars/getPersonalCars",
  async (page, { rejectWithValue, getState }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }
      const { pageSize } = getState().cars;

      const response = await api.get(
        `/seller/cars?page=${page}&pageSize=${pageSize}`,
        {
          headers: { "x-auth-token": token },
        }
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

export const fetchSellerCarsAndHandlePagination =
  (page) => async (dispatch) => {
    dispatch(setCurrentPage(page));
    await dispatch(getPersonalCars(page));
  };

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      await api.delete(`seller/remove/${id}`, {
        headers: { "x-auth-token": token },
      });
      dispatch(openMessage("car deleted successfully", "success"));
      return id;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      dispatch(openMessage(error.response.data.error, "error"));

      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserCar = createAsyncThunk(
  "cars/getCar",
  async (id, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.get(`seller/cars/${id}`, {
        headers: { "x-auth-token": token },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCarDetails = createAsyncThunk(
  "cars/updateCarDetails",
  async ({ id, payload }, { rejectWithValue, dispatch }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.patch(`seller/update/${id}`, payload, {
        headers: { "x-auth-token": token },
      });

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error);
      dispatch(openMessage(error.response.data.error, "error"));
      return rejectWithValue(error.response.data);
    }
  }
);
export const getCarById = createAsyncThunk(
  "cars/getCarById",
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.get(`/cars/${payload}`);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      console.log(error);
      dispatch(openMessage(error.response.data.error, "error"));
      return rejectWithValue(error.response.data);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sellCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(sellCar.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(sellCar.rejected, (state, action) => {
        state.loading = false;

        console.log(action);
        // state.error = action.error.message;
      })
      .addCase(getPersonalCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPersonalCars.fulfilled, (state, action) => {
        state.loading = false;

        state.cars = action.payload.cars || [];
        state.totalPages = action.payload.totalPages || 0;
        console.log(action);
      })
      .addCase(getPersonalCars.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.loading = false;

        const updatedCars = [...state.cars];
        state.cars = updatedCars.filter((car) => car?._id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getUserCar.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserCar.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload.car;
      })
      .addCase(getUserCar.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(getCarById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCarById.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload.car;
      })
      .addCase(getCarById.rejected, (state, action) => {
        state.loading = false;
        console.log(action);
      })
      .addCase(updateCarDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCarDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.car = action.payload;
      })
      .addCase(updateCarDetails.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getCars.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.loading = false;
        state.cars = action.payload.cars;
        state.totalPages = action.payload.totalCarsCount;
        console.log(action);
      })
      .addCase(getCars.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log(action);
      });
  },
});

export const { setCurrentPage } = carsSlice.actions;
export default carsSlice.reducer;
