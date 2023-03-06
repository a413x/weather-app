import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./weatherDataSlice";

export const store = configureStore({
  reducer: {
    weather: weatherDataReducer,
  },
});

export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
