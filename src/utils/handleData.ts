import moment from "moment";
import {
  Daily,
  DailyUnits,
  Hourly,
  HourlyUnits,
  WeatherDataResponse,
} from "../api/types";
import {
  HourlyData,
  DailyData,
  WeatherData,
  Normalized,
} from "../store/weatherDataSlice";

interface NormalizedResponse<T> {
  data: Normalized<T>;
  order: number[];
}

const normalize = (data: Hourly | Daily, units: HourlyUnits | DailyUnits) => {
  const resultData = {} as Normalized<HourlyData | DailyData>;
  const resultOrder: number[] = [];

  data.time.forEach((time, index) => {
    const timeValue = moment(time).valueOf();
    resultOrder.push(timeValue);
    resultData[timeValue] = (
      Object.keys(data) as Array<keyof typeof data>
    ).reduce((values, key) => {
      let value = data[key][index];
      if (units[key] === "iso8601") {
        value = moment(value).valueOf();
      }
      values[key] = value as number;
      return values;
    }, {} as HourlyData | DailyData);
  });
  return { data: resultData, order: resultOrder };
};

export const handleWeatherData = (
  apiResponse: WeatherDataResponse
): WeatherData => {
  const { current_weather, hourly, daily, hourly_units, daily_units } =
    apiResponse;

  const currentTimeObject = moment(current_weather.time);
  const currentTime = currentTimeObject.valueOf();
  const yesterdayTime = currentTimeObject.subtract(1, "days").valueOf();

  const { data: hourlyWeather, order: hourlyOrder } = normalize(
    hourly,
    hourly_units
  ) as NormalizedResponse<HourlyData>;
  const { data: dailyWeather, order: dailyOrder } = normalize(
    daily,
    daily_units
  ) as NormalizedResponse<DailyData>;

  const dailyToday = dailyWeather[dailyOrder[1]];

  const currentWeather = {
    ...current_weather,
    ...hourlyWeather[currentTime],
    time: currentTime,
    yesterday_temperature: hourlyWeather[yesterdayTime]?.temperature_2m || 0,
    sunrise: dailyToday?.sunrise,
    sunset: dailyToday?.sunset,
  };

  return {
    currentWeather,
    dailyWeather,
    hourlyWeather,
    hourlyOrder,
    dailyOrder,
  };
};
