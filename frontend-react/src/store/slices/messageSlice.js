import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
  open: false,
};

export const openMessage = (message, type) => (dispatch) => {
  dispatch(setOpen(true));
  dispatch(setMessage({ message, type }));
};

export const closeMessage = () => (dispatch) => {
  dispatch(setOpen(false));
  dispatch(setMessage({ message: "", type: "" }));
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setMessage, setOpen } = messageSlice.actions;
export default messageSlice.reducer;
