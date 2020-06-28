// Check which screen size is (user on which app) to determine which functions are used at the start of apps
// to detect the screen size and determine to using which function when the app starts
// change the size of the map by the screen size detected

// use JQuery to query if the title of app exists on map
function getScreenSize() {
    if ($('#question_setting_app_title').is(':hidden')) {
        // question_setting_app_title is hidden means it's in small screen
        console.log('In Small Devices (width <= 992px)');
        document.getElementById("mapid").style="width: 600px; height: 400px";//3:2
        getQuizData();
        trackLocation();
        getNumberCorrect()
    } else {
        console.log('In Large Devices (width > 992px)');
        document.getElementById("mapid").style="width: 800px; height: 450px"; //16:9
        getQuestionsData(); //for large screen
        trackLocation();
    }
}