# CEGE0043-APPs

The APPs include a Question Setting App and a Location Based Quiz App. These two apps are set in one index html divided by
 Bootstrap based on detecting the screen size of user.
 
## System Requirements:

### Software:
- A recent browser: Chrome, Firefox, Edge are tested. Most recent versions of Chrome and edge are okay. Firefox has some errors for CRUD
- node.js
- UCL vpn or wifi

### Hardware:
- A PC/laptop which can connect to internet
- A iphone with IOS 13 or a An android phone with android 9 (both are okay by test)

## Deploy and test the Code:
1. Download all codes in this repository
2. Using UCL vpn or UCL wifi
3. Start a command prompt (Ubuntu) and set the directory to the folder where this code downloaded.
4. Using command line "pm2 start app.js"
5. Start a browser in PC/laptop (for question app) and phone (for quiz app)
6. input url "https://developer.cege.ucl.ac.uk:" + httpsPortNumberAPI + "/index" in browser 
7. Use of Inspect or Developer Mode of the browser to see if there is any error

## Files Description:
There are HTML files (Bootstrap, for layout of the websites), JavaScript files (foe achieving the main functionailites), CSS files (for styles), XML files (for detecting port id)

### HTML files 
- index.html: The main index file based on Bootstrap for layout of apps

DIV id | Description
----------|----------
map_id (in question setting and quiz apps both)| Hold the leaflet map 
difficultTable (in question setting app)| Hold the table of 5 most difficult questions
question_form (in question setting app) | Hold the form for questions setting
ratesGraph (in question setting app)| Hold the graph for the participation rates
topFiveGraph (in quiz app) | Hold the graph for top five scorers

Button | Description
----------|----------
Show/Remove All Questions I Created (in question setting app) | Load/delete all question points by current user
Show Daily Participation Rates (in question setting app) | Expanding the following menus
For Me Only (in question setting app) | Load the graph of daily participation rates for current user only
For All Users (in question setting app) | Load the graph of daily participation rates for all users
Show/Remove Questions by All Users Last Week (in question setting app) | Load/delete the quiz points by all users in the last week
Show/Remove 5 Closest Questions (in question setting app)| Load/delete the 5 most closest quiz points
Show/Remove 5 Most Difficult Questions (in question setting app)| Load/delete the table of 5 most difficult questions
Show Quiz I Created (in quiz app)| Load quiz points by current user which can be answered
Show Quiz by All Users (in quiz app)| Load quiz points by all users which can be answered
Get My Ranking (in quiz app)| Alert the information of the ranking of current user
Top 5 Scorers (in quiz app)| Load the graph for top 5 scorers
Show/Remove Last 5 Questions I Answered (in quiz app)| Load/delete the the last 5 quiz points which current user answered  
Show Questions I Answered Incorrectly (in quiz app)| Load quiz points which current user answered incorrectly
Help (in question setting and quiz app both)| Jump to the help website (question app or quiz app)

- questionHelp.html: The help document for question app
- quizHelp.html: The help document for quiz app

### JavaScript files (in js folder)
- basicMap.js: Load the basic leaflet map

Function | Description
----------|----------
loadLeafletMap() | For loading the basic leaflet map
onMapClick(e) | Popup the coords of the location the user clicks on the map

- closestFive.js: For getting the closest five questions by the user's location

Function | Description
----------|----------
checkClosestFive() | Check if closest five quiz points layer or other layers have existed to avoid the conflicts
getClosestFive() | Send request to API and load the closest five quiz points layer on map 

- help.js: For jumping to help html

Function | Description
----------|----------
getQuizHelp() | For jumping to the help page for quiz app
getQuestionHelp() | Jump to the help page for question setting app

- incorrect.js: For getting the questions user answered incorrectly 

Function | Description
----------|----------
checkIncorrect() | Check if incorrect quiz points layer or other layers have existed to avoid the conflicts
getIncorrect() | Send request to API and load incorrect five quiz points layer on map 

- lastFive.js: For getting the last 5 questions user answered

Function | Description
----------|----------
checkLastFive() | Check if the layer of the last five quiz points which current user answered or other layers have existed to avoid the conflicts
getLastFive() | Send request to API and load the layer of the last five quiz points on map 

- lastWeek.js: For getting the questions all users set in last week

Function | Description
----------|----------
checkLastWeek() | Check if the layer of quiz points set by all users in the last week or other layers have existed to avoid the conflicts
getLastWeek() | Send request to API and load the layer of quiz points set by all users in the last week on map 

