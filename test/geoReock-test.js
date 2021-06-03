const tape = require("tape");
const d3 = require("../");
const pa = require("./data/pa.json");
const round = require("./utils/round");

tape("geoReock returns the Reock score of a GeoJSON feature", test => {
  test.equal(
    round(d3.geoReock(pa.features[0]), 4),
    0.4514
  );
  test.end();
});