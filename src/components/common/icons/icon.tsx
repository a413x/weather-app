import styled from "styled-components";

export interface IconProps {
  fontSize: number;
  color: string;
}

export default styled.i.attrs((props) => ({
  className: props.className,
}))<IconProps>`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
`;