- mostDifficult.js: For getting the 5 most difficult questions 

Function | Description
----------|----------
checkDifficultTable() | Use Jquery selector to select the table to check if the table exists
getDifficultTable() | Send request to API and show the response data as a table

- numberCorrect.js: For getting the the number of questions user answered correctly

Function | Description
----------|----------
getNumberCorrect() | Send request to API to get the the number of questions user answered correctly, and alert it after user answers a question

- participationRates.js: For getting the daily participation rates for current user and all users

Function | Description
----------|----------
getAllRates() | Send request to API to get the daily participation rates for all users
getUserRates() | Send request to API to get the daily participation rates for current user
groupData(i, day) |  Check each item of the array and group it for plotting D3 graph
sortData (data) | Go through the array, sort in the order of "Monday to Sunday"
plotRatesGraph(data) | plot the data processed to a D3 graph

- questions.js: For getting the questions current user created

Function | Description
----------|----------
checkQuestionsData() | Check if the layer of questions created by current user or other layers have existed to avoid the conflicts
getQuestionsData() | Send request to API to get the layer of questions created by current user and all users created

- quiz.js:  For getting the quiz by current user and all users created

Function | Description
----------|----------
getQuizData() | Send request to API to get the quiz points by current user
getAllQuiz() | Send request to API to get the quiz points by all users
checkAnswer(questionID) | Check the question user selects with the correct answer hidden
closestFormPoint() | Go through all quiz points to check if there are quiz points in the minimum distance set and get the closest point  
calculateDistance(lat1, lon1, lat2, lon2, unit) | Calculate the distance by the coords of two points
refreshLocationLayers() | Refresh the location tracking

- ranking.js: For getting the ranking of the current user 

Function | Description
----------|----------
 getRanking() | Send request to API to get the ranking of the user and alert it

- screenSize.js: For checking the screen size at the start to determine doing some different functions. 

Function | Description
----------|----------
getScreenSize() | Check which screen size is (user on which app) to determine which functions are used at the start of apps

- topFiveGraph.js: For getting a graph for the top five scorers.

Function | Description
----------|----------
getTopFive() | Send a request to API to get the data of top five scorers and process the data
plotTopGraph(data) | plot the data processed to a d3 graph


- trackLocation.js: For tracking user's location at the start of app.

Function | Description
----------|----------
trackLocation() | Use Geolocation of navigator to track user's location
showPosition(position) | Push the tracking location to a map layer, store the coords into global variables, do closestFormPoint()

- uploadQuestion.js: For sending the question input by user to DB.

Function | Description
----------|----------
startQuestionUpload(correct_answer) | Get the text values input by user from the form and return a post string including these
processData(postString) | Send the post string to "/insertQuestion"API and store it in DB
checkForm() | Check if there is a coords obtained by the click on map and if user choose a correct answer, if not, alert a error message
dataUploaded(data) | Change the DIV to show the response to users after data uploaded
deleteRecord() | For developer, delete the question set before in database
dataDeleted(data) | Change the DIV to show the response to users after data deleted

- uploadQuizAnswer.js: For sending the quiz answers input by user to DB.

Function | Description
----------|----------
startAnswerUpload(questionID, answerSelected, answer) | Get the text values of user's answer and return a post string including these
processAnswerData(postString) | Send the post string to "/insertAnswer"API and store it in DB

- utilities.js: For getting the port numbers

Function | Description
----------|----------
getPorts() | Get the port number (APP and API) by xml file set by user

### CSS files (in css folder)

ionicons.min.css: Style for custom icon creation.
leaflet.awesome-markers.css: Style for markers
sb-admin-2.css: Style for Bootstrap.
topFiveGraph.css: Style for top five scorers graph.


### XML files (in res folder)
port.xml: Include the port id

## Third Party code:
1. codes in practicals in CEGE0043 module Web and Mobile GIS - Apps and Programming (19/20) by Dr Claire Ellul 
- Basic Bootstrap structure of index.html (week6 practical about Bootstap)
- Functions related tp data uploading, tracking location, basic map, Ajax request, displaying map layer and detecting port id
2. topFiveGraph: https://stackoverflow.com/questions/38983807/how-to-animate-a-horizontal-d3-bar-chart/38987948#38987948
   JSfiddle: https://jsfiddle.net/8v88gwqn/
3. participation rates graph: use code by https://bl.ocks.org/bricedev/0d95074b6d83a77dc3ad
