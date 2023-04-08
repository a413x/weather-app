import styled from "styled-components";

const CustomSwiper = styled.div`
  .swiper-slide {
    display: flex;
    flex-flow: column;
    align-items: center;
    div:not(:first-child) {
      margin-top: 3px;
    }
  }
  .swiper-button-prev,
  .swiper-button-next {
    width: 25px;
    height: 25px;
    color: white;
    border-radius: 50%;
    background: #9f9fff80;
    &:after {
      font-size: 10px;
      line-height: 10px;
    }
  }
  .swiper-button-prev {
    left: 0;
  }
  .swiper-button-next {
    right: 0;
  }
`;

export default CustomSwiper;
