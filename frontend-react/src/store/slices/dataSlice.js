import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carListings: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setCarListings: (state, action) => {
      state.carListings = action.payload;
    },
  },
});

export const { setCarListings } = dataSlice.actions;
export default dataSlice.reducer;
