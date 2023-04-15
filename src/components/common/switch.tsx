import React, { FC, ReactElement } from "react";
import styled from "styled-components";

interface SwitchProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  checkedText?: string | ReactElement;
  uncheckedText?: string | ReactElement;
  checkedBackground?: string;
  uncheckedBackground?: string;
}

const SwitchButtonContainer = styled.div`
  cursor: pointer;
  user-select: none;
`;

const SwitchButton = styled.div<{
  checked: boolean;
  checkedBackground?: string;
  uncheckedBackground?: string;
}>`
  position: relative;
  width: 44px;
  height: 22px;
  border-radius: 100px;
  background: ${({ checked, checkedBackground, uncheckedBackground }) =>
    checked
      ? checkedBackground || "#1677ff"
      : uncheckedBackground || "#bababa"};
  transition: all 0.2s ease-in-out;
  &:before {
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    top: 2px;
    ${(props) => (props.checked ? "left: 24px;" : "left: 2px;")}
    border-radius: 50%;
    background: white;
    transition: all 0.2s ease-in-out;
  }
`;

const SwitchText = styled.div`
  position: absolute;
  top: 5px;
  font-size: 12px;
  line-height: 12px;
  transition: all 0.2s ease-in-out;
`;
const SwitchTextChecked = styled(SwitchText)`
  left: 5px;
`;
const SwitchTextUnchecked = styled(SwitchText)`
  right: 5px;
`;

const Switch: FC<SwitchProps> = ({
  checked,
  onChange,
  checkedText,
  uncheckedText,
  checkedBackground,
  uncheckedBackground,
}) => {
  const handleChange = () => {
    onChange(!checked);
  };

  return (
    <SwitchButtonContainer onClick={handleChange}>
      <SwitchButton
        checked={checked}
        checkedBackground={checkedBackground}
        uncheckedBackground={uncheckedBackground}
      />
      {checked && <SwitchTextChecked>{checkedText}</SwitchTextChecked>}
      {!checked && <SwitchTextUnchecked>{uncheckedText}</SwitchTextUnchecked>}
    </SwitchButtonContainer>
  );
};

export default Switch;
