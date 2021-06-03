// Compares a district’s area
// to the area of its convex hull.

import { groups } from "d3-array";
import { geoArea } from "d3-geo";
import { geoVoronoi } from "d3-geo-voronoi";

export function geoHullRatio(feature) {
  return geoArea(feature) / geoArea(geoHull(feature));
}

function geoHull(feature){
  return geoVoronoi(jiggle(flatten(feature))).hull();
}

// Flatten nested coordinates
function flatten(feature){
  let flattened = [];
  const { geometry } = feature;
  const { coordinates, type } = geometry;
  
  if (type === "Polygon"){
    flattened = denest(coordinates);
  }
  
  else if (type === "MultiPolygon"){
    for (let i = 0, l = coordinates.length; i < l; i++){
      flattened.push(denest(coordinates[i]));
    }
    flattened = denest(flattened);
  }
  
  return flattened;
}

function denest(array){
  return [].concat.apply([], array);
}

// Jiggle longitudes
// geoVoronoi().hull() has a bug when provided duplicate coordinates
function jiggle(coords){
  const jiggled = [];
  const epsilon = 1e-6;
  const grouped = groups(coords, d => d[0]);

  for (let i = 0, l = grouped.length; i < l; i++){
    const entries = grouped[i][1];
    for (let i0 = 0, l0 = entries.length; i0 < l0; i0++){
      const [x, y] = entries[i0]
      const s = i0 % 2 === 0 ? 1 : -1;
      const e = s * epsilon * Math.ceil(i0 / 2);
      jiggled.push([x + e, y]);        
    }
  }
  
  return jiggled;
}