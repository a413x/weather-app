import React, { FC } from "react";
import { Temperature } from "../../common";
import { LocationResponseObject } from "../../../api/types";
import styled from "styled-components";

interface TitleProps {
  location: LocationResponseObject;
  currentTimeString: string;
  yesterday_temperature: number;
}

const LocationName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const Title: FC<TitleProps> = ({
  location,
  currentTimeString,
  yesterday_temperature,
}) => {
  return (
    <div>
      <LocationName>{location.name || "N/A"}</LocationName>
      <div>
        {currentTimeString} now. Yesterday at this time{" "}
        <Temperature temperature={yesterday_temperature} />
      </div>
    </div>
  );
};

export default Title;
