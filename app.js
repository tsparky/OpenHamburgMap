var transformRequest = (url, resourceType) => {
  var isMapboxRequest =
    url.slice(8, 22) === "api.mapbox.com" ||
    url.slice(10, 26) === "tiles.mapbox.com";
  return {
  url: isMapboxRequest
    ? url.replace("?", "?pluginName=sheetMapper&")
    : url
  };
};

mapboxgl.accessToken = 'pk.eyJ1IjoidHNwYXJreSIsImEiOiJjazhsZ3Jrd3IwNmo2M21vMjdiZTB1MW1pIn0.UACkUEO5Z2cAViX8cI1U2w';
var map = new mapboxgl.Map({
  container: 'map',
  style: "mapbox://styles/mapbox/streets-v11",
  center: [9.9938256, 53.5524528],
  zoom: 12,
  transformRequest: transformRequest
});

// Add zoom and rotation controls to the map
map.addControl(new mapboxgl.NavigationControl());

// Add geolocate control to the map
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
  trackUserLocation: true
  })
);

// Add fullscreen control
map.addControl(new mapboxgl.FullscreenControl());

// Add scale control
var scale = new mapboxgl.ScaleControl({
  maxWidth: 80,
  unit: 'metric'
});
map.addControl(scale);

// Init map
map.on("load", function() {
  init();
});

function init() {
  Tabletop.init({
    key: 'https://docs.google.com/spreadsheets/d/1P1vDlLYUEVEK78iYvtN7dftEnZ2lw98dKb2FwQkdts0/edit?usp=sharing',
    callback: addPoints,
    simpleSheet: true
  });
}

function addPoints(data) {
  data.forEach(function(row) {
    var popup = new mapboxgl.Popup()
    .setHTML(
      '<h3>' + row.Name + '</h3>' + 
      '<h4>' + '<b>' + 'Address: ' + '</b>' + row.Address + '</h4>' + 
      '<h4>' + '<b>' + 'Service: ' + '</b>' + row.Service + '</h4>' + 
      '<h4>' + '<b>' + 'Description: ' + '</b>' + row.Description + '</h4>' + 
      '<h4>' + '<b>' + 'Phone: ' + '</b>' + row.Phone + '</h4>' + 
      '<h4>' + '<b>' + 'Info: ' + '</b><a href="' + row.Info + '">Info</a></h4>' + 
      '<h4>' + '<b>' + 'More: ' + '</b><a href="' + row.More + '">More</a></h4>'
    ); 

    var marker = new mapboxgl.Marker({
      color: row.Service
    })
    .setLngLat([row.Longitude, row.Latitude])
    .setPopup(popup)
    .addTo(map);
  });
  console.log(data);
}
