// Use Geolocation of navigator to track user's location
function trackLocation() {
    if (navigator.geolocation) {
        geoLocationID = navigator.geolocation.watchPosition(showPosition);
    } else {
        document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
    }
}

// Push the tracking location to a map layer, store the coords into global variables, do closestFormPoint()
function showPosition(position) {
    console.log(position)
    // add the new point into the array
    // the 'push' command just creates another pigeonhole in an array which will then contain the new marker point
    trackLocationLayer.push(L.marker([position.coords.latitude, position.coords.longitude], {icon: testMarkerPink})
        .bindPopup("This is where you are").addTo(mymap));
    userlat = position.coords.latitude;
    userlng = position.coords.longitude;
    // only use closestFormData() in quiz app
    if ($('#question_setting_app_title').is(':hidden')) {
        console.log(trackLocationLayer);
        // only check for the first location tracking
        // if users move and think it should be checked again, they can use Refresh Location button to reset trackLocationLayer.
        // and then the closestFormPoint function can restart
        // it is to avoid the quiz point pops up unlimitedly (pop up when the tracking location updates)
        if (trackLocationLayer.length <= 2) {
            // I found in Chorme (desktop) can not record the array having one item, using "<= 2" there
            // if (trackLocationLayer.length <= 1){
            // using "<= 1" is okay for my tests on safari and Egde
            closestFormPoint()
        }
    }
}