// Reock compares a district’s area
// to the area of the smallest circle
// that encloses all of the district’s vertices.

import { geoArea, geoCentroid, geoCircle, geoDistance, geoStereographic } from "d3-geo";
import { geoVoronoi } from "d3-geo-voronoi";
import { packEnclose } from "d3-hierarchy";

export function geoReock(feature) {
  return geoArea(feature) / (Math.PI * geoEnclose(feature).r ** 2);
}

// https://observablehq.com/@fil/spherical-smallest-circle-problem
// https://observablehq.com/@fil/bounding-circles

const stereo = geoStereographic();

function geoEnclose(f) {
  const { type, coordinates } = f.geometry;
  return enclose(
    coordinates.flat(type == "Polygon" ? 1 : 2) /*.map(d => ((d[2] = 0.1), d))*/
  );
}

function enclose(points){
  const centroid = geoCentroid({ type: "MultiPoint", coordinates: points });
  stereo.rotate(centroid.map(d => -d));

  const { x, y, r } = packEnclose(stereoCircles(points));

  // the center of the spherical circle can be retrieved with a geoVoronoi of 3 of its points
  const f = [[x + r, y], [x - r, y], [x, y + r]].map(stereo.invert),
    c = geoVoronoi(f).triangles().features[0].properties.circumcenter;
  // for very large lists, c can be on the opposite side, check for that…
  if (geoDistance(c, centroid) > Math.PI / 2) {
    c[0] += 180;
    c[1] *= -1;
  }

  return { c, r: geoDistance(c, f[0]) }; // r is in radians
}

function stereoCircles(points) {
  return points.map(d => {
    const g = geoCircle()
        .center(d)
        .radius((d[2] || 0) + .2)().coordinates[0],
      f = [g[0], g[20], g[40]].map(stereo), // sample 3 of the 60 points given by geoCircle
      c = circumcenter(f);
    return {
      x: c[0],
      y: c[1],
      r: Math.hypot(c[0] - f[0][0], c[1] - f[0][1])
    };
  })
}

function distance2(A, B) {
  return (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]);
}

function circumcenter([A, B, C]) {
  const a2 = distance2(B, C),
    b2 = distance2(C, A),
    c2 = distance2(A, B),
    // barycentric weights
    a = a2 * (b2 + c2 - a2),
    b = b2 * (a2 + c2 - b2),
    c = c2 * (b2 + a2 - c2),
    d = a + b + c;

  return [
    (A[0] * a + B[0] * b + C[0] * c) / d,
    (A[1] * a + B[1] * b + C[1] * c) / d
  ];
}