import moment, { Moment } from "moment-timezone";
import { DailyData, Normalized } from "../../store/weatherDataSlice";
import { Theme } from "../../types";

interface Params {
  currentTime: number;
  hourlyOrder: number[];
  dailyWeather: Normalized<DailyData>;
}

interface HourlyItem extends Partial<Theme> {
  time?: number;
  timeString?: string;
  dateString?: string;
  sunrise?: string;
  sunset?: string;
}

export const getHourlyItems = (params: Params) => {
  const { currentTime, hourlyOrder, dailyWeather } = params;
  const currentTimeObject = moment(currentTime);

  const closestTimeIndex = hourlyOrder.findIndex((time) => {
    const timeObject = moment(time);
    return (
      timeObject.date() === currentTimeObject.date() &&
      timeObject.hour() === currentTimeObject.hour()
    );
  });

  let prevTimeObject: Moment;
  let daily =
    dailyWeather[
      currentTimeObject.set({ hour: 0, minute: 0, second: 0 }).valueOf()
    ];
  const result = new Array<HourlyItem>();

  hourlyOrder.slice(closestTimeIndex, closestTimeIndex + 24).forEach((time) => {
    if (dailyWeather[time]) {
      daily = dailyWeather[time];
    }
    const { sunrise, sunset } = daily;
    const theme = time > sunrise && time < sunset ? "day" : "night";

    const timeObject = moment(time);
    const dateString = timeObject.format("DD MMM");
    const timeString = timeObject.format("HH:mm");

    if (prevTimeObject) {
      if (prevTimeObject.valueOf() < sunrise && time > sunrise) {
        result.push({ sunrise: moment(sunrise).format("HH:mm") });
      }
      if (prevTimeObject.valueOf() < sunset && time > sunset) {
        result.push({ sunset: moment(sunset).format("HH:mm") });
      }
      if (prevTimeObject.date() !== timeObject.date()) {
        result.push({ dateString });
      }
    }
    prevTimeObject = timeObject;

    return result.push({ time, timeString, theme });
  });

  return result;
};
