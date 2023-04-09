import React from "react";
import { useAppDispatch } from "./store/hooks";
import { fetchWeatherData } from "./store/weatherDataSlice";
import { setCurrentLocation } from "./store/appSlice";
import LocationSelect from "./components/location-select";
import CurrentWeather from "./components/current-weather";
import { Location } from "./api/types";
import "./assets/fontello/css/fontello.css";
import "swiper/css";
import "swiper/css/navigation";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 370px;
  font-family: Roboto, Arial, sans-serif;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.88);
`;

const App = () => {
  const dispatch = useAppDispatch();

  const onLocationChange = (location: Location) => {
    dispatch(fetchWeatherData(location));
    dispatch(setCurrentLocation(location));
  };

  return (
    <AppContainer>
      <LocationSelect onLocationChange={onLocationChange} />
      <CurrentWeather />
    </AppContainer>
  );
};

export default App;
