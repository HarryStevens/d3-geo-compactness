const tape = require("tape");
const d3 = require("../");
const pa = require("./data/pa.json");
const round = require("./utils/round");

tape("geoHullRatio returns the ratio of the GeoJSON feature's area to its convex hull's area", test => {
  test.equal(
    round(d3.geoHullRatio(pa.features[0]), 4),
    0.9201
  );
  test.end();
});