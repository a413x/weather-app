import { getLocations } from "../../api/methods";
import { LocationResponseObject, LocationsResponse } from "../../api/types";

export const loadLocationOptions = async (value: string) => {
  if (value.length < 2) return [];
  try {
    const locations: LocationsResponse = await getLocations(value);
    return locations.results.map((item: LocationResponseObject) => ({
      value: item.id,
      label: item.name,
      ...item,
    }));
  } catch (e) {
    return [];
  }
};

export const getLocationName = (option: LocationResponseObject) => {
  const { name, country, admin1, admin2, admin3, admin4 } = option;
  let result = name;
  if (country) {
    result += ` (${country}`;
    if (admin1) result += `, ${admin1}`;
    if (admin2) result += `, ${admin2}`;
    if (admin3) result += `, ${admin3}`;
    if (admin4) result += `, ${admin4}`;
    result += ")";
  }
  return result;
};
