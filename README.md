# d3-geo-compactness
A JavaScript library for computing the compactness of GeoJSON features. Measuring a map’s compactness can be a useful component in gerrymandering diagnostics, yet compactness alone is neither a necessary nor sufficient condition of a fair district map.

## Installing
If you use NPM, `npm install d3-geo-compactness`. Otherwise, download the [latest release](https://github.com/HarryStevens/d3-geo-compactness/blob/main/dist/d3-geo-compactness.zip). AMD, CommonJS, and vanilla environments are supported. In vanilla, a d3 global is exported:

```html
<script src="https://unpkg.com/d3-geo-compactness@0.1.1/dist/d3-geo-compactness.min.js"></script>
<script>

const compactness = d3.geoPolsbyPopper(GeoJSONObject);

</script>
```

## API Reference

<a name="geoHullRatio" href="#geoHullRatio">#</a> d3.<b>geoHullRatio</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/geoHullRatio.js "Source")

Returns the ratio of the area of the specified GeoJSON <i>object</i> to the area of its [convex hull](https://en.wikipedia.org/wiki/Convex_hull).

<a name="geoPolsbyPopper" href="#geoPolsbyPopper">#</a> d3.<b>geoPolsbyPopper</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/geoPolsbyPopper.js "Source")

Returns the Polsby-Popper score of the specified GeoJSON <i>object</i>. The [Polsby-Popper test](https://en.wikipedia.org/wiki/Polsby%E2%80%93Popper_test) compares a district’s area to the area of a circle whose circumference is equal to the length of the district’s perimeter. A district’s Polsby-Popper score is the square of its [Schwartzberg score](#geoSchwartzberg).

<a name="geoReock" href="#geoReock">#</a> d3.<b>geoReock</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/geoReock.js "Source")

Returns the Reock score of the specified GeoJSON <i>object</i>. The [Reock test](https://en.wikipedia.org/wiki/Reock_degree_of_compactness) compares a district’s area to the area of the smallest circle that encloses all of the district’s vertices.

<a name="geoSchwartzberg" href="#geoSchwartzberg">#</a> d3.<b>geoSchwartzberg</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/geoSchwartzberg.js "Source")

Returns the Schwartzberg score of the specified GeoJSON <i>object</i>. The Schwartzberg test compares the length of the district’s perimeter to the circumference of a circle whose area is equal to the district’s area. A district’s Schwartzberg score is the square root of its [Polsby-Popper score](#geoPolsbyPopper).

### Utilities

<a name="geoEnclose" href="#geoEnclose">#</a> d3.<b>geoEnclose</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/utils/geoEnclose.js "Source")

Returns a [GeoJSON Polygon](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6) representing the [minimum enclosing circle](https://observablehq.com/@fil/bounding-circles) of the specified GeoJSON <i>object</i>, used for computing the [Reock score](#geoReock) of a district.

<a name="geoHull" href="#geoHull">#</a> d3.<b>geoHull</b>(<i>object</i>) · [Source](https://github.com/harrystevens/d3-geo-compactness/blob/main/src/utils/geoHull.js "Source")

Returns a [GeoJSON Polygon](https://datatracker.ietf.org/doc/html/rfc7946#section-3.1.6) representing the spherical [convex hull](https://en.wikipedia.org/wiki/Convex_hull) of the specified GeoJSON <i>object</i>, used for computing the [convex hull ratio](#geoHullRatio) of a district.