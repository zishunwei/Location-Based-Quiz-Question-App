// load the map
var mymap; // global variable to store the map

// Load the basic leaflet map
function loadLeafletMap() {
    mymap = L.map('mapid').setView([51.522449, -0.132630], 13);

    // load the tiles
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6I' +
        'mNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);

    // now add the click event detector to the map
    mymap.on('click', onMapClick);
}//end code to add the leaflet map


// create a custom popup
var popup = L.popup();
var coords;

// create an event detector to wait for the user's click event and then use the popup to show them where they clicked
// note that you don't need to do any complicated maths to convert screen coordinates to real world coordiantes
// - the Leaflet API does this for you
function onMapClick(e) {
    coords = e.latlng;
    popup
        .setLatLng(coords)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
}
