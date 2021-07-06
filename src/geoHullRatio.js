// Compares a district’s area
// to the area of its convex hull.

import { geoArea } from "d3-geo";
import { geoHull } from "./utils/geoHull.js";

export function geoHullRatio(feature) {
  return geoArea(feature) / geoArea(geoHull(feature));
}