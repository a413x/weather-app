import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiError, Location } from "../api/types";
import { getWeatherForecastData } from "../api";
import { StateType } from "./store";
import { handleWeatherData } from "../utils/handleData";

export interface Normalized<T> {
  [time: number]: T;
}
export interface HourlyData {
  time: number;
  temperature_2m: number;
  relativehumidity_2m: number;
  apparent_temperature: number;
  weathercode: number;
  surface_pressure: number;
}
export interface DailyData {
  time: number;
  weathercode: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
  sunrise: number;
  sunset: number;
}
export interface CurrentWeatherState extends HourlyData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: number;
  yesterday_temperature: number;
  sunrise: number;
  sunset: number;
}
export interface WeatherData {
  currentWeather: CurrentWeatherState;
  dailyWeather: Normalized<DailyData>;
  hourlyWeather: Normalized<HourlyData>;
  hourlyOrder: number[];
  dailyOrder: number[];
}
interface WeatherDataState {
  data: WeatherData;
  loading: boolean;
  error: ApiError;
}

const initialState: WeatherDataState = {
  data: {
    currentWeather: {
      temperature: 0,
      windspeed: 0,
      winddirection: 0,
      weathercode: -1,
      time: 0,
      temperature_2m: 0,
      relativehumidity_2m: 0,
      apparent_temperature: 0,
      surface_pressure: 0,
      yesterday_temperature: 0,
      sunrise: 0,
      sunset: 0,
    },
    hourlyWeather: {},
    hourlyOrder: [],
    dailyWeather: {},
    dailyOrder: [],
  },
  loading: false,
  error: {
    error: false,
    reason: "",
  },
};

export const fetchWeatherData = createAsyncThunk(
  "weatherData/fetchWeatherData",
  async (location: Location) => {
    return await getWeatherForecastData(location);
  }
);

const weatherDataSlice = createSlice({
  name: "weatherData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeatherData.pending, (state) => {
      state.loading = true;
      state.error = { error: false, reason: "" };
    });
    builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = handleWeatherData(action.payload);
    });
    builder.addCase(fetchWeatherData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as ApiError;
    });
  },
});

export const selectWeatherData = (state: StateType) => state.weather.data;

export default weatherDataSlice.reducer;
