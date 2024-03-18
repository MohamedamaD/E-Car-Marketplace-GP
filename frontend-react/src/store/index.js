import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./slices/authenticationSlice";
import dataReducer from "./slices/dataSlice";
import showroomsReducer from "./slices/showroomsSlice";
import mediaReducer from "./slices/mediaSlice";
import carsReducer from "./slices/carsSlice";
import messageReducer from "./slices/messageSlice";
import showroomOwnerReducer from "./slices/showroomOwnerSlice";

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    showroomOwner: showroomOwnerReducer,
    showrooms: showroomsReducer,
    media: mediaReducer,
    data: dataReducer,
    cars: carsReducer,
    messages: messageReducer,
  },
});
