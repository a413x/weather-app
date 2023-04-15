import React from "react";
import { Location } from "../../api/types";
import styled from "styled-components";

interface LocationSelectIconsProps {
  onGetCurrentLocation: (coords: Location) => void;
  onClearClick: () => void;
}

const LocationSelectIconsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  & i {
    color: grey;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
`;

const LocationSelectIcons = (props: LocationSelectIconsProps) => {
  const { onGetCurrentLocation, onClearClick } = props;

  const onCurrentLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        onGetCurrentLocation({
          latitude,
          longitude,
          timezone: "auto",
          name: "Current location",
        });
      },
      (error) => {
        alert("Error getting geolocation: " + error.message);
      }
    );
  };

  return (
    <LocationSelectIconsContainer>
      <i className="icon-location" onClick={onCurrentLocationClick} />
      <i className="icon-cancel" onClick={onClearClick} />
    </LocationSelectIconsContainer>
  );
};

export default LocationSelectIcons;
