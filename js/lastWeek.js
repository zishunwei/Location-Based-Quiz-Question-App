var lastWeekLayer;

// check if the layer of quiz points set by all users in the last week or other layers have existed to avoid the conflicts
function checkLastWeek() {
    if ((lastWeekLayer) && currentLayer == lastWeekLayer) {
        lastWeekLayer.remove();
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
        getLastWeek();
    }
}

// send request to API and load the layer of quiz points set by all users in the last week on map
function getLastWeek() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getLastWeek";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {

            lastWeekLayer = L.geoJson(result, {
                // use point to layer to create the points
                pointToLayer: function (feature, latlng) {
// in this case, we build an HTML DIV string
// using the values in the data
                    var htmlString = "<DIV id='popup'" + feature.properties.id + "><h4>" + feature.properties.question_title + "</h4><br>";
                    htmlString = htmlString + "<h5>" + feature.properties.question_text + "</h5><br>";
                    htmlString = htmlString + "<h6 id=" + feature.properties.id + "_1>" + "Answer 1: " + feature.properties.answer_1 + "</h6><br>";
                    htmlString = htmlString + "<h6 id=" + feature.properties.id + "_2>" + "Answer 2: " + feature.properties.answer_2 + "</h6><br>";
                    htmlString = htmlString + "<h6 id=" + feature.properties.id + "_3>" + "Answer 3: " + feature.properties.answer_3 + "</h6><br>";
                    htmlString = htmlString + "<h6 id=" + feature.properties.id + "_4>" + "Answer 4: " + feature.properties.answer_4 + "</h6><br>";
                    htmlString = htmlString + "<h6 id=answer" + feature.properties.id + ">" + "Correct Answer: Answer " + feature.properties.correct_answer + "</h6><br>";
                    htmlString = htmlString + "<h7 id=port_id" + feature.properties.port_id + ">" + "Question by " + feature.properties.port_id + "</h7><br>";
                    htmlString = htmlString + "</div>";
                    return L.marker(latlng, {icon: testMarkerBlue}).bindPopup(htmlString);
                }, // end of point to layer
            }).addTo(mymap);
            // change the map zoom so that all the data is shown
            mymap.fitBounds(lastWeekLayer.getBounds());
            currentLayer = lastWeekLayer
        }
    })// end of the ajax request
}
