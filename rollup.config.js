import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "index.js",
  output: {
    extend: true,
    file: "dist/d3-geo-compactness.js",
    format: "umd",
    name: "d3"
  },
  plugins: [
    resolve({
      only: [
        "d3-array",
        "d3-collection",
        "d3-color",
        "d3-delaunay",
        "d3-format",
        "d3-geo",
        "d3-geo-voronoi",
        "d3-hierarchy",
        "d3-interpolate",
        "d3-scale",
        "d3-time",
        "d3-time-format",
        "d3-tricontour",
        "delaunator",
        "internmap"
      ]
    }),
    babel({
      exclude: "node_modules/**"
    })
  ]
};