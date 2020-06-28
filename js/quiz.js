// code reference: HTML Form Popup and Proximity Alert - Sample Code.pdf in CEGE0043 module
// code reference: week3 practical for trackLocation and getDistance in CEGE0043 module
var quizLayer;

// create an array to store all the location tracking points
var trackLocationLayer = [];

// store the ID of the location tracker so that it can be used to switch the location tracking off
var geoLocationID;

// number of questions user has answered correctly
var numberCorrect;

// store the user's coords
var userlat;
var userlng;

var testMarkerBlue = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'blue'
});

var testMarkerPink = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'pink'
});

var testMarkerGreen = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'green'
});

var testMarkerRed = L.AwesomeMarkers.icon({
    icon: 'play',
    markerColor: 'red'
});


// Send request to API to get the quiz points by current user
function getQuizData() {
    if(lastFiveLayer){
        lastFiveLayer.remove()
    };
    if(incorrectLayer){
        incorrectLayer.remove()
    };
    if(quizLayer){
        quizLayer.remove()
    };
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getQuestions/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
// load the geoJSON layer
            quizLayer = L.geoJson(result,
                {
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
                        return L.marker(latlng, {icon: testMarkerBlue}).bindPopup(htmlString);
                    }, // end of point to layer
                }).addTo(mymap);
            mymap.fitBounds(quizLayer.getBounds());
        }
    }); // end of the ajax request

} // end of the getQuestionsData function

// Send request to API to get the quiz points by all users
function getAllQuiz() {
    if(lastFiveLayer){
        lastFiveLayer.remove()
    };
    if(incorrectLayer){
        incorrectLayer.remove()
    };
    if(quizLayer){
        quizLayer.remove()
    };
    refreshLocationLayers();
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getAllQuestions";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
// load the geoJSON layer
            quizLayer = L.geoJson(result,
                {
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
                        return L.marker(latlng, {icon: testMarkerBlue}).bindPopup(htmlString);
                    }, // end of point to layer
                }).addTo(mymap);
            mymap.fitBounds(quizLayer.getBounds());
        }
    }); // end of the ajax request

} // end of the getQuestionsData function

function checkAnswer(questionID) {
// get the answer from the hidden div
// NB - do this BEFORE you close the pop-up as when you close the pop-up the DIV is destroyed
    var answer = document.getElementById("answer" + questionID).innerHTML;
// now check the question radio buttons
    var correctAnswer = false;
    var answerSelected = 0;
    for (var i = 1; i < 5; i++) {
        if (document.getElementById(questionID + "_" + i).checked) {
            answerSelected = i;
        }
        if ((document.getElementById(questionID + "_" + i).checked) && (i == answer)) {
            alert("Well done");
            correctAnswer = true;
            quizLayer.eachLayer(function(layer){
                if (layer.feature.properties.id == questionID){
                    layer.setIcon(testMarkerGreen)
                    startAnswerUpload(questionID, answerSelected, answer)
                }
            }) // end pf eachLayer
            getNumberCorrect();
            alert("You have correctly answered " + numberCorrect + " questions ")
        }
    }
    if (correctAnswer === false) {
// they didn't get it right
        alert("Better luck next time");
        alert("The number of correct answer is " + answer);
        quizLayer.eachLayer(function(layer){
            if (layer.feature.properties.id == questionID){
                layer.setIcon(testMarkerRed)
                startAnswerUpload(questionID, answerSelected, answer)
            }
        }) // end pf eachLayer
        getNumberCorrect();
        alert("You have correctly answered " + numberCorrect + " questions ")
    }
// now close the popup
    mymap.closePopup();
// the code to upload the answer to the server would go here
// call an AJAX routine using the data
// the answerSelected variable holds the number of the answer
//that the user picked
}

function closestFormPoint() {
// take the leaflet formdata layer
// go through each point one by one
// and measure the distance to Warren Street
// for the closest point show the pop up of that point
    var minDistance = 1;
    var closestFormPoint = 0;
    console.log(quizLayer)
    quizLayer.eachLayer(function (layer) {
        var distance = calculateDistance(userlat,
            userlng, layer.getLatLng().lat, layer.getLatLng().lng, "K");
        if (distance < minDistance) {
            minDistance = distance;
            closestFormPoint = layer.feature.properties.id;
        }
    });
// for this to be a proximity alert, the minDistance must be
// closer than a given distance - you can check that here
// using an if statement
// show the popup for the closest point
    console.log(trackLocationLayer);
    quizLayer.eachLayer(function (layer) {
        if (layer.feature.properties.id == closestFormPoint) {
                layer.openPopup();
            }
    });
}

// code adapted from https://www.htmlgoodies.com/beyond/javascript/calculate-the-distance-between-two-points-in-your-web-apps.html
function calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var radlon1 = Math.PI * lon1 / 180;
    var radlon2 = Math.PI * lon2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    subAngle = Math.acos(subAngle);
    subAngle = subAngle * 180 / Math.PI; // convert the degree value returned by acos back to degrees from radians
    dist = (subAngle / 360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
    if (unit == "K") {
        dist = dist * 1.609344;
    } // convert miles to km
    if (unit == "N") {
        dist = dist * 0.8684;
    } // convert miles to nautical miles
    return dist;
}

// Refresh the location tracking
function refreshLocationLayers() {
    // disable the location tracking so that a new point won't be added while you are removing the old points
    // use the geoLocationID to do this
    navigator.geolocation.clearWatch(geoLocationID);

    // now loop through the array and remove any points
    // note that we start with the last point first as if you remove point 1 then point 2 becomes point 1 so
    // a loop doesn't work
    // also we use -1 as arrays in javascript start counting at 0
    for (var i = trackLocationLayer.length - 1; i > -1; i--) {
        console.log("removing point " + i + " which has coordinates " + trackLocationLayer[i].getLatLng());
        mymap.removeLayer(trackLocationLayer[i]);
    }
    trackLocationLayer = [];

    // optionally you can restart the tracking by calling trackLocation()
    trackLocation();
}