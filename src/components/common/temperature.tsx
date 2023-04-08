import React, { FC } from "react";

interface TemperatureProps {
  temperature: number;
}

const Temperature: FC<TemperatureProps> = ({ temperature }) => {
  return (
    <span>
      {temperature > 0 && "+"}
      {Math.round(temperature)}°
    </span>
  );
};

export default Temperature;
