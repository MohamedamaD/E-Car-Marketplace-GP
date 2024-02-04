import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import dataReducer from "./slices/dataSlice";
export const store = configureStore({
  reducer: { authentication: authenticationReducer, data: dataReducer },
});
