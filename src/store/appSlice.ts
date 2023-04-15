import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateType } from "./store";
import { LocationResponseObject } from "../api/types";
import { DEFAULT_LOCATION } from "../components/location-select/constants";
import { TemperatureUnit } from "../types";

interface AppState {
  currentLocation: LocationResponseObject;
  temperatureUnit: TemperatureUnit;
}

const initialState: AppState = {
  currentLocation: DEFAULT_LOCATION,
  temperatureUnit: "celsius",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
    setTemperatureUnit: (state, action: PayloadAction<TemperatureUnit>) => {
      state.temperatureUnit = action.payload;
    },
  },
});

export const { setCurrentLocation, setTemperatureUnit } = appSlice.actions;

export const selectAppState = (state: StateType) => state.app;

export default appSlice.reducer;
