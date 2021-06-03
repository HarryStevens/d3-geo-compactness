const tape = require("tape");
const d3 = require("../");
const pa = require("./data/pa.json");
const round = require("./utils/round");

tape("geoSchwartzberg returns the Schwartzberg score of a GeoJSON feature", test => {
  test.equal(
    round(d3.geoSchwartzberg(pa.features[0]), 4),
    0.7922
  );
  test.end();
});