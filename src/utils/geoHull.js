import { groups } from "d3-array";
import { geoArea } from "d3-geo";
import { geoVoronoi } from "d3-geo-voronoi";

export function geoHull(feature){
  const flattened = flatten(feature);
  const hull = geoVoronoi(flattened).hull();
  // Test if the jiggle is necessary
  if (geoArea(hull) >= geoArea(feature)){
    return hull;
  }
  else {
    return geoVoronoi(jiggle(flattened)).hull();
  }
}

// Flatten nested coordinates
function flatten(feature){
  let flattened = [];
  const { geometry } = feature;
  const { coordinates, type } = geometry;
  
  if (["MultiPoint", "LineString"].includes(type)){
    flattened = coordinates;
  }
  
  else if (["MultiLineString", "Polygon"].includes(type)){
    flattened = denest(coordinates);
  }

  else if (type === "MultiPolygon"){
    for (let i = 0, l = coordinates.length; i < l; i++){
      flattened.push(denest(coordinates[i]))
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