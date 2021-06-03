// Polsby-Popper compares a district’s area
// to the area of a circle whose circumference
// is equal to the length of the district’s perimeter. 

import { geoArea, geoLength } from "d3-geo";

export function geoPolsbyPopper(feature) {
  return geoArea(feature) * Math.PI * 4 / geoLength(feature) ** 2;
}