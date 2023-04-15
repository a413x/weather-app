import React from "react";
import { Switch } from "../../common";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { selectAppState, setTemperatureUnit } from "../../../store/appSlice";
import { fetchWeatherData } from "../../../store/weatherDataSlice";
import styled from "styled-components";

const ScaleSwitchContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

const ScaleSwitch = () => {
  const { temperatureUnit } = useAppSelector(selectAppState);
  const dispatch = useAppDispatch();

  const onChange = (value: boolean) => {
    dispatch(setTemperatureUnit(value ? "celsius" : "fahrenheit"));
    dispatch(fetchWeatherData());
  };

  return (
    <ScaleSwitchContainer>
      <Switch
        checked={temperatureUnit === "celsius"}
        onChange={onChange}
        checkedText="°C"
        uncheckedText="°F"
        checkedBackground="#caab02"
        uncheckedBackground="#74aeff"
      />
    </ScaleSwitchContainer>
  );
};

export default ScaleSwitch;
