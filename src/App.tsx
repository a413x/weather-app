import React, { useEffect } from "react";
import { useAppDispatch } from "./store/hooks";
import { fetchWeatherData } from "./store/weatherDataSlice";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchWeatherData({
        latitude: 51.51,
        longitude: -0.13,
        timezone: "Europe/London",
      })
    );
  }, []);

  return <div className="weather-app"></div>;
};

export default App;
