const tape = require("tape");
const d3 = require("../");
const pa = require("./data/pa.json");
const pa05cd108 = require("./data/PA05CD108.json");;
const round = require("./utils/round");

tape("geoHullRatio returns the ratio of the GeoJSON feature's area to its convex hull's area", test => {
  test.equal(
    round(d3.geoHullRatio(pa.features[0]), 4),
    0.9201
  );
  test.equal(
    round(d3.geoHullRatio(pa05cd108), 4),
    0.8515
  );
  test.end();
});