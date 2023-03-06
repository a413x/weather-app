import qs from "qs";
import { getDateRange, request } from "../utils";
import { Location } from "./types";

const API_PREFIX = "https://api.open-meteo.com/v1/";
const DEFAULT_FORECAST_PARAMS = {
  hourly: [
    "temperature_2m",
    "relativehumidity_2m",
    "apparent_temperature",
    "weathercode",
    "surface_pressure",
  ],
  daily: [
    "weathercode",
    "temperature_2m_max",
    "temperature_2m_min",
    "sunrise",
    "sunset",
  ],
  current_weather: true,
  windspeed_unit: "ms",
  timeformat: "unixtime",
} as const;

export const getWeatherForecastData = async (location: Location) => {
  const { formatted } = getDateRange();
  const { start_date, end_date } = formatted;

  const queryParams = {
    ...DEFAULT_FORECAST_PARAMS,
    ...location,
    start_date,
    end_date,
  };

  const url =
    API_PREFIX +
    "forecast" +
    qs.stringify(queryParams, {
      addQueryPrefix: true,
      arrayFormat: "comma",
      encode: false,
    });

  return await request(url);
};
