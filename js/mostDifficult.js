// to check if the table exists
// use Jquery selector to select the table
function checkDifficultTable(){
    $(document).ready(function () {
        if ($('table#t01').length) {
            $('table#t01').remove();
        } else {
            getDifficultTable()
        }
    });
}

// learning table of JS from https://www.w3schools.com/html/html_tables.asp
// send request to API and show the response data as a table
function getDifficultTable() {
    var layerURL =
        "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/getDifficult";
    $.ajax({
        url: layerURL, crossDomain: true, success: function (result) {

            var htmlstring = '<table id="t01" style="width:800px"> ' +
                '<tr><th colspan="7"><h3><br>Five Most Difficult Questions</h3> </th></tr>' +
                '<tr> <th>Question Title</th> <th>Question Text</th> <th>Answer 1</th> <th>Answer 2</th> ' +
                '<th>Answer 3</th> <th>Answer 4</th> <th>Correct Answer</th> </tr>'

            // add for loop to load data in the table
            for (var i in result[0].array_to_json) {
                question_title = result[0].array_to_json[i].question_title;
                question_text = result[0].array_to_json[i].question_text;
                answer_1 = result[0].array_to_json[i].answer_1;
                answer_2 = result[0].array_to_json[i].answer_2;
                answer_3 = result[0].array_to_json[i].answer_3;
                answer_4 = result[0].array_to_json[i].answer_4;
                correct_answer = result[0].array_to_json[i].correct_answer;

                htmlstring = htmlstring + "<tr> <td> " + question_title + "</td> <td>" + question_text + "</td> <td>"
                    + answer_1 + "</td> <td>" + answer_2 + "</td> <td>" + answer_3 + "</td> <td>"
                    + answer_4 + "</td> <td>" + correct_answer + "</td> </tr>";
            };

            htmlstring = htmlstring + "</table><hr>";
            document.getElementById("difficultTable").innerHTML = htmlstring;

        } // end of the inner function
    }); // end of the ajax request
}