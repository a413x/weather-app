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
  const [options, setOptions] = useState<LocationResponseObject[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const clickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (!target) return;
      if (!containerRef || !containerRef.current) return;
      const container = containerRef.current as Node;
      if (!container.contains(target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
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
  const onOptionClick = (option: LocationResponseObject) => {
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
        value={location.name}
        onChange={onInput}
        onFocus={onInputFocus}
      />
      {isOpen && options.length > 0 && (
        <DropdownList>
          {options.map((option) => {
            const { id } = option;
            return (
              <DropdownListItem key={id} onClick={() => onOptionClick(option)}>
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
