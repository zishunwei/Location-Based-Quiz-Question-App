var currentLayer;

// to store the real-time layer on map
var questionsLayer;

// check if this layer has been loaded on map
function checkQuestionsData() {
    if ((questionsLayer) && currentLayer == questionsLayer) {
        questionsLayer.remove();
        currentLayer = [];
    } else {
        if(questionsLayer){
            questionsLayer.remove()
        }
        if(lastWeekLayer){
            lastWeekLayer.remove()
        }
        if(closestFiveLayer){
            closestFiveLayer.remove()
        }
        getQuestionsData();
    }
}

// Send request to API to get the layer of questions created by current user and all users created
function getQuestionsData() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getQuestions/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            console.log(result); // check that the data is correct
            // add the JSON layer onto the map - it will appear using the default icons
            // load the geoJSON layer
            questionsLayer = L.geoJson(result,
                {
                    // use point to layer to create the points
                    pointToLayer: function (feature, latlng) {
                        // look at the GeoJSON file - specifically at the properties - to see the
                        // earthquake magnitude and use a different marker depending on this value
                        // also include a pop-up that shows the place value of the questions submitted
                        if (feature) {
                            return L.marker(latlng).bindPopup("<b>" + feature.properties.question_title + "</b>");
                        }
                    }, // end of point to layer
                }).addTo(mymap);
            // change the map zoom so that all the data is shown
            mymap.fitBounds(questionsLayer.getBounds());
            currentLayer = questionsLayer
        } // end of the inner function
    }); // end of the ajax request
} // end of the getQuestionsData function
