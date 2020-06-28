// send request to API to get the the number of questions user answered correctly, and alert it after user answers a question
function getNumberCorrect() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getNumberCorrect/" + httpsPortNumberAPI;
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {
            numberCorrect = result[0].array_to_json[0].num_questions;
            console.log(numberCorrect)
        }
    })// end of the ajax request
} // end of the getNumberCorrect() function

