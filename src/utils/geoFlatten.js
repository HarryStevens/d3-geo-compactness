// Flatten nested coordinates
export function geoFlatten(feature){
  let flattened = [];
  const { geometry } = feature;
  const { coordinates, type } = geometry;
  
  if (["Point", "MultiPoint", "LineString"].includes(type)){
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