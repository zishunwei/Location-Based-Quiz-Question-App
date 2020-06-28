// Get the text values of user's answer and return a post string including these
function startAnswerUpload(questionID, answerSelected, answer) {
// this var "answer" is correct answer of relevant question
    var correct_answer = answer;
    // first define postString and  add port id
    var postString = "&port_id=" + httpsPortNumberAPI;
    // now get the questionID, answerSelected, correct answer
    postString = postString +"&question_id="+questionID+"&answer_selected="+answerSelected+"&correct_answer="+correct_answer;

    processAnswerData(postString);
} // close off the startAnswerUpload function

// Create the AJAX request
// note the ues of the API port number as this is where the request will be submitted
function processAnswerData(postString) {
    var serviceUrl = "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/insertAnswer"
    $.ajax({
        url: serviceUrl,
        crossDomain: true,
        type: "POST",
        success: function (data) {
            console.log(data);
        },
        data: postString
    });
}