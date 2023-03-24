export interface Location {
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface ApiError {
  error: boolean;
  reason: string;
}

export interface CurrentWeather {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  time: string;
}

export interface Hourly {
  time: string[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  weathercode: number[];
  surface_pressure: number[];
}

export interface Daily {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface HourlyUnits {
  apparent_temperature: string;
  relativehumidity_2m: string;
  surface_pressure: string;
  temperature_2m: string;
  time: string;
  weathercode: string;
}

export interface DailyUnits {
  sunrise: string;
  sunset: string;
  temperature_2m_max: string;
  temperature_2m_min: string;
  time: string;
  weathercode: string;
}

export interface WeatherDataResponse {
  current_weather: CurrentWeather;
  hourly: Hourly;
  daily: Daily;
  hourly_units: HourlyUnits;
  daily_units: DailyUnits;
}

export interface LocationResponseObject extends Location {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  admin2?: string;
  admin3?: string;
  admin4?: string;
}

export interface LocationsResponse {
  results: LocationResponseObject[];
}
