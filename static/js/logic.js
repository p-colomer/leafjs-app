// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;
// the steps to plotting a map are as follows:
// 1. create the tile layer that will be the background of the map
// 2. create the map object with options
// 3. pass our map layers into our layers control and add the layers control to the map
// 4. optional create the marker with the popup and add it to the map
// 5. add the tile layer to the map
// Create the createMap function.
function createMap(bikeStations) {
  // step 1 create the tile layer that will be the background of the map
  var streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // Create a baseMaps object to hold the lightmap layer.
  var baseMaps = {
    "Street Map": streetMap
  };
  // Create an overlayMaps object to hold the bikeStations layer.
  var overlayMaps = {
    "Bike Stations": bikeStations
  }
  // step 2 create the map object with options
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [streetMap, bikeStations]
  });
  // step 3 pass our map layers into our layers control and add the layers control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}
// Create the createMarkers function.
function createMarkers(response) {
  // Pull the "stations" property from response.data.
  var stations = response.data.stations;
  // Initialize an array to hold the bike markers.
  var bikeMarkers = [];
  // Loop through the stations array.
  for (var index = 0; index < stations.length; index++) {
    // For each station, create a marker, and bind a popup with the station's name.
    var station = stations[index];
    var bikeMarker = L.marker([station.lat, station.lon])
      .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "<h3>");
    // Add the marker to the bikeMarkers array.
    bikeMarkers.push(bikeMarker);
  }
  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.
  createMap(L.layerGroup(bikeMarkers));
}
// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.
d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json").then(createMarkers);
