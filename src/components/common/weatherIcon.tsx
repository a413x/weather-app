import React, { FC } from "react";
import { Icon, CombinedIcon } from "./icons";
import { ICONS_COLORS } from "./icons/constants";
import styled from "styled-components";

interface WeatherIconProps {
  weathercode: number;
  fontSize: number;
  theme?: "day" | "night";
}

const IconContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  i:before {
    margin: 0;
  }
`;

const WeatherIcon: FC<WeatherIconProps> = (props) => {
  const { weathercode, fontSize, theme = "day" } = props;
  const { yellowPrimary, bluePrimary, blueSecondary, white, grey } =
    ICONS_COLORS;
  const isDayTheme = theme === "day";

  let icon = (
    <Icon className="icon-na" color={bluePrimary} fontSize={fontSize} />
  );

  //clear sky
  if ([0, 1].includes(weathercode)) {
    const className = isDayTheme ? "icon-sun" : "icon-moon";
    icon = (
      <Icon className={className} color={yellowPrimary} fontSize={fontSize} />
    );
  }
  //cloudy
  if ([2].includes(weathercode)) {
    const secondaryClass = isDayTheme ? "icon-sun" : "icon-moon";
    const primaryColor = isDayTheme ? bluePrimary : white;
    const secondaryPosition = isDayTheme
      ? { top: -10, left: -10 }
      : { top: -20, right: -20 };
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-cloud"
        secondaryClass={secondaryClass}
        primaryColor={primaryColor}
        secondaryColor={yellowPrimary}
        secondaryScale={0.8}
        secondaryPosition={secondaryPosition}
      />
    );
  }
  //overcast
  if ([3].includes(weathercode)) {
    const primaryColor = isDayTheme ? bluePrimary : white;
    const secondaryColor = isDayTheme ? blueSecondary : grey;
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-cloud"
        secondaryClass="icon-cloud"
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        secondaryScale={0.8}
        secondaryPosition={{ top: -20, right: 0 }}
      />
    );
  }
  //fog
  if ([45].includes(weathercode)) {
    const color = isDayTheme ? blueSecondary : white;
    icon = <Icon className="icon-fog" color={color} fontSize={fontSize} />;
  }
  //depositing rime fog
  if ([48].includes(weathercode)) {
    const primaryColor = isDayTheme ? blueSecondary : white;
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-fog"
        secondaryClass="icon-snowflake"
        primaryColor={primaryColor}
        secondaryColor={blueSecondary}
        secondaryScale={0.4}
        secondaryPosition={{ bottom: 0, left: 0 }}
      />
    );
  }
  //drizzle
  if ([51, 53, 55].includes(weathercode)) {
    const color = isDayTheme ? bluePrimary : white;
    icon = <Icon className="icon-drizzle" color={color} fontSize={fontSize} />;
  }
  //freezing drizzle
  if ([56, 57].includes(weathercode)) {
    const primaryColor = isDayTheme ? blueSecondary : white;
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-drizzle"
        secondaryClass="icon-snowflake"
        primaryColor={primaryColor}
        secondaryColor={blueSecondary}
        secondaryScale={0.4}
        secondaryPosition={{ bottom: -10, left: -10 }}
      />
    );
  }
  //rain
  if ([61, 63, 65, 80, 81, 82].includes(weathercode)) {
    const color = isDayTheme ? bluePrimary : white;
    icon = <Icon className="icon-rain" color={color} fontSize={fontSize} />;
  }
  //freezing rain
  if ([66, 67].includes(weathercode)) {
    const primaryColor = isDayTheme ? blueSecondary : white;
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-rain"
        secondaryClass="icon-snowflake"
        primaryColor={primaryColor}
        secondaryColor={blueSecondary}
        secondaryScale={0.4}
        secondaryPosition={{ bottom: -20, left: -20 }}
      />
    );
  }
  //snow
  if ([71, 73, 75, 85, 86].includes(weathercode)) {
    const className = weathercode === 71 ? "icon-snow" : "icon-snow-heavy";
    const color = isDayTheme ? bluePrimary : white;
    icon = <Icon className={className} color={color} fontSize={fontSize} />;
  }
  //hail
  if ([77].includes(weathercode)) {
    const color = isDayTheme ? bluePrimary : white;
    icon = <Icon className="icon-hail" color={color} fontSize={fontSize} />;
  }
  if ([95].includes(weathercode)) {
    //thunderstorm
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-cloud"
        secondaryClass="icon-flash"
        primaryColor={grey}
        secondaryColor={yellowPrimary}
        secondaryScale={0.5}
        secondaryPosition={{ bottom: -30, left: 25 }}
      />
    );
  }
  if ([96, 99].includes(weathercode)) {
    //thunderstorm with hail
    icon = (
      <CombinedIcon
        fontSize={fontSize}
        primaryClass="icon-hail"
        secondaryClass="icon-flash"
        primaryColor={grey}
        secondaryColor={yellowPrimary}
        secondaryScale={0.5}
        secondaryPosition={{ bottom: -20, left: 25 }}
      />
    );
  }
  return <IconContainer size={fontSize}>{icon}</IconContainer>;
};

export default WeatherIcon;
