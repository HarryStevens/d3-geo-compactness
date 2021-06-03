const tape = require("tape");
const d3 = require("../");
const pa = require("./data/pa.json");
const round = require("./utils/round");

tape("geoPolsbyPopper returns the Polsby-Popper score of a GeoJSON feature", test => {
  test.equal(
    round(d3.geoPolsbyPopper(pa.features[0]), 4),
    0.6276
  );
  test.end();
});