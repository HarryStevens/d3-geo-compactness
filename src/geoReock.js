// Reock compares a district’s area
// to the area of the smallest circle
// that encloses all of the district’s vertices.

import { geoArea } from "d3-geo";
import { geoEnclose } from "./utils/geoEnclose.js";

export function geoReock(feature) {
  return geoArea(feature) / geoArea(geoEnclose(feature))
}