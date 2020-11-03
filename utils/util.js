// Calculate distance between two coordinates

let calculateDistance = function (lat1, lon1, lat2, lon2) {
  let radLat1 = (Math.PI * lat1) / 180;
  let radLat2 = (Math.PI * lat2) / 180;
  let theta = lon1 - lon2;
  let radTheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radLat1) * Math.sin(radLat2) +
    Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;

  return (dist * 1.609344).toFixed(2);
};

// function that returns sorted user by distance

let getSortedResponse = function (defLat, defLon, rawResponse) {
  console.log(defLat, defLon);
  rawResponse.forEach((el) => {
    let lat1 = defLat;
    let lon1 = defLon;
    let lat2 = el.address.coordinates[0];
    let lon2 = el.address.coordinates[1];
    el["distance"] = calculateDistance(lat1, lon1, lat2, lon2);
  });

  const sortedResponse = rawResponse.sort(function (a, b) {
    return a.distance - b.distance;
  });

  return sortedResponse;
};

module.exports = getSortedResponse;
