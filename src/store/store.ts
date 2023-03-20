import { configureStore } from "@reduxjs/toolkit";
import weatherDataReducer from "./weatherDataSlice";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    weather: weatherDataReducer,
    app: appReducer,
  },
});

export type DispatchType = typeof store.dispatch;
export type StateType = ReturnType<typeof store.getState>;
