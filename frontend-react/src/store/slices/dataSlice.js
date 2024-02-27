import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import { getToken } from "../../utils";
import { setSuccess } from "./authenticationSlice";

const initialState = {
  carListings: [],
  currentCar: null,
  cars: [],
  showroom: null,
  status: "idle",
};

export const fetchCarListings = createAsyncThunk(
  "data/fetchCarListings",
  async (limit = 10) => {
    try {
      const response = await fetch(
        `https://freetestapi.com/api/v1/cars?limit=${limit}`
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCarByName = createAsyncThunk(
  "data/fetchCarByName",
  async (title) => {
    try {
      const response = await fetch(
        `https://freetestapi.com/api/v1/cars?search=${title}`
      );
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const fetchCarById = createAsyncThunk(
  "data/fetchCarById",
  async (id) => {
    try {
      console.log(id);
      const response = await fetch(`https://freetestapi.com/api/v1/cars/${id}`);
      return response.json();
    } catch (error) {
      throw error;
    }
  }
);

export const fetchShowroom = createAsyncThunk(
  "data/fetchShowroom",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/showrooms/${id}`);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getLocationCars = createAsyncThunk(
  "data/getLocationCars",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/locations/cars/${id}`);

      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellCar = createAsyncThunk(
  "data/sellCar",
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

export const deleteCar = createAsyncThunk(
  "data/deleteCar",
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

export const getPersonalCars = createAsyncThunk(
  "data/getPersonalCars",
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

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarListings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarListings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carListings = action.payload;
      })
      .addCase(fetchCarListings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCarById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCarByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarByName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.carListings = action.payload;
      })
      .addCase(fetchCarByName.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchShowroom.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchShowroom.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.showroom = action.payload.showroom;
      })
      .addCase(fetchShowroom.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        state.error = action.error.message;
      })
      .addCase(getLocationCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLocationCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.showroom = action.payload.showroom;
      })
      .addCase(getLocationCars.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        // state.error = action.error.message;
      })
      .addCase(sellCar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(sellCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.showroom = action.payload.showroom;
        console.log(action);
      })
      .addCase(sellCar.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        // state.error = action.error.message;
      })
      .addCase(getPersonalCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPersonalCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload.cars || [];
      })
      .addCase(getPersonalCars.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        // state.error = action.error.message;
      })
      .addCase(deleteCar.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCars = [...state.cars];
        state.cars = updatedCars.filter((car) => car?._id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.status = "failed";
        console.log(action);
        // state.error = action.error.message;
      });
  },
});

// export const { setCarListings } = dataSlice.actions;
export default dataSlice.reducer;
