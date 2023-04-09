import React, { FC, useMemo } from "react";
import moment from "moment-timezone";
import { useAppSelector } from "../../store/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { Card, CustomSwiper, Temperature, WeatherIcon } from "../common";
import { selectWeatherData } from "../../store/weatherDataSlice";
import { WEATHER_CODES_DESCRIPTIONS } from "../../constants";
import styled from "styled-components";

const DailyContainer = styled(Card)`
  margin-top: 15px;
`;
const DailySwiper = styled(CustomSwiper)`
  .swiper-slide {
    div:not(:first-child) {
      margin-top: 7px;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    top: 59px;
  }
`;
const Date = styled.div<{ isTodayDate: boolean }>`
  font-weight: ${(props) => (props.isTodayDate ? "bold" : "normal")};
`;

const Daily: FC = () => {
  const weatherData = useAppSelector(selectWeatherData);
  const { dailyWeather, dailyOrder } = weatherData;

  const items = useMemo(() => {
    return dailyOrder.map((time, index) => {
      const timeObject = moment(time);
      const isTodayDate = index === 1;

      let date = timeObject.format("ddd, DD MMM");
      return { time, date, isTodayDate };
    });
  }, [dailyOrder]);

  return (
    <DailyContainer>
      {items.length === 0 && "Nothing to show"}
      <DailySwiper>
        <Swiper slidesPerView={3} navigation modules={[Navigation]}>
          {items.map(({ time, date, isTodayDate }) => {
            const weatherData = dailyWeather[time];
            if (!weatherData) return null;
            const { weathercode, temperature_2m_max, temperature_2m_min } =
              weatherData;

            return (
              <SwiperSlide key={time}>
                <Date isTodayDate={isTodayDate}>{date}</Date>
                <WeatherIcon
                  weathercode={weathercode}
                  fontSize={24}
                  theme="day"
                />
                <div>{WEATHER_CODES_DESCRIPTIONS[weathercode] || "N/A"}</div>
                <div>
                  <Temperature temperature={temperature_2m_max} /> /{" "}
                  <Temperature temperature={temperature_2m_min} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </DailySwiper>
    </DailyContainer>
  );
};

export default Daily;
