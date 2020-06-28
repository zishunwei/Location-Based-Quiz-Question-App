var incorrectLayer;

// check if incorrect quiz points layer or other layers have existed to avoid the conflicts
function checkIncorrect() {

    if (quizLayer) {
        quizLayer.remove()
    }
    if (lastFiveLayer) {
        lastFiveLayer.remove()
    }
    if (incorrectLayer) {
        incorrectLayer.remove()
    }
    refreshLocationLayers();
    getIncorrect();

}

// send request to API and load incorrect five quiz points layer on map 
function getIncorrect() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getIncorrect/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {

            incorrectLayer = L.geoJson(result, {
                // use point to layer to create the points
                pointToLayer: function (feature, latlng) {
// in this case, we build an HTML DIV string
// using the values in the data
                    var htmlString = "<DIV id='popup'" + feature.properties.id + "><h2>" + feature.properties.question_title + "</h2><br>";
                    htmlString = htmlString + "<h3>" + feature.properties.question_text + "</h3><br>";
                    htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + "_1' /> " + feature.properties.answer_1 + " <br> ";
                    htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + "_2' /> " + feature.properties.answer_2 + " <br> ";
                    htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + "_3' /> " + feature.properties.answer_3 + " <br> ";
                    htmlString = htmlString + "<input type='radio' name='answer' id='" + feature.properties.id + "_4' /> " + feature.properties.answer_4 + " <br> ";
                    htmlString = htmlString + "<button onclick='checkAnswer(" + feature.properties.id + ");return false;'>Submit Answer</button>";
// now include a hidden element with the answer
// in this case the answer is always the first choice
// for the assignment this will of course vary - you can use feature.properties.correct_answer
                    htmlString = htmlString + "<div id=answer" + feature.properties.id + " hidden>" + feature.properties.correct_answer + "</div>";
                    htmlString = htmlString + "</div>";
                    if (feature.properties.answer_correct) {
                        return L.marker(latlng, {icon: testMarkerGreen}).bindPopup(htmlString);
                    } else {
                        return L.marker(latlng, {icon: testMarkerRed}).bindPopup(htmlString);
                    }
                }, // end of point to layer
            }).addTo(mymap);
            // change the map zoom so that all the data is shown
            mymap.fitBounds(incorrectLayer.getBounds());
            quizLayer = incorrectLayer;

        }
    })// end of the ajax request
}