// Reference: CEGE0043 week 7 practicals; SQL by Claire Ellul
var correct_answer;

// Get the text values input by user from the form and return a post string including these
function startQuestionUpload(correct_answer) {

    //Get some text values – question_title, question_tex, answer_1...
    //Use .value to get the text in each of the text boxes
    var question_title = document.getElementById("question_title").value;
    var question_text = document.getElementById("question_text").value;
    var answer_1 = document.getElementById("answer_1").value;
    var answer_2 = document.getElementById("answer_2").value;
    var answer_3 = document.getElementById("answer_3").value;
    var answer_4 = document.getElementById("answer_4").value;

    // To hold all the parameters to pass to the server – postString.
    //Use the + to join the different bits of the string together
    // use the & to separate out the different parameters (this is a standard separator for HTTP AJAX)
    var postString = "question_title=" + question_title + "&question_text=" + question_text + "&answer_1=" + answer_1 +
        "&answer_2=" + answer_2 + "&answer_3=" + answer_3 + "&answer_4=" + answer_4

    // now add port id
    postString = postString + "&port_id=" + httpsPortNumberAPI;

    // now get the radio button values (correct answer)
    // notice: the correct answer is an integer: 1, 2, 3 or 4
    postString = postString + "&correct_answer=" + correct_answer;

    // now get the correct answer, which will be checked by following functions
    postString = postString + "&longitude=" + coords.lng + "&latitude=" + coords.lat;

    alert(postString);

    processData(postString);
} // close off the startDataUpload function


// Create the AJAX request
// note the uses of the API port number as this is where the request will be submitted
function processData(postString) {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/insertQuestion"
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function (data) {
            console.log(data);
            dataUploaded(data);
        },
        data: postString
    });
}

// check if there is a coords obtained by the click on map
// check if user choose a correct answer
function checkForm(){
    if (coords) {
        correct_answer = 0;
        for (var i = 1; i < 5; i++) {
            if (document.getElementById("select_answer_" + i).checked) {
                correct_answer = i;
                startQuestionUpload(correct_answer);
            }
        }
        if (correct_answer == 0) {
            alert("Please choose a correct answer")
        }
    } else {
        alert("Please  click on map to choose the location you would like to add a question at")
    }
}

// create the code to process the response from the data server
function dataUploaded(data) {
// change the DIV to show the response
    document.getElementById("dataUploadResult").innerHTML = JSON.stringify(data);
}

// For developer, delete the question set before in database
function deleteRecord() {
    var deleteID = document.getElementById("deleteID").value;
    var deleteString = "id=" + deleteID + "&port_id=" + httpsPortNumberAPI;
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/deleteQuestion";
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function (data) {
            console.log(data);
            dataDeleted(data);
        },
        data: deleteString
    });
}

function dataDeleted(data) {
    document.getElementById("dataDeleteResult").innerHTML = JSON.stringify(data);
}
