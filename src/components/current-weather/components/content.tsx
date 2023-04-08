import React, { FC } from "react";
import { WeatherIcon, Temperature } from "../../common";
import { WEATHER_CODES_DESCRIPTIONS } from "../../../constants";
import { CurrentWeatherState } from "../../../store/weatherDataSlice";
import { Theme } from "../../../types";
import styled from "styled-components";

interface ContentProps extends Theme {
  currentWeather: CurrentWeatherState;
}

const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const ContentTemperature = styled.div`
  font-size: 48px;
  margin-right: 20px;
`;
const FeelsLike = styled.div`
  font-size: 14px;
`;
const WeatherDescription = styled.div`
  max-width: 120px;
  margin-left: 20px;
  font-size: 16px;
  font-weight: bold;
`;

const Content: FC<ContentProps> = ({ currentWeather, theme }) => {
  const { temperature, weathercode, apparent_temperature } = currentWeather;
  return (
    <ContentContainer>
      <ContentTemperature>
        <Temperature temperature={temperature} />
        <FeelsLike>
          Feels like <Temperature temperature={apparent_temperature} />
        </FeelsLike>
      </ContentTemperature>
      <WeatherIcon weathercode={weathercode} fontSize={48} theme={theme} />
      <WeatherDescription>
        {WEATHER_CODES_DESCRIPTIONS[weathercode] || ""}
      </WeatherDescription>
    </ContentContainer>
  );
};

export default Content;
