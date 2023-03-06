import moment from "moment";
import { Daily, Hourly, WeatherDataResponse } from "../api/types";
import {
  HourlyData,
  DailyData,
  WeatherData,
  Normalized,
} from "../store/weatherDataSlice";

const normalize = (data: Hourly | Daily) => {
  const result = {} as Normalized<HourlyData | DailyData>;
  data.time.forEach((time, index) => {
    result[time] = (Object.keys(data) as Array<keyof typeof data>).reduce(
      (values, key) => {
        values[key] = data[key][index];
        return values;
      },
      {} as HourlyData | DailyData
    );
  });
  return result;
};

export const handleWeatherData = (
  apiResponse: WeatherDataResponse
): WeatherData => {
  const { current_weather, hourly, daily } = apiResponse;
  const currentTime = current_weather.time;
  const yesterdayTime = moment.unix(currentTime).subtract(1, "days").unix();

  const hourlyWeather = normalize(hourly) as Normalized<HourlyData>;
  const currentWeather = {
    ...current_weather,
    ...hourlyWeather[currentTime],
    yesterday_temperature: hourlyWeather[yesterdayTime]?.temperature_2m || 0,
  };
  const dailyWeather = normalize(daily) as Normalized<DailyData>;

  return {
    currentWeather,
    dailyWeather,
    hourlyWeather,
    hourlyOrder: hourly.time,
    dailyOrder: daily.time,
  };
};
