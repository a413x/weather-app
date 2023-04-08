import React from "react";
import styled from "styled-components";

const DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

const WindDirectionContainer = styled.div`
  display: inline-flex;
  align-items: center;
`;

const Icon = styled.i<{ angle: number }>`
  font-size: 8px;
  opacity: 0.5;
  &:before {
    transform: rotate(${(props) => props.angle}deg);
  }
`;

const WindDirection = (props: { winddirection: number }) => {
  const { winddirection } = props;
  let angle = winddirection;

  const directionIndex =
    Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;

  return (
    <WindDirectionContainer>
      {DIRECTIONS[directionIndex]}
      <Icon className="icon-direction" angle={angle + 180 - 45} />
    </WindDirectionContainer>
  );
};

export default WindDirection;
