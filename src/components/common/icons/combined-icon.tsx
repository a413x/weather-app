import React from "react";
import { Icon } from "./index";
import { IconProps } from "./icon";
import styled from "styled-components";

interface CombinedIconProps {
  fontSize: number;
  primaryColor: string;
  secondaryColor: string;
  primaryClass: string;
  secondaryClass: string;
  secondaryScale: number;
  secondaryPosition: Position;
}
interface Position {
  top?: number;
  left?: number;
  right?: number;
  bottom?: number;
}
interface SecondaryIconProps extends IconProps {
  scale: number;
  position: Position;
}

const PrimaryIcon = styled(Icon)`
  position: absolute;
`;
const SecondaryIcon = styled(Icon)<SecondaryIconProps>`
  position: absolute;
  ${(props) => {
    const {
      position: { top, left, right, bottom },
    } = props;
    return `
    ${top !== undefined ? `top: ${top}%;` : ""}
    ${left !== undefined ? `left: ${left}%;` : ""}
    ${right !== undefined ? `right: ${right}%;` : ""}
    ${bottom !== undefined ? `bottom: ${bottom}%;` : ""}
  `;
  }}}
  font-size: ${(props) => props.scale * props.fontSize}px;
`;
const CombinedIcon = (props: CombinedIconProps) => {
  const {
    primaryClass,
    secondaryClass,
    primaryColor,
    secondaryColor,
    fontSize,
    secondaryScale,
    secondaryPosition,
  } = props;

  return (
    <>
      <SecondaryIcon
        className={secondaryClass}
        color={secondaryColor}
        fontSize={fontSize}
        scale={secondaryScale}
        position={secondaryPosition}
      />
      <PrimaryIcon
        className={primaryClass}
        color={primaryColor}
        fontSize={fontSize}
      />
    </>
  );
};

export default CombinedIcon;
