var ranking;

// Send request to API to get the ranking of the user and alert it
function getRanking() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getRanking/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            ranking = result[0].array_to_json[0].rank;
            console.log(ranking);
            alert ("Your ranking currently is " + ranking + ", good luck!");
        }
    })// end of the ajax request
} // end of the getNumberCorrect() function

