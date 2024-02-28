import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import dataReducer from "./slices/dataSlice";
import showroomsReducer from "./slices/showroomsSlice";
import mediaReducer from "./slices/mediaSlice";
import carsReducer from "./slices/carsSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    showrooms: showroomsReducer,
    media: mediaReducer,
    data: dataReducer,
    cars: carsReducer,
  },
});
