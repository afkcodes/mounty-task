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

const defCord = [17.385, 78.4867];

const arr = [
  {
      "address": {
          "coordinates": [
              23.344315,
              85.296013
          ],
          "street": "Lalpur",
          "locality": "Om tower",
          "city": "Ranchi",
          "state": "Jharkhand",
          "pincode": "834001",
          "coordinatesType": "GSON"
      },
      "_id": "5fa053ad7814f0f92dd521c3",
      "name": "Sohan",
      "mobile": "8051133668",
      "email": "c@e.com",
      "createdAt": "2020-11-02T18:45:01.599Z",
      "updatedAt": "2020-11-02T18:45:01.599Z",
      "__v": 0
  },
  {
      "address": {
          "coordinates": [
              23.669296,
              86.151115
          ],
          "street": "Gomia",
          "locality": "IEL",
          "city": "Bokaro",
          "state": "Jharkhand",
          "pincode": "829112",
          "coordinatesType": "GSON"
      },
      "_id": "5fa053777814f0f92dd521c2",
      "name": "Bhusan",
      "mobile": "8051133665",
      "email": "c@d.com",
      "createdAt": "2020-11-02T18:44:07.693Z",
      "updatedAt": "2020-11-02T18:44:07.693Z",
      "__v": 0
  },
  {
      "address": {
          "coordinates": [
              26.540457,
              88.719391
          ],
          "street": "Kolkata",
          "locality": "Hubli",
          "city": "Howrah",
          "state": "West Bengal",
          "pincode": "560078",
          "coordinatesType": "GSON"
      },
      "_id": "5fa052d27814f0f92dd521c0",
      "name": "Monchen",
      "mobile": "8051133662",
      "email": "a@a.com",
      "createdAt": "2020-11-02T18:41:22.218Z",
      "updatedAt": "2020-11-02T18:41:22.218Z",
      "__v": 0
  },
  {
      "address": {
          "coordinates": [
              16.1667,
              74.833298
          ],
          "street": "Jp Nagar",
          "locality": "6th phase",
          "city": "Bengaluru",
          "state": "karnataka",
          "pincode": "560078",
          "coordinatesType": "GSON"
      },
      "_id": "5fa052647814f0f92dd521bf",
      "name": "Ashish",
      "mobile": "8051133661",
      "email": "a@a.com",
      "createdAt": "2020-11-02T18:39:32.027Z",
      "updatedAt": "2020-11-02T18:39:32.027Z",
      "__v": 0
  }
]


// console.log(arr);

// const arr = [
//   { name: "Ashish", coords: [16.1667, 74.833298] },
//   { name: "Monchen", coords: [24.879999, 74.629997] },
//   { name: "Shashi", coords: [16.994444, 73.300003] },
//   { name: "Hatim", coords: [19.155001, 72.849998] },
// ];

function getSortedResponse(defCoords, rawResponse) {
  rawResponse.forEach((el) => {
    let lat1 = defCord[0];
    let lon1 = defCord[1];
    let lat2 = el.address.coordinates[0];
    let lon2 = el.address.coordinates[1];
    el["distance"] = calculateDistance(lat1, lon1, lat2, lon2);
  });

  rawResponse.sort(function (a, b) {
    return a.distance - b.distance;
  });

  return rawResponse;
}

console.log(getSortedResponse(defCord, arr));