// https://observablehq.com/@fil/spherical-smallest-circle-problem
// https://observablehq.com/@fil/bounding-circles

import { geoCentroid, geoCircle, geoDistance, geoStereographic } from "d3-geo";
import { geoVoronoi } from "d3-geo-voronoi";
import { packEnclose } from "d3-hierarchy";

const epsilon = 1e-6;

export function geoEnclose(feature){
  const { c, r } = encloseFeature(feature);

  return geoCircle()
    .center(c)
    .radius(r)
    ();
}

function circumcenter([A, B, C]){
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

function distance2(A, B) {
  return (A[0] - B[0]) * (A[0] - B[0]) + (A[1] - B[1]) * (A[1] - B[1]);
}

function enclose(points){
  const centroid = geoCentroid({ type: "MultiPoint", coordinates: points });
  const stereo = geoStereographic().rotate(centroid.map(d => -d));
  
  const stereoCircles = points.map(d => {
      const g = geoCircle()
          .center(d)
          .radius((d[2] || 0) + epsilon)().coordinates[0];
      const f = [g[0], g[20], g[40]].map(stereo); // sample 3 of the 60 points given by geoCircle
      const c = circumcenter(f);
      return {
        x: c[0],
        y: c[1],
        r: Math.hypot(c[0] - f[0][0], c[1] - f[0][1])
      };
    })

  const { x, y, r } = packEnclose(stereoCircles);

  // the center of the spherical circle can be retrieved with a geoVoronoi of 3 of its points
  const f = [[x + r, y], [x - r, y], [x, y + r]].map(stereo.invert),
        c = geoVoronoi(f).triangles().features[0].properties.circumcenter;

  // for very large lists, c can be on the opposite side, check for that…
  if (geoDistance(c, centroid) > Math.PI / 2) {
    c[0] += 180;
    c[1] *= -1;
  }

  return { c, r: (geoDistance(c, f[0]) * 180) / Math.PI };
}

function encloseFeature(f) {
  const { type, coordinates } = f.geometry;
  return enclose(
    coordinates.flat(type == "Polygon" ? 1 : 2)
  );
}