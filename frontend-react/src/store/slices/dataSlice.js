import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  carListings: [],
  currentCar: null,
  status: "idle",
};

export const fetchCarListings = createAsyncThunk(
  "data/fetchCarListings",
  async () => {
    try {
      const response = await fetch("https://freetestapi.com/api/v1/cars");
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
      });
  },
});

// export const { setCarListings } = dataSlice.actions;
export default dataSlice.reducer;
