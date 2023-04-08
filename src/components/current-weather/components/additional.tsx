import React, { FC } from "react";
import { WindDirection } from "../../common";
import { CurrentWeatherState } from "../../../store/weatherDataSlice";
import styled from "styled-components";

interface AdditionalProps {
  currentWeather: CurrentWeatherState;
}

const AdditionalContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const AdditionalIcon = styled.i.attrs((props) => ({
  className: props.className,
}))`
  opacity: 0.5;
`;

const Humidity = styled.div`
  margin: 0 10px;
`;

const Pressure = styled.div`
  display: flex;
  align-items: center;
  i {
    font-size: 19px;
  }
`;

const Additional: FC<AdditionalProps> = ({ currentWeather }) => {
  const { winddirection, windspeed, relativehumidity_2m, surface_pressure } =
    currentWeather;
  return (
    <AdditionalContainer>
      <div>
        <AdditionalIcon className="icon-wind" />
        {windspeed} m/s, <WindDirection winddirection={winddirection} />
      </div>
      <Humidity>
        <AdditionalIcon className="icon-drop" />
        {relativehumidity_2m} %
      </Humidity>
      <Pressure>
        <AdditionalIcon className="icon-barometer" /> {surface_pressure} hPa
      </Pressure>
    </AdditionalContainer>
  );
};

export default Additional;
