import React, { FC, FormEvent, useState, useEffect, useRef } from "react";
import { Input, DropdownList, DropdownListItem } from "../common";
import LocationSelectIcons from "./icons";
import { getLocationName, loadLocationOptions } from "./methods";
import { Location, LocationResponseObject } from "../../api/types";
import { DEFAULT_LOCATION } from "./constants";
import styled from "styled-components";

interface LocationSelectProps {
  onLocationChange: (location: Location) => void;
}

const LocationSelectContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
`;
const LocationInput = styled(Input)`
  padding-right: 60px;
`;

const LocationSelect: FC<LocationSelectProps> = ({ onLocationChange }) => {
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [activeOptionIndex, setActiveOptionIndex] = useState<number>(0);
  const [options, setOptions] = useState<LocationResponseObject[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!target) return;
      if (!containerRef?.current?.contains(target)) {
        setIsOpen(false);
      }
    };
    const keyboardSelect = (event: KeyboardEvent) => {
      const { key } = event;
      const increment = key === "ArrowUp" ? -1 : key === "ArrowDown" ? 1 : 0;
      if (increment !== 0) {
        event.preventDefault();
        let newIndex = activeOptionIndex + increment;
        if (newIndex < 0) newIndex = options.length - 1;
        if (newIndex > options.length - 1) newIndex = 0;
        setActiveOptionIndex(newIndex);
      }
      if (key === "Enter") {
        const option = options[activeOptionIndex];
        if (option) onOptionSelect(option);
        inputRef?.current?.blur();
      }
    };
    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("keydown", keyboardSelect);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("keydown", keyboardSelect);
    };
  });

  useEffect(() => {
    const delayId = setTimeout(() => {
      loadLocationOptions(location.name).then(setOptions);
    }, 100);
    return () => clearTimeout(delayId);
  }, [location]);

  const onInput = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setLocation({ ...location, name: value });
  };
  const onInputFocus = () => setIsOpen(true);
  const onOptionSelect = (option: LocationResponseObject) => {
    setLocation(option);
    onLocationChange(option);
    setIsOpen(false);
  };
  const onClearClick = () => {
    setLocation(DEFAULT_LOCATION);
  };

  return (
    <LocationSelectContainer ref={containerRef}>
      <LocationInput
        ref={inputRef}
        value={location.name}
        onChange={onInput}
        onFocus={onInputFocus}
      />
      {isOpen && options.length > 0 && (
        <DropdownList>
          {options.map((option, index) => {
            const { id } = option;
            return (
              <DropdownListItem
                key={id}
                active={activeOptionIndex === index}
                onMouseEnter={() => setActiveOptionIndex(index)}
                onClick={() => onOptionSelect(option)}
              >
                {getLocationName(option)}
              </DropdownListItem>
            );
          })}
        </DropdownList>
      )}
      <LocationSelectIcons
        onGetCurrentLocation={onLocationChange}
        onClearClick={onClearClick}
      />
    </LocationSelectContainer>
  );
};

export default LocationSelect;
