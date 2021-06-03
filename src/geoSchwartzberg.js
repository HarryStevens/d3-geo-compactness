// Schwartzberg compares the length of the district’s perimeter
// to the circumference of a circle whose area
// is equal to the district’s area.

import { geoArea, geoLength } from "d3-geo";

export function geoSchwartzberg(feature) {
  return Math.PI * 2 * Math.sqrt(geoArea(feature) / Math.PI) / geoLength(feature);
}