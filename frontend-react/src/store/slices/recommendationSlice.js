import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPhoto: false,
  singleResult: "",
  multipleResult: [],
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setSingleResult: (state, action) => {
      state.singleResult = action.payload;
    },
    setMultipleResult: (state, action) => {
      console.log(action.payload);

      state.multipleResult = action.payload;
    },
    setIsPhoto: (state, action) => {
      state.isPhoto = action.payload;
    },
  },
});

export const { setSingleResult, setMultipleResult, setIsPhoto } =
  recommendationSlice.actions;
export default recommendationSlice.reducer;
