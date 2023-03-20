import { createSlice } from "@reduxjs/toolkit";
import { StateType } from "./store";
import { LocationResponseObject } from "../api/types";
import { DEFAULT_LOCATION } from "../components/location-select/constants";

interface AppState {
  currentLocation: LocationResponseObject;
}

const initialState: AppState = {
  currentLocation: DEFAULT_LOCATION,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setCurrentLocation } = appSlice.actions;
export const selectCurrentLocation = (state: StateType) =>
  state.app.currentLocation;

export default appSlice.reducer;
