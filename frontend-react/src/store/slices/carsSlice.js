import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getToken } from "../../utils";

const initialState = {
  loading: true,
  cars: [],
};

export const sellCar = createAsyncThunk(
  "cars/sellCar",
  async (payload, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.post(
        `/cars`,
        { ...payload },
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

export const getPersonalCars = createAsyncThunk(
  "cars/getPersonalCars",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await api.get(`/user/cars`, {
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

export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/cars/${id}`);
      return id;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
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
        console.log(action);
      })
      .addCase(getPersonalCars.rejected, (state, action) => {
        state.loading = false;

        console.log(action);
        // state.error = action.error.message;
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

        console.log(action);
        // state.error = action.error.message;
      });
  },
});

export const {} = carsSlice.actions;
export default carsSlice.reducer;
