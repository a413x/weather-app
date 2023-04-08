import React, { FC, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { CustomSwiper, Temperature, WeatherIcon } from "../../common";
import { getHourlyItems } from "../methods";
import {
  DailyData,
  HourlyData,
  Normalized,
} from "../../../store/weatherDataSlice";
import styled from "styled-components";

export interface HourlyProps {
  hourlyWeather: Normalized<HourlyData>;
  hourlyOrder: number[];
  currentTime: number;
  dailyWeather: Normalized<DailyData>;
}

const HourlyContainer = styled(CustomSwiper)`
  position: relative;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid;
  .swiper-button-prev,
  .swiper-button-next {
    top: 39px;
  }
`;
const Delimiter = styled.div`
  height: 35px;
  opacity: 0.3;
  border-left: 2px solid;
  border-radius: 5px;
`;
const SunriseSunsetIcon = styled.i.attrs((props) => ({
  className: props.className,
}))`
  font-size: 18px;
  color: gold;
`;

const Hourly: FC<HourlyProps> = ({
  currentTime,
  hourlyWeather,
  hourlyOrder,
  dailyWeather,
}) => {
  const items = useMemo(
    () => getHourlyItems({ currentTime, hourlyOrder, dailyWeather }),
    [currentTime, hourlyOrder, dailyWeather]
  );

  if (items.length === 0) return null;

  return (
    <HourlyContainer>
      <Swiper slidesPerView={4} navigation modules={[Navigation]}>
        {items.map(
          ({ time, timeString, dateString, sunrise, sunset, theme }) => {
            if (sunrise || sunset) {
              return (
                <SwiperSlide key={sunrise || sunset}>
                  {sunrise || sunset}
                  <SunriseSunsetIcon
                    className={sunrise ? "icon-wi-sunrise" : "icon-wi-sunset"}
                  />
                  {sunrise ? "Sunrise" : "Sunset"}
                </SwiperSlide>
              );
            }

            if (dateString) {
              return (
                <SwiperSlide key={dateString}>
                  <div>{dateString}</div>
                  <Delimiter />
                </SwiperSlide>
              );
            }

            if (!time || !theme) return null;
            const weather = hourlyWeather[time];
            if (!weather) return null;
            const { weathercode, temperature_2m } = weather;

            return (
              <SwiperSlide key={time}>
                <div>{timeString}</div>
                <div>
                  <WeatherIcon
                    weathercode={weathercode}
                    fontSize={16}
                    theme={theme}
                  />
                </div>
                <div>
                  <Temperature temperature={temperature_2m} />
                </div>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </HourlyContainer>
  );
};

export default Hourly;
