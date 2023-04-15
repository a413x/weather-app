import React, { FC } from "react";
import moment from "moment-timezone";
import { Card } from "../common";
import { Title, Content, Hourly, Additional, ScaleSwitch } from "./components";
import { useAppSelector } from "../../store/hooks";
import { selectWeatherData } from "../../store/weatherDataSlice";
import { selectAppState } from "../../store/appSlice";
import styled from "styled-components";

const CurrentWeatherContainer = styled(Card)`
  position: relative;
  margin-top: 15px;
  color: white;
  background: ${(props) => (props.theme === "day" ? "#7575ff" : "#233665")};
`;

const CurrentWeather: FC = () => {
  const weatherData = useAppSelector(selectWeatherData);
  const { currentLocation: location } = useAppSelector(selectAppState);

  const { currentWeather, hourlyWeather, hourlyOrder, dailyWeather } =
    weatherData;
  const { sunrise, sunset } = currentWeather;

  const currentTimeObject =
    location.timezone === "auto" ? moment() : moment.tz(location.timezone);
  const currentTime = Date.parse(
    currentTimeObject.format("YYYY-MM-DD HH:mm:ss")
  );
  const theme = currentTime > sunrise && currentTime < sunset ? "day" : "night";

  return (
    <CurrentWeatherContainer theme={theme}>
      <Title
        location={location}
        currentTimeString={currentTimeObject.format("HH:mm")}
        yesterday_temperature={currentWeather.yesterday_temperature}
      />
      <Content currentWeather={currentWeather} theme={theme} />
      <Additional currentWeather={currentWeather} />
      <Hourly
        currentTime={currentTime}
        hourlyWeather={hourlyWeather}
        hourlyOrder={hourlyOrder}
        dailyWeather={dailyWeather}
      />
      <ScaleSwitch />
    </CurrentWeatherContainer>
  );
};

export default CurrentWeather;
