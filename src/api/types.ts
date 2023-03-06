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
  time: number;
}

export interface Hourly {
  time: number[];
  temperature_2m: number[];
  relativehumidity_2m: number[];
  apparent_temperature: number[];
  weathercode: number[];
  surface_pressure: number[];
}

export interface Daily {
  time: number[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface WeatherDataResponse {
  current_weather: CurrentWeather;
  hourly: Hourly;
  daily: Daily;
}
